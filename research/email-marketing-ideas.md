# Email Marketing: Best Practice för Glädje & Harmoni
**Version:** 1.0  
**Senast uppdaterad:** 2026-06-04  
**Kontext:** Quiz-baserat longevity-verktyg med MailerLite-integration

---

## Översikt

Email marketing för Glädje & Harmoni är unik jämfört med typisk e-handel eller SaaS: vi har **personaliserat quiz-data** om varje prenumerant. Det är en enorm fördel som möjliggör hyper-relevant kommunikation.

**Nyckelprincip:** Varje email bör adressera var prenumeranten befinner sig på sin longevity-resa – baserat på deras quiz-kategori.

---

## 1. Welcome Sequence: 5-Email Serie (Quiz Opt-in)

### Trigger
Automation startar när prenumerant bekräftar double opt-in.

---

### Email 1: Det Personliga Resultatet (Dag 0 – Omedelbart)

**Ämnesrad:** "Ditt longevity-resultat är klart, [Förnamn]"  
**Preview text:** "Här är vad forskningen säger om dina vanor"

**Syfte:** Leverera lovet. Ge kvizresultatet med kontext.

**Innehåll:**
- Personaliserad hälsning med namn
- Quiz-kategori och poäng prominently visad
- Kort förklaring av vad kategorin betyder
- 3 specifika styrkor baserat på deras svar (positiv framing)
- 2-3 prioriterade förbättringsområden
- CTA: "Läs mer om din #1 prioritet → [länk till relevant artikel]"
- Klar unsubscribe-länk

**Segmentering:**
- Optimerare: Fokus på finjustering, "nästa nivå"
- God grund: Fokus på 1-2 nyckelförbättringar
- Förbättringspotential: Fokus på ett steg i taget, empowerment
- Börja nu: Fokus på det lättaste första steget, normaliserande ton

**Teknisk data:**
- From: "Glädje & Harmoni <hej@gladjeochharmoni.se>"
- Personalisering: `{{subscriber.name}}`, `{{custom.quiz_category}}`, `{{custom.quiz_score}}`

---

### Email 2: Den Vetenskapliga Grunden (Dag 3)

**Ämnesrad:** "Varför 7 timmar sömn är mer värt än 7 timmars gym"  
*(alternativa ämnesrader beroende på svagast domän i deras quiz)*

**Preview text:** "Den senaste forskningen om vad som faktiskt förlänger livet"

**Syfte:** Utbilda, bygg trovärdighet och förtroende.

**Innehåll:**
- En "big idea": En fascinerande longevity-insikt
- Koppling till deras quiz-resultat: "Med tanke på ditt resultat är detta extra relevant för dig"
- Mini-artikel (300-400 ord) med vetenskaplig grund
- 1-2 praktiska tips från den vetenskapliga insikten
- CTA: Länk till fullständig artikel på sajten

**Tonalitet:** Informativ men inte föreläsande. Nyfiken, entusiasmerande.

---

### Email 3: En Sak i Taget (Dag 7)

**Ämnesrad:** "[Förnamn], vilken förändring är lättast för dig?"

**Preview text:** "Vi frågade 500 personer. Det här förvånade oss."

**Syfte:** Engagemang, segmentering baserat på intresse, motivera första steget.

**Innehåll:**
- En enkel undersökning (1-2 klickfrågor med Mailerlite-poll)
  - "Vilket av dessa vill du förbättra mest: Sömn / Kost / Rörelse / Stresshantering / Socialt liv?"
- Baserat på svar → lägg till subscriber i intresse-segment
- Kort inspirerande berättelse (case study, anonymt) från en person i deras kategori
- 30-dagars utmaning: En konkret, enkel förändring att börja med idag
- CTA: "Jag vill prova detta!" (gärna klickbar knapp)

**Teknisk:**
- Använd Mailerlite:s click-segmentering: Klikar de på "Sömn" → segment: `intresse_sömn`

---

### Email 4: Djupdyk i Deras Svagaste Domän (Dag 14)

**Ämnesrad:** Baseras på deras svagaste quiz-domän  

*Exempel:*
- Sömn: "Varför du vaknar klockan 3 – och vad du kan göra åt det"
- Kost: "Den ena matvanan som forskarna är överens om"
- Motion: "10 minuter. Det räcker faktiskt."
- Stress: "Det japanska begreppet som kan förlänga ditt liv med 7 år"
- Socialt: "Den faktor som Harvard-studien överväldigande bevisar"

**Preview text:** En intrigerande öppning från artikeln

