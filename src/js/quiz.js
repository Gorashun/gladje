/**
 * Glädje & Harmoni — Quiz JavaScript
 * State management, navigation, scoring, API-anrop
 */

(function () {
  'use strict';

  /* =========================================================
     Quiz-data: 15 frågor med poäng
  ========================================================= */
  const QUESTIONS = [
    {
      id: 1,
      category: 'Rörelse & Träning',
      question: 'Hur många gånger tränar du per vecka?',
      options: [
        { text: '0 gånger',    score: 0 },
        { text: '1–2 gånger',  score: 1 },
        { text: '3–4 gånger',  score: 2 },
        { text: '5+ gånger',   score: 3 },
      ],
    },
    {
      id: 2,
      category: 'Sömn & Återhämtning',
      question: 'Hur många timmar sover du per natt i snitt?',
      options: [
        { text: 'Under 5 timmar',     score: 0 },
        { text: '5–6 timmar',         score: 1 },
        { text: '7–8 timmar',         score: 3 },
        { text: 'Mer än 9 timmar',    score: 1 },
      ],
    },
    {
      id: 3,
      category: 'Kost & Näring',
      question: 'Hur ser din kost ut?',
      options: [
        { text: 'Mycket processad mat, lite grönsaker',          score: 0 },
        { text: 'Blandat, ibland hälsosamt',                     score: 1 },
        { text: 'Mestadels hälsosamt med grönsaker dagligen',    score: 2 },
        { text: 'Växtbaserat/medelhavskost konsekvent',          score: 3 },
      ],
    },
    {
      id: 4,
      category: 'Mental hälsa',
      question: 'Hur hanterar du stress?',
      options: [
        { text: 'Dåligt, konstant stressad',                    score: 0 },
        { text: 'Varierar, ingen aktiv hantering',              score: 1 },
        { text: 'Har några tekniker (meditation/yoga)',         score: 2 },
        { text: 'Aktiv stresshantering dagligen',               score: 3 },
      ],
    },
    {
      id: 5,
      category: 'Socialt liv',
      question: 'Hur starka är dina sociala band?',
      options: [
        { text: 'Isolerad, sällan kontakt med andra',          score: 0 },
        { text: 'Lite kontakt med familj/vänner',              score: 1 },
        { text: 'Regelbunden kontakt, goda relationer',        score: 2 },
        { text: 'Starkt nätverk, djupa relationer dagligen',   score: 3 },
      ],
    },
    {
      id: 6,
      category: 'Livsstil',
      question: 'Röker du?',
      options: [
        { text: 'Ja, dagligen',      score: 0 },
        { text: 'Ibland/sällan',     score: 1 },
        { text: 'Slutade nyligen',   score: 2 },
        { text: 'Aldrig',            score: 3 },
      ],
    },
    {
      id: 7,
      category: 'Livsstil',
      question: 'Hur mycket alkohol dricker du per vecka?',
      options: [
        { text: 'Mer än 14 enheter',      score: 0 },
        { text: '8–14 enheter',           score: 1 },
        { text: '1–7 enheter',            score: 2 },
        { text: 'Ingen eller nästan ingen', score: 3 },
      ],
    },
    {
      id: 8,
      category: 'Kognitiv hälsa',
      question: 'Hur hanterar du din hjärnhälsa?',
      options: [
        { text: 'Ingen aktiv hjärnträning',                          score: 0 },
        { text: 'Läser ibland',                                      score: 1 },
        { text: 'Regelbunden läsning/pussel/lärande',                score: 2 },
        { text: 'Aktivt lärande + socialt engagemang dagligen',      score: 3 },
      ],
    },
    {
      id: 9,
      category: 'Natur & Miljö',
      question: 'Hur är din relation till naturen?',
      options: [
        { text: 'Spenderar nästan ingen tid utomhus',   score: 0 },
        { text: 'Ibland promenader',                    score: 1 },
        { text: 'Regelbundna promenader i naturen',     score: 2 },
        { text: 'Daglig naturvistelse',                 score: 3 },
      ],
    },
    {
      id: 10,
      category: 'Förebyggande hälsa',
      question: 'Kontrollerar du regelbundet din hälsa?',
      options: [
        { text: 'Aldrig',                           score: 0 },
        { text: 'Bara när det är problem',          score: 1 },
        { text: 'Vartannat år',                     score: 2 },
        { text: 'Yearly check-up med blodprov',     score: 3 },
      ],
    },
    {
      id: 11,
      category: 'Kroppsvikt',
      question: 'Hur är din kroppsvikt?',
      options: [
        { text: 'Kraftigt överviktig (BMI >30)',      score: 0 },
        { text: 'Överviktig (BMI 25–30)',             score: 1 },
        { text: 'Normal vikt (BMI 18,5–25)',          score: 3 },
        { text: 'Lite underviktig (BMI <18,5)',       score: 1 },
      ],
    },
    {
      id: 12,
      category: 'Rörelse & Träning',
      question: 'Hur mycket sitter du per dag?',
      options: [
        { text: '10+ timmar',       score: 0 },
        { text: '7–9 timmar',       score: 1 },
        { text: '4–6 timmar',       score: 2 },
        { text: 'Under 4 timmar',   score: 3 },
      ],
    },
    {
      id: 13,
      category: 'Hydration & Kost',
      question: 'Dricker du tillräckligt med vatten?',
      options: [
        { text: 'Sällan, dricker mest kaffe/läsk',   score: 0 },
        { text: 'Ibland vatten',                     score: 1 },
        { text: '1–1,5 liter per dag',               score: 2 },
        { text: '2+ liter per dag',                  score: 3 },
      ],
    },
    {
      id: 14,
      category: 'Mening & Syfte',
      question: 'Hur är din mening och ditt syfte i livet?',
      options: [
        { text: 'Känner inte mycket mening',         score: 0 },
        { text: 'Lite mening',                       score: 1 },
        { text: 'Har tydligt syfte',                 score: 2 },
        { text: 'Starkt "Ikigai" – stark livsmening', score: 3 },
      ],
    },
    {
      id: 15,
      category: 'Sömn & Återhämtning',
      question: 'Hur prioriterar du återhämtning?',
      options: [
        { text: 'Vilar aldrig aktivt',                          score: 0 },
        { text: 'Ledigt ibland',                                score: 1 },
        { text: 'Regelbunden vila och hobbies',                 score: 2 },
        { text: 'Balans arbete/vila, aktiv återhämtning',       score: 3 },
      ],
    },
  ];

  /* =========================================================
     Resultatkategorier
  ========================================================= */
  const CATEGORIES = [
    {
      min: 0,  max: 14,
      key:     'start',
      label:   'Börja Din Resa',
      emoji:   '🌱',
      desc:    'Du har stor potential att förbättra din longevity. Varje litet steg räknas – börja med en förändring i taget.',
      percentile: '0–31%',
    },
    {
      min: 15, max: 24,
      key:     'improve',
      label:   'Förbättringspotential',
      emoji:   '🌿',
      desc:    'Du har en bra grund att bygga vidare på. Med riktade förändringar kan du betydligt förbättra din longevity.',
      percentile: '32–53%',
    },
    {
      min: 25, max: 34,
      key:     'good',
      label:   'God Grund',
      emoji:   '🌳',
      desc:    'Bra jobbat! Du lever redan på ett sätt som stödjer ett långt och hälsosamt liv. Finjustera för optimal effekt.',
      percentile: '54–75%',
    },
    {
      min: 35, max: 45,
      key:     'optimized',
      label:   'Longevity Optimerare',
      emoji:   '🏆',
      desc:    'Imponerande! Du tillhör toppen av longevity-praxis. Fortsätt underhålla dina utmärkta vanor.',
      percentile: '76–100%',
    },
  ];

  /* =========================================================
     State
  ========================================================= */
  const state = {
    current:   0,          // 0-indexerat
    answers:   [],         // poäng per fråga
    total:     0,
    category:  null,
    email:     '',
    firstName: '',
    optIn:     false,
  };

  /* =========================================================
     DOM-refs (hämtas i init)
  ========================================================= */
  let progressFill, counterEl, quizCard, loadingOverlay, optinSection, resultSection;

  /* =========================================================
     Hjälpfunktioner
  ========================================================= */
  const letters = ['A', 'B', 'C', 'D'];

  function getCategory(score) {
    return CATEGORIES.find(c => score >= c.min && score <= c.max) || CATEGORIES[0];
  }

  function calcScore() {
    return state.answers.reduce((sum, s) => sum + s, 0);
  }

  function updateProgress() {
    const pct = (state.current / QUESTIONS.length) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    if (counterEl) counterEl.textContent = `Fråga ${state.current + 1} av ${QUESTIONS.length}`;
  }

  /* =========================================================
     Rendera fråga
  ========================================================= */
  function renderQuestion(index) {
    const q = QUESTIONS[index];
    if (!quizCard) return;

    quizCard.innerHTML = `
      <div class="quiz-card__category">${q.category}</div>
      <h2 class="quiz-card__question">${q.question}</h2>
      <div class="quiz-options" role="group" aria-label="Svarsalternativ">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" data-score="${opt.score}" aria-label="${letters[i]}: ${opt.text}">
            <span class="quiz-option__letter" aria-hidden="true">${letters[i]}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-nav">
        ${index > 0 ? `<button class="btn btn--ghost" id="quiz-back">← Tillbaka</button>` : '<div></div>'}
        <button class="btn btn--primary quiz-nav__next" id="quiz-next" disabled>
          ${index < QUESTIONS.length - 1 ? 'Nästa fråga →' : 'Se mitt resultat →'}
        </button>
      </div>`;

    quizCard.classList.add('quiz-slide');
    quizCard.addEventListener('animationend', () => quizCard.classList.remove('quiz-slide'), { once: true });

    // Lyssna på svar
    quizCard.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => selectOption(btn));
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption(btn); }
      });
    });

    // Knappar
    const nextBtn = document.getElementById('quiz-next');
    const backBtn = document.getElementById('quiz-back');
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (backBtn) backBtn.addEventListener('click', goBack);

    updateProgress();
  }

  function selectOption(btn) {
    // Avmarkera alla
    quizCard.querySelectorAll('.quiz-option').forEach(b => {
      b.classList.remove('selected');
      b.setAttribute('aria-pressed', 'false');
    });
    // Markera valt
    btn.classList.add('selected');
    btn.setAttribute('aria-pressed', 'true');

    // Spara poäng
    state.answers[state.current] = parseInt(btn.dataset.score, 10);

    // Aktivera nästa
    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) nextBtn.disabled = false;

    // Auto-advance efter 0.4 sek
    setTimeout(goNext, 400);
  }

  function goNext() {
    if (state.answers[state.current] === undefined) return;
    if (state.current < QUESTIONS.length - 1) {
      state.current++;
      renderQuestion(state.current);
    } else {
      finishQuiz();
    }
  }

  function goBack() {
    if (state.current > 0) {
      state.current--;
      renderQuestion(state.current);
    }
  }

  /* =========================================================
     Avsluta quiz – loading → opt-in
  ========================================================= */
  function finishQuiz() {
    state.total = calcScore();
    state.category = getCategory(state.total);

    // Visa loading
    if (quizCard)       quizCard.style.display = 'none';
    if (loadingOverlay) loadingOverlay.classList.remove('hidden');

    // Uppdatera loading-text
    const loadingText = document.querySelector('.loading-text');
    const loadingSub  = document.querySelector('.loading-sub');
    if (loadingText) loadingText.textContent = 'Beräknar din longevity…';
    if (loadingSub)  loadingSub.textContent  = 'Vi analyserar dina svar';

    // Stegvis uppdatering
    let step = 0;
    const steps = [
      'Analyserar dina levnadsvanor…',
      'Jämför med longevity-forskning…',
      'Beräknar din personliga poäng…',
      'Förbereder din analys…',
    ];
    const iv = setInterval(() => {
      if (loadingSub && step < steps.length) {
        loadingSub.textContent = steps[step++];
      }
    }, 500);

    setTimeout(() => {
      clearInterval(iv);
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
      showOptIn();
    }, 2200);
  }

  /* =========================================================
     Visa opt-in formulär
  ========================================================= */
  function showOptIn() {
    if (!optinSection) return;
    if (quizCard)    quizCard.style.display = 'none';
    optinSection.style.display = '';
    optinSection.classList.add('fade-in');

    // Uppdatera förhandsgranskning av kategori
    const previewEl = document.getElementById('optin-preview-cat');
    if (previewEl && state.category) {
      previewEl.textContent = `Din preliminära kategori: ${state.category.emoji} ${state.category.label}`;
      previewEl.className = `badge badge--green`;
    }

    // Formulär
    const form = document.getElementById('optin-form');
    if (form) {
      form.addEventListener('submit', handleOptInSubmit);
    }

    // Länk för att hoppa över
    const skipLink = document.getElementById('optin-skip');
    if (skipLink) {
      skipLink.addEventListener('click', e => {
        e.preventDefault();
        goToResults(false);
      });
    }
  }

  /* =========================================================
     Opt-in submit
  ========================================================= */
  async function handleOptInSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email     = form.querySelector('#optin-email').value.trim();
    const firstName = form.querySelector('#optin-name')?.value.trim() || '';
    const optIn     = form.querySelector('#optin-consent')?.checked || false;
    const errEl     = document.getElementById('optin-email-error');

    // Validering
    if (!email || !validateEmail(email)) {
      if (errEl) errEl.textContent = 'Ange en giltig e-postadress.';
      form.querySelector('#optin-email').classList.add('error');
      return;
    }
    if (!optIn) {
      if (errEl) errEl.textContent = 'Du behöver godkänna för att ta emot rapporten.';
      return;
    }
    if (errEl) errEl.textContent = '';

    state.email     = email;
    state.firstName = firstName;
    state.optIn     = optIn;

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Skickar…'; }

    try {
      // Skicka quiz-svar
      await apiSubmitQuiz();
      // Registrera lead
      await apiRegisterLead();
    } catch (err) {
      console.warn('API-anrop misslyckades, fortsätter ändå:', err.message);
    }

    goToResults(true);
  }

  /* =========================================================
     API-anrop
  ========================================================= */
  async function apiSubmitQuiz() {
    const answers = QUESTIONS.map((q, i) => ({
      questionId: q.id,
      score: state.answers[i] !== undefined ? state.answers[i] : 0,
    }));

    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers,
        email:  state.email || undefined,
        optIn:  state.optIn,
      }),
    });
    if (!res.ok) throw new Error(`quiz/submit: ${res.status}`);
    return res.json();
  }

  async function apiRegisterLead() {
    if (!state.email || !state.optIn) return;
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:               state.email,
        firstName:           state.firstName,
        quizResultCategory:  state.category?.key || 'unknown',
      }),
    });
    if (!res.ok) throw new Error(`leads: ${res.status}`);
    return res.json();
  }

  /* =========================================================
     Navigera till resultatsidan
  ========================================================= */
  function goToResults(withEmail) {
    const params = new URLSearchParams({
      score:    state.total,
      cat:      state.category?.key || 'start',
      withEmail: withEmail ? '1' : '0',
    });
    window.location.href = `/results.html?${params}`;
  }

  /* =========================================================
     Validering
  ========================================================= */
  function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  /* =========================================================
     Init
  ========================================================= */
  function init() {
    progressFill  = document.querySelector('.progress-bar__fill');
    counterEl     = document.querySelector('.quiz-header__counter');
    quizCard      = document.getElementById('quiz-card');
    loadingOverlay= document.getElementById('loading-overlay');
    optinSection  = document.getElementById('optin-section');
    resultSection = document.getElementById('result-section');

    if (!quizCard) return; // Inte på quiz-sidan

    // Dölj opt-in & loading initialt
    if (optinSection)   optinSection.style.display   = 'none';
    if (resultSection)  resultSection.style.display  = 'none';
    if (loadingOverlay) loadingOverlay.classList.add('hidden');

    renderQuestion(0);
  }

  document.addEventListener('DOMContentLoaded', init);

})();
