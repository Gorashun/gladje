# PROJECT_PLAN.md — Glädje & Harmoni

> Longevity-quiz & email marketing-plattform för den svenska marknaden

---

## 1. Projektbeskrivning och Vision

### Vision

Glädje & Harmoni ska bli Sveriges ledande digitala longevity-resursen — en tillgänglig, vetenskapligt förankrad och personaliserad guide för alla som vill investera i sitt långsiktiga välmående. Inte en medicinsk tjänst, utan en inspirerande och handlingsorienterad upplevelse.

### Kärnprodukt (MVP)

1. **Longevity-quiz** — 20–25 frågor som täcker livsstilsdomäner: kost, träning, sömn, stress, socialt liv, mentalt engagemang, miljö.
2. **Resultatprofil** — Användaren får en "Longevity-poäng" (0–100) och placeras i en av fyra profiler: *Pionjären*, *Utforskaren*, *Grundaren*, *Startaren*.
3. **Email opt-in** — Frivilligt: lämna sin e-post för att få den fullständiga rapporten + personaliserade råd skickade till inkorgen.
4. **Nurture-sekvens** — Automatiserad email-sekvens via MailerLite som levererar värde under 4 veckor.

### Långsiktig vision (post-MVP)

- Interaktiv resursbibliotek om longevity-forskning
- Personliga mål och progress-tracking
- Community-funktioner
- Premium-innehåll (e-bok, videokurs)
- Integration med hälsodata (Apple Health, Garmin)

---

## 2. Målgrupp och Demografi

### Primär målgrupp

| Faktor | Beskrivning |
|--------|-------------|
| Ålder | 40–70 år |
| Kön | Jämt fördelat, möjlig övervikt mot kvinnor 45–65 |
| Geografi | Sverige, primärt storstäder (Stockholm, Göteborg, Malmö) |
| Utbildning | Medel–hög, vana webbanvändare |
| Inkomst | Medel–hög (har råd investera i hälsa) |
| Drivkrafter | Förebyggande hälsa, energi, kvalitet senare år, familjeansvar |

### Psykografisk profil

- **"Den hälsomedvetna senioren"** — Läser Allt om Mat, lyssnar på hälsopoddar (t.ex. Björn Hammarskjöld, Nyfiken på hjärnan), tränar regelbundet men vill optimera.
- **"Medelålders stressade"** — 45–55 år, högt tempo, börjar märka åldrande, vill agera proaktivt.
- **"Pensionärsförberedaren"** — 60–70 år, planerar pensionen, vill säkerställa hälsosamma år framåt.

### Sekundär målgrupp

- 30–39 år, tidiga hälsointresserade ("biohackers")
- Anhöriga som söker information för äldre föräldrar

### Designimplikationer

- Tydlig, stor typografi (min 16px body)
- Högt kontrast-förhållande (WCAG AA+)
- Inga komplexa animationer som kan störa
- Mobiloptimerat (många i målgruppen surfar på mobil)
- Förtroendeingivande design — inte flashigt, utan seriöst och varmt

---

## 3. Teknisk Arkitektur

### Systemöversikt

```
Användare (Browser)
        │
        ▼
   [Nginx / TLS]
        │
   [Express.js App]
   ┌────┴────────────────┐
   │ Static Files (src/) │
   │ API Routes (/api/*) │
   └────┬────────────────┘
        │
   [SQLite DB]    [MailerLite API]
```

### Frontend-arkitektur

Enkel och läsbar vanilla HTML/CSS/JS. Inga tung frameworks — snabb laddningstid är kritisk för SEO och målgruppen med varierande uppkoppling.

- `index.html` — Landningssida med CTA till quiz
- `quiz.html` — Single-page quiz med progress-indikator
- `result.html` — Resultatpresentation + opt-in-formulär
- CSS custom properties för konsekvent branding
- Progressivt förbättrad — fungerar utan JS (grundläggande nivå)

### Backend-arkitektur

