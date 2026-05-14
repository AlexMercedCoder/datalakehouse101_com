#!/usr/bin/env node
/**
 * Knowledge Base Page Generator
 * Usage: node generate.js <content-file.json>
 */
const fs = require('fs');
const path = require('path');

const contentFile = process.argv[2];
if (!contentFile) { console.error('Usage: node generate.js <content.json>'); process.exit(1); }

const page = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
const outPath = path.join(__dirname, `${page.slug}.html`);

/* ── CTA Block ─────────────────────────────────────────────────────── */
const ctaHTML = `
<section class="cta-section">
  <div class="container">
    <h2 class="cta-heading">Go Deeper — Recommended Resources</h2>
    <p class="cta-sub">Expand your lakehouse expertise with these authoritative books and community resources.</p>
    <div class="cta-grid">
      <a class="cta-card" href="https://www.amazon.com/Architecting-Apache-Iceberg-Lakehouse-open-source/dp/1633435105/" target="_blank" rel="noopener">
        <span class="cta-type">📘 Book</span>
        <span class="cta-title">Architecting an Apache Iceberg Lakehouse</span>
        <span class="cta-publisher">Manning Publications · Alex Merced</span>
        <span class="cta-btn">Buy on Amazon</span>
      </a>
      <a class="cta-card" href="https://www.amazon.com/Open-Source-Lakehouse-Architecting-Analytical/dp/B0GW595MVL/" target="_blank" rel="noopener">
        <span class="cta-type">📗 Book</span>
        <span class="cta-title">The Open Source Lakehouse</span>
        <span class="cta-publisher">Alex Merced</span>
        <span class="cta-btn">Buy on Amazon</span>
      </a>
      <a class="cta-card" href="https://www.amazon.com/Lakehouses-Apache-Iceberg-Agentic-Hands-ebook/dp/B0GQL4QNRT/" target="_blank" rel="noopener">
        <span class="cta-type">📙 Book</span>
        <span class="cta-title">The 2026 Guide to Lakehouses, Apache Iceberg and Agentic AI</span>
        <span class="cta-publisher">Alex Merced</span>
        <span class="cta-btn">Buy on Amazon</span>
      </a>
      <a class="cta-card" href="https://www.amazon.com/Apache-Iceberg-Agentic-Connecting-Structured/dp/B0GW2WF4PX/" target="_blank" rel="noopener">
        <span class="cta-type">📕 Book</span>
        <span class="cta-title">Apache Iceberg and Agentic AI</span>
        <span class="cta-publisher">Alex Merced</span>
        <span class="cta-btn">Buy on Amazon</span>
      </a>
      <a class="cta-card" href="https://amdatalakehouse.substack.com/" target="_blank" rel="noopener">
        <span class="cta-type">📬 Newsletter</span>
        <span class="cta-title">Alex Merced's Open Lakehouse Newsletter</span>
        <span class="cta-publisher">Weekly updates on Lakehouse OSS &amp; Agentic AI</span>
        <span class="cta-btn">Subscribe on Substack</span>
      </a>
    </div>
  </div>
</section>`;

/* ── Helpers ────────────────────────────────────────────────────────── */
function buildTOC(sections) {
  return sections.map((s, i) =>
    `<li><a href="#section-${i+1}">${s.heading}</a></li>`
  ).join('\n        ');
}

function buildSections(sections) {
  return sections.map((s, i) => {
    const diag = s.diagram
      ? `<figure class="diagram-block"><img src="../assets/img/knowledge/${s.diagram}" alt="${s.diagramAlt || s.heading} diagram" loading="lazy"><figcaption>${s.diagramCaption || ''}</figcaption></figure>`
      : '';
    return `
      <section id="section-${i+1}">
        <h2>${s.heading}</h2>
        ${s.content}
        ${diag}
      </section>`;
  }).join('\n');
}

function buildRelated(related) {
  return related.map(r =>
    `<a class="related-card" href="${r.slug}.html">
      <span class="related-label">${r.category}</span>
      <span class="related-term">${r.term}</span>
      <span class="related-desc">${r.desc}</span>
    </a>`
  ).join('\n      ');
}

function buildKeywords(p) {
  const base = [p.term, 'data lakehouse', 'Apache Iceberg'];
  const related = (p.related || []).map(r => r.term);
  return [...new Set([...base, ...related])].slice(0, 12).join(', ');
}

