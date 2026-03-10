document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del Cursor Personalizado
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        // El cursor sigue al mouse con un ligero suavizado por CSS
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efecto de escala al pasar por links
    const links = document.querySelectorAll('a, .project-preview');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.background = 'rgba(224, 255, 0, 0.3)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#e0ff00';
        });
    });

    // 2. Observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-item').forEach(el => observer.observe(el));

    // 3. Parallax suave para la imagen del hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const img = document.querySelector('.parallax-img');
        if(img) {
            img.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});
