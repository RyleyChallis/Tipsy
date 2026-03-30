document.addEventListener('click', async function(e) {
    const link = e.target.closest('a');
    
    if (link && link.href && link.origin === window.location.origin) {
        const path = link.getAttribute('href');
        
        if (path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
            return;
        }

        e.preventDefault();
        const destination = link.href;

        try {
            const response = await fetch(destination, { method: 'HEAD' });

            if (response.ok) {
                window.location.href = destination;
            } else {
                window.location.href = '404.html';
            }
        } catch (error) {
            window.location.href = '404.html';
        }
    }
});

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('#menu-overlay');

const closeMenu = () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
};

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});