# Testplan: Glädje & Harmoni
**Version:** 1.0  
**Datum:** 2026-06-04  
**QA-ansvarig:** TBD  
**Status:** Under utveckling - fylls i löpande

---

## Översikt

Detta dokument täcker komplett QA-testplan för Glädje & Harmoni – ett svenskt longevity-verktyg med quiz, lead-capture och email-automation. Testplanen är strukturerad med checklistor och PASS/FAIL-kolumner.

**Teststatus-legend:**
- `[ ]` = Ej testad
- `[P]` = PASS
- `[F]` = FAIL
- `[N/A]` = Ej tillämpbar

---

## 1. Frontend HTML/CSS/JS

### 1.1 Generell HTML-struktur

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 1.1.1 | HTML5 doctype deklarerad | `<!DOCTYPE html>` finns på rad 1 | `[ ]` | |
| 1.1.2 | Korrekt `lang`-attribut | `lang="sv"` på html-elementet | `[ ]` | |
| 1.1.3 | Meta charset | `<meta charset="UTF-8">` finns | `[ ]` | |
| 1.1.4 | Viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1">` | `[ ]` | |
| 1.1.5 | Title-tag | Meningsfull, unik titel per sida | `[ ]` | |
| 1.1.6 | Favicon | favicon.ico eller png finns och laddas | `[ ]` | |
| 1.1.7 | W3C HTML-validering | Inga kritiska valideringsfel | `[ ]` | Kör via validator.w3.org |

### 1.2 API Endpoint-konfiguration (Frontend)

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 1.2.1 | Quiz submit endpoint | POST `/api/quiz/submit` används korrekt | `[ ]` | |
| 1.2.2 | Lead capture endpoint | POST `/api/leads` eller `/api/subscribe` | `[ ]` | |
| 1.2.3 | Ingen hårdkodad localhost | Inga `localhost:3000` i produktionskod | `[ ]` | |
| 1.2.4 | HTTPS i produktion | Alla API-anrop går via HTTPS | `[ ]` | |
| 1.2.5 | Felhantering i fetch/axios | `try/catch` eller `.catch()` på alla API-anrop | `[ ]` | |
| 1.2.6 | Loading state | Laddningsindikator visas under API-anrop | `[ ]` | |
| 1.2.7 | Success-feedback | Tydligt meddelande när formulär skickats | `[ ]` | |
| 1.2.8 | Error-feedback | Tydligt felmeddelande vid API-fel | `[ ]` | |

### 1.3 Formulärvalidering (Frontend)

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 1.3.1 | E-postvalidering | Ogiltigt format blockeras (saknar @, domän etc.) | `[ ]` | |
| 1.3.2 | Tom e-post blockeras | Submit inte möjlig med tom e-postfält | `[ ]` | |
| 1.3.3 | Namnvalidering | Tomt namn ger felmeddelande | `[ ]` | |
| 1.3.4 | GDPR-consent krävs | Submit blockerad om consent ej ikryssad | `[ ]` | |
| 1.3.5 | Quiz-completion check | Alla frågor besvarade innan submit | `[ ]` | |
| 1.3.6 | Felmeddelanden på svenska | Alla valideringsmeddelanden på svenska | `[ ]` | |
| 1.3.7 | Inline-validering | Validering sker vid blur eller input, inte bara submit | `[ ]` | |
| 1.3.8 | Dubbel-submit förhindras | Submit-knapp inaktiveras vid pending request | `[ ]` | |

