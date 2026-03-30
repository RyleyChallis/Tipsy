// --- NAVIGATION CONTROLS ---
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('#menu-overlay');

const closeMenu = () => {
    menu?.classList.remove('is-active');
    menuLinks?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
};

// Toggle menu and overlay
menu?.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

overlay?.addEventListener('click', closeMenu);

async function navigateTo(urlStr) {
    const url = new URL(urlStr, window.location.origin);
    const hash = url.hash; 
    const path = url.pathname;

    try {
        // 1. Check if the physical file exists
        const response = await fetch(url.origin + path, { method: 'HEAD' });

        if (!response.ok) {
            throw new Error('File not found');
        }

        // 2. Check for the section (ID), but ignore empty "#" links
        if (hash && hash !== '#') {
            const target = document.querySelector(hash);
            if (!target) {
                throw new Error('Section not found');
            }
        }

        // 3. If all is well, go to the URL
        window.location.href = urlStr;

    } catch (error) {
        console.warn("Dead link caught:", error.message);
        // Ensure 404.html is in your root folder
        window.location.href = '404.html';
    }
} // <--- Added the missing closing brace!

// --- THE TRIGGER ---
// This tells the browser: "Don't just go to the link, check it first!"
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    
    if (link && link.href && link.origin === window.location.origin) {
        const href = link.getAttribute('href');

        // Let mail and phone links work normally
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

        // Prevent default navigation so we can check it first
        e.preventDefault();
        
        // Close the mobile menu if it's open (optional)
        closeMenu(); 
        
        navigateTo(link.href);
    }
});