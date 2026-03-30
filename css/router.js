const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('#menu-overlay');

const closeMenu = () => {
    menu?.classList.remove('is-active');
    menuLinks?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
};

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
        const response = await fetch(url.origin + path, { method: 'HEAD' });

        if (!response.ok) {
            throw new Error('File not found');
        }

        if (hash && hash !== '#') {
            const target = document.querySelector(hash);
            if (!target) {
                throw new Error('Section not found');
            }
        }

        window.location.href = urlStr;

    } catch (error) {
        console.warn("Dead link caught:", error.message);
        window.location.href = '404.html';
    }
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    
    if (link && link.href && link.origin === window.location.origin) {
        const href = link.getAttribute('href');

        if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

        e.preventDefault();
        
        closeMenu(); 
        
        navigateTo(link.href);
    }
});