/* ── LD+JSON Schemas ────────────────────────────────────────────────── */
function articleSchema(p) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": p.h1,
    "description": p.metaDescription,
    "keywords": buildKeywords(p),
    "author": { "@type": "Person", "name": "Alex Merced", "url": "https://alexmerced.com" },
    "publisher": {
      "@type": "Organization",
      "name": "DataLakehouse101.com",
      "url": "https://datalakehouse101.com",
      "logo": { "@type": "ImageObject", "url": "https://datalakehouse101.com/assets/img/favicon.png" }
    },
    "datePublished": p.datePublished || "2026-05-14",
    "dateModified": p.datePublished || "2026-05-14",
    "url": `https://datalakehouse101.com/knowledge/${p.slug}.html`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://datalakehouse101.com/knowledge/${p.slug}.html` },
    "image": { "@type": "ImageObject", "url": "https://datalakehouse101.com/assets/img/og-image.png", "width": 1200, "height": 630 }
  };
}

function breadcrumbSchema(p) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://datalakehouse101.com" },
      { "@type": "ListItem", "position": 2, "name": "Knowledge Base", "item": "https://datalakehouse101.com/knowledge/" },
      { "@type": "ListItem", "position": 3, "name": p.term, "item": `https://datalakehouse101.com/knowledge/${p.slug}.html` }
    ]
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

/* ── Render ─────────────────────────────────────────────────────────── */
const ldJson = JSON.stringify([articleSchema(page), breadcrumbSchema(page), faqSchema(page.faqs)], null, 2);
const keywords = buildKeywords(page);
const pageUrl = `https://datalakehouse101.com/knowledge/${page.slug}.html`;
const fullTitle = `${page.metaTitle} | Data Lakehouse 101`;
const pubDate = page.datePublished || '2026-05-14';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fullTitle}</title>
  <meta name="description" content="${page.metaDescription}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="Alex Merced">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${page.metaDescription}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="https://datalakehouse101.com/assets/img/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="DataLakehouse101.com">
  <meta property="article:author" content="Alex Merced">
  <meta property="article:published_time" content="${pubDate}">
  <meta property="article:section" content="${page.category}">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${page.metaDescription}">
  <meta name="twitter:image" content="https://datalakehouse101.com/assets/img/og-image.png">
  <meta name="twitter:creator" content="@alexmercedcoder">
  <meta name="twitter:site" content="@alexmercedcoder">

  <link rel="icon" type="image/png" href="../assets/img/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="knowledge.css">

  <script type="application/ld+json">
${ldJson}
  </script>
</head>
<body>
  <div id="reading-progress"></div>

  <nav class="site-nav">
    <div class="nav-inner">
      <a class="nav-logo" href="../index.html">Data<span>Lakehouse</span>101</a>
      <ul class="nav-links">
        <li><a href="../index.html">Home</a></li>
        <li><a href="index.html" class="active">Knowledge Base</a></li>
      </ul>
    </div>
  </nav>

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <ol>
        <li><a href="../index.html">Home</a></li>
        <li><a href="index.html">Knowledge Base</a></li>
        <li class="current">${page.term}</li>
      </ol>
    </div>
  </nav>

  <header class="article-hero">
    <div class="hero-inner">
      <span class="hero-category">${page.category}</span>
      <h1>${page.h1}</h1>
      <p class="hero-lede">${page.lede}</p>
      <div class="hero-meta">
        <span>By <a href="https://alexmerced.com" rel="author" style="color:inherit">Alex Merced</a></span>
        <span id="reading-time">Loading\u2026</span>
        <span>Updated ${pubDate}</span>
      </div>
    </div>
  </header>

  <div class="page-layout">
    <aside class="toc-sidebar" aria-label="Table of contents">
      <h2>On This Page</h2>
      <ol>
        ${buildTOC(page.sections)}
      </ol>
    </aside>

    <article class="article-body">
      ${buildSections(page.sections)}
    </article>
  </div>

  <section class="related-concepts">
    <div class="container">
      <h2>Related Concepts</h2>
      <div class="related-grid">
        ${buildRelated(page.related)}
      </div>
    </div>
  </section>

  ${ctaHTML}

  <footer class="site-footer">
    <p>&copy; 2026 DataLakehouse101.com &mdash; <a href="../index.html">Home</a> &middot; <a href="index.html">Knowledge Base</a></p>
  </footer>

  <script src="knowledge.js"></script>
</body>
</html>`;

fs.writeFileSync(outPath, html, 'utf8');
console.log(`\u2705 Written: ${outPath}`);
