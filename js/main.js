// Main JavaScript file
class GithszApp {
    constructor() {
        this.init();
    }

    init() {
        this.initBlobAnimation();
        this.initNavigation();
        this.initIconsGrid();
        this.initSmoothScroll();
        this.initParallax();
        this.initSearch();
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
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('mainNav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(30, 30, 30, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(30, 30, 30, 0.9)';
                nav.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // Icons grid
    initIconsGrid() {
        const iconsGrid = document.getElementById('iconsGrid');
        if (!iconsGrid) return;

        const icons = [
            'github', 'code', 'terminal', 'browser', 'mobile', 'desktop',
            'database', 'cloud', 'server', 'network', 'security', 'lock',
            'unlock', 'key', 'user', 'users', 'settings', 'cog', 'wrench',
            'hammer', 'package', 'box', 'download', 'upload', 'link', 'external',
            'home', 'folder', 'file', 'image', 'video', 'music', 'bell', 'star',
            'heart', 'like', 'dislike', 'flag', 'bookmark', 'share', 'copy',
            'edit', 'delete', 'add', 'remove', 'close', 'check', 'cancel',
            'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'menu', 'filter',
            'search', 'zoom', 'refresh', 'loading', 'warning', 'error', 'info',
            'question', 'chat', 'comment', 'message', 'email', 'phone', 'location',
            'time', 'calendar', 'chart', 'graph', 'analytics', 'money', 'credit-card',
            'shopping-cart', 'tag', 'price-tag', 'gift', 'rocket', 'plane', 'car'
        ];

        const renderIcons = (filter = '') => {
            const filteredIcons = icons.filter(icon => 
                icon.toLowerCase().includes(filter.toLowerCase())
            );

            iconsGrid.innerHTML = filteredIcons.map(icon => `
                <div class="icon-card" data-icon="${icon}">
                    <svg class="icon-svg" viewBox="0 0 24 24">
                        <use xlink:href="#icon-${icon}"></use>
                    </svg>
                    <div class="icon-name">${icon}</div>
                </div>
            `).join('');

            // Add click handlers for icons
            document.querySelectorAll('.icon-card').forEach(card => {
                card.addEventListener('click', () => {
                    const iconName = card.getAttribute('data-icon');
                    this.copyIconToClipboard(iconName);
                });
            });
        };

        // Initial render
        renderIcons();

        // Store method for search
        this.renderIcons = renderIcons;
    }

    // Copy icon to clipboard
    copyIconToClipboard(iconName) {
        const svgCode = `<svg class="icon" viewBox="0 0 24 24">
    <use xlink:href="#icon-${iconName}"></use>
</svg>`;
        
        navigator.clipboard.writeText(svgCode).then(() => {
            this.showNotification(`Иконка "${iconName}" скопирована!`);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
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

    // Parallax effect
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-icon');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${index * 45}deg)`;
            });
        });
    }

    // Search functionality
    initSearch() {
        const searchInput = document.getElementById('iconSearch');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.renderIcons(e.target.value);
                }, 300);
            });
        }
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
        document.querySelectorAll('.tool-card, .icon-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Notification system
    showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary);
            color: var(--text-on-accent);
            padding: 12px 20px;
            border-radius: var(--border-radius-md);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// SVG icons sprite (injected into DOM)
function injectSvgSprite() {
    const sprite = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="icon-github" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </symbol>
        <symbol id="icon-code" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </symbol>
        <symbol id="icon-terminal" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4V8h16v10zm-8-2l4-4-4-4-1.41 1.41L11.17 12l-2.58-2.59L8 8l-4 4 4 4 1.41-1.41L11.17 12l2.58 2.59z"/>
        </symbol>
        <!-- Add more SVG icons here -->
        <symbol id="icon-star" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </symbol>
        <symbol id="icon-heart" viewBox="0 0 24 24">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
        </symbol>
    </svg>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', sprite);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    injectSvgSprite();
    new GithszApp();
});

// Service Worker registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
