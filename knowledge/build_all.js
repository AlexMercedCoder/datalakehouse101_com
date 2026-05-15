const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contentDir = path.join(__dirname, 'content');
const generateScript = path.join(__dirname, 'generate.js');

fs.readdirSync(contentDir).forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(contentDir, file);
        try {
            console.log(`Generating page for ${file}...`);
            execSync(`node "${generateScript}" "${filePath}"`, { stdio: 'inherit' });
        } catch (error) {
            console.error(`Error generating ${file}:`, error.message);
        }
    }
});

console.log('All knowledge base pages generated successfully.');