**Syfte:** Djup utbildning inom deras personliga förbättringsområde.

**Innehåll:**
- Komplett mini-guide (600-800 ord)
- Vetenskaplig grund + praktiska steg
- Specifika svenska tips och references
- "Denna veckas utmaning"
- CTA: Länk till mer innehåll på sajten

---

### Email 5: Gemenskapen och Nästa Steg (Dag 21)

**Ämnesrad:** "Vad händer hos Glädje & Harmoni?"

**Preview text:** "Ditt exklusiva longevity-innehåll framöver"

**Syfte:** Sätt förväntningar för ongoing kommunikation. Bygg relation.

**Innehåll:**
- Summering av vad de fått under de 3 veckorna
- Presentation av ongoing content-program (vad de kan förvänta sig)
- Preferens-center: "Berätta för oss vad du vill ha mer av"
  - Forskning och vetenskap
  - Praktiska tips
  - Recept och kostguider
  - Sömnoptimering
  - Motivationsinspiration
- Uppmaning att följa på sociala medier (om relevant)
- Tack och värmekopp-avslutning
- CTA: "Skriv och berätta hur det går! Vi läser varje svar."

---

## 2. Segmentering Baserat på Quiz-Resultat

### Segment 1: Optimerare (80-100%)

**Beteende och behov:**
- Redan hälsomedveten, söker avancerad information
- Intresserad av biomarkörer, wearables, biohacking
- Vill finjustera, inte börja om
- Sannolikt beredd att betala för premium-tjänster

**Contentstrategi:**
- Avancerade forskningstrender (senaste studier om epigenetik, VO2max, HRV)
- Protokoll för nästa nivå (Zone 2-träning, periodisk fasta)
- Mätverktyg och biomarkörer
- Eventuell premiumprodukt-introduction

**Email-frekvens:** 1-2 gånger/vecka (tolererar mer)

---

### Segment 2: God grund (60-79%)

**Beteende och behov:**
- Bra vanor men inkonsekvens är problemet
- Behöver prioritering: "Vad ska jag fokusera på?"
- Inspireras av framsteg och resultat
- Sannolikt den bredaste målgruppen

**Contentstrategi:**
- Konkreta förbättringsguider i prioritetsordning
- Before/after-berättelser och transformationshistorier
- Steg-för-steg-protokoll för specifika mål
- Vanliga misstag att undvika

**Email-frekvens:** 1 gång/vecka

---

### Segment 3: Förbättringspotential (40-59%)

**Beteende och behov:**
- Vill förändras men vet inte var de ska börja
- Behöver enkla, konkreta steg
- Risk för avhopp om innehållet är för avancerat
- Empowerment och normaliserande ton viktigt

**Contentstrategi:**
- Enkelt, lättförståeligt innehåll
- "En sak i taget"-filosofi
- Fokus på små vinster som bygger momentum
- Positiv framing (vad du lägger till, inte tar bort)
- Historier om "vanliga" personers förändringsresor

**Email-frekvens:** 1 gång/vecka, kanske varannan för att inte overwhelma

---

### Segment 4: Börja nu (0-39%)

**Beteende och behov:**
- Troligtvis tar quizet ur nyfikenhet
- Kan känna sig överväldigad av livsstilsförändringar
- Behöver mötas där de är, utan att dömas
- Den enklaste möjliga actionpunkt

**Contentstrategi:**
- Extremt enkelt, jämgångssteg
- Positiv, icke-dömande ton
- "Allt börjar någonstans" – normalisera startpunkten
- Fokus på en sak per email
- Eventuell hänvisning till professionell hjälp (för rökning, alkohol)

**Email-frekvens:** Varannan vecka initialt för att inte skrämma bort

---

## 3. Ämnesrader som Konverterar

### Formler som fungerar i longevity-nischen

**Nyckelord i ämnesrader som driver öppningar:**
- Siffror: "7 saker", "3 minuter", "10 år yngre"
- Forskning/vetenskaplig trovärdighet: "Ny studie:", "Harvard-forskarna:"
- Personalisering: "[Förnamn],"
- Nyfikenhetsgap: Börjar berättelsen men avslutar inte
- Nytta-specificering: "Så förbättrar du" "Hur du..."
- Negativt framing (sparsamt): "Misstaget som åldrar dig snabbare"
- Frågor: "Sover du tillräckligt?"

### 30 Testade Ämnesradsmallar

