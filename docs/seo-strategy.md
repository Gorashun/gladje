# SEO-strategi — Glädje & Harmoni

> Longevity-nisch, svenska marknaden, organisk tillväxt

---

## 1. Strategisk Översikt

### Mål

- **Kortsiktigt (0–6 månader):** Indexering och synlighet för long-tail longevity-keywords
- **Medellångt (6–12 månader):** Top-3 placering för primära svenska longevity-sökfraser
- **Långsiktigt (12+ månader):** Domänauktoritet som referens för longevity i Sverige, featured snippets

### SEO-filosofi

Glädje & Harmoni är i en nisch med låg till medelhög konkurrens på svenska. Engelskspråkiga longevity-sajter (Peter Attia, Bryan Johnson, Huberman Lab) dominerar globalt — men det finns ett tydligt gap för **kvalitativt, vetenskapsbaserat longevity-innehåll på svenska**. Det är vår konkurrensfördel.

Strategin bygger på:
1. **Teknisk excellens** — snabb, tillgänglig, korrekt strukturerad
2. **E-E-A-T** — Erfarenhet, Expertis, Auktoritet, Trovärdighet (Googles kvalitetssignal)
3. **Sökavsikts-matchning** — rätt innehåll till rätt sökfas
4. **Intern länkstruktur** — quizet som konverteringsmotor länkad från allt innehåll

---

## 2. Keyword-research — Svenska Longevity-nischen

### Primära Keywords (High intent, lägre volym)

| Keyword | Månadsvolym (est.) | Konkurrensnivå | Prioritet |
|---------|-------------------|----------------|-----------|
| longevity på svenska | 300–600 | Låg | P0 |
| leva längre hälsa | 400–800 | Låg | P0 |
| longevity test | 200–400 | Låg | P0 |
| longevity quiz | 100–300 | Låg | P0 |
| hur länge lever jag | 500–1 000 | Medel | P0 |
| livslängd test | 200–500 | Låg | P1 |
| biologisk ålder test | 300–700 | Låg | P0 |
| hälsokoll online | 600–1 200 | Medel | P1 |

### Sekundära Keywords (Informationssökningar)

| Keyword | Månasdvolym (est.) | Prioritet |
|---------|-------------------|-----------|
| vad är longevity | 200–400 | P0 |
| longevity kost Sverige | 150–300 | P1 |
| blå zoner vad är det | 300–600 | P1 |
| telomerer åldring | 200–400 | P1 |
| NAD+ åldring | 200–500 | P1 |
| intermittent fasta longevity | 400–800 | P1 |
| kalorirestiktion liv längre | 150–300 | P2 |
| sömn och livslängd | 500–900 | P1 |
| stress påverkar livslängd | 300–600 | P1 |
| träning livslängd forskning | 400–700 | P1 |
| medelhavsdieten longevity | 300–600 | P1 |
| rökfri livsstil år extra | 200–400 | P2 |

### Long-tail Keywords (Konverteringsnära)

| Keyword | Intent | Prioritet |
|---------|--------|-----------|
| testa din biologiska ålder gratis | Transaktionell | P0 |
| gratis longevity quiz svenska | Transaktionell | P0 |
| hur förbättra min livslängd | Informationell/Transaktionell | P0 |
| longevity tips för 50-åringar | Informationell | P1 |
| kost tips leva längre Sverige | Informationell | P1 |
| hälsosam åldrande program | Transaktionell | P1 |

### Semantiska Kluster

Bygg innehåll runt dessa tematiska kluster för topical authority:

**Kluster 1: Biologisk ålder och tester**
- Kärnkeyword: biologisk ålder
- Relaterat: telomerlängd, epigenetisk klocka, blodvärden

**Kluster 2: Kost och longevity**
- Kärnkeyword: longevity kost
- Relaterat: blå zoner mat, medelhavsdieten, fasta

**Kluster 3: Träning och rörelse**
- Kärnkeyword: träning livslängd
- Relaterat: VO2 max, styrketräning åldring, NEAT

**Kluster 4: Sömn och återhämtning**
- Kärnkeyword: sömn hälsa
- Relaterat: djupsömn, sömnkvalitet, cirkadisk rytm

**Kluster 5: Mental hälsa och sociala faktorer**
- Kärnkeyword: mental hälsa livslängd
- Relaterat: ensamhet hälsa, meningsfullhet, ikigai

---

## 3. Teknisk SEO — Implementation

### Core Web Vitals — Mål

| Metrik | Mål | Åtgärd |
|--------|-----|--------|
| LCP (Largest Contentful Paint) | < 2,5 s | Optimerade bilder (WebP, lazy load), minimal CSS |
| FID/INP (Interaction to Next Paint) | < 100 ms | Minimal JS, ingen render-blocking |
| CLS (Cumulative Layout Shift) | < 0,1 | Explicita bild-dimensioner, reserverade utrymmen |
| TTFB (Time to First Byte) | < 600 ms | Server-side caching, Nginx gzip |

