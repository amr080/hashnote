const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://hashnote-usyc.netlify.app';

// Expanded list of file types to include
const INCLUDED_EXTENSIONS = [
    '.html',
    '.pdf',
    '.txt',
    '.sol',
    '.ts',
    '.csv',
    '.xml',
    '.png',
    '.json'
];

function getFiles(dir, files = []) {
    try {
        const entries = fs.readdirSync(dir);
        
        for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            
            // Skip node_modules and .git
            if (entry === 'node_modules' || entry === '.git') continue;
            
            if (fs.statSync(entryPath).isDirectory()) {
                getFiles(entryPath, files);
            } else {
                const ext = path.extname(entry).toLowerCase();
                if (INCLUDED_EXTENSIONS.includes(ext)) {
                    files.push(entryPath);
                }
            }
        }
        
        return files;
    } catch (error) {
        console.error('Error reading directory:', error);
        return files;
    }
}

try {
    const files = getFiles('.');
    const today = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>`;

    files.forEach(file => {
        const relativePath = file.replace(/\\/g, '/').replace('./', '');
        const priority = file.includes('usyc') || file.includes('hashnote') ? '0.9' : '0.8';
        
        sitemap += `
    <url>
        <loc>${BASE_URL}/${relativePath}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`;
    });

    sitemap += '\n</urlset>';

    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Sitemap generated successfully!');
} catch (error) {
    console.error('Error generating sitemap:', error);
}