### 1.4 Responsivitet

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 1.4.1 | Mobil (320px) | Layout fungerar på 320px bredd | `[ ]` | iPhone SE |
| 1.4.2 | Mobil (375px) | Layout fungerar på 375px bredd | `[ ]` | iPhone standard |
| 1.4.3 | Tablet (768px) | Layout fungerar på 768px bredd | `[ ]` | iPad |
| 1.4.4 | Desktop (1024px) | Layout fungerar på 1024px bredd | `[ ]` | |
| 1.4.5 | Desktop (1440px) | Layout fungerar på 1440px bredd | `[ ]` | |
| 1.4.6 | Touch-targets | Klickbara element minst 44x44px | `[ ]` | WCAG 2.5.5 |
| 1.4.7 | Quiz-navigation mobil | Nästa/Föregående fungerar på touch | `[ ]` | |
| 1.4.8 | Formulär mobil | Input-fält lätta att fylla i på mobil | `[ ]` | |
| 1.4.9 | Inga horisontella scrollbars | På ingen skärmstorlek | `[ ]` | |

### 1.5 CSS

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 1.5.1 | CSS validering | Inga kritiska CSS-fel | `[ ]` | |
| 1.5.2 | Typsnitt laddas | Google Fonts eller system fonts laddas | `[ ]` | |
| 1.5.3 | Färgkontrast | WCAG AA-nivå (4.5:1 för text) | `[ ]` | |
| 1.5.4 | Focus-states | Synliga focus-indikatorer på alla interaktiva element | `[ ]` | |
| 1.5.5 | Dark mode | Fungerar korrekt om implementerat | `[ ]` | N/A om ej implementerat |

### 1.6 JavaScript

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 1.6.1 | Inga console.error i produktion | Browser console ren | `[ ]` | |
| 1.6.2 | Inga undefined variables | Inga ReferenceError | `[ ]` | |
| 1.6.3 | Quiz state management | Quiz-svar sparas korrekt i minnet | `[ ]` | |
| 1.6.4 | Progress tracking | Quiz-framsteg visas korrekt | `[ ]` | |
| 1.6.5 | Poängberäkning frontend | Korrekt summering av poäng | `[ ]` | |
| 1.6.6 | Resultatvisning | Rätt kategori visas baserat på poäng | `[ ]` | |

---

## 2. Backend API Endpoints

### 2.1 Generell API-konfiguration

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 2.1.1 | Server startar | `node server.js` eller `npm start` utan fel | `[ ]` | |
| 2.1.2 | Port konfigureras | PORT från env-variabel, default 3000 | `[ ]` | |
| 2.1.3 | Health check endpoint | GET `/api/health` returnerar 200 | `[ ]` | |
| 2.1.4 | JSON parsing | `express.json()` middleware aktiv | `[ ]` | |
| 2.1.5 | Rate limiting | Max requests per IP implementerat | `[ ]` | |
| 2.1.6 | Helmet.js eller säkerhetshuvuden | X-Frame-Options, CSP etc. satta | `[ ]` | |

### 2.2 CORS

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 2.2.1 | CORS konfigurerad | `cors` middleware finns | `[ ]` | |
| 2.2.2 | Whitelist av origins | Ej `*` i produktion | `[ ]` | |
| 2.2.3 | Preflight OPTIONS | OPTIONS-request returnerar 200 | `[ ]` | |
| 2.2.4 | Tillåtna metoder | POST, GET, OPTIONS explicit listade | `[ ]` | |
| 2.2.5 | Tillåtna headers | Content-Type, Authorization listade | `[ ]` | |

### 2.3 Quiz API Endpoints

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 2.3.1 | POST /api/quiz/submit | Returnerar 200 med quiz-resultat | `[ ]` | |
| 2.3.2 | Validering av svar | Returnerar 400 om svar saknas | `[ ]` | |
| 2.3.3 | Poängberäkning backend | Korrekt poäng returneras | `[ ]` | |
| 2.3.4 | Resultatkategori | Korrekt kategori returneras | `[ ]` | |
| 2.3.5 | Ogiltiga svar-ID | 400/422 vid ogiltig fråge-ID | `[ ]` | |
| 2.3.6 | Stora payload blockeras | Max payload-storlek satt | `[ ]` | |

