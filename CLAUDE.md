# Glädje & Harmoni — Developer Guide

## Projektöversikt

**Glädje & Harmoni** är ett svenskt longevity-verktyg som hjälper användare att förstå sin hälsoprofil och få personaliserade råd för ett längre, friskare liv. Kärnan i produkten är ett interaktivt quiz där användare svarar på frågor om livsstil, kost, sömn och träning — och sedan kan välja att få ett detaljerat resultat skickat till sin e-post.

- **Primär funktion:** Longevity-quiz med email opt-in och MailerLite-leverans
- **Målgrupp:** Svenskar 40–70 år med hälso- och longevity-intresse
- **Kritiskt krav:** GDPR-compliance genomgår varje del av produkten

---

## Tech Stack

| Lager | Teknologi |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS (ev. Alpine.js) |
| Backend | Node.js 20 LTS + Express 4 |
| Databas | SQLite (via better-sqlite3) |
| Email | MailerLite API v2 |
| Webbserver | Nginx (reverse proxy) |
| Process | systemd service |
| CI/CD | GitHub webhook → auto-deploy script |

---

## Projektstruktur

```
gladje/
├── CLAUDE.md               # Denna fil
├── PROJECT_PLAN.md         # Detaljerad projektplan
├── package.json
├── .env.example            # Miljövariabel-mall (aldrig committa .env!)
├── src/                    # Frontend-kod
│   ├── index.html          # Landningssida
│   ├── quiz.html           # Quiz-sida
│   ├── result.html         # Resultatsida
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── quiz.js         # Quiz-logik
│       └── optin.js        # Email opt-in-formulär
├── server/                 # Backend
│   ├── index.js            # Entry point
│   ├── routes/
│   │   ├── quiz.js         # Quiz API endpoints
│   │   └── subscribe.js    # MailerLite subscription endpoint
│   ├── db/
│   │   ├── schema.sql      # Databasschema
│   │   └── db.js           # SQLite-wrapper
│   └── middleware/
│       ├── gdpr.js         # GDPR-consent-hantering
│       └── ratelimit.js    # Rate limiting
├── research/               # QA-research och longevity-innehåll
├── test/                   # Automatiserade tester
├── docs/                   # Projektdokumentation
│   ├── seo-strategy.md
│   ├── email-marketing.md
│   └── gdpr-compliance.md
└── deploy/                 # Deployment-scripts
    ├── deploy.sh
    ├── nginx.conf
    └── gladje.service      # systemd service-fil
```

---

## Komma igång — Lokal Utveckling

### Förutsättningar

- Node.js 20 LTS
- npm 9+
- SQLite3

### Installation

```bash
git clone <repo-url>
cd gladje
npm install
cp .env.example .env
# Fyll i .env med dina API-nycklar
```

### Miljövariabler (`.env`)

```env
NODE_ENV=development
PORT=3000
MAILERLITE_API_KEY=your_key_here
MAILERLITE_GROUP_ID=your_group_id
DB_PATH=./data/gladje.db
WEBHOOK_SECRET=your_webhook_secret
SESSION_SECRET=your_session_secret
```

### Starta dev-server

```bash
npm run dev        # Startar med nodemon
npm start          # Produktion
npm test           # Kör tester
```

Backend exponeras på `http://localhost:3000`.
Frontend serveras som statiska filer via Express (dev) eller Nginx (prod).

---

## API-endpoints

| Method | Path | Beskrivning |
|--------|------|-------------|
| `GET` | `/api/quiz/questions` | Hämta alla quiz-frågor |
| `POST` | `/api/quiz/submit` | Skicka in svar, spara anonymt i DB |
| `POST` | `/api/subscribe` | Email opt-in + skicka resultat via MailerLite |
| `GET` | `/api/health` | Hälsokontroll |

### `POST /api/subscribe` — Payload

```json
{
  "email": "user@example.com",
  "quizSessionId": "uuid-v4",
  "consentGiven": true,
  "consentTimestamp": "2026-06-04T10:00:00Z",
  "consentText": "Jag godkänner att Glädje & Harmoni lagrar min e-post..."
}
```

---

## Databas — Schema (SQLite)

```sql
-- Quiz-sessioner (anonyma)
CREATE TABLE quiz_sessions (
  id TEXT PRIMARY KEY,           -- UUID v4
  answers TEXT NOT NULL,         -- JSON
  score INTEGER,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_hash TEXT                   -- SHA-256 av IP, inte rå IP
);

-- Email opt-ins
CREATE TABLE subscribers (
  id TEXT PRIMARY KEY,
  email_hash TEXT UNIQUE NOT NULL, -- SHA-256, inte rå email (rå email i MailerLite)
  quiz_session_id TEXT,
  consent_text TEXT NOT NULL,
  consent_timestamp DATETIME NOT NULL,
  mailerlite_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME             -- Soft delete för rätten att bli glömd
);
```

---

## Deployment

Se `deploy/deploy.sh` och `docs/gdpr-compliance.md` för detaljer.

### Snabbstart (server)

```bash
# Nginx konfig
sudo cp deploy/nginx.conf /etc/nginx/sites-available/gladje
sudo ln -s /etc/nginx/sites-available/gladje /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# systemd service
sudo cp deploy/gladje.service /etc/systemd/system/
sudo systemctl enable gladje
sudo systemctl start gladje
```

### Auto-deploy via GitHub Webhook

Webhook-endpointen `/api/deploy` lyssnar på push till `main`-branchen och kör `deploy/deploy.sh`.

---

## GDPR-nyckelprinciper

1. **Explicit consent** — opt-in-kryssrutan är obligatorisk och pre-unchecked
2. **Minimalt datainsamling** — quiz-svar lagras anonymt (ingen koppling till email)
3. **Rätten att bli glömd** — soft delete + MailerLite-avregistrering
4. **Dataportabilitet** — användare kan begära export av sina data

Se `docs/gdpr-compliance.md` för fullständig implementation.

---

## Kodkonventioner

- **JavaScript:** ES2022+, async/await genomgående
- **Felhantering:** Alla API-routes wrappar i try/catch, returnerar strukturerade fel
- **Logging:** Använd `console.error` (prod: strukturerad JSON-loggning)
- **Säkerhet:** Helmet.js, CORS, rate limiting på alla publika endpoints
- **Tester:** Jest + Supertest för API-tester

---

## Nyckelkontakter & Resurser

- MailerLite API docs: https://developers.mailerlite.com/
- GDPR-riktlinjer: https://www.imy.se/ (Integritetsskyddsmyndigheten)
- Longevity-research: Se `research/`-mappen