**Utbildande:**
1. "Den longevity-faktor 9 av 10 ignorerar (men borde)"
2. "Varför japanska Okinawa-bor lever till 100 – och vad du kan lära dig"
3. "Ny forskning: Det tar bara 10 minuter om dagen"
4. "Vad din biologiska ålder egentligen säger om din hälsa"
5. "Inflammaging: Det okända fenomenet som åldrar dig inifrån"

**Personaliserade:**
6. "[Förnamn], här är ditt personliga longevity-protokoll"
7. "Baserat på ditt quiz: Ditt #1 förbättringsområde"
8. "Vi analyserade 500 quiz-svar. Din kategori [kategori] bör veta det här"
9. "[Förnamn], du frågade om [ämne] – här är svaret"

**Nyfikenhetsbaserade:**
10. "Japanerna har ett ord för det som förlänger livet. Du har det redan"
11. "Det hände när jag sov 8 timmar i 30 dagar i rad"
12. "Den ena vanan Blue Zone-bor delar – det är inte kost"
13. "Vad en blodanalys avslöjar om din åldringstakt"

**Action-orienterade:**
14. "5 minuters investering. Märkbar förändring inom 2 veckor."
15. "Din 30-dagars longevity-utmaning börjar idag"
16. "Tre saker att göra innan imorgon för bättre sömn"
17. "En förändring per vecka – börja med den enklaste"

**Statistikbaserade:**
18. "26% lägre dödlighetsrisk med denna en sak (nej, det är inte motion)"
19. "Forskning på 1 miljon+ personer: Det viktigaste du kan göra är..."
20. "Telomerlängd och du: Mäter din kropp 10 år äldre?"

**Säsongsanpassade (Sverige):**
21. "Vintermörkret: Hur du skyddar din hälsa under novembers prövning"
22. "Friluftssäsongen öppnar: Din longevity-guide till sommaren"
23. "D-vitamin och november: Vad du behöver veta nu"

**Re-engagement (för inaktiva prenumeranter):**
24. "Vi saknar dig, [Förnamn]. Har något förändrats?"
25. "Fortfarande intresserad av longevity? Klicka Ja eller Nej"

---

## 4. Frekvens och Timing

### Rekommenderad frekvens

| Fas | Frekvens | Motivering |
|-----|---------|-----------|
| Welcome sequence | Dag 0, 3, 7, 14, 21 | Bygger relation snabbt utan att spamma |
| Etablerade prenumeranter | 1-2 gånger/vecka | Balans mellan närvaro och ej för mycket |
| Inaktiva (> 90 dagar ingen öppning) | Månadsvis | Re-engagement utan att öka avregistreringar |

### Optimal timing för Sverige

**Bästa dagar att skicka (baserat på europeisk email-data):**
- **Tisdag och torsdag** är generellt bäst för B2C-newsletters
- Undvik måndag morgon (inbox-kaos) och fredag (folk mentalt lediga)

**Bästa tid på dagen:**
- **07:00-09:00:** Morgonläsning på pendeln eller vid frukost
- **12:00-13:00:** Lunchrast
- **18:00-19:00:** Kvällsrutinen

**Teststrategi:**
- A/B-testa tider: 08:00 vs 18:00 för din specifika lista
- Mailerlite stöder optimal send-time baserat på prenumerantbeteende

---

## 5. Content Calendar: 12 Månaders Longevity-innehåll

### Januari – Nystart och Vanor

*Tema: "Nyårslöften som faktiskt håller"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Varför nyårslöften misslyckas – och hur du gör annorlunda i år" |
| 2 | "En vana i taget: Vetenskapen bakom beteendeförändring" |
| 3 | "Januarimörker och D-vitamin: Vad du behöver veta" |
| 4 | "30-dagars longevity-start: Vad du uppnått hittills" |

### Februari – Hjärthälsa och Kärlek

*Tema: "Hjärthälsa för ett längre liv"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Hjärtfrisk mat: Mer än medelhavsdieten" |
| 2 | "Hjärtfrekvens­variabilitet (HRV): Din hjärtats hälsobarometer" |
| 3 | "Valentinsdag: Hur kärlek bokstavligen förlänger livet" |
| 4 | "Motion och hjärtat: Zone 2-träningens superkraft" |

### Mars – Sömn

*Tema: "Sömn som superpower"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Dygnsrytmen och tidsskiftet: Skydda din sömn" |
| 2 | "Det glymfatiska systemet: Varför hjärnan behöver sömnen" |
| 3 | "Sömnoptimering: 7 evidensbaserade tips" |
| 4 | "Sömnapné: Vanligare än du tror – och vad du kan göra" |

### April – Kost och Vår

