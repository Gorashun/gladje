# Website Best Practice: Glädje & Harmoni
**Version:** 1.0  
**Senast uppdaterad:** 2026-06-04  
**Kontext:** Longevity-quiz-funnel för svensk 40-70+-målgrupp

---

## Översikt

Glädje & Harmoni är ett quiz-baserat longevity-verktyg. Konverteringsmålet är e-mailadress via quiz-opt-in. Den primära målgruppen är 40-70-åriga svenspar med hälsointresse och insikten att livsstil påverkar hur de åldras.

**Primärt konverteringsmål:** Genomfört quiz + email-opt-in  
**Sekundärt mål:** Artikelläsning + återkommande besökare

---

## 1. Konverteringsoptimering för Quiz-Funnels

### 1.1 Landningssidans struktur

**Above the fold (synligt utan scrollning):**
- Tydlig headline med nyttepropositon ("Ta reda på hur dina vanor påverkar din livslängd")
- Visuell quiz-preview (förväntan)
- Social proof (antal genomförda quiz, experter)
- Primär CTA: "Starta quizet – tar 3 minuter"
- Trygghetssignal (GDPR-ikon, inga spam)

**Formatrekommendationer för hero-sektionen:**
- Rubrik: Nytta-fokuserad, ej bolagsnamn
- Underrubrik: Förklarar vad de får
- CTA-knapp: Hög kontrast, aktionsord ("Starta quizet" bättre än "Klicka här")
- Hero-bild: Autentisk äldre person i aktivt sammanhang (ej stock-foto-artigt)

**Under fold (scrollning):**
1. Förtroendebyggande element
2. Vad du får (quiz-preview, resultat-preview)
3. Hur det fungerar (3 enkla steg)
4. Vittnesmål/testimonials
5. Om oss/Expertis
6. Vanliga frågor (FAQ)
7. Sekundär CTA

### 1.2 Quiz-design för hög completion rate

**Completion rate-faktorer:**

Studier på quiz-funnels visar att de viktigaste faktorerna för att användaren ska slutföra quizet är:

1. **Progressindikator:** Tydlig progress bar ("Fråga 3 av 18") ökar completion med 20-30%
2. **Engagerande första frågan:** Enkel, icke-hotfull. Börja med kost eller aktivitet, inte rökning eller alkohol
3. **Momentum:** Undvik länga förklaringar mitt i quizet. Snabba, klickbara svar
4. **Personalisering under quizet:** "Bra val!" eller neutral feedback ger känsla av engagemang
5. **Resultat-preview:** Visa tidigt vad de får när de är klara

**Designprinciper:**
- En fråga per sida (ej alla på en gång)
- Svarsalternativ som radioknappar eller stora klickbara knappar (ej dropdown)
- Ingen "laddar..." – omedelbar transition
- "Föregående"-knapp alltid tillgänglig (bryt inte tillbaka-förväntningen)
- Mobiloptimerat (fingervänliga knappar, tillräcklig storlek)

**Opt-in placement:**
- Email-formuläret placeras EFTER att de svarat på alla frågor
- "Se ditt resultat" som CTA för formuläret (tydlig utbyte: email → resultat)
- Aldrig before quiz (för tidigt, ingen anledning att ge email)
- Aldrig pop-up som avbryter quizet

### 1.3 Opt-in formuläret

**Fält att ha med:**
- Förnamn (möjliggör personalisering)
- E-postadress
- GDPR-consent checkbox (ej förkryssad)
- CTA-knapp

**Fält att INTE ha med:**
- Telefonnummer (minskar konvertering kraftigt)
- Fullständigt namn (tar längre tid)
- Välj intressekategorier (för tidigt, sker i email-automatik)

**Formulärtext:**
- "Skicka resultatet till min inbox" (fokus på nytta, ej email-registrering)
- GDPR-text: Enkel, klar. "Jag godkänner att Glädje & Harmoni skickar mig mitt quiz-resultat och relevant longevity-innehåll per email. Du kan avregistrera dig när som helst." + länk till integritetspolicy

**Friktionsminskning:**
- Visa säkerhets-ikoner (lås, GDPR)
- "Vi spammar aldrig" eller motsvarande
- Antal sedan tagit quizet (social proof)

---

## 2. UX för 40-70-årig Målgrupp

### 2.1 Läsbarhet och typografi

**Typsnittstorlek:**
- Brödtext: Minimum 16px, idealt 18px
- Rubriker: H1 minst 28px, H2 minst 22px
- Mobil: Ännu större (minimum 16px, idealt 18px på small screens)

**Kontrast:**
- Bakgrund/textkontrast: Minimum 4,5:1 (WCAG AA)
- Idealt 7:1 för äldre målgrupp med sämre synförmåga
- Undvik ljusgrå text på vit bakgrund (populärt designmässigt men tillgänglighetsproblem)

**Typsnitt:**
- Sans-serif för online-läsning (bättre läsbarhet på skärm)
- Undvik dekorativa typsnitt för brödtext
- Rekommenderade: Inter, Open Sans, Lato, Noto Sans

