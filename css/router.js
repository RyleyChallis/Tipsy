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