### 2.4 Lead Capture / Subscription Endpoints

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 2.4.1 | POST /api/subscribe | Returnerar 201 vid lyckad registrering | `[ ]` | |
| 2.4.2 | Duplicate email | Returnerar 409 eller 200 med meddelande | `[ ]` | |
| 2.4.3 | Ogiltig email | Returnerar 400 med felmeddelande | `[ ]` | |
| 2.4.4 | Saknat namn | Returnerar 400 med felmeddelande | `[ ]` | |
| 2.4.5 | Saknat GDPR-consent | Returnerar 400 | `[ ]` | |
| 2.4.6 | SQL-injection skydd | Parameteriserade queries används | `[ ]` | |
| 2.4.7 | XSS-skydd | Input saniteras | `[ ]` | |

### 2.5 Felhantering

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 2.5.1 | 404 handler | Okänd route returnerar 404 JSON | `[ ]` | |
| 2.5.2 | 500 handler | Interna fel returnerar 500 utan stack trace | `[ ]` | |
| 2.5.3 | Inga stack traces i produktion | `NODE_ENV=production` gömmer detaljer | `[ ]` | |
| 2.5.4 | Loggning | Fel loggas till fil eller service | `[ ]` | |
| 2.5.5 | Timeout-hantering | API-anrop till MailerLite har timeout | `[ ]` | |

---

## 3. MailerLite Integration

### 3.1 Konfiguration

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 3.1.1 | API-nyckel i .env | `MAILERLITE_API_KEY` satt | `[ ]` | |
| 3.1.2 | API-nyckel ej i källkod | Inget hårdkodat API-nyckel | `[ ]` | |
| 3.1.3 | Grupp-ID konfigurerat | `MAILERLITE_GROUP_ID` eller liknande satt | `[ ]` | |
| 3.1.4 | API v2 används | MailerLite API v2 endpoint | `[ ]` | |

### 3.2 Opt-in Flow

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 3.2.1 | Subscriber skapas | Ny subscriber läggs till i MailerLite | `[ ]` | |
| 3.2.2 | Rätt grupp | Subscriber hamnar i korrekt grupp | `[ ]` | |
| 3.2.3 | Quiz-resultat sparas | Score och kategori sparas som custom fields | `[ ]` | |
| 3.2.4 | Datum sparas | `signup_date` eller liknande fält satt | `[ ]` | |
| 3.2.5 | Källa sparas | `source=quiz` eller liknande | `[ ]` | |

### 3.3 Double Opt-in

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 3.3.1 | Double opt-in aktiverat | Konfigurerat i MailerLite-inställningar | `[ ]` | |
| 3.3.2 | Bekräftelsemejl skickas | Användaren får bekräftelsemejl | `[ ]` | |
| 3.3.3 | Bekräftelselänk fungerar | Klick bekräftar subscription | `[ ]` | |
| 3.3.4 | Bekräftelselänk på svenska | Mejltexten är på svenska | `[ ]` | |
| 3.3.5 | Obekräftad subscriber | Ej bekräftad subscriber får inte välkomstmejl | `[ ]` | |
| 3.3.6 | Fel vid bekräftelse | Lämplig felhantering om länken utgått | `[ ]` | |

### 3.4 API Error Handling

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 3.4.1 | MailerLite API nere | Graceful fallback, leads sparas lokalt | `[ ]` | |
| 3.4.2 | Ogiltig API-nyckel | 401-fel hanteras | `[ ]` | |
| 3.4.3 | Rate limit MailerLite | 429-fel hanteras med retry | `[ ]` | |
| 3.4.4 | Timeout | Request timeout hanteras | `[ ]` | |

---

## 4. GDPR Compliance

### 4.1 Consent

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 4.1.1 | Explicit consent | Checkbox, ej förkryssad | `[ ]` | |
| 4.1.2 | Tydlig consent-text | Vad användaren godkänner är klart | `[ ]` | |
| 4.1.3 | Länk till integritetspolicy | Klickbar länk i consent-text | `[ ]` | |
| 4.1.4 | Integritetspolicy finns | `/privacy` eller `/integritetspolicy` | `[ ]` | |
| 4.1.5 | Consent sparas | Datum/tid för consent loggas | `[ ]` | |
| 4.1.6 | Consent-version sparas | Vilken version av policy godkändes | `[ ]` | |

