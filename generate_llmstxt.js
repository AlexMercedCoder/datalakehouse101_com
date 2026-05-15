const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://datalakehouse101.com';
const ROOT_DIR = __dirname;
const LLMS_TXT_PATH = path.join(ROOT_DIR, 'llms.txt');

function extractTitleAndDesc(htmlContent) {
    let titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
    let title = titleMatch ? titleMatch[1].replace(' | Data Lakehouse 101', '').replace(' (2026)', '') : 'Untitled';
    
    let descMatch = htmlContent.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    let desc = descMatch ? descMatch[1] : '';
    
    return { title, desc };
}

let content = `# DataLakehouse101.com

> DataLakehouse101.com is the definitive knowledge hub for the modern data lakehouse — 100 authoritative, expert-written guides on Apache Iceberg, Dremio, open table formats, catalog technologies, governance, analytics, and AI-native data architectures. Written by Alex Merced, VP of Developer Relations at Dremio and author of multiple books on data lakehouse architecture.

## About

- [Home](${DOMAIN}/): Introduction to the data lakehouse, key concepts, and navigation to all resources
- [Knowledge Base](${DOMAIN}/knowledge/): Index of all 100 definitive guides on data lakehouse terms

## Deep Dive & Cornerstone Guides

`;

// Read top level directories
const entries = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
const guides = [];
entries.forEach(entry => {
    if (entry.isDirectory() && entry.name !== 'knowledge' && entry.name !== 'assets' && !entry.name.startsWith('.')) {
        const indexPath = path.join(ROOT_DIR, entry.name, 'index.html');
        if (fs.existsSync(indexPath)) {
            const html = fs.readFileSync(indexPath, 'utf-8');
            const { title, desc } = extractTitleAndDesc(html);
            guides.push(`- [${title}](${DOMAIN}/${entry.name}/): ${desc}`);
        }
    }
});

content += guides.join('\n') + '\n\n';
content += '## Knowledge Base Glossary\n\n';

const knowledgeDir = path.join(ROOT_DIR, 'knowledge');
if (fs.existsSync(knowledgeDir)) {
    const kbFiles = fs.readdirSync(knowledgeDir);
    const kbLinks = [];
    kbFiles.forEach(file => {
        if (file.endsWith('.html') && file !== 'index.html') {
            const html = fs.readFileSync(path.join(knowledgeDir, file), 'utf-8');
            const { title, desc } = extractTitleAndDesc(html);
            kbLinks.push(`- [${title}](${DOMAIN}/knowledge/${file}): ${desc}`);
        }
    });
    content += kbLinks.join('\n') + '\n\n';
}

content += `## Author

- [Alex Merced](https://alexmerced.com): VP Developer Relations at Dremio, author of multiple books on data lakehouse, Apache Iceberg, and Agentic AI
- [Substack Newsletter](https://amdatalakehouse.substack.com): Weekly updates on open lakehouse OSS and Agentic AI

## Books by Alex Merced

- [Architecting an Apache Iceberg Lakehouse](https://www.amazon.com/Architecting-Apache-Iceberg-Lakehouse-open-source/dp/1633435105/): Manning Publications — the definitive book on building enterprise lakehouses with Apache Iceberg
- [The Open Source Lakehouse](https://www.amazon.com/Open-Source-Lakehouse-Architecting-Analytical/dp/B0GW595MVL/): Comprehensive guide to open lakehouse architecture
- [The 2026 Guide to Lakehouses, Apache Iceberg and Agentic AI](https://www.amazon.com/Lakehouses-Apache-Iceberg-Agentic-Hands-ebook/dp/B0GQL4QNRT/): Current-year handbook on lakehouses and AI
- [Apache Iceberg and Agentic AI](https://www.amazon.com/Apache-Iceberg-Agentic-Connecting-Structured/dp/B0GW2WF4PX/): Connecting structured data to AI agents via Iceberg
`;

fs.writeFileSync(LLMS_TXT_PATH, content);
console.log('Successfully wrote llms.txt');
