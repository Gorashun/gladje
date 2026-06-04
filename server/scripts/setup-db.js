'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const { initDb, getDb, closeDb } = require('../database/db');

const SEED_ARTICLES = [
  {
    slug: 'vad-ar-longevity',
    title: 'Vad är longevity – och varför borde du bry dig?',
    excerpt:
      'Longevity handlar inte bara om att leva länge. Det handlar om att leva bra, med hög vitalitet, mental skärpa och glädje ända in i hög ålder.',
    content: `
<h2>Longevity – mer än bara livslängd</h2>
<p>Under de senaste åren har forskningen kring åldrande och livslängd exploderat. Begrepp som <em>healthspan</em> (antal friska år) kontra <em>lifespan</em> (total livslängd) har blivit centrala i hur vi tänker på hälsa.</p>

<p>Longevity är konsten och vetenskapen att förlänga den period av livet då vi är friska, aktiva och mentalt skärpa – inte bara att skjuta upp döden.</p>

<h2>De fem pelarna i longevity</h2>
<ul>
  <li><strong>Sömn</strong> – Den mest kraftfulla återhämtningsmekanismen vi har</li>
  <li><strong>Rörelse</strong> – Regelbunden motion minskar risken för nästan alla kroniska sjukdomar</li>
  <li><strong>Kost</strong> – Vad vi äter påverkar direkt vår cellulära hälsa och inflammation</li>
  <li><strong>Stresshantering</strong> – Kronisk stress accelererar åldrandet på cellnivå</li>
  <li><strong>Sociala band</strong> – Starka relationer är en av de starkaste prediktorerna för ett långt liv</li>
</ul>

<h2>Börja din longevity-resa</h2>
<p>Det behöver inte vara komplicerat. Börja med att ta vårt quiz och få en personlig bedömning av din nuvarande hälsostatus och konkreta steg framåt.</p>
    `.trim(),
    category: 'grunderna',
    author: 'Glädje & Harmoni',
    published: 1,
  },
  {
    slug: 'sovnens-kraft',
    title: 'Sömnens kraft – varför 8 timmar kan förlänga ditt liv',
    excerpt:
      'Forskningen är tydlig: sömnbrist är en av de mest skadliga sakerna du kan göra mot din kropp. Här är vad som händer när du sover – och vad du förlorar när du inte gör det.',
    content: `
<h2>Medan du sover arbetar kroppen</h2>
<p>Under djupsömnen reparerar kroppen vävnader, rensar hjärnan från metabolt avfall via det glymfatiska systemet, och konsoliderar minnen. Detta är inte lyx – det är biologisk nödvändighet.</p>

<h2>Vad händer vid sömnbrist?</h2>
<p>Redan efter en natt med för lite sömn sker mätbara förändringar:</p>
<ul>
  <li>Kortisolnivåerna stiger</li>
  <li>Insulinkänsligheten minskar</li>
  <li>Immunsystemet försvagas</li>
  <li>Hunger- och mättnadshormonerna (ghrelin/leptin) rubbas</li>
  <li>Kognitiv funktion och reaktionstid försämras</li>
</ul>

<h2>Optimera din sömn med enkla åtgärder</h2>
<ol>
  <li>Håll konsekventa sömnider – även på helger</li>
  <li>Gör sovrummet svalt (18–20°C) och mörkt</li>
  <li>Undvik blått ljus 1–2 timmar före sänggående</li>
  <li>Undvik koffein efter kl. 14</li>
  <li>Skapa en avslappnande kväll­rutin</li>
</ol>
    `.trim(),
    category: 'sovn',
    author: 'Glädje & Harmoni',
    published: 1,
  },
  {
    slug: 'rorelse-medicin',
    title: 'Rörelse som medicin – hur träning bromsar åldrandet',
    excerpt:
      'Ingen pille eller supplement kan matcha effekten av regelbunden fysisk aktivitet. Forskning visar att träning påverkar uttrycket av hundratals gener kopplade till åldrande.',
    content: `
<h2>Träning på cellnivå</h2>
<p>När vi tränar sker dramatiska förändringar på cellulär nivå. Mitokondrier (cellernas kraftverk) ökar i antal och effektivitet, telomerer (skyddskapslar vid DNA:t) bevaras, och anti-inflammatoriska signalsubstanser frisätts.</p>

<h2>Styrketräning – den underskattade longevity-faktorn</h2>
<p>Muskelmassa är en av de starkaste prediktorerna för livslängd och funktionell förmåga på äldre dar. Från 35-årsåldern förlorar vi naturligt 1–2% muskelmassa per år utan aktiv träning.</p>

<p>Styrketräning 2–3 gånger per vecka:</p>
<ul>
  <li>Bromsar muskelförlust (sarkopeni)</li>
  <li>Förbättrar bentäthet och minskar osteoporosrisk</li>
  <li>Reglerar blodsockret bättre än konditionsträning</li>
  <li>Förbättrar hormonnivåer naturligt</li>
</ul>

<h2>Zone 2-träning för hjärt-kärlhälsa</h2>
<p>Konditionsträning i lågintensiv "zon 2" (konversationstakt) 150–180 minuter per vecka är kopplad till dramatiskt minskad kardiovaskulär risk och förbättrad mitokondriell funktion.</p>
    `.trim(),
    category: 'rorelse',
    author: 'Glädje & Harmoni',
    published: 1,
  },
  {
    slug: 'kost-for-langt-liv',
    title: 'Kosten som förlänger livet – vad forskningen säger',
    excerpt:
      'Från Okinawa till Sardinien – de befolkningar som lever längst äter förvånansvärt likt varandra. Vi reder ut vad forskningen verkligen säger om kost och longevity.',
    content: `
<h2>Blå zonernas hemlighet</h2>
<p>De så kallade "blå zonerna" – Okinawa, Sardinien, Nicoya, Ikaria och Loma Linda – delar flera kostmönster trots geografiska skillnader:</p>
<ul>
  <li>Huvudsakligen växtbaserad kost</li>
  <li>Minimalt med processad mat</li>
  <li>Baljväxter som staple food</li>
  <li>Måttlig kaloriintag</li>
  <li>Lite alkohol (undantaget Loma Linda)</li>
</ul>

<h2>Vad ska du äta mer av?</h2>
<ul>
  <li><strong>Grönsaker och bär</strong> – rika på polyfenolera och antioxidanter</li>
  <li><strong>Baljväxter</strong> – linser, bönor, kikärtor</li>
  <li><strong>Nötter och frön</strong> – hjärthälsosamma fetter och protein</li>
  <li><strong>Fermenterade livsmedel</strong> – yoghurt, kimchi, kefir för tarmhälsa</li>
  <li><strong>Fet fisk</strong> – omega-3 skyddar hjärta och hjärna</li>
</ul>

<h2>Tidsbegränsat ätande (TRE)</h2>
<p>Att begränsa ätfönstret till 8–10 timmar om dagen (t.ex. 8:00–18:00) aktiverar autofagi – kroppens eget "städsystem" som bryter ner skadade celler och proteiner.</p>
    `.trim(),
    category: 'kost',
    author: 'Glädje & Harmoni',
    published: 1,
  },
  {
    slug: 'stress-och-aldring',
    title: 'Stress och åldrande – hur kronisk stress åldrar dina celler',
    excerpt:
      'Telomerer förkortas snabbare vid kronisk stress. Men det finns beprövade metoder för att vända den trenden och till och med förlänga dina telomerer.',
    content: `
<h2>Stress på cellnivå</h2>
<p>Kronisk stress aktiverar kroppens stressaxel (HPA-axeln) och höjer kortisolnivåerna kontinuerligt. Kortisol i höga doser under lång tid:</p>
<ul>
  <li>Förkortar telomerer (cellåldersmarkören)</li>
  <li>Ökar systemisk inflammation</li>
  <li>Hämmar immunsystemet</li>
  <li>Stör sömnkvaliteten</li>
  <li>Bidrar till visceralt fett (magfett)</li>
</ul>

<h2>Beprövade stressreducerande tekniker</h2>
<h3>1. Mindfulness-meditation</h3>
<p>Studier visar att 8 veckor av mindfulness-baserad stressreduktion (MBSR) mätbart ökar telomerlängden och minskar inflammationsmarkörer.</p>

<h3>2. Djupandning</h3>
<p>Fysiologisk suck (dubbel inandning genom näsan, lång utandning) aktiverar parasympatiska nervsystemet på sekunder.</p>

<h3>3. Naturvistelse</h3>
<p>"Skogsbad" (shinrin-yoku) sänker kortisolnivåerna, blodtrycket och hjärtfrekvensen dokumenterbart.</p>

<h3>4. Socialt stöd</h3>
<p>Oxytocin – frisatt vid positiv social kontakt – motverkar direkt stresshormonernas effekter.</p>
    `.trim(),
    category: 'stress',
    author: 'Glädje & Harmoni',
    published: 1,
  },
];

async function seed() {
  console.log('Setting up database...');
  initDb();
  const db = getDb();

  const insertArticle = db.prepare(`
    INSERT OR IGNORE INTO articles (slug, title, excerpt, content, category, author, published)
    VALUES (@slug, @title, @excerpt, @content, @category, @author, @published)
  `);

  const seedMany = db.transaction((articles) => {
    let inserted = 0;
    for (const article of articles) {
      const result = insertArticle.run(article);
      if (result.changes > 0) inserted++;
    }
    return inserted;
  });

  const inserted = seedMany(SEED_ARTICLES);
  console.log(`Seeded ${inserted} new article(s) (${SEED_ARTICLES.length - inserted} already existed).`);

  closeDb();
  console.log('Database setup complete.');
}

seed().catch((err) => {
  console.error('setup-db failed:', err);
  process.exit(1);
});
