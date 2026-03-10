document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con clase 'glass' o 'bento-item'
    document.querySelectorAll('.glass, .bento-item, .tool-item').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(25px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });
});
