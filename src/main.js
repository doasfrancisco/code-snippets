import { marked } from 'marked';
import './style.css'

const SNIPPETS = {
    'python': ['binary-search', 'quick-sort'],  // Add more algorithms as needed
    'javascript': ['array-methods'],  // Add more categories/snippets
};

function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    
    Object.entries(SNIPPETS).forEach(([language, snippets]) => {
        const langTitle = document.createElement('h3');
        langTitle.textContent = language.toUpperCase();
        sidebar.appendChild(langTitle);
        
        snippets.forEach(snippet => {
            const link = document.createElement('a');
            link.href = `#${snippet}`;
            link.className = 'sidebar-link';
            link.textContent = snippet.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadDocs(snippet);
                document.querySelectorAll('.sidebar-link').forEach(l => 
                    l.classList.remove('active')
                );
                link.classList.add('active');
            });
            
            sidebar.appendChild(link);
        });
    });
    
    return sidebar;
}

async function loadDocs(snippet = 'binary-search') {
    try {
        const response = await fetch(`/docs/${snippet}.md`);
        const markdown = await response.text();
        
        document.querySelector('.content').innerHTML = marked(markdown);
    } catch (error) {
        console.error('Error loading documentation:', error);
    }
}

async function initializeApp() {
    const container = document.createElement('div');
    container.className = 'documentation-container';
    
    const content = document.createElement('div');
    content.className = 'content';
    
    container.appendChild(createSidebar());
    container.appendChild(content);
    
    document.querySelector('#app').appendChild(container);
    
    // Load initial documentation
    await loadDocs();
}

initializeApp();