**Radlängd:**
- 60-80 tecken per rad (optimalt för läsbarhet)
- Undvik full-bredd text på stora skärmar

### 2.2 Navigation och orientering

**Navigationsdesign:**
- Stor, klar navigationsstruktur
- Tydlig "hem"-länk
- Undvik hamburger-menyer om möjligt på desktop (äldre användare förväntar sig synlig navigation)
- "Du är här"-indikatorer (breadcrumbs, aktiv meny-item)

**Feedback och bekräftelse:**
- Tydliga bekräftelsesidor vid formulärinskick ("Din ansökan är mottagen")
- Ladda-indikatorer vid API-anrop
- Fel-meddelanden i vanlig svenska (ej tekniska felkoder)
- Tydliga CTA-knappar med aktionsorienterad text

### 2.3 Visuellt språk för målgruppen

**Bildval:**
- Autentiska bilder av aktiva, glädjefulla äldre (ej sjukhus, medicin, rullstolar)
- Representera den livsstil de vill ha, inte det de fruktar
- Undvik rena stock-foto-klichéer
- Diversitet i ålder, kön, etnicitet

**Färgpsykologi:**
- Grön = hälsa, natur, tillit
- Blå = förtroende, stabilitet, vetenskap
- Orange = energi, optimism, action (bra för CTA-knappar)
- Undvik svart-dominant design (kan kännas dystert för hälsa-tema)

**Ikonografi:**
- Enkla, igenkänliga ikoner
- Undvik ultra-moderna, abstrakta ikoner som kan vara svårtolkade
- Text-labels bredvid ikoner (ej enbart ikoner som navigation)

### 2.4 Mobilanpassning specifikt för målgruppen

Trots att vi pratar om 40-70-åriga: en stor del använder smartphones aktivt.

**Mobilspecifika UX-hänsyn:**
- Touch-targets minimum 44×44px (Apple HIG rekommendation)
- Avstånd mellan klickbara element (undvik misstag-klick)
- Formulärfält: Trigga rätt tangentbord (email-field = email keyboard)
- Inga hover-effekter som enda indikator (hover fungerar ej på touch)
- Swipe-gestures med backup-knappar (ej enbart swipe-navigation)

---

## 3. Trust Signals – Bygg Förtroende

### 3.1 Vetenskaplig trovärdighet

**Källhänvisningar:**
- Länka till eller nämna forskning som citeras (PubMed, WHO, Karolinska Institutet)
- "Baserat på forskning från [institution]" med källa
- Undvik vaga påståenden som "studier visar" – var specifik

**Expertcitat:**
- Citat från svenska longevity-forskare eller läkare
- Namn och titel/institution
- Helst med foto

**Statistik i text:**
- Konkreta siffror är trovärdiga: "43% minskad risk" bättre än "markant minskad risk"
- Ange källa i fotnot eller parentes

### 3.2 Social proof

**Quiz-statistik:**
- "[Antal] personer har tagit quizet" (uppdateras dynamiskt)
- Genomsnittligt resultat per kategori (motiverar att jämföra)

**Vittnesmål:**
- Äkta vittnesmål från faktiska användare
- Foto + namn + ålder (ålder extra relevant för longevity-målgrupp)
- Specifika resultat (ej vaga "det var bra!")

### 3.3 Professionalism och trovärdighet

**Om oss:**
- Beskriv bakom teamet: Vilka är vi? Varför bryr vi oss?
- Undvik anonym sajt (minskar förtroende)
- Kontaktinformation synlig

**Design-kvalitet:**
- Professionell design signalerar seriösitet
- Konsekventa typsnitt, färger, ikoner
- Inga döda länkar eller 404-sidor
- Aktuellt innehåll (datumstämplar på artiklar)

### 3.4 GDPR-signaler

- Tydlig integritetspolicy (länkad i formulär och footer)
- Cookie-banner vid första besök
- GDPR-ikon/badge vid formulär
- "Vi delar inte din email med tredje part"
- Lätt att avregistrera (synlig länk i alla emails)

---

## 4. GDPR-vänlig Design

### 4.1 Cookie-consent design

**Best practice:**
- Undvik pre-tickade boxes (olagligt under GDPR)
- Tydlig kategorisering: Nödvändiga / Analys / Marketing
- Lika lätt att avvisa som att acceptera ("Avvisa alla" lika synlig som "Acceptera alla")
- Möjlighet att ändra preferenser senare

**UI-design för cookie-banner:**
- Placering: Botten av sidan (standard), eller center (modal)
- Ej blockera hela innehållet med cookie-banner (negativ UX, och ej nödvändigt)
- Kort, tydlig text

### 4.2 Formulär-consent

**GDPR-korrekt consent-formulering:**

```
☐ Jag godkänner att Glädje & Harmoni skickar mig mitt quiz-resultat 
och relevant longevity-innehåll per e-post. Jag förstår att jag kan 
avregistrera mig när som helst. Läs vår [integritetspolicy].
```

**Inte GDPR-compliant:**
- Förkryssad ruta
- Kombinerad opt-in med terms of service
- Vag formulering ("Håller med om villkoren")

