# Email Marketing Plan — Glädje & Harmoni

> Quiz opt-in, nurture-sekvenser och long-term engagement via MailerLite

---

## 1. Strategisk Översikt

### Mål med Email Marketing

Email är den primära monetiserings- och engagemangskanalen för Glädje & Harmoni. Den som tar quizet och väljer att lämna sin e-post är en **högt kvalificerad potentiell läsare** — de har redan investerat 5 minuter och visat aktivt intresse.

**Affärsmål:**
- Bygga en lista av longevity-intresserade svenska abonnenter
- Leverera personaliserat värde baserat på quiz-profil
- Konvertera till premium-innehåll/produkter (post-MVP)
- Hålla listan engagerad och aktiv över tid

**Email-filosofi:**
> Varje email ska förtjäna sin plats i inkorgen. Vi skickar aldrig för att "hålla oss top of mind" — vi skickar när vi har något genuint värdefullt att dela.

---

## 2. MailerLite — Konfiguration

### Kontostruktur

```
MailerLite-konto: Glädje & Harmoni
├── Grupp: Quiz-deltagare
│   ├── Segment: Profil — Pionjären (poäng 80–100)
│   ├── Segment: Profil — Utforskaren (poäng 60–79)
│   ├── Segment: Profil — Grundaren (poäng 40–59)
│   └── Segment: Profil — Startaren (poäng 0–39)
├── Grupp: Newsletter (generell)
└── Grupp: Premium-intressenter (post-MVP)
```

### Custom Fields att konfigurera

| Fältnamn | Typ | Beskrivning |
|----------|-----|-------------|
| `quiz_score` | Number | Longevity-poäng (0–100) |
| `quiz_profile` | Text | Pionjären / Utforskaren / Grundaren / Startaren |
| `quiz_date` | Date | När quizet togs |
| `consent_version` | Text | Version av consent-texten vid opt-in |
| `preferred_language` | Text | sv (default) |

### Double Opt-in

**Rekommendation: Aktivera double opt-in.**

Motivering:
- GDPR best practice (ökar bevisbarhet av samtycke)
- Eliminerar fake/typo-adresser → bättre deliverability
- Listan blir mindre men mer engagerad → bättre open rates
- Minskar risken för spam-klagomål

**Double opt-in e-post — innehåll:**
```
Ämne: Bekräfta din e-post — ditt longevity-resultat väntar

Hej!

Tack för att du tog Glädje & Harmonins longevity-quiz!

Klicka på knappen nedan för att bekräfta din e-postadress 
och få din personliga rapport skickad direkt till inkorgen.

[Bekräfta min e-post →]

Om du inte beställde detta, ignorera bara detta email.

Med vänliga hälsningar,
Teamet på Glädje & Harmoni
```

### Avsändarinformation

- **Från-namn:** Glädje & Harmoni
- **Från-adress:** hej@gladjeharmoni.se (ej no-reply!)
- **Svarsadress:** hej@gladjeharmoni.se
- **Fysisk adress:** Måste inkluderas (CAN-SPAM + GDPR-krav)

### Tekniska leverans-inställningar

- [ ] SPF-record konfigurerat för gladjeharmoni.se
- [ ] DKIM-signatur aktiverad i MailerLite
- [ ] DMARC-policy: `v=DMARC1; p=quarantine; rua=mailto:dmarc@gladjeharmoni.se`
- [ ] Custom sending domain (ej mailerlite.com i return-path)

---

## 3. Välkomst- och Resultat-email

### Email 1 — Direkt efter bekräftad opt-in (trigger: double opt-in bekräftad)

**Syfte:** Leverera quiz-resultatet + första värdeerbjudande

**Ämnesrad:** `Ditt longevity-resultat: Du är en [PROFIL] 🌿`
*(Obs: emoji används med omdöme — testa A/B mot emoji-fri version)*

**Alternativ ämnesrad (A/B-test):** `[FÖRNAMN], här är din personliga longevity-rapport`

**Timing:** Omedelbart (max 2 minuter efter bekräftelse)

**Innehåll:**

```
Hej [FÖRNAMN]!

Ditt longevity-quiz är klart, och vi har analyserat dina svar.

━━━━━━━━━━━━━━━━━━━━━━
DIN LONGEVITY-PROFIL: [PROFIL]
Din poäng: [SCORE]/100
━━━━━━━━━━━━━━━━━━━━━━

[PROFILBESKRIVNING — 2–3 meningar anpassat per profil]

Dina tre starkaste områden:
✓ [Område 1]
✓ [Område 2]  
✓ [Område 3]

Dina tre viktigaste förbättringsområden:
→ [Område A] — [Kort förklaring]
→ [Område B] — [Kort förklaring]
→ [Område C] — [Kort förklaring]

Under de kommande veckorna skickar vi dig konkreta tips 
och vetenskapsbaserade råd specifikt anpassade för din profil.

Varmt välkommen till Glädje & Harmoni-gemenskapen!

[Namn]
Teamet på Glädje & Harmoni

P.S. Dela gärna din profil med en vän — longevity är roligare 
att utforska tillsammans.

──────────────────────
Glädje & Harmoni | [Adress]
Avregistrera dig | Integritetspolicy
```

---

## 4. Nurture-sekvens — 4 veckor

Sekvensen är segmenterad per profil men delar en gemensam struktur. Innehållet anpassas per profil (tonalitet, tips, betoning).

### Sekvens-översikt

| Email | Dag | Ämne (generellt) | Fokus |
|-------|-----|-------------------|-------|
| E1 | 0 | Resultat + välkommen | Leverans + värde |
| E2 | 3 | Det viktigaste du kan göra idag | Snabb vinst, ett råd |
| E3 | 7 | Vecka 1: [Tema beroende på profil] | Djupgående råd |
| E4 | 10 | Forskning: Vad de äldsta i världen gör | Blå zoner |
| E5 | 14 | Vecka 2: Kost och longevity | Kostråd |
| E6 | 17 | Din sömn och hur den påverkar din livslängd | Sömn |
| E7 | 21 | Vecka 3: Rörelse som medicin | Träning |
| E8 | 24 | Mental hälsa: Den underskattade longevity-faktorn | Stress/mental |
| E9 | 28 | Vecka 4: Din longevity-plan framåt | Sammanfattning + CTA |
| E10 | 32 | Bonus: 5 enkla vanor att starta med imorgon | Aktivering |

### Email 2 — Dag 3: "Det viktigaste du kan göra idag"

**Ämnesrad:** `Det enskilt viktigaste du kan göra för din livslängd (hint: det är gratis)`

**Innehåll — Fokus:** En konkret, vetenskapligt förankrad vana kopplad till profilen.
- *Pionjären:* Optimera din VO2 max
- *Utforskaren:* Lägg till en daglig promenad efter middag
- *Grundaren:* Börja med 7–8 timmars konsekvent sömn
- *Startaren:* Börja med vatten — 8 glas om dagen är grunden

**Format:** Kort (200–300 ord), en enda actionable takeaway, en intern länk till en relaterad informationssida (post-MVP).

### Email 5 — Dag 14: Kost och Longevity

**Ämnesrad:** `Blå zoner: Vad världens äldsta människor faktiskt äter`

**Innehåll:**
- Vad är blå zoner? (Sardinien, Okinawa, Nicoya, Ikaria, Loma Linda)
- 3 gemensamma kostmönster
- Hur du applicerar det på svensk vardagsmat
- Recept/tips (enkelt, inte perfektionism)
- CTA: Ta om quizet om 90 dagar för att se din förbättring

### Email 9 — Dag 28: Longevity-plan och nästa steg

**Ämnesrad:** `[FÖRNAMN], dina 4 veckor är klara — vad händer nu?`

**Innehåll:**
- Summering av de viktigaste råden under 4 veckor
- Uppmuntran: progression, inte perfektion
- Förhandsavisering om kommande innehåll (newsletter)
- CTA: Dela quiz med en vän
- Eventuell soft-sell: Premium-innehåll (om aktiverat)

---

## 5. Löpande Newsletter (Post-nurture)

### Frekvens och Timing

- **Frekvens:** 2 ggr/månad (varannan tisdag)
- **Bästa sändningstid (test-hypotes):** Tisdag–torsdag, kl 7–9 eller 12–13
- **Timing baseras på:** A/B-testning av öppningsrater under de första 3 månaderna

### Newsletter-format

```
ÄMNE: [Nummer] — [Veckans ämne] + [Teaser]

Hej [FÖRNAMN]!

[Ingress — 2–3 meningar, personlig ton]

━━━━━━━━━━━━━━━━━━
VECKANS TEMA: [Rubrik]
━━━━━━━━━━━━━━━━━━

[Huvudartikel — 300–400 ord, vetenskapsbaserat]

▸ Läs mer: [Länk till sajt-artikel]

━━━━━━━━━━━━━━━━━━
KORT & GOTT
━━━━━━━━━━━━━━━━━━

• [Tip 1 — en rad]
• [Tip 2 — en rad]  
• [Ny forskning — länk]

━━━━━━━━━━━━━━━━━━
RECEPT / VANA / ÖVNING
━━━━━━━━━━━━━━━━━━

[Praktisk, applicerbar sektion]

Till nästa gång,
[Namn] & Teamet på Glädje & Harmoni
```

---

## 6. Segmentering och Personalisering

### Profil-baserad segmentering

**Pionjären (80–100 poäng)**
- Ton: Peer-to-peer, avancerade ämnen
- Innehåll: Cutting-edge forskning, supplementering, biohacking
- Ämnesrader: "Ny forskning om NAD+ och åldrandeprocessen"

**Utforskaren (60–79 poäng)**
- Ton: Uppmuntrande, nyfiken
- Innehåll: Optimerings-tips, förfina befintliga vanor
- Ämnesrader: "Hur du förbättrar din sömn med 30%"

**Grundaren (40–59 poäng)**
- Ton: Stöttande, ej dömande
- Innehåll: Grundläggande men vetenskapliga råd, small wins
- Ämnesrader: "En vana som förändrar allt — ta den här veckan"

**Startaren (0–39 poäng)**
- Ton: Varm, enkel, uppmuntrande
- Innehåll: Mycket enkel, ett steg i taget, inga överväldigande listor
- Ämnesrader: "Börja här: Det allra enklaste steget mot bättre hälsa"

### Beteendebaserad segmentering (post-MVP)

- **Öppnat men ej klickat:** Skicka re-engagement med annan vinkel
- **Ej öppnat på 60 dagar:** Sunset-flow (win-back eller avregistrering)
- **Klickat på specifika artiklar:** Tag och skicka relaterat innehåll
- **Delat quiz:** Extra "tack"-email + VIP-känsla

---

## 7. A/B-testning

### Systematisk testplan

Testa alltid **en variabel i taget** med statistiskt signifikant urval (min. 200 mottagare per variant).

| Test | Kontroll | Variant | Mätvärde |
|------|----------|---------|----------|
| Ämnesrad: emoji vs ingen emoji | Utan emoji | Med emoji 🌿 | Öppningsrate |
| Ämnesrad: personalisering | Utan förnamn | Med [FÖRNAMN] | Öppningsrate |
| Sändningstid | Tisdag 8:00 | Torsdag 12:00 | Öppningsrate |
| CTA-text | "Läs mer" | "Ta del av tipsen" | Klickrate |
| Email-längd | Kort (200 ord) | Lång (500 ord) | Klickrate + avregistreringar |
| Välkomst-email: timing | Omedelbart | 30 min delay | Öppningsrate + klick |

---

## 8. Deliverability — Teknisk Checklista

### Uppvärmning av ny e-postdomän

Ny avsändardomän måste värmas upp gradvis för att undvika spam-klassificering:

```
Vecka 1: Max 50 email/dag
Vecka 2: Max 200 email/dag
Vecka 3: Max 500 email/dag
Vecka 4+: Normal volym
```

### Löpande deliverability-hygien

- [ ] Rensa inaktiva abonnenter var 90:e dag (ej öppnat på 6 månader → sunset-flow)
- [ ] Bounce-hantering: Hard bounce → omedelbar borttagning, Soft bounce → 3 försök
- [ ] Spam-klagomål under 0,1% (MailerLites gräns)
- [ ] Undvik spam-triggers: "gratis", "klicka här", överdrivet med versaler/utropstecken
- [ ] Text-till-HTML-ratio: Minst 60% text
- [ ] Testa med Mail Tester (mail-tester.com) innan varje ny kampanjtyp

---

## 9. GDPR och Samtycke i Email Marketing

*(Se `docs/gdpr-compliance.md` för fullständig specifikation)*

### Kritiska krav för email

1. **Varje email** måste innehålla:
   - Tydlig avregistreringslänk (hanteras av MailerLite)
   - Fysisk postadress till avsändaren
   - Klartext om varför mottagaren får emailet

2. **Segment-restriktioner:**
   - Skicka aldrig marknadsföringsinnehåll till ej bekräftade opt-ins
   - Transaktionella email (bekräftelse av opt-in) är ok utan marknadsföringssamtycke

3. **Dataretention:**
   - Inaktiva abonnenter (ej öppnat på 12 månader): Uppdatera samtycke eller radera
   - Vid avregistrering: Bekräfta inom 10 dagar, radera från alla listor

4. **Tredjepartsdelning:**
   - Data delas aldrig med tredje part för marknadsföring
   - MailerLite agerar som personuppgiftsbiträde (DPA krävs)

---

## 10. KPI:er och Rapportering

### Primära KPI:er (mäts varje månad)

| Metrik | Mål (MVP, 3 mån) | Branschsnitt SaaS/Hälsa |
|--------|------------------|-------------------------|
| Listökning/månad | +150 abonnenter | — |
| Opt-in-rate (quiz → email) | ≥ 30% | 20–25% |
| Double opt-in-bekräftelse | ≥ 70% | 60–75% |
| Öppningsrate | ≥ 35% | 28–32% |
| Klickrate (CTR) | ≥ 8% | 3–5% |
| Avregistreringsrate | < 1% | 0,5–2% |
| Spam-klagomålsrate | < 0,05% | < 0,1% |

### Dashboard i MailerLite — Vad vi följer

1. **Automation-rapporter:** Öppning och klick per email i sekvensen
2. **Segment-jämförelse:** Vilket profil-segment är mest engagerat?
3. **Länkklick:** Vilket innehåll klickar folk på? → Informerar newsletter-innehåll
4. **Subscriber growth:** Netto-tillväxt per vecka
5. **Unsubscribe-tidpunkt:** Vid vilket email hoppar folk av? → Förbättra det emailet