```
server/
├── index.js              # App bootstrap, middleware-stack
├── routes/
│   ├── quiz.js           # GET /api/quiz/questions, POST /api/quiz/submit
│   ├── subscribe.js      # POST /api/subscribe
│   └── deploy.js         # POST /api/deploy (webhook)
├── db/
│   ├── schema.sql
│   └── db.js             # SQLite singleton
├── services/
│   ├── mailerlite.js     # MailerLite API-wrapper
│   ├── quiz-scorer.js    # Poängberäkningslogik
│   └── consent.js        # GDPR consent-hantering
└── middleware/
    ├── helmet.js
    ├── ratelimit.js
    └── validation.js     # express-validator schemas
```

### Databas — Design-principer

- Inga råa IP-adresser lagras — SHA-256-hash
- Inga råa e-postadresser lagras — hanteras exklusivt i MailerLite
- Quiz-svar är anonyma och kopplas aldrig till email-data
- Soft delete-pattern för "rätten att bli glömd"

### Deployment-pipeline

```
Developer Push → GitHub PR → Review → Merge to main
                                              │
                              GitHub Webhook (POST /api/deploy)
                                              │
                                     deploy/deploy.sh
                                     ├── git pull
                                     ├── npm ci --production
                                     └── systemctl restart gladje
```

---

## 4. GDPR-krav och Implementationsplan

> Se `docs/gdpr-compliance.md` för fullständig specifikation.

### Dataflöden som kräver GDPR-hantering

| Dataflöde | Rättslig grund | Åtgärd |
|-----------|----------------|--------|
| Quiz-svar (anonyma) | Berättigat intresse | Anonymisering, begränsad lagring |
| Email opt-in | Samtycke (Art. 6.1.a) | Explicit kryssruta, konsenttext sparas |
| MailerLite-data | Samtycke | DPA med MailerLite, EU-databehandling |
| Webbanalys | Berättigat intresse / Samtycke | Cookieless analytics eller cookie-samtycke |

### Implementationskrav (MVP)

- [ ] Opt-in-formulär: Obligatorisk, pre-unchecked kryssruta med läsbar consent-text
- [ ] Lagring av consent-tidsstämpel och consent-text-version
- [ ] Privacy policy-sida länkad från opt-in
- [ ] Cookie-banner (om cookies används)
- [ ] Unsubscribe-länk i varje email (hanteras av MailerLite)
- [ ] Process för hantering av DSAR (Data Subject Access Requests)

---

## 5. SEO-strategi

> Se `docs/seo-strategy.md` för fullständig strategi.

### Primära SEO-mål

1. Ranka på svenska longevity-keywords inom 6 månader
2. Organisk trafik som primär kanal för quiz-deltagare
3. Featured snippets för "vad är longevity"-typer av frågor

### Teknisk SEO — Prioriterat för MVP

