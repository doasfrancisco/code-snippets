import fs from 'fs/promises';
import path from 'path';

const SNIPPETS_DIR = './snippets';
const DOCS_DIR = 'public/docs';
const IGNORED_DIRS = ['venv'];
const IGNORED_FILES = ['requirements.txt'];

async function generateDocs() {
    try {
        // Get all directories in snippets folder
        const directories = (await fs.readdir(SNIPPETS_DIR, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory() && !IGNORED_DIRS.includes(dirent.name))
            .map(dirent => dirent.name);

        
        // Create docs directory
        await fs.mkdir(DOCS_DIR, { recursive: true });
        
        // Create README.md if it doesn't exist
        const readmePath = path.join(DOCS_DIR, 'README.md');
        if (!await fs.access(readmePath).catch(() => false)) {
            await fs.writeFile(readmePath, '# Code Snippets\n\nWelcome to the code snippets documentation.');
        }

        // Create 404.md if it doesn't exist
        const notFoundPath = path.join(DOCS_DIR, '_404.md');
        if (!await fs.access(notFoundPath).catch(() => false)) {
            await fs.writeFile(notFoundPath, '# 404 - Not found\n\nThe page you\'re looking for doesn\'t exist.');
        }

        // Generate sidebar content
        let sidebarContent = '';
        
        // Process each directory
        for (const dir of directories) {
            const files = (await fs.readdir(path.join(SNIPPETS_DIR, dir), { withFileTypes: true }))
                .filter(dirent => dirent.isFile() && !IGNORED_FILES.includes(dirent.name))
                .map(dirent => dirent.name);
            
            // Add directory as main category
            sidebarContent += `\n* ${dir.charAt(0).toUpperCase() + dir.slice(1)}\n`;
            
            // Process files in directory
            for (const file of files) {
                const snippetName = path.basename(file, path.extname(file));
                const displayName = snippetName
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                
                // Changed: Update sidebar link to point to flat structure
                sidebarContent += `  * [${displayName}](${dir}-${snippetName}.md)\n`;
                
                // Changed: Remove subdirectory creation since we're using flat structure
                // Generate documentation for each file
                const content = await fs.readFile(path.join(SNIPPETS_DIR, dir, file), 'utf8');
                const docstringMatch = content.match(/"{3}([\s\S]*?){3}/);
                const docstring = docstringMatch ? docstringMatch[1].trim() : '';
                
                const markdown = `
# ${displayName}

\`\`\`${path.extname(file).slice(1)}
${content}
\`\`\`

${docstring.split('\n').map(line => line.trim()).join('\n')}
`;
                
                // Changed: Write files to root docs directory with directory prefix
                await fs.writeFile(path.join(DOCS_DIR, `${dir}-${snippetName}.md`), markdown);
            }
        }
        
        // Write sidebar file
        await fs.writeFile(path.join(DOCS_DIR, '_sidebar.md'), sidebarContent);
        
        console.log('Documentation generated successfully!');
    } catch (error) {
        console.error('Error generating documentation:', error);
    }
};

generateDocs();