### HTML-struktur (Kritisk för SEO)

```html
<!-- Korrekt heading-hierarki -->
<h1>En unik per sida — primärt keyword inkluderat</h1>
  <h2>Sektionshuvuden</h2>
    <h3>Undersektioner</h3>

<!-- Semantiska landmarks -->
<header>, <nav>, <main>, <article>, <aside>, <footer>

<!-- Alt-texter på alla bilder -->
<img src="longevity-quiz.webp" 
     alt="Interaktivt longevity-quiz — testa din biologiska ålder" 
     width="800" height="450" loading="lazy">
```

### Schema.org Markup — Prioriterade typer

**Landningssida:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Glädje & Harmoni Longevity Quiz",
  "description": "Gratis quiz för att testa din biologiska ålder och få personaliserade longevity-råd",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "SEK"
  },
  "inLanguage": "sv-SE"
}
```

**FAQ-sidor:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Vad är longevity?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Longevity handlar om vetenskapen och praktiken att förlänga ett friskt, aktivt liv..."
    }
  }]
}
```

**Artiklar/Bloggposter:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titel på artikeln",
  "author": {"@type": "Organization", "name": "Glädje & Harmoni"},
  "datePublished": "2026-06-04",
  "inLanguage": "sv-SE"
}
```

### Meta-tags — Mall

```html
<!-- Primär meta -->
<title>Testa Din Biologiska Ålder | Gratis Longevity Quiz | Glädje & Harmoni</title>
<meta name="description" content="Ta vårt gratis longevity-quiz och få reda på din biologiska ålder. Personaliserade råd för ett längre, friskare liv. Vetenskapsbaserat, på svenska.">

<!-- Canonical -->
<link rel="canonical" href="https://gladjeharmoni.se/">

<!-- Open Graph -->
<meta property="og:title" content="Testa Din Biologiska Ålder — Gratis Longevity Quiz">
<meta property="og:description" content="Personaliserade longevity-råd baserade på forskning. Tar 5 minuter.">
<meta property="og:image" content="https://gladjeharmoni.se/img/og-quiz.jpg">
<meta property="og:type" content="website">
<meta property="og:locale" content="sv_SE">

<!-- hreflang (om flerspråkig expansion) -->
<link rel="alternate" hreflang="sv" href="https://gladjeharmoni.se/">

<!-- Robots -->
<meta name="robots" content="index, follow">
```

### URL-struktur

```
gladjeharmoni.se/                          # Startsida
gladjeharmoni.se/quiz/                     # Quiz
gladjeharmoni.se/resultat/                 # Resultat (noindex)
gladjeharmoni.se/om-longevity/             # Informationshubb
gladjeharmoni.se/om-longevity/biologisk-alder/
gladjeharmoni.se/om-longevity/kost/
gladjeharmoni.se/om-longevity/traning/
gladjeharmoni.se/om-longevity/somn/
gladjeharmoni.se/om-longevity/stress/
gladjeharmoni.se/integritetspolicy/        # Noindex ok
gladjeharmoni.se/sitemap.xml
gladjeharmoni.se/robots.txt
```

**URL-regler:**
- Alltid gemener
- Bindestreck som ordavdelare (ej underscore)
- Svenska tecken (å, ä, ö) är ok men kontrollera encoding
- Undvik parametrar i URL:er för indexerade sidor

### robots.txt

```
User-agent: *
Allow: /
Disallow: /resultat/
Disallow: /api/
Disallow: /admin/