- Semantisk HTML5 (korrekt heading-hierarki, landmarks)
- Schema.org markup (WebPage, FAQPage, Article)
- Open Graph + Twitter Card för social delning
- Canonical URLs
- XML-sitemap
- robots.txt
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- HTTPS (Let's Encrypt)

---

## 6. Email Marketing-strategi

> Se `docs/email-marketing.md` för fullständig plan.

### MailerLite-integration — Teknisk plan

- Nytt konto eller sub-grupp dedikerad till Glädje & Harmoni
- Segment per quiz-profil (Pionjär, Utforskare, Grundare, Startare)
- Automation per segment med personaliserade nurture-sekvenser
- Double opt-in: Ja, för att uppfylla GDPR-best practice och hålla listan ren

### Nyckelmetrik

| KPI | MVP-mål (3 månader) |
|-----|---------------------|
| Quiz-completions | 500/månad |
| Opt-in-rate | ≥ 30% av completions |
| Email open rate | ≥ 35% |
| Click rate | ≥ 8% |
| Avregistreringsrate | < 1% |

---

## 7. Milestones och Arbetsfördelning

### Fas 0 — Setup (vecka 1)

| Uppgift | Prioritet |
|---------|-----------|
| Repo-setup, branching-strategi | P0 |
| Projektdokumentation (denna fas) | P0 |
| Miljökonfiguration (dev, staging, prod) | P0 |
| MailerLite-konto och API-nyckel | P0 |
| Domän + SSL | P0 |

### Fas 1 — MVP Backend (vecka 2–3)

| Uppgift | Ansvarig | Prioritet |
|---------|----------|-----------|
| Express-app-skeleton + middleware | Backend | P0 |
| SQLite-schema och migrations | Backend | P0 |
| Quiz API (`/api/quiz/*`) | Backend | P0 |
| MailerLite-integration (`/api/subscribe`) | Backend | P0 |
| GDPR consent-lagring | Backend | P0 |
| Rate limiting och security headers | Backend | P1 |

### Fas 2 — MVP Frontend (vecka 2–4)

| Uppgift | Ansvarig | Prioritet |
|---------|----------|-----------|
| Design system (färger, typografi, komponenter) | Frontend | P0 |
| Landningssida | Frontend | P0 |
| Quiz-interface (flöde, progress) | Frontend | P0 |
| Resultatsida + opt-in-formulär | Frontend | P0 |
| Responsiv design (mobile-first) | Frontend | P0 |
| Tillgänglighet (WCAG AA) | Frontend | P1 |

### Fas 3 — Innehåll och SEO (vecka 3–5)

| Uppgift | Ansvarig | Prioritet |
|---------|----------|-----------|
| Quiz-frågor (20–25 st) och poängmatris | Content | P0 |
| Profilbeskrivningar (4 profiler) | Content | P0 |
| Landing page copy | Content | P0 |
| Email-sekvenser (4 veckor) | Content | P0 |
| Meta-texter och schema.org markup | SEO | P1 |
| Privacy Policy och Terms | Legal | P0 |

### Fas 4 — Deployment och Launch (vecka 5–6)

| Uppgift | Ansvarig | Prioritet |
|---------|----------|-----------|
| Server-provisioning | DevOps | P0 |
| Nginx-konfiguration | DevOps | P0 |
| systemd service | DevOps | P0 |
| GitHub webhook auto-deploy | DevOps | P1 |
| End-to-end-testning | QA | P0 |
| GDPR-genomgång | Legal/Backend | P0 |
| Soft launch | Alla | P0 |

### Fas 5 — Post-Launch Optimering (vecka 7–12)

- A/B-test av opt-in-copy
- Konverteringsoptimering baserat på drop-off-data
- SEO content expansion
- Analys av email-sekvensens öppningsrater
- Funktionsexpansion baserat på användarfeedback

---

## 8. Riskanalys

| Risk | Sannolikhet | Påverkan | Mitigation |
|------|-------------|----------|------------|
| GDPR-brist | Låg | Hög | GDPR-genomgång i varje fas, IMY-riktlinjer |
| Låg opt-in-rate | Medel | Medel | A/B-test av value proposition, tydlig nytta |
| Hög bounce-rate | Medel | Medel | Snabb laddningstid, tydlig CTA |
| MailerLite-begränsningar | Låg | Låg | Rate limiting, exponential backoff |
| Spam-klassificering av email | Låg | Hög | Double opt-in, SPF/DKIM/DMARC |

---

## 9. Tekniska Beslut och Rationale

### Varför SQLite?

- Enkel deployment — ingen separat databasserver
- Tillräcklig för förväntad trafik (< 10 000 aktiva användare MVP)
- Enkel backup (fil-kopiering)
- Migrationsväg till PostgreSQL finns om nödvändigt

### Varför Vanilla JS?

- Snabb laddningstid — kritisk för målgrupp och SEO
- Inga dependency-säkerhetsrisker
- Lättare underhåll för ett litet team
- Tillräcklig för quizens interaktionskrav

### Varför MailerLite?

- GDPR-compliant, EU-baserad databehandling tillgänglig
- Generös gratisnivå för MVP (1 000 subscribers)
- Utmärkt API-dokumentation
- Inbyggd automation och segmentering

---

## 10. Definition of Done

### För varje feature:
- [ ] Kod granskad av minst en annan teammedlem
- [ ] Enhetstester skrivna och gröna
- [ ] Responsiv design verifierad (mobil, tablet, desktop)
- [ ] GDPR-implikationer genomgångna
- [ ] Tillgänglighet kontrollerad (axe eller liknande)
- [ ] Dokumentation uppdaterad

### För lansering:
- [ ] Alla P0-uppgifter klara
- [ ] Penetrationstest av subscribe-endpointen
- [ ] Privacy Policy publicerad och länkad
- [ ] DKIM/SPF/DMARC konfigurerat för email-domänen
- [ ] Backup-rutin på plats
- [ ] Monitoring (uptime) konfigurerat
