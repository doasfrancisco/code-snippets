import fs from 'fs/promises';
import path from 'path';

const SNIPPETS_DIR = './snippets';

async function generateDocs() {
    try {
        const files = await fs.readdir(SNIPPETS_DIR);
        
        // Create docs directory
        await fs.mkdir('src/docs', { recursive: true });
        
        // Generate sidebar content
        let sidebarContent = '';
        const categories = {
            'py': 'Python',
            'js': 'JavaScript'
        };
        
        // Group files by category
        const filesByCategory = {};
        
        for (const file of files) {
            const ext = path.extname(file).slice(1);
            if (categories[ext]) {
                if (!filesByCategory[ext]) {
                    filesByCategory[ext] = [];
                }
                filesByCategory[ext].push(file);
            }
        }
        
        // Generate sidebar content
        for (const [ext, categoryFiles] of Object.entries(filesByCategory)) {
            sidebarContent += `\n* ${categories[ext]}\n`;
            
            for (const file of categoryFiles) {
                const snippetName = path.basename(file, path.extname(file));
                const displayName = snippetName
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                    
                sidebarContent += `  * [${displayName}](${snippetName}.md)\n`;
                
                // Generate documentation for each file
                const content = await fs.readFile(path.join(SNIPPETS_DIR, file), 'utf8');
                const docstringMatch = content.match(/"{3}([\s\S]*?){3}/);
                const docstring = docstringMatch ? docstringMatch[1].trim() : '';
                
                const markdown = `
# ${displayName}

\`\`\`${ext}
${content}
\`\`\`

## Documentation

${docstring.split('\n').map(line => line.trim()).join('\n')}
`;
                
                await fs.writeFile(`src/docs/${snippetName}.md`, markdown);
            }
        }
        
        // Write sidebar file
        await fs.writeFile('src/docs/_sidebar.md', sidebarContent);
        
        console.log('Documentation generated successfully!');
    } catch (error) {
        console.error('Error generating documentation:', error);
    }
}

generateDocs();