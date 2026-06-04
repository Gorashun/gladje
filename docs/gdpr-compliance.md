# GDPR-compliance — Glädje & Harmoni

> Dataskydd, opt-in implementation, cookie policy och rättighetshantering

---

## 1. Översikt och Rättslig Ram

### Tillämplig lagstiftning

| Lag/Förordning | Relevans |
|----------------|----------|
| GDPR (EU 2016/679) | Primär — all personuppgiftsbehandling |
| Dataskyddslagen (SFS 2018:218) | Kompletterande svensk lagstiftning |
| ECOM-lagen (Lag om elektronisk kommunikation) | Cookie-samtycke |
| Marknadsföringslagen | Email-marknadsföring |
| IMY:s riktlinjer | Praktisk vägledning (imy.se) |

### Personuppgiftsansvarig

**Glädje & Harmoni**
- Kontakt: dataskydd@gladjeharmoni.se
- Adress: [Fysisk adress vid lansering]
- Registreringsnummer: [Org.nr vid lansering]

### Personuppgiftsbiträden

| Biträde | Syfte | DPA-status |
|---------|-------|------------|
| MailerLite | Email-marknadsföring | DPA krävs — signeras vid kontoupplägg |
| Hosting-leverantör | Server-hosting | DPA krävs |
| GitHub | Kodhantering (ingen användardata) | Ej nödvändigt |

---

## 2. Dataflöden och Rättsliga Grunder

### Kartläggning av all personuppgiftsbehandling

| Behandling | Personuppgifter | Rättslig grund (Art.) | Lagringstid | Ort |
|------------|----------------|----------------------|-------------|-----|
| Quiz-svar (anonymt) | Inga personuppgifter* | — | 12 månader | Sverige/EU |
| IP-hash (sessionslogg) | Pseudonymiserad IP | Art. 6.1.f (Berättigat intresse) | 90 dagar | Sverige/EU |
| Email opt-in | Email, quiz-profil, samtycketidsstämpel | Art. 6.1.a (Samtycke) | Tills avregistrering + 30 dagar | EU (MailerLite) |
| Consent-logg (lokalt) | Email-hash (SHA-256), samtycketext, tidsstämpel | Art. 6.1.c (Rättslig skyldighet) | 3 år | Sverige |
| Server-loggar | IP-adress, User-Agent, tidsstämpel | Art. 6.1.f (Berättigat intresse) | 30 dagar | Sverige |

*Quiz-svar anses ej vara personuppgifter när de lagras utan koppling till identifierbar person.

### Berättigat intresse — Bedömning (Art. 6.1.f)

För IP-hash och server-loggar används berättigat intresse. Bedömning:
- **Syfte:** Teknisk säkerhet, missbruksskydd, felsökning
- **Nödvändighet:** Inga alternativa metoder ger samma säkerhetsnivå
- **Balanstest:** Begränsad intrång (pseudonymisering), klar nytta för säkerheten
- **Slutsats:** Berättigat intresse är tillämpligt med ovanstående skyddsåtgärder

---

## 3. Opt-in Implementation

### Krav på giltigt samtycke (Art. 7 GDPR)

Samtycke är **giltigt** om och endast om:
1. ✅ Det ges frivilligt (ej villkor för att ta quizet)
2. ✅ Det är specifikt (angivit exakt vad man samtycker till)
3. ✅ Det är informerat (länk till integritetspolicy)
4. ✅ Det är otvetydigt (aktiv handling — kryssruta, ej pre-checkad)
5. ✅ Det kan återkallas lika enkelt som det gavs (unsubscribe-länk)

### HTML-implementation — Opt-in-formulär

