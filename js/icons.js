// js/icons.js
class IconsManager {
    constructor() {
        this.icons = this.generateIcons();
        this.filteredIcons = [...this.icons];
        this.visibleCount = 50;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderIcons();
        this.initSearch();
        this.initFilters();
        this.initLoadMore();
    }

    generateIcons() {
        const categories = {
            development: ['github', 'code', 'terminal', 'browser', 'server', 'database', 'cloud', 'network', 'security'],
            ui: ['user', 'users', 'settings', 'cog', 'wrench', 'hammer', 'package', 'box'],
            business: ['chart', 'graph', 'analytics', 'money', 'credit-card', 'shopping-cart'],
            social: ['heart', 'like', 'star', 'share', 'comment', 'message', 'email'],
            files: ['folder', 'file', 'image', 'video', 'music', 'download', 'upload'],
            devices: ['mobile', 'desktop', 'laptop', 'tablet', 'watch']
        };

        const icons = [];
        
        Object.entries(categories).forEach(([category, categoryIcons]) => {
            categoryIcons.forEach(icon => {
                icons.push({
                    name: icon,
                    category: category,
                    svg: this.generateSVG(icon)
                });
            });
        });

        // Добавим больше иконок для демонстрации
        for (let i = 1; i <= 200; i++) {
            icons.push({
                name: `icon-${i}`,
                category: i % 2 === 0 ? 'development' : 'ui',
                svg: this.generateSVG(`icon-${i}`)
            });
        }

        return icons;
    }

    generateSVG(iconName) {
        const colors = ['#BB86FC', '#03DAC6', '#CF6679', '#018786', '#3700B3'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="none"/>
            <circle cx="12" cy="12" r="4" fill="none"/>
            <path d="M12 8v8M8 12h8" stroke="${color}" stroke-width="2"/>
        </svg>`;
    }

    renderIcons(filter = '') {
        const iconsGrid = document.getElementById('iconsGrid');
        if (!iconsGrid) return;

        this.filteredIcons = this.icons.filter(icon => 
            icon.name.toLowerCase().includes(filter.toLowerCase()) &&
            (this.currentFilter === 'all' || icon.category === this.currentFilter)
        );

        const visibleIcons = this.filteredIcons.slice(0, this.visibleCount);

        iconsGrid.innerHTML = visibleIcons.map(icon => `
            <div class="icon-card" data-icon="${icon.name}" data-category="${icon.category}">
                <div class="icon-svg">${icon.svg}</div>
                <div class="icon-name">${icon.name}</div>
            </div>
        `).join('');

        this.attachIconClickHandlers();
        this.updateLoadMoreButton();
    }

    attachIconClickHandlers() {
        document.querySelectorAll('.icon-card').forEach(card => {
            card.addEventListener('click', () => {
                const iconName = card.getAttribute('data-icon');
                this.copyIconToClipboard(iconName);
                
                // Анимация клика
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    copyIconToClipboard(iconName) {
        const icon = this.icons.find(i => i.name === iconName);
        if (!icon) return;

        const svgCode = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- ${iconName} icon -->
    ${icon.svg}
</svg>`;
        
        navigator.clipboard.writeText(svgCode).then(() => {
            this.showNotification(`Иконка "${iconName}" скопирована в буфер обмена!`);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = svgCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification(`Иконка "${iconName}" скопирована!`);
        });
    }

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

    initFilters() {
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Убираем активный класс у всех тегов
                filterTags.forEach(t => t.classList.remove('active'));
                // Добавляем активный класс к текущему тегу
                tag.classList.add('active');
                
                this.currentFilter = tag.getAttribute('data-filter');
                this.visibleCount = 50;
                this.renderIcons(document.getElementById('iconSearch').value);
            });
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.visibleCount += 50;
                this.renderIcons(document.getElementById('iconSearch').value);
            });
        }
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            if (this.visibleCount >= this.filteredIcons.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;

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
            box-shadow: var(--shadow-2);
        `;

        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Автоматическое скрытие
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new IconsManager();
});
