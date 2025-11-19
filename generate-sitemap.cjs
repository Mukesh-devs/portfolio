// generate-sitemap.cjs
const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');

(async () => {
  try {
    const hostname = 'https://mukesh.tech';
    const sitemap = new SitemapStream({ hostname });

    // Pages for a single-page React portfolio: only the root '/'
    const pages = ['/'];

    // write each page
    pages.forEach(p => sitemap.write({ url: p }));
    sitemap.end();

    const data = await streamToPromise(sitemap); // returns a Buffer
    const xml = data.toString();

    const publicDir = path.join(__dirname, 'public');
    if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

    const outFile = path.join(publicDir, 'sitemap.xml');
    writeFileSync(outFile, xml, 'utf8');

    console.log('✅ sitemap written to', outFile);
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
    process.exit(1);
  }
})();