Sitemap: https://gladjeharmoni.se/sitemap.xml
```

### XML-sitemap (prioriterade sidor)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gladjeharmoni.se/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://gladjeharmoni.se/quiz/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://gladjeharmoni.se/om-longevity/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 4. On-Page SEO — Sidspecifika Riktlinjer

### Startsidan (index.html)

- **Title:** `Glädje & Harmoni | Gratis Longevity Quiz — Testa Din Biologiska Ålder`
- **H1:** `Hur länge och hur bra kommer du att leva?`
- **Meta-description:** Täck quiz + vetenskaplig grund + gratis + 5 minuter
- **Above the fold:** Quiz-CTA synlig utan scrollning
- **Interna länkar:** Till alla informationssidor

### Quiz-sidan (quiz.html)

- **noindex** under MVP (konverteringssida, ej informationssida)
- Eller: index med rich snippet för quiz/test-format
- Progress-indikator synlig (bra för UX och bounce rate)

### Informationssidor (post-MVP)

Varje informationssida ska:
- Vara 800–2 000 ord
- Inkludera primärt keyword i: title, H1, första 100 ord, en H2, alt-text
- Ha intern länk till quizet (CTA)
- Inkludera externa länkar till vetenskapliga källor (PubMed, KI, etc.)
- Ha minst en FAQ-sektion med FAQ Schema

---

## 5. E-E-A-T — Bygga Trovärdighet

Google värdesätter E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) extra högt för hälsorelaterade sajter ("Your Money or Your Life" — YMYL).

### Åtgärder för E-E-A-T

1. **Källhänvisningar** — Länka alltid till primärkällor (PubMed, Karolinska, SBU)
2. **"Om oss"-sida** — Beskriv teamets bakgrund, varför vi bryr oss om longevity
3. **Disclaimer** — Tydlig: "Glädje & Harmoni ersätter inte medicinsk rådgivning"
4. **Datum på allt innehåll** — Visa när det publicerades och uppdaterades
5. **Kontaktuppgifter** — E-post synlig, inte bara formulär
6. **Certifieringar/Partners** — Om möjligt, samarbeta med svenska hälsoorganisationer

---

## 6. Länkbyggande — Off-Page SEO

### Strategi för inlänkar (backlinks)

**Fas 1 (0–6 månader) — Förtjänade länkar:**
- Presskontakter till hälsojournalister (Aftonbladet Hälsa, Expressen Hälsa, Femina)
- Gästartiklar i svenska hälsobloggar och podcasts
- HARO-ekvivalent (SourceBottle, JournoRequests) för expertcitat

**Fas 2 (6–12 månader) — Linkbait-innehåll:**
- Publicera originell data från quizresultat (aggregerat, anonymiserat)
- "Sveriges Longevity Index 2026" — pressworthy rapport
- Infografik om blå zoner och Sverige (delbar)

**Svenska hälsodomäner att rikta mot:**
- 1177.se (Svårt men högt DA — nämnas på forumsvar)
- Hjärt-Lungfonden
- Cancerfonden
- Svenska hälsobloggar (Fitnessmagazine.se, Hälsoliv.se)
- Lyssna på podcasts om hälsa och be om länk

---

## 7. Mätning och KPI:er

### Verktyg

- **Google Search Console** — Primär SEO-mätning (obligatoriskt från dag 1)
- **Google Analytics 4** — Trafikanalys (GDPR: aktivera IP-anonymisering, cookieless om möjligt)
- **Ahrefs / Semrush** — Keyword tracking, baklenksanalys (välj ett)

### SEO KPI:er — MVP-fas (6 månader)

| KPI | Mål |
|-----|-----|
| Indexerade sidor | 10+ |
| Organiska besök/månad | 500+ |
| Genomsnittlig position för primära keywords | < 20 |
| Click-through rate (CTR) | > 3% |
| Core Web Vitals — bestod | Alla tre gröna |
| Inlänkar (referrerande domäner) | 10+ |

### Månadsrapport — Vad vi mäter

1. Organisk trafik (trend, YoY när möjligt)
2. Keyword-positioner för top-20 keywords
3. Nya/förlorade inlänkar
4. Core Web Vitals-status
5. Quiz-completions från organisk trafik
6. Opt-in-rate från organisk trafik

---

## 8. Innehållskalender — SEO-fokuserat (Post-MVP)

| Vecka | Innehåll | Primärt keyword |
|-------|----------|-----------------|
| V1 | Vad är longevity? Komplett guide | vad är longevity |
| V2 | Biologisk ålder vs kronologisk ålder | biologisk ålder |
| V3 | De 5 blå zonerna — vad kan vi lära oss? | blå zoner |
| V4 | Longevity-kost: Vad forskningen säger | longevity kost |
| V6 | Träning och livslängd: Hur mycket räcker? | träning livslängd |
| V8 | Sömn och åldrande: Varför djupsömn är avgörande | sömn livslängd |
| V10 | Stress och cortisol: Hur stress åldrar oss | stress åldrande |
| V12 | Social hälsa: Ensamhetsepidemins påverkan på livslängd | ensamhet hälsa livslängd |

---

## 9. Lokalt och Nationellt SEO

Sverige är en liten marknad. Fokusera på:

- **Nationellt** — Ranka på generella svenska longevity-sökningar
- **Stockholm-specifikt (post-MVP)** — "longevity klinik Stockholm", "hälsokoll Stockholm"
- **Hreflang** — Markera `hreflang="sv"` och `hreflang="sv-SE"` tydligt

---

## 10. Checklista — SEO-granskning vid Launch

- [ ] Google Search Console verifierad och sitemap inlämnad
- [ ] robots.txt korrekt konfigurerad
- [ ] Alla sidor har unika title + meta-description
- [ ] Inga brutna interna länkar (crawla med Screaming Frog eller liknande)
- [ ] HTTPS aktiverat, inga mixed content-varningar
- [ ] Core Web Vitals testad med PageSpeed Insights
- [ ] Schema.org markup validerad med Google Rich Results Test
- [ ] Open Graph-bilder verifierade med Facebook Debugger
- [ ] Canonical URLs satta korrekt
- [ ] Analytics och Search Console kopplat
