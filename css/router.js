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

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    document.body.classList.toggle('no-scroll');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
}));