### 4.3 Integritetspolicy – användarvänlig

Juridisk text är oundviklig, men kommunicera den tydligt:

- **"Lätt att förstå"-sammanfattning** överst
- Detaljerad juridisk text under (för de som vill)
- Specifikt avsnitt: "Dina rättigheter" (rätt att radera, exportera, invända)
- Kontaktuppgifter till dataskyddsansvarig
- Datum när policy senast uppdaterades

---

## 5. Swedish Market Specifics

### 5.1 Kulturella hänsyn

**Direkt kommunikation:**
- Svenspar föredrar direkt, informationsstyrd kommunikation
- Undvik överdrivet säljigt språk och hype
- Faktabaserat > emotionella triggers
- "Värdet av bra hälsa" resonerar bättre än rädsla-baserad kommunikation

**Jantelagen och self-promotion:**
- Undvik att låta överlägsen eller förmyndaraktig
- "Vi delar vad forskningen säger" > "Vi är experterna"
- Formulera det som information, ej föreläsning
- Empowerment-tone: "Du kan påverka din hälsa" > "Du måste göra X"

**Tillit till vetenskapliga institutioner:**
- Svenspar litar generellt på forskning, Karolinska, Folkhälsomyndigheten
- Hänvisa till erkända svenska och internationella institutioner
- Undvik pseudovetenskap och övertygande påståenden

### 5.2 Språk och ton

**Tilltal:**
- "Du" (inte "ni" i singular) – standard i modern svenska marknadsföring
- Vänlig men professionell – ej alltför formell, ej alltför ungdomlig
- Undvik anglicismer som inte är etablerade

**Ord att använda:**
- "Forskning visar", "studier tyder på", "evidensbaserat"
- "Hälsosamt åldrande", "friska år", "vitalitet"
- "Välmående" (välkänt, positivt laddat)

**Ord att undvika:**
- "Game-changer" (klichéartat, for "American")
- Överdrifter ("revolutionerande", "livsförändrande") utan bevis
- Medicinska påståenden som kan uppfattas som diagnos/behandling

### 5.3 Tekniska vanor hos målgruppen

**Enheter:**
- 55-70% av 40-70-åriga besöker sajter på mobil
- Desktop fortfarande vanligare hos 55+ jämfört med yngre
- Tablet relativt populärt i åldersgruppen

**Internet-vana:**
- E-handel och bankärenden vanliga – de är digitalt vana
- Dock: Mindre tolerans för komplex UX och tekniska problem
- Värderar tydlighet och förutsägbarhet

**Webbläsare:**
- Chrome dominerar (60%+)
- Safari populärt på iOS-enheter
- Äldre Edge/Firefox-versioner kan förekomma – testa bred kompatibilitet

### 5.4 Betalningsvanor (om framtida premium)

Om betaltjänster läggs till:
- Swish: Förväntas av svenska målgruppen
- Klarna: Bekant och tryggt
- Kort: Visa/Mastercard standard
- Undvik PayPal som enda alternativ (lägre adoptionsgrad i Sverige)

---

## 6. Artikel och Content-sidor

### 6.1 Artiklar för longevity-målgruppen

**Struktur:**
- Rubrik: Problemlösande eller nyfikenhetskapande
- Ingress (150-200 ord): Motivera att läsa vidare
- Tydliga avsnitt med mellanrubriker
- Punktlistor och tabeller för skanbarhet
- Vetenskapliga fakta med källor
- Praktiska take-aways i slutet

**Längd:**
- Informativa "pillar articles": 1500-2500 ord
- Snabba tips-artiklar: 500-800 ord
- Djupdyk-artiklar: 2000-3000 ord

**Mediainbäddning:**
- Infografiker för komplexa samband (t.ex. sömncykler, telomerlängd)
- Inga autoplaying videor (störande)
- Bildtexter på alla bilder

### 6.2 SEO i innehållet

- H1 innehåller primärt nyckelord
- Naturlig nyckelordsdensitet (2-3%, ej stuffing)
- Interna länkningar till relaterade artiklar
- Schema.org-markup för artiklar (Article, FAQPage)
- Uppdateringsdatum (signalerar färskhet)

---

## 7. Teknisk Performance

### 7.1 Laddningstid-krav för målgruppen

Äldre användare är mer benägna att lämna en sajt vid långsam laddning:
- FCP < 1,5 sekunder
- LCP < 2,5 sekunder
- Inga layout shifts (CLS < 0,1)

### 7.2 Tillgänglighet (WCAG 2.1 AA)

Tillgänglighet är extra relevant för 40-70+-målgrupp:
- Synnedsättning vanligare
- Motoriska begränsningar (större knappar)
- Kognitiv tillgänglighet (tydlig struktur, ej överväldigande)

**Minimikrav:**
- Alla bilder har alt-text
- Fokus-ordning logisk
- Formulärfält har labels
- Färg ensamt inte enda indikator
- Tillräcklig kontrast

---

*Dokument av Glädje & Harmoni | Version 1.0 | 2026-06-04*