### 4.2 Dataskydd

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 4.2.1 | HTTPS i produktion | Ingen okrypterad data-överföring | `[ ]` | |
| 4.2.2 | Persondata minimering | Bara nödvändig data samlas in | `[ ]` | |
| 4.2.3 | Lösenord hashas | Ej relevant om inget login, annars bcrypt | `[ ]` | N/A |
| 4.2.4 | Databas-backup krypterad | Backuper krypterade | `[ ]` | |
| 4.2.5 | .env ej i versionshantering | `.env` finns i `.gitignore` | `[ ]` | |

### 4.3 Användarrättigheter

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 4.3.1 | Rätt att bli glömd | Process för att radera användardata finns | `[ ]` | |
| 4.3.2 | Rätt till datauttag | Process för att exportera data finns | `[ ]` | |
| 4.3.3 | Avregistrering | Unsubscribe-länk i alla mejl | `[ ]` | |
| 4.3.4 | Kontaktuppgifter | Dataskyddsansvarig/kontakt i policy | `[ ]` | |

### 4.4 Cookie-hantering

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 4.4.1 | Cookie-banner | Visas vid första besök | `[ ]` | |
| 4.4.2 | Nödvändiga cookies | Definierade och förklarade | `[ ]` | |
| 4.4.3 | Analytiska cookies | Kräver explicit consent | `[ ]` | |
| 4.4.4 | Cookie-policy | Dokumenterad och lättåtkomlig | `[ ]` | |
| 4.4.5 | Consent sparas | Cookie-consent sparas i localStorage/cookie | `[ ]` | |
| 4.4.6 | Inga tracking cookies utan consent | GA/FB-pixel aktiveras ej utan godkännande | `[ ]` | |

---

## 5. Quiz-funktionalitet

### 5.1 Frågevisning

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 5.1.1 | Alla 15-20 frågor visas | Komplett frågeserie | `[ ]` | |
| 5.1.2 | En fråga i taget | Tydlig single-question UX | `[ ]` | |
| 5.1.3 | Frågenummer visas | "Fråga 3 av 15" eller progress bar | `[ ]` | |
| 5.1.4 | Frågetext tydlig | Läsbar text, tillräcklig textstorlek | `[ ]` | |
| 5.1.5 | Svarsalternativ A-D | Fyra alternativ per fråga | `[ ]` | |
| 5.1.6 | Svarsalternativ klickbara | Touch/click fungerar på alla | `[ ]` | |
| 5.1.7 | Valt svar markeras | Visuell markering av valt svar | `[ ]` | |

### 5.2 Navigation

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 5.2.1 | Nästa-knapp | Fungerar, kräver svar | `[ ]` | |
| 5.2.2 | Föregående-knapp | Fungerar, visar tidigare svar | `[ ]` | |
| 5.2.3 | Tidigare svar bevaras | Går tillbaka, ändrar svar, fortsätter | `[ ]` | |
| 5.2.4 | Första fråga: ingen "Föregående" | Knappen dold eller inaktiv | `[ ]` | |
| 5.2.5 | Sista fråga: "Skicka" visas | Submit-knapp på sista frågan | `[ ]` | |

### 5.3 Poängberäkning

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 5.3.1 | A = 3 poäng | Bästa svaret ger maxpoäng | `[ ]` | Kontrollera mot quiz-spec |
| 5.3.2 | D = 0 poäng | Sämsta svaret ger 0 poäng | `[ ]` | |
| 5.3.3 | Maxpoäng (15 frågor × 3 = 45) | Alla A ger 45 poäng | `[ ]` | |
| 5.3.4 | Minpoäng (0) | Alla D ger 0 poäng | `[ ]` | |
| 5.3.5 | Procentberäkning | `(poäng / maxPoäng) * 100` | `[ ]` | |
| 5.3.6 | Optimerare: 80-100% | Rätt kategori vid hög poäng | `[ ]` | |
| 5.3.7 | God grund: 60-79% | Rätt kategori | `[ ]` | |
| 5.3.8 | Förbättringspotential: 40-59% | Rätt kategori | `[ ]` | |
| 5.3.9 | Börja nu: 0-39% | Rätt kategori | `[ ]` | |
| 5.3.10 | Gränsvärden | Exakt 80% = Optimerare, 79% = God grund | `[ ]` | |

