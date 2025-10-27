// Main JavaScript file
class GithszApp {
    constructor() {
        this.init();
    }

    init() {
        this.initBlobAnimation();
        this.initNavigation();
        this.initSmoothScroll();
        this.initAnimations();
    }

    // Blob animation
    initBlobAnimation() {
        const canvas = document.getElementById('blobCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createBlob = (x, y, size, speed, color) => {
            return { x, y, size, speed, color };
        };

        const blobs = [
            createBlob(0.2, 0.3, 120, 0.0008, 'rgba(187, 134, 252, 0.1)'),
            createBlob(0.7, 0.6, 80, 0.001, 'rgba(3, 218, 198, 0.08)'),
            createBlob(0.4, 0.8, 150, 0.0006, 'rgba(187, 134, 252, 0.05)')
        ];

        const drawBlob = (blob, t) => {
            ctx.beginPath();
            
            for (let i = 0; i < 2 * Math.PI; i += 0.1) {
                const radius = blob.size + Math.sin(t * blob.speed + i * 3) * 20;
                const x = blob.x * canvas.width + Math.cos(i) * radius;
                const y = blob.y * canvas.height + Math.sin(i) * radius;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.closePath();
            ctx.fillStyle = blob.color;
            ctx.fill();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            time += 0.01;
            
            blobs.forEach(blob => {
                drawBlob(blob, time);
            });
            
            requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate();
    }

    // Navigation
    initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('mainNav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(30, 30, 30, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(30, 30, 30, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // Smooth scroll
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animations on scroll
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.tool-card, .icon-card, .project-card, .usage-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GithszApp();
});
