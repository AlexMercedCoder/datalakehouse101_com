const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contentDir = path.join(__dirname, 'content');
const generateScript = path.join(__dirname, 'generate.js');

let diffCount = 0;
let cleanCount = 0;

fs.readdirSync(contentDir).forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(contentDir, file);
        const slug = file.replace('.json', '');
        const existingHtmlPath = path.join(__dirname, `${slug}.html`);
        
        let existingHtml = '';
        if (fs.existsSync(existingHtmlPath)) {
            existingHtml = fs.readFileSync(existingHtmlPath, 'utf8');
        }

        // Generate the output in memory (we'll modify generate.js temporarily or just use the same logic)
        // Temporarily copy json and rewrite slug
        const tempJsonPath = path.join(contentDir, `${slug}_temp.json`);
        const tempHtmlPath = path.join(__dirname, `${slug}_temp.html`);
        
        let jsonContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        jsonContent.slug = `${slug}_temp`;
        fs.writeFileSync(tempJsonPath, JSON.stringify(jsonContent));
        
        try {
            // Run generate script on the temp json
            execSync(`/usr/local/bin/node "${generateScript}" "${tempJsonPath}"`, { stdio: 'ignore' });
            
            let newHtml = fs.readFileSync(tempHtmlPath, 'utf8');
            newHtml = newHtml.replaceAll(`${slug}_temp`, slug);
            
            if (existingHtml !== newHtml && existingHtml !== '') {
                console.log(`⚠️ DIFF DETECTED: ${slug}.html has manual edits that would be overwritten.`);
                diffCount++;
            } else if (existingHtml === '') {
                console.log(`➕ NEW FILE: ${slug}.html would be created.`);
            } else {
                cleanCount++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        } finally {
            // Cleanup
            if (fs.existsSync(tempJsonPath)) fs.unlinkSync(tempJsonPath);
            if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
        }
    }
});

console.log('--- SUMMARY ---');
console.log(`Clean (No diffs): ${cleanCount}`);
console.log(`Modified (Has diffs): ${diffCount}`);
if (diffCount === 0) {
    console.log('✅ Safe to run generate.js / build_all.js. No manual edits will be lost.');
} else {
    console.log('❌ Do NOT run build_all.js yet. Some files have manual edits not reflected in the JSON.');
}