### 5.4 Resultatvisning

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 5.4.1 | Resultatsida visas | Efter submit visas resultat | `[ ]` | |
| 5.4.2 | Poäng visas | Numerisk poäng eller procent | `[ ]` | |
| 5.4.3 | Kategori visas | Tydlig kategoribeteckning | `[ ]` | |
| 5.4.4 | Rekommendationer visas | Minst 3 personliga tips | `[ ]` | |
| 5.4.5 | Email opt-in formulär | Presenteras på resultatsidan | `[ ]` | |
| 5.4.6 | Dela-funktion | Social sharing om implementerat | `[ ]` | N/A |

---

## 6. Email Delivery Flow

### 6.1 Resultatmejl

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 6.1.1 | Resultatmejl skickas | Mejl levereras inom 5 min | `[ ]` | |
| 6.1.2 | Avsändare korrekt | Från-adress är varumärkesrelaterad | `[ ]` | |
| 6.1.3 | Ämnesrad relevant | Innehåller resultat/kategori | `[ ]` | |
| 6.1.4 | Personalisering | Namn och quiz-resultat i mejlet | `[ ]` | |
| 6.1.5 | Rekommendationer inkluderade | Baserade på quiz-kategori | `[ ]` | |
| 6.1.6 | Unsubscribe-länk | GDPR-krav, måste finnas | `[ ]` | |
| 6.1.7 | Mobilanpassat mejl | Renderas korrekt i mobil | `[ ]` | |
| 6.1.8 | Plain text version | Fallback för mejlklienter | `[ ]` | |

### 6.2 Välkomstmejl / Automation

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 6.2.1 | Välkomstmejl triggas | Skickas efter bekräftad opt-in | `[ ]` | |
| 6.2.2 | Timing korrekt | Skickas inom rimlig tid | `[ ]` | |
| 6.2.3 | Uppföljningsmejl | Email-serie fungerar korrekt | `[ ]` | |
| 6.2.4 | Segmentering fungerar | Rätt segment baserat på quiz-resultat | `[ ]` | |
| 6.2.5 | SPF/DKIM/DMARC | Konfigurerat för att undvika spam | `[ ]` | |

### 6.3 Leveransbarhet

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 6.3.1 | Spam-test | Mail-tester.com: score > 8/10 | `[ ]` | |
| 6.3.2 | Inte i spam-mapp | Testat med Gmail, Outlook | `[ ]` | |
| 6.3.3 | HTML validering | Mejl-HTML validerar | `[ ]` | |

---

## 7. Databas-integritet

### 7.1 Schema och struktur

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 7.1.1 | Leads-tabell finns | `leads` eller `subscribers` tabell | `[ ]` | |
| 7.1.2 | Fält: email | Unik, NOT NULL | `[ ]` | |
| 7.1.3 | Fält: namn | NOT NULL | `[ ]` | |
| 7.1.4 | Fält: quiz_score | INTEGER | `[ ]` | |
| 7.1.5 | Fält: quiz_category | TEXT | `[ ]` | |
| 7.1.6 | Fält: gdpr_consent | BOOLEAN, NOT NULL | `[ ]` | |
| 7.1.7 | Fält: consent_date | TIMESTAMP | `[ ]` | |
| 7.1.8 | Fält: created_at | TIMESTAMP, DEFAULT NOW | `[ ]` | |
| 7.1.9 | Primary key | Auto-increment ID | `[ ]` | |

### 7.2 Dataintegritet

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 7.2.1 | Unik email constraint | Dublettar blockeras på DB-nivå | `[ ]` | |
| 7.2.2 | NOT NULL constraints | Viktiga fält kräver värde | `[ ]` | |
| 7.2.3 | Transaktioner | Kritiska operationer i transaktioner | `[ ]` | |
| 7.2.4 | Data sparas korrekt | Testad med faktisk insert + verify | `[ ]` | |
| 7.2.5 | SQLite WAL mode | Write-Ahead Logging aktiverat | `[ ]` | |
| 7.2.6 | Databas-backup | Daglig backup konfigurerad | `[ ]` | |

### 7.3 Migrations och Schema

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 7.3.1 | Schema-fil finns | `schema.sql` eller migrations | `[ ]` | |
| 7.3.2 | Initiering fungerar | Databas skapas från scratch | `[ ]` | |
| 7.3.3 | Seed-data | Testdata kan laddas in | `[ ]` | |

---

## 8. Deployment

### 8.1 Nginx-konfiguration

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 8.1.1 | Nginx konfiguration finns | `/etc/nginx/sites-available/gladje` | `[ ]` | |
| 8.1.2 | SSL/HTTPS konfigurerat | Let's Encrypt certifikat | `[ ]` | |
| 8.1.3 | HTTP → HTTPS redirect | port 80 redirectar till 443 | `[ ]` | |
| 8.1.4 | Gzip komprimering | `gzip on` för text/css/js | `[ ]` | |
| 8.1.5 | Statiska filer serveras | Nginx serverar /public direkt | `[ ]` | |
| 8.1.6 | API proxy | `/api/` proxyas till Node.js | `[ ]` | |
| 8.1.7 | Security headers | X-Frame-Options, HSTS etc. | `[ ]` | |
| 8.1.8 | Rate limiting Nginx | `limit_req_zone` konfigurerat | `[ ]` | |

### 8.2 Process Manager (PM2)

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 8.2.1 | PM2 konfigurerad | `ecosystem.config.js` finns | `[ ]` | |
| 8.2.2 | Auto-restart | App startar om vid krasch | `[ ]` | |
| 8.2.3 | Startup script | PM2 startar vid server-omstart | `[ ]` | |
| 8.2.4 | Loggning | PM2 loggar till fil | `[ ]` | |
| 8.2.5 | Minne-limit | `max_memory_restart` satt | `[ ]` | |

### 8.3 Miljövariabler

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 8.3.1 | .env.example finns | Dokumenterar krävda variabler | `[ ]` | |
| 8.3.2 | NODE_ENV=production | Korrekt miljö-flagga | `[ ]` | |
| 8.3.3 | DATABASE_PATH | Korrekt sökväg till SQLite-fil | `[ ]` | |
| 8.3.4 | MAILERLITE_API_KEY | Giltig API-nyckel satt | `[ ]` | |
| 8.3.5 | PORT | Konfigurerat eller default 3000 | `[ ]` | |

---

## 9. SEO

### 9.1 Meta Tags

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 9.1.1 | Title tag | Unik, 50-60 tecken | `[ ]` | |
| 9.1.2 | Meta description | 150-160 tecken, inkl. nyckelord | `[ ]` | |
| 9.1.3 | Open Graph title | `og:title` finns | `[ ]` | |
| 9.1.4 | Open Graph description | `og:description` finns | `[ ]` | |
| 9.1.5 | Open Graph image | `og:image` finns och är rätt storlek (1200x630) | `[ ]` | |
| 9.1.6 | Twitter Card | `twitter:card` meta finns | `[ ]` | |
| 9.1.7 | Canonical URL | `rel="canonical"` på alla sidor | `[ ]` | |
| 9.1.8 | Robots meta | Korrekt index/noindex per sida | `[ ]` | |
| 9.1.9 | Structured data | JSON-LD för organisation eller FAQ | `[ ]` | |
| 9.1.10 | Hreflang | Om flerspråkig, annars N/A | `[ ]` | N/A |