```html
<form id="optin-form" action="/api/subscribe" method="POST">
  <!-- Hidden fields -->
  <input type="hidden" name="quizSessionId" id="quizSessionId">
  <input type="hidden" name="consentVersion" value="v1.0-2026-06">
  
  <!-- Email-fält -->
  <div class="form-group">
    <label for="email">Din e-postadress</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required
      placeholder="din@email.se"
      autocomplete="email"
    >
  </div>

  <!-- GDPR-samtycke — ALDRIG pre-checkad -->
  <div class="consent-group">
    <input 
      type="checkbox" 
      id="consent" 
      name="consentGiven" 
      value="true"
      required
      <!-- ALDRIG: checked, ALDRIG: value="true" som default -->
    >
    <label for="consent">
      Jag godkänner att Glädje & Harmoni lagrar och behandlar min 
      e-postadress för att skicka mitt quiz-resultat och relaterade 
      longevity-tips. Jag kan avregistrera mig när som helst.
      <a href="/integritetspolicy/" target="_blank">Läs vår integritetspolicy</a>.
    </label>
  </div>

  <!-- Tydlig beskrivning av vad de får -->
  <p class="consent-description">
    Vi skickar: (1) Ditt personliga quiz-resultat direkt, 
    (2) En 4-veckors serie med longevity-tips anpassade för din profil, 
    (3) Vårt nyhetsbrev ca 2 gånger/månad. Ingen spam, inga tredjepartsdelningar.
  </p>

  <button type="submit">Skicka mitt resultat till min inbox →</button>
</form>
```

### Backend — Consent-loggning

```javascript
// server/services/consent.js
const { hashData } = require('./crypto');

async function logConsent(db, { email, quizSessionId, consentVersion, ip }) {
  const consentRecord = {
    id: generateUUID(),
    email_hash: hashData(email),          // SHA-256, ej rå email
    quiz_session_id: quizSessionId,
    consent_text: getConsentTextByVersion(consentVersion),
    consent_version: consentVersion,
    consent_timestamp: new Date().toISOString(),
    ip_hash: hashData(ip),               // SHA-256, ej rå IP
    user_agent: null,                    // Lagra ej user agent (onödig data)
  };

  // Lagra lokalt (GDPR-bevis)
  db.prepare(`
    INSERT INTO consent_log (id, email_hash, quiz_session_id, 
      consent_text, consent_version, consent_timestamp, ip_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    consentRecord.id,
    consentRecord.email_hash,
    consentRecord.quiz_session_id,
    consentRecord.consent_text,
    consentRecord.consent_version,
    consentRecord.consent_timestamp,
    consentRecord.ip_hash
  );

  return consentRecord;
}

// Consent-texter per version — versionera alltid
const CONSENT_TEXTS = {
  'v1.0-2026-06': `Jag godkänner att Glädje & Harmoni (org.nr XXX) lagrar och 
    behandlar min e-postadress för att (1) skicka mitt quiz-resultat, 
    (2) en 4-veckors longevity-serie, och (3) löpande nyhetsbrev om longevity. 
    Min data delas aldrig med tredje part för marknadsföring. 
    Jag kan avregistrera mig när som helst via länken i varje email. 
    Behandlingen baseras på mitt frivilliga samtycke (GDPR Art. 6.1.a). 
    Integritetspolicy: https://gladjeharmoni.se/integritetspolicy/`
};
```

### Databas — Consent-tabell

```sql
-- Consent-logg (GDPR-bevis — spara i 3 år)
CREATE TABLE consent_log (
  id TEXT PRIMARY KEY,
  email_hash TEXT NOT NULL,           -- SHA-256(email) — ej rå email
  quiz_session_id TEXT,
  consent_text TEXT NOT NULL,         -- Exakt text vid samtycke
  consent_version TEXT NOT NULL,      -- t.ex. "v1.0-2026-06"
  consent_timestamp DATETIME NOT NULL,
  ip_hash TEXT,                       -- SHA-256(ip)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Avregistreringslogg
CREATE TABLE unsubscribe_log (
  id TEXT PRIMARY KEY,
  email_hash TEXT NOT NULL,
  unsubscribe_timestamp DATETIME NOT NULL,
  unsubscribe_method TEXT,           -- "email-link", "api", "manual"
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Cookie Policy

### Cookie-kategorier och Användning

**Strikt nödvändiga cookies** (Kräver INTE samtycke)

| Cookie | Syfte | Livslängd |
|--------|-------|-----------|
| `session` | Quiz-session (svar under quizets gång) | Session |
| `csrf_token` | CSRF-skydd | Session |

**Preferenscookies** (Kräver samtycke)

| Cookie | Syfte | Livslängd |
|--------|-------|-----------|
| `quiz_result` | Cachad quiz-profil för återbesök | 30 dagar |

**Analyticscookies** (Kräver samtycke)

| Cookie | Syfte | Livslängd |
|--------|-------|-----------|
| `_ga`, `_ga_*` | Google Analytics 4 | 2 år |

**Rekommendation:** Undvik analyticscookies för MVP. Använd istället:
- Server-side analys (anonymiserade server-loggar)
- MailerLites inbyggda öppnings/klick-statistik
- Enkel pageview-räknare utan cookies (privacy-first analytics)

### Cookie-banner Implementation

```html
<!-- Cookie-banner — visas vid första besök om cookies används -->
<div id="cookie-banner" role="dialog" aria-label="Cookie-inställningar" 
     style="display:none">
  <p>
    Vi använder nödvändiga cookies för att quizet ska fungera. 
    Vi använder inga spårningscookies utan ditt samtycke.
    <a href="/integritetspolicy/#cookies">Läs mer</a>
  </p>
  <div class="cookie-actions">
    <button id="accept-necessary">Acceptera nödvändiga</button>
    <button id="accept-all">Acceptera alla</button>
    <button id="cookie-settings">Inställningar</button>
  </div>
</div>
```

```javascript
// cookie-consent.js
const CookieConsent = {
  init() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      document.getElementById('cookie-banner').style.display = 'block';
    }
  },
  
  acceptNecessary() {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: false,
      timestamp: new Date().toISOString()
    }));
    this.hideBanner();
  },
  
  acceptAll() {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      timestamp: new Date().toISOString()
    }));
    this.loadAnalytics(); // Ladda GA4 först efter samtycke
    this.hideBanner();
  },
  
  hideBanner() {
    document.getElementById('cookie-banner').style.display = 'none';
  }
};
```

**Viktigt:** Ladda aldrig analyticscripts i `<head>` — ladda dem dynamiskt *efter* samtycke.

---

## 5. Registrerades Rättigheter (Art. 15–22)

### DSAR-process (Data Subject Access Request)

**Kanaler för rättighetsutövning:**
- Email: dataskydd@gladjeharmoni.se
- Ämnesrad: "GDPR-förfrågan — [typ av begäran]"

**Svarstid:** Max 30 dagar (Art. 12.3). Vid komplexa ärenden: max 90 dagar med besked inom 30 dagar.

### Rätten till tillgång (Art. 15)

Vad vi kan leverera:
```
- Bekräftelse att vi behandlar personuppgifter
- Kopia av: email-adress (om lagrad i MailerLite), samtycketidsstämpel, 
  samtycketext-version, quiz-profil
- Information om: syfte, rättslig grund, lagringstid, tredjepartsdelning
```

Vi kan INTE leverera:
```
- Quiz-svar (anonyma, ej kopplade till email)
- Rå IP-adress (lagras aldrig)
```

### Rätten att bli glömd (Art. 17)

```javascript
// server/services/deletion.js
async function deleteSubscriber(db, mailerlite, emailHash) {
  // 1. Hämta MailerLite-ID från lokal DB
  const subscriber = db.prepare(
    'SELECT mailerlite_id FROM subscribers WHERE email_hash = ?'
  ).get(emailHash);

  // 2. Ta bort från MailerLite
  if (subscriber?.mailerlite_id) {
    await mailerlite.deleteSubscriber(subscriber.mailerlite_id);
  }

  // 3. Soft-delete lokalt (behåll consent-logg för bevisändamål)
  db.prepare(`
    UPDATE subscribers 
    SET deleted_at = CURRENT_TIMESTAMP, email_hash = 'DELETED_' || id
    WHERE email_hash = ?
  `).run(emailHash);

  // 4. Logga raderingen
  db.prepare(`
    INSERT INTO unsubscribe_log (id, email_hash, unsubscribe_timestamp, unsubscribe_method)
    VALUES (?, ?, ?, ?)
  `).run(generateUUID(), emailHash, new Date().toISOString(), 'gdpr-deletion-request');

  // OBS: Consent-loggen (consent_log-tabellen) behålls i 3 år som 
  // bevis att samtycke gavs (Art. 7.1 kräver att vi kan bevisa samtycke)
}
```

**Undantag till rätten att bli glömd:**
- Consent-loggen sparas i 3 år (rättslig skyldighet Art. 6.1.c — bevisbörda)
- Server-loggar sparas i 30 dagar (teknisk säkerhet, berättigat intresse)

### Rätten till dataportabilitet (Art. 20)

Format för export:
```json
{
  "exportDatum": "2026-06-04T10:00:00Z",
  "dataSubject": "anonymiserad (hash)",
  "personuppgifter": {
    "email": "user@example.com",
    "quizProfil": "Utforskaren",
    "quizPoäng": 72,
    "samtyckeDatum": "2026-05-01T14:23:00Z"
  },
  "rättigheter": {
    "avregistreraEmail": "https://gladjeharmoni.se/avregistrera/",
    "raderaBegäran": "dataskydd@gladjeharmoni.se"
  }
}
```

---

## 6. Dataskyddsåtgärder (Art. 25 — Privacy by Design)

### Tekniska åtgärder

| Åtgärd | Implementation |
|--------|----------------|
| Kryptering i transit | HTTPS/TLS 1.3 (Let's Encrypt) |
| Kryptering i vila | SQLite-fil på krypterad disk (om möjligt) |
| Pseudonymisering | SHA-256-hash på IP och email i lokal DB |
| Datatillgång | Minimal: bara bakend-process har DB-åtkomst |
| Rate limiting | 10 req/min på /api/subscribe |
| Input-validering | express-validator på alla endpoints |
| SQL-injection-skydd | Parameteriserade queries (better-sqlite3) |
| XSS-skydd | Helmet.js Content-Security-Policy |
| CSRF-skydd | CSRF-tokens på formulär |

### Organisatoriska åtgärder

| Åtgärd | Status |
|--------|--------|
| DPA med MailerLite | Signeras vid kontoupplägg |
| DPA med hosting-leverantör | Signeras vid serverköp |
| Intern integritetspolicy för teamet | Skapas vid onboarding |
| Incidentrespons-plan | Se avsnitt 8 nedan |
| Årlig GDPR-genomgång | Schemaläggs |

### Dataminimeringsprincip (Art. 5.1.c)

Vi samlar **aldrig** in:
- ❌ Namn (inte efterfrågat i opt-in)
- ❌ Telefonnummer
- ❌ Födelsedata eller ålder (quizet ber om åldersintervall, ej exakt datum)
- ❌ Hälsodata i GDPR:s mening (Art. 9 — "känsliga personuppgifter")
- ❌ Rå IP-adresser (hashas omedelbart)

**OBS om känsliga personuppgifter:** Quiz-frågor som rör kost, träning och sömn är **inte** hälsodata i GDPR Art. 9-mening, eftersom de inte är kliniska uppgifter om hälsotillstånd. Konsultera jurist om quiz-frågor utökas till att inkludera sjukdomar eller mediciner.

---

## 7. Integritetspolicy — Struktur

Integritetspolicyn ska publiceras på `gladjeharmoni.se/integritetspolicy/` och inkludera:

1. **Vem vi är** — Personuppgiftsansvarig, kontaktuppgifter
2. **Vad vi samlar in** — Fullständig lista per behandling
3. **Varför vi samlar in det** — Syfte och rättslig grund per behandling
4. **Hur länge vi sparar det** — Lagringstid per kategori
5. **Vem vi delar det med** — MailerLite, hosting-leverantör
6. **Dina rättigheter** — Art. 15–22, hur du utövar dem
7. **Cookies** — Vilka cookies, hur länge, hur du styr dem
8. **Kontakt** — dataskydd@gladjeharmoni.se
9. **Klagomål** — IMY (imy.se), Box 8114, 104 20 Stockholm

**Krav på policyn:**
- Skrivet på klar, enkel svenska (ej juridisk jargong)
- Lättläst layout med rubriker
- Daterad med senaste uppdateringsdatum
- Länkad från: footer, opt-in-formulär, cookie-banner

---

## 8. Incidentrespons — Personuppgiftsincidenter (Art. 33–34)

### Definition av incident

En personuppgiftsincident är ett säkerhetsbrott som leder till oavsiktlig eller olaglig förstöring, förlust, ändring, obehörigt röjande av eller åtkomst till personuppgifter.

### Incidentresponssplan

```
STEG 1 — Identifiering (0–2 timmar)
  └─ Vem hittar incidenten kontaktar dataskydd@gladjeharmoni.se omedelbart

STEG 2 — Inneslutning (0–4 timmar)
  ├─ Isolera påverkade system om nödvändigt
  ├─ Bevara loggar (ändra ej något)
  └─ Dokumentera vad som är känt

STEG 3 — Bedömning (2–24 timmar)
  ├─ Vilka personuppgifter påverkades?
  ├─ Hur många registrerade?
  ├─ Risk för registrerade: Låg / Medel / Hög
  └─ Krävs anmälan till IMY?

STEG 4 — Anmälan till IMY (om krävs — inom 72 timmar)
  ├─ Krävs när: Risk för registrerades rättigheter och friheter
  ├─ Via: www.imy.se/anmalan
  └─ Innehåll: Art. 33.3 a–e

STEG 5 — Underrättelse till berörda (om hög risk — utan onödigt dröjsmål)
  ├─ Via email till påverkade abonnenter
  └─ Innehåll: Art. 34 — tydlig beskrivning + kontaktuppgifter

STEG 6 — Dokumentation
  └─ Dokumentera hela incidenten, oberoende av om anmälan krävdes (Art. 33.5)
```

### IMY-anmälningsformulär — Vad som krävs

```
- Incidentens art
- Kategorier och ungefärligt antal registrerade som berörs  
- Kategorier och ungefärligt antal personuppgiftsposter
- Sannolika konsekvenser
- Vidtagna eller föreslagna åtgärder
- Kontaktuppgifter till dataskyddsombud (om utsett)
```

---

## 9. Löpande Compliance-checklista

### Vid varje release

- [ ] Har ny funktionalitet introducerat ny personuppgiftsbehandling?
- [ ] Är samtyckes-texten fortfarande aktuell och korrekt?
- [ ] Är integritetspolicyn uppdaterad?
- [ ] Testas opt-in-formuläret (ej pre-checkad, kräver aktiv handling)?

### Kvartalsvis

- [ ] Granska lagringstider — raderas data enligt policy?
- [ ] Kontrollera MailerLite DPA-status
- [ ] Genomgång av server-loggar — raderas de efter 30 dagar?
- [ ] Test av "rätten att bli glömd"-processen (end-to-end)
- [ ] Uppdatera riskbedömning om ny data behandlas

### Årsvis

- [ ] Fullständig GDPR-revision av alla behandlingar
- [ ] Uppdatera ROPA (Register of Processing Activities)
- [ ] Genomgång av DPA:s med alla biträden
- [ ] Utbildning av eventuella nya teammedlemmar

---

## 10. Snabb-referens — Vanliga Frågor

**F: Behöver vi ett dataskyddsombud (DPO)?**
S: Nej, inte som huvudregel för en liten organisation som inte behandlar känsliga personuppgifter i stor skala. Rekommenderas dock att utse en intern GDPR-ansvarig.

**F: Kan vi skicka email baserat på berättigat intresse istället för samtycke?**
S: I teorin ja (Art. 6.1.f), men för email-marknadsföring till konsumenter kräver Marknadsföringslagen (och praxis) samtycke. Använd alltid samtycke för email-marknadsföring.

**F: Hur länge kan vi behålla email-adresser i MailerLite?**
S: Så länge samtycket är giltigt och aktivt. Best practice: skicka re-consent-kampanj till abonnenter som ej öppnat på 12 månader. Radera om de ej svarar.

**F: Räknas quiz-svar som personuppgifter?**
S: Nej, inte när de lagras utan koppling till identifierbar person. Om de någonsin kopplas till email — ja, och då kräver det egen rättslig grund.

**F: Behöver vi registrera oss hos IMY?**
S: Nej, GDPR kräver ingen registrering. Men vi måste ha ett internt ROPA (behandlingsregister) och kunna visa det för IMY på begäran.
