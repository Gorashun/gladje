'use strict';

const express = require('express');
const router = express.Router();
const { getDb } = require('../database/db');
const { quizRateLimit, sanitizeString, hashIp } = require('../middleware/validation');

// ---------------------------------------------------------------------------
// Quiz question data
// ---------------------------------------------------------------------------

const QUIZ_QUESTIONS = [
  {
    id: 1,
    text: 'Hur många timmar sover du vanligtvis per natt?',
    category: 'sovn',
    options: [
      { value: 0, label: 'Mindre än 5 timmar' },
      { value: 1, label: '5–6 timmar' },
      { value: 2, label: '7–8 timmar' },
      { value: 3, label: 'Mer än 8 timmar med god kvalitet' },
    ],
  },
  {
    id: 2,
    text: 'Hur ofta motionerar du per vecka?',
    category: 'rorelse',
    options: [
      { value: 0, label: 'Nästan aldrig' },
      { value: 1, label: '1–2 gånger' },
      { value: 2, label: '3–4 gånger' },
      { value: 3, label: '5 gånger eller mer' },
    ],
  },
  {
    id: 3,
    text: 'Hur skulle du beskriva din kost?',
    category: 'kost',
    options: [
      { value: 0, label: 'Mycket processad mat och lite grönsaker' },
      { value: 1, label: 'Blandad kost, ibland snabbmat' },
      { value: 2, label: 'Mestadels hälsosam med undantag' },
      { value: 3, label: 'Balanserad, rik på grönsaker och fullkorn' },
    ],
  },
  {
    id: 4,
    text: 'Hur hanterar du stress i vardagen?',
    category: 'stress',
    options: [
      { value: 0, label: 'Jag har ingen strategi, stressen tar över' },
      { value: 1, label: 'Jag försöker men lyckas sällan' },
      { value: 2, label: 'Jag har några tekniker som hjälper' },
      { value: 3, label: 'Jag hanterar stress mycket bra med regelbundna rutiner' },
    ],
  },
  {
    id: 5,
    text: 'Hur många glas vatten dricker du per dag?',
    category: 'hydration',
    options: [
      { value: 0, label: 'Mindre än 2 glas' },
      { value: 1, label: '2–4 glas' },
      { value: 2, label: '5–7 glas' },
      { value: 3, label: '8 glas eller mer' },
    ],
  },
  {
    id: 6,
    text: 'Hur ofta har du meningsfulla sociala kontakter?',
    category: 'social',
    options: [
      { value: 0, label: 'Nästan aldrig, jag känner mig isolerad' },
      { value: 1, label: 'Några gånger i månaden' },
      { value: 2, label: 'Flera gånger i veckan' },
      { value: 3, label: 'Dagligen, jag har starka relationer' },
    ],
  },
  {
    id: 7,
    text: 'Hur mycket tid spenderar du utomhus i naturlig dagsljus per dag?',
    category: 'ljus',
    options: [
      { value: 0, label: 'Nästan ingen tid' },
      { value: 1, label: 'Mindre än 30 minuter' },
      { value: 2, label: '30–60 minuter' },
      { value: 3, label: 'Mer än en timme' },
    ],
  },
  {
    id: 8,
    text: 'Hur ofta ägnar du dig åt mentalt stimulerande aktiviteter?',
    category: 'mental',
    options: [
      { value: 0, label: 'Sällan eller aldrig' },
      { value: 1, label: 'Någon gång i månaden' },
      { value: 2, label: 'Några gånger i veckan' },
      { value: 3, label: 'Dagligen (läsning, pussel, lärande, etc.)' },
    ],
  },
  {
    id: 9,
    text: 'Hur är din relation till alkohol?',
    category: 'alkohol',
    options: [
      { value: 0, label: 'Jag dricker regelbundet och ofta' },
      { value: 1, label: 'Jag dricker varje helg' },
      { value: 2, label: 'Jag dricker sällan, bara vid speciella tillfällen' },
      { value: 3, label: 'Jag dricker aldrig eller mycket sällan' },
    ],
  },
  {
    id: 10,
    text: 'Hur hanterar du din skärmtid och digitala välmående?',
    category: 'digital',
    options: [
      { value: 0, label: 'Jag har inget gränser, skärmen dominerar min tid' },
      { value: 1, label: 'Jag försöker begränsa men lyckas sällan' },
      { value: 2, label: 'Jag har vissa rutiner, t.ex. inga skärmar vid sänggående' },
      { value: 3, label: 'Jag hanterar min skärmtid medvetet och har tydliga gränser' },
    ],
  },
  {
    id: 11,
    text: 'Hur upplever du din generella energinivå under dagen?',
    category: 'energi',
    options: [
      { value: 0, label: 'Jag är trött hela dagen' },
      { value: 1, label: 'Jag är trött på eftermiddagen och behöver kaffe' },
      { value: 2, label: 'Ganska stabil med lite naturliga dippar' },
      { value: 3, label: 'Hög och stabil energi hela dagen' },
    ],
  },
  {
    id: 12,
    text: 'Hur ofta praktiserar du mindfulness, meditation eller reflektion?',
    category: 'mindfulness',
    options: [
      { value: 0, label: 'Aldrig' },
      { value: 1, label: 'Ibland, oregelbundet' },
      { value: 2, label: 'Flera gånger i veckan' },
      { value: 3, label: 'Daglig rutin' },
    ],
  },
  {
    id: 13,
    text: 'Hur ser din relation till mat och ätande ut?',
    category: 'matrelation',
    options: [
      { value: 0, label: 'Jag äter stressigt, ofta framför skärm eller hoppar över måltider' },
      { value: 1, label: 'Ojämnt, ibland medvetet, ibland inte' },
      { value: 2, label: 'Jag äter mestadels regelbundet och med viss medvetenhet' },
      { value: 3, label: 'Jag äter med närvaro, utan stress, vid regelbundna tider' },
    ],
  },
  {
    id: 14,
    text: 'Hur hanterar du förebyggande hälsovård (regelbundna kontroller, tandvård, etc.)?',
    category: 'preventiv',
    options: [
      { value: 0, label: 'Jag söker vård bara när det är akut' },
      { value: 1, label: 'Ibland, men inte regelbundet' },
      { value: 2, label: 'Jag följer rekommenderade kontroller' },
      { value: 3, label: 'Jag är proaktiv med alla aspekter av förebyggande hälsa' },
    ],
  },
  {
    id: 15,
    text: 'Hur viktigt är ditt syfte och mening i livet för dig just nu?',
    category: 'syfte',
    options: [
      { value: 0, label: 'Jag saknar känsla av syfte' },
      { value: 1, label: 'Jag funderar på det men har inte hittat det' },
      { value: 2, label: 'Jag har en ganska tydlig riktning' },
      { value: 3, label: 'Jag lever med starkt syfte och mening varje dag' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Category logic
// ---------------------------------------------------------------------------

const CATEGORIES = {
  borja: {
    label: 'Nybörjare på longevity-resan',
    range: [0, 14],
    description:
      'Du är i början av din longevity-resa. Det finns fantastiska möjligheter att förbättra din hälsa och välmående.',
    recommendations: [
      'Börja med att prioritera sömn – sikta på 7–8 timmar per natt',
      'Introducera 20 minuters promenad varje dag',
      'Drick minst 6 glas vatten dagligen',
      'Minska processad mat och lägg till en portion grönsaker per måltid',
      'Hitta en stresshanteringsteknik som fungerar för dig, t.ex. djupandning',
    ],
  },
  forbattring: {
    label: 'På väg mot bättre hälsa',
    range: [15, 24],
    description:
      'Du har en bra grund att stå på! Med några riktade förbättringar kan du ta din hälsa till nästa nivå.',
    recommendations: [
      'Optimera din sömnrutin med konsekvent läggdags och uppvakningstid',
      'Öka träningsintensiteten eller lägg till styrketräning',
      'Utforska intermittent fasta eller tidsbestämt ätande',
      'Bygg starkare sociala band – kvalitet framför kvantitet',
      'Lägg till daglig mindfulness, börja med 5 minuter',
    ],
  },
  god: {
    label: 'God hälsobas',
    range: [25, 34],
    description:
      'Imponerande! Du har etablerat starka hälsovanor. Nu handlar det om att finjustera och fördjupa.',
    recommendations: [
      'Utforska avancerade träningsmetoder som HIIT eller zonträning',
      'Fördjupa dig i nutrigenomik – hur mat påverkar dina gener',
      'Implementera kylterapi eller värmeexponering (bastu)',
      'Optimera din kognitiva hälsa med hjärnträning och inlärning',
      'Undersök blodmarkörer och biomarkörer för personlig optimering',
    ],
  },
  optimerare: {
    label: 'Longevity-optimerare',
    range: [35, 45],
    description:
      'Du är en äkta longevity-optimerare! Din livsstil är anpassad för ett långt, vitalt liv.',
    recommendations: [
      'Utforska cutting-edge longevity-protokoll som senolytika och NAD+-optimering',
      'Överväg avancerade biomarkörstest (epigenetisk klocka, telomerlängd)',
      'Fördjupa dig i mind-body-forskning och neurofeedback',
      'Bli en mentor och inspirera andra på deras hälsoresa',
      'Håll dig uppdaterad om den senaste longevity-forskningen',
    ],
  },
};

function calculateCategory(score) {
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (score >= cat.range[0] && score <= cat.range[1]) {
      return key;
    }
  }
  return 'borja';
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * GET /api/quiz/questions
 * Returns the list of quiz questions (without scoring metadata).
 */
router.get('/questions', (req, res) => {
  const questions = QUIZ_QUESTIONS.map(({ id, text, category, options }) => ({
    id,
    text,
    category,
    options,
  }));
  res.json({ success: true, questions });
});

/**
 * POST /api/quiz/submit
 * Body: { answers: number[], sessionId: string }
 */
router.post('/submit', quizRateLimit, (req, res) => {
  const { answers, sessionId } = req.body;

  // --- Validation ---
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length < 8) {
    return res.status(400).json({ success: false, error: 'Ogiltig session-ID.' });
  }

  if (!Array.isArray(answers) || answers.length !== 15) {
    return res.status(400).json({
      success: false,
      error: 'Svar måste vara en array med exakt 15 element.',
    });
  }

  for (let i = 0; i < answers.length; i++) {
    const val = answers[i];
    if (!Number.isInteger(val) || val < 0 || val > 3) {
      return res.status(400).json({
        success: false,
        error: `Svar ${i + 1} är ogiltigt. Varje svar måste vara ett heltal mellan 0 och 3.`,
      });
    }
  }

  const cleanSessionId = sanitizeString(sessionId.trim(), 128);
  const totalScore = answers.reduce((sum, v) => sum + v, 0);
  const category = calculateCategory(totalScore);
  const categoryData = CATEGORIES[category];
  const ipHash = hashIp(req.ip);

  const db = getDb();

  // Check for duplicate session
  const existing = db.prepare('SELECT id, total_score, category FROM quiz_results WHERE session_id = ?').get(cleanSessionId);
  if (existing) {
    // Return the existing result without re-saving
    const cat = CATEGORIES[existing.category];
    return res.json({
      success: true,
      sessionId: cleanSessionId,
      score: existing.total_score,
      category: existing.category,
      categoryLabel: cat ? cat.label : '',
      description: cat ? cat.description : '',
      recommendations: cat ? cat.recommendations : [],
      alreadySubmitted: true,
    });
  }

  try {
    db.prepare(`
      INSERT INTO quiz_results (session_id, answers, total_score, category, ip_hash)
      VALUES (?, ?, ?, ?, ?)
    `).run(cleanSessionId, JSON.stringify(answers), totalScore, category, ipHash);
  } catch (err) {
    console.error('quiz submit DB error:', err.message);
    return res.status(500).json({ success: false, error: 'Databasfel, försök igen.' });
  }

  res.json({
    success: true,
    sessionId: cleanSessionId,
    score: totalScore,
    category,
    categoryLabel: categoryData.label,
    description: categoryData.description,
    recommendations: categoryData.recommendations,
  });
});

module.exports = router;