### 9.2 Teknisk SEO

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 9.2.1 | sitemap.xml | Finns och är korrekt | `[ ]` | |
| 9.2.2 | sitemap i robots.txt | `Sitemap:` referens i robots.txt | `[ ]` | |
| 9.2.3 | robots.txt | Finns, inga viktiga sidor blockerade | `[ ]` | |
| 9.2.4 | Alt-text på bilder | Alla bilder har meningsfull alt-text | `[ ]` | |
| 9.2.5 | Heading-hierarki | Korrekt H1 > H2 > H3 struktur | `[ ]` | |
| 9.2.6 | URL-struktur | Läsbara, svenska eller engelska URLs | `[ ]` | |
| 9.2.7 | Intern länkning | Logisk länkstruktur | `[ ]` | |
| 9.2.8 | HTTPS | Korrekt för SEO (redan täckt i 8.1) | `[ ]` | |

### 9.3 Lokalt SEO (Sverige)

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 9.3.1 | Språk-attribut | `lang="sv"` på html | `[ ]` | |
| 9.3.2 | Lokala nyckelord | "Sverige", "svensk" i meta | `[ ]` | |
| 9.3.3 | Google Search Console | Verifierad och konfigurerad | `[ ]` | |

---

## 10. Performance

### 10.1 Laddningstider

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 10.1.1 | Time to First Byte (TTFB) | < 200ms | `[ ]` | |
| 10.1.2 | First Contentful Paint (FCP) | < 1.8s | `[ ]` | |
| 10.1.3 | Largest Contentful Paint (LCP) | < 2.5s (God), < 4s (Behöver förbättras) | `[ ]` | |
| 10.1.4 | Total Blocking Time (TBT) | < 200ms | `[ ]` | |
| 10.1.5 | Cumulative Layout Shift (CLS) | < 0.1 | `[ ]` | |
| 10.1.6 | Time to Interactive (TTI) | < 3.8s | `[ ]` | |

### 10.2 Lighthouse Score

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 10.2.1 | Performance | ≥ 80 | `[ ]` | |
| 10.2.2 | Accessibility | ≥ 90 | `[ ]` | |
| 10.2.3 | Best Practices | ≥ 90 | `[ ]` | |
| 10.2.4 | SEO | ≥ 90 | `[ ]` | |
| 10.2.5 | Mobil performance | ≥ 70 | `[ ]` | |

### 10.3 Tillgångar och optimering

| # | Testfall | Krav | Status | Kommentar |
|---|----------|------|--------|-----------|
| 10.3.1 | Bilder optimerade | WebP format, rätt storlek | `[ ]` | |
| 10.3.2 | CSS minifierat | Produktions-CSS är minifierat | `[ ]` | |
| 10.3.3 | JS minifierat | Produktions-JS är minifierat | `[ ]` | |
| 10.3.4 | Browser caching | Cache-Control headers satta | `[ ]` | |
| 10.3.5 | Gzip aktiverat | Nginx gzip (täckt i 8.1.4) | `[ ]` | |
| 10.3.6 | Inga oanvända JS-bibliotek | Bundle-storlek rimlig | `[ ]` | |
| 10.3.7 | Font-laddning optimerad | `font-display: swap` | `[ ]` | |

---

## Testmiljöer

| Miljö | URL | Syfte |
|-------|-----|-------|
| Lokal | http://localhost:3000 | Utveckling och snabbtester |
| Staging | TBD | Pre-production tester |
| Produktion | TBD | Slutgiltiga smoke tests |

## Verktyg att använda

- **HTML/CSS-validering:** validator.w3.org
- **Lighthouse:** Chrome DevTools eller `lighthouse` CLI
- **SEO-analys:** Google Search Console, Screaming Frog
- **API-tester:** curl, Postman, eller Insomnia
- **Spam-test:** mail-tester.com, MXToolbox
- **Responsivitet:** Chrome DevTools Device Mode, BrowserStack
- **GDPR:** iubenda.com/en/gdpr-audit

---

*Testplan skapad: 2026-06-04. Uppdateras löpande när frontend och backend byggs.*
