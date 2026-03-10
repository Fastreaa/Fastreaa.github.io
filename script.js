document.addEventListener('DOMContentLoaded', () => {
    // 1. CANVAS SCI-FI BACKGROUND EFFECT (Sutil Net)
    const canvas = document.getElementById('scifi-network');
    const ctx = canvas.getContext('2d');
    
    // Set Canvas Size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const nodes = [];
    const numNodes = 80;
    const maxDist = 150;
    const mouse = { x: null, y: null };
    
    // Node Class
    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounds
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(0, 243, 255, 0.4)'; // Color Cian
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create Nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node());
    }
    
    // Mouse Event
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    // Animate Network
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach((node, i) => {
            node.update();
            node.draw();
            
            // Draw Connections
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = node.x - nodes[j].x;
                const dy = node.y - nodes[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < maxDist) {
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist/maxDist - 0.5})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
            
            // Mouse Interaction
            if (mouse.x !== null) {
                const dxm = node.x - mouse.x;
                const dym = node.y - mouse.y;
                const distM = Math.sqrt(dxm*dxm + dym*dym);
                if (distM < maxDist * 1.5) {
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distM/(maxDist*1.5)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();

    // 2. SCROLL ANIMATION SUAVE (Fade In)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible_scifi');
            }
        });
    }, observerOptions);
    
    // Seleccionamos secciones y tarjetas para animar
    document.querySelectorAll('.glass_scifi, .main_name_scifi, .hero_buttons_scifi').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
});

// CSS adicional para la animación de scroll (añadir al style.css al final)
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .visible_scifi {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
