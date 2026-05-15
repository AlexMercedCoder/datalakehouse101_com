const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://datalakehouse101.com';
const ROOT_DIR = __dirname;
const SITEMAP_PATH = path.join(ROOT_DIR, 'sitemap.xml');
const TODAY = new Date().toISOString().split('T')[0];

const urls = [];

// 1. Add Homepage
urls.push(`    <url>
        <loc>${DOMAIN}/</loc>
        <lastmod>${TODAY}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`);

// 2. Add all Deep Dive / Cornerstone Directories
const entries = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
entries.forEach(entry => {
    if (entry.isDirectory() && entry.name !== 'knowledge' && entry.name !== 'assets' && !entry.name.startsWith('.')) {
        const indexPath = path.join(ROOT_DIR, entry.name, 'index.html');
        if (fs.existsSync(indexPath)) {
            urls.push(`    <url>
        <loc>${DOMAIN}/${entry.name}/</loc>
        <lastmod>${TODAY}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>`);
        }
    }
});

// 3. Add all Knowledge Base HTML files
const knowledgeDir = path.join(ROOT_DIR, 'knowledge');
if (fs.existsSync(knowledgeDir)) {
    const kbFiles = fs.readdirSync(knowledgeDir);
    kbFiles.forEach(file => {
        if (file.endsWith('.html') && file !== 'index.html') {
            urls.push(`    <url>
        <loc>${DOMAIN}/knowledge/${file}</loc>
        <lastmod>${TODAY}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`);
        }
    });
}

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, sitemapContent);
console.log(`Successfully wrote ${urls.length} URLs to sitemap.xml`);
