'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { execFile } = require('child_process');
const path = require('path');

/**
 * Verify GitHub webhook HMAC-SHA256 signature.
 */
function verifySignature(secret, body, signature) {
  if (!signature || !signature.startsWith('sha256=')) return false;
  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

/**
 * POST /webhook/github
 * Receives GitHub push events and triggers deploy script on push to main.
 */
router.post('/github', express.raw({ type: 'application/json' }), (req, res) => {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error('Webhook: WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook not configured.' });
  }

  const signature = req.headers['x-hub-signature-256'];
  const body = req.body; // raw buffer (express.raw middleware)

  if (!verifySignature(secret, body, signature)) {
    console.warn('Webhook: invalid signature received');
    return res.status(401).json({ error: 'Invalid signature.' });
  }

  let payload;
  try {
    payload = JSON.parse(body.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }

  const event = req.headers['x-github-event'];
  const branch = payload.ref;

  console.log(`Webhook: received event="${event}" ref="${branch}"`);

  if (event !== 'push' || branch !== 'refs/heads/main') {
    return res.json({ message: 'Ignored. Only push to main triggers deploy.' });
  }

  // Respond immediately before running the script
  res.json({ message: 'Deploy triggered.' });

  const deployScript = path.resolve(__dirname, '../../deploy/update.sh');
  execFile('/bin/bash', [deployScript], { timeout: 120000 }, (err, stdout, stderr) => {
    if (err) {
      console.error('Webhook deploy error:', err.message);
      console.error('stderr:', stderr);
    } else {
      console.log('Webhook deploy success:\n', stdout);
    }
  });
});

module.exports = router;
