const fs = require('fs/promises');
const path = require('path');

const SNIPPETS_DIR = './snippets';
const DOCS_DIR = './docs';
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

        // Generate sidebar content
        let sidebarContent = '';
        
        // Process each directory
        for (const dir of directories) {
            // Create directory in docs
            const docsSubDir = path.join(DOCS_DIR, dir);
            await fs.mkdir(docsSubDir, { recursive: true });
            
            // Add category configuration file
            const categoryConfig = {
                label: dir.charAt(0).toUpperCase() + dir.slice(1),
                position: directories.indexOf(dir) + 1,
                link: {
                    type: "generated-index",
                    description: `Code snippets for ${dir} category.`
                }
            };
            await fs.writeFile(
                path.join(docsSubDir, '_category_.json'),
                JSON.stringify(categoryConfig, null, 2)
            );
            
            const files = (await fs.readdir(path.join(SNIPPETS_DIR, dir), { withFileTypes: true }))
                .filter(dirent => dirent.isFile() && !IGNORED_FILES.includes(dirent.name))
                .map(dirent => dirent.name);
            
            // Add directory as main category
            sidebarContent += `\n* ${dir.charAt(0).toUpperCase() + dir.slice(1)}\n`;
            
            // Process files in directory
            
            let sidebarPosition = 0;
            for (const file of files) {
                const snippetName = path.basename(file, path.extname(file));
                const displayName = snippetName
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                sidebarPosition++;
                sidebarContent += `  * [${displayName}](${dir}/${snippetName}.md)\n`;
                
                // Generate documentation for each file
                const content = await fs.readFile(path.join(SNIPPETS_DIR, dir, file), 'utf8');
                const docstringMatch = content.match(/"{3}([\s\S]*?){3}/);
                const docstring = docstringMatch ? docstringMatch[1].trim() : '';
                
                const markdown = `---
sidebar_position: ${sidebarPosition}
---

# ${displayName}

\`\`\`${path.extname(file).slice(1)}
${content}
\`\`\`

${docstring.split('\n').map(line => line.trim()).join('\n')}
`;
                
                await fs.writeFile(path.join(docsSubDir, `${snippetName}.md`), markdown);
            }
        }      
        console.log('Documentation generated successfully!');
    } catch (error) {
        console.error('Error generating documentation:', error);
    }
}

generateDocs();