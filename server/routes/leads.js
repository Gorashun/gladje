'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { getDb } = require('../database/db');
const { isValidEmail, hashIp, sanitizeString, validateEmail, leadRateLimit } = require('../middleware/validation');
const mailerlite = require('../services/mailerlite');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Generate an unsubscribe token (HMAC of email) for safe unsubscribe links.
 */
function generateUnsubscribeToken(email) {
  const secret = process.env.WEBHOOK_SECRET || 'gladje-harmoni-unsubscribe-secret';
  return crypto.createHmac('sha256', secret).update(email.toLowerCase().trim()).digest('hex');
}

function verifyUnsubscribeToken(email, token) {
  const expected = generateUnsubscribeToken(email);
  return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(token, 'hex'));
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * POST /api/leads
 * Register email opt-in after quiz completion.
 * Body: { email, firstName?, sessionId, optIn: true }
 */
router.post('/', leadRateLimit, validateEmail, (req, res) => {
  const { email, firstName, sessionId, optIn } = req.body;

  if (!optIn) {
    return res.status(400).json({ success: false, error: 'Samtycke krävs för att registrera dig.' });
  }

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ success: false, error: 'Ogiltig session-ID.' });
  }

  const cleanFirstName = sanitizeString(firstName, 100);
  const cleanSessionId = sanitizeString(sessionId.trim(), 128);
  const ipHash = hashIp(req.ip);
  const optedInAt = new Date().toISOString();

  const db = getDb();

  // Look up quiz result for this session to get category/score
  const quizResult = db.prepare(
    'SELECT total_score, category FROM quiz_results WHERE session_id = ?'
  ).get(cleanSessionId);

  const quizCategory = quizResult ? quizResult.category : null;
  const quizScore = quizResult ? quizResult.total_score : null;

  // Upsert lead
  const existingLead = db.prepare('SELECT id, opted_out FROM leads WHERE email = ?').get(email);

  if (existingLead) {
    if (existingLead.opted_out) {
      // Re-opt-in
      db.prepare(`
        UPDATE leads
        SET opted_in = 1, opted_in_at = ?, opted_out = 0, opted_out_at = NULL,
            first_name = COALESCE(?, first_name),
            quiz_category = COALESCE(?, quiz_category),
            quiz_score = COALESCE(?, quiz_score),
            ip_hash = ?
        WHERE email = ?
      `).run(optedInAt, cleanFirstName, quizCategory, quizScore, ipHash, email);
    } else {
      // Already opted in — silently succeed
      return res.json({ success: true, message: 'Du är redan registrerad. Tack!' });
    }
  } else {
    try {
      db.prepare(`
        INSERT INTO leads (email, first_name, quiz_category, quiz_score, opted_in, opted_in_at, ip_hash)
        VALUES (?, ?, ?, ?, 1, ?, ?)
      `).run(email, cleanFirstName, quizCategory, quizScore, optedInAt, ipHash);
    } catch (err) {
      console.error('leads insert DB error:', err.message);
      return res.status(500).json({ success: false, error: 'Databasfel, försök igen.' });
    }
  }

  // Mark quiz_result as opted_in and store email/name
  if (quizResult) {
    db.prepare(`
      UPDATE quiz_results SET opted_in = 1, email = ?, first_name = ? WHERE session_id = ?
    `).run(email, cleanFirstName, cleanSessionId);
  }

  // Add to MailerLite async — don't block the response
  (async () => {
    try {
      const subscriberId = await mailerlite.addSubscriber(email, cleanFirstName || '', {
        quiz_category: quizCategory || '',
        quiz_score: quizScore,
        opted_in_at: optedInAt,
      });

      if (subscriberId) {
        db.prepare('UPDATE leads SET mailerlite_subscriber_id = ? WHERE email = ?').run(
          subscriberId,
          email
        );
      }

      // Trigger quiz result email automation
      // Recommendations are not stored in DB; the automation email template
      // should be configured in MailerLite to use the quiz_category field.
      // Set MAILERLITE_AUTOMATION_GROUP_ID to activate this trigger.
      if (quizResult) {
        await mailerlite.sendQuizResult(email, cleanFirstName || '', quizCategory, quizScore, []);
      }
    } catch (err) {
      // Non-fatal: already saved to DB
      console.error('MailerLite background error (non-fatal):', err.message);
    }
  })();

  res.json({
    success: true,
    message: 'Tack! Du är nu registrerad. Kolla din inkorg för ditt personliga resultat.',
    unsubscribeToken: generateUnsubscribeToken(email),
  });
});

/**
 * GET /api/leads/unsubscribe?email=xxx&token=xxx
 * One-click unsubscribe via tokenized link.
 */
router.get('/unsubscribe', async (req, res) => {
  const { email, token } = req.query;

  if (!email || !token) {
    return res.status(400).json({ success: false, error: 'Ogiltig avregistreringslänk.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Ogiltig e-postadress.' });
  }

  let tokenValid = false;
  try {
    tokenValid = verifyUnsubscribeToken(email, token);
  } catch {
    tokenValid = false;
  }

  if (!tokenValid) {
    return res.status(403).json({ success: false, error: 'Ogiltig eller utgången länk.' });
  }

  const db = getDb();
  const lead = db.prepare('SELECT id FROM leads WHERE email = ?').get(email);

  if (!lead) {
    return res.status(404).json({ success: false, error: 'E-postadressen hittades inte.' });
  }

  db.prepare(`
    UPDATE leads SET opted_out = 1, opted_out_at = CURRENT_TIMESTAMP, opted_in = 0 WHERE email = ?
  `).run(email);

  // Remove from MailerLite async
  (async () => {
    try {
      await mailerlite.removeSubscriber(email);
    } catch (err) {
      console.error('MailerLite unsubscribe error (non-fatal):', err.message);
    }
  })();

  res.json({ success: true, message: 'Du har avregistrerats. Vi ses kanske igen!' });
});

/**
 * DELETE /api/leads/:email
 * GDPR deletion request. Requires bearer token (WEBHOOK_SECRET).
 */
router.delete('/:email', (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const expectedToken = process.env.WEBHOOK_SECRET || '';

  if (!expectedToken || token !== expectedToken) {
    return res.status(401).json({ success: false, error: 'Obehörig.' });
  }

  const email = req.params.email;
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Ogiltig e-postadress.' });
  }

  const db = getDb();
  const lead = db.prepare('SELECT id FROM leads WHERE email = ?').get(email);

  if (!lead) {
    return res.status(404).json({ success: false, error: 'Hittades inte.' });
  }

  // Record GDPR deletion request
  db.prepare(`
    INSERT INTO gdpr_requests (email, request_type, status) VALUES (?, 'deletion', 'processing')
  `).run(email);

  // Anonymize instead of hard delete (keeps analytics valid)
  const anonEmail = `deleted_${crypto.randomBytes(8).toString('hex')}@anonymized.invalid`;
  db.prepare(`
    UPDATE leads
    SET email = ?, first_name = NULL, ip_hash = NULL, mailerlite_subscriber_id = NULL,
        opted_out = 1, opted_out_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `).run(anonEmail, email);

  db.prepare(`
    UPDATE quiz_results SET email = NULL, first_name = NULL, ip_hash = NULL WHERE email = ?
  `).run(email);

  db.prepare(`
    UPDATE gdpr_requests SET status = 'completed', processed_at = CURRENT_TIMESTAMP
    WHERE email = ? AND status = 'processing'
  `).run(email);

  // Remove from MailerLite async
  (async () => {
    try {
      await mailerlite.removeSubscriber(email);
    } catch (err) {
      console.error('MailerLite GDPR delete error (non-fatal):', err.message);
    }
  })();

  res.json({ success: true, message: 'Personuppgifter raderade enligt GDPR.' });
});

module.exports = router;
