import './style.css'
import { marked } from 'marked';

async function loadDocs() {
    try {
        const response = await fetch('docs/binary.md');
        const markdown = await response.text();
        
        document.querySelector('#app').innerHTML = marked(markdown);
    } catch (error) {
        console.error('Error loading documentation:', error);
    }
}

loadDocs();