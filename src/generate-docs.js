import fs from 'fs/promises';
import path from 'path';

async function generateDocs() {
    try {
        // Read the Python file
        const pythonFile = await fs.readFile('./snippets/binary.py', 'utf8');
        
        // Extract docstring (everything between triple quotes)
        const docstringMatch = pythonFile.match(/"{3}([\s\S]*?){3}/);
        const docstring = docstringMatch ? docstringMatch[1].trim() : '';
        
        // Generate markdown content
        const markdown = `
# Binary Search

\`\`\`python
${pythonFile}
\`\`\`

## Documentation

${docstring.split('\n').map(line => line.trim()).join('\n')}
`;

        // Ensure docs directory exists
        await fs.mkdir('src/docs', { recursive: true });
        
        // Write markdown file
        await fs.writeFile('src/docs/binary.md', markdown);
        
        console.log('Documentation generated successfully!');
    } catch (error) {
        console.error('Error generating documentation:', error);
    }
}

generateDocs(); 