*Tema: "Säsongsmat och longevity"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Vårstädning för kroppen: Intermittent fasta och autopagi" |
| 2 | "Svenska superfoods: Det du redan har tillgång till" |
| 3 | "Tarmhälsa på djupet: Mikrobiomets roll i åldrandet" |
| 4 | "Recept: Longevity-frukost för en aktiv livsstil" |

### Maj – Rörelse och Friluftsliv

*Tema: "Din kropp i rörelse"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Utomhusträning och naturvistelse: Dubbla hälsoeffekter" |
| 2 | "Styrketräning efter 50: Varför det är mer kritiskt än någonsin" |
| 3 | "Gång som medicin: Hur många steg behöver du?" |
| 4 | "VO2max: Testa din kondition hemma" |

### Juni – Stress och Sommarhälsa

*Tema: "Återhämtning och balans"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Sommarsemesterns hälsoeffekter: Vad forskningen säger" |
| 2 | "Naturvistelse som medicin: Skogsbadets vetenskap" |
| 3 | "Solljus och D-vitamin: Balansen du behöver" |
| 4 | "Quiz-uppdatering: Hur har dina vanor förändrats?" |

### Juli – Socialt och Semesterinspo

*Tema: "Relationer och gemenskap"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Ensamhet: Lika farligt som rökning (och vad vi kan göra åt det)" |
| 2 | "Familj och vänner: Hur relationskvalitet avgör din livslängd" |
| 3 | "Friluftsliv och socialt liv: En perfekt longevity-kombination" |
| Sommaruppehåll | (Reducerad frekvens under semesterperioden) |

### Augusti – Mental hälsa och Hjärna

*Tema: "Hjärnhälsa och kognitiv longevity"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Alzheimer och livsstil: Vad du kan påverka" |
| 2 | "Kognitiv träning: Lära sig nya saker förlänger livet" |
| 3 | "BDNF: Hjärnans gödningsmedel och hur du ökar det" |
| 4 | "Höst­förberedelse: Säkra din hälsa inför mörkret" |

### September – Biomarkörer och Mätning

*Tema: "Känn dina tal"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Blodprover för longevity: Vad du bör be om" |
| 2 | "Biologisk ålder: Vad den mäter och hur du förbättrar den" |
| 3 | "HRV, VO2max och grip strength: Din funktionella hälso-trio" |
| 4 | "Wearables och hälsoapp: Bra verktyg, inte religiöst" |

### Oktober – Immunsystem och Höst

*Tema: "Stärk din immunitet naturligt"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "Immunsystemet och åldrandet: Inflammaging förklarat" |
| 2 | "Kost för immunitet: Specifika livsmedel med stark evidens" |
| 3 | "Sömn och immunitet: Din nattliga immuntränare" |
| 4 | "Vaccinationer och äldre: Vad du bör veta" |

### November – Mörker, Depression och Välmående

*Tema: "Psykisk hälsa och longevity"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "SAD och vinterdepression: Evidensbaserade motmedel" |
| 2 | "Tacksamhet och longevity: Inte flum – det är vetenskap" |
| 3 | "Mindfulness i 10 minuter: En guide för skeptiker" |
| 4 | "Syfte och mening: Ikigai och varför det förlänger livet" |

### December – Reflektion och Planering

*Tema: "Avsluta starkt, börja rätt"*

| Vecka | Innehåll |
|-------|----------|
| 1 | "December-strategi: Håll hälsovanorna utan att bli jobbig" |
| 2 | "Alkohol och helger: Fakta utan pekpinnar" |
| 3 | "Årets bästa longevity-forskning sammanfattad" |
| 4 | "Ditt 2027 longevity-manifest: Sätt tre konkreta mål" |

---

## 6. GDPR och Email Compliance

### Obligatoriska element i varje email

- [ ] Tydlig avsändare (namn + email)
- [ ] Fysisk adress (eller postbox)
- [ ] Enklicks-unsubscribe-länk
- [ ] Länk till preferenscenter
- [ ] Ej vilseledande ämnesrad

### Consent management

- Double opt-in implementerat (MailerLite standard)
- Consent-datum loggat
- Lätt att avregistrera = lägre spam-klagar = bättre leveransbarhet

### Lista-hygien

- Regelbunden rensning av bounce-adresser (MailerLite gör detta automatiskt)
- Re-engagement-kampanj för inaktiva (> 90 dagar ingen öppning)
- Radera prenumeranter som ej svarar på re-engagement efter 180 dagar
- Aldrig köpa eller hyra listor

---

*Dokument av Glädje & Harmoni | Version 1.0 | 2026-06-04*
