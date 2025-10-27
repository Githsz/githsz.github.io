// js/icons.js
class IconsManager {
    constructor() {
        this.icons = this.generateIcons();
        this.filteredIcons = [...this.icons];
        this.visibleCount = 48;
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.init();
    }

    init() {
        this.renderIcons();
        this.initSearch();
        this.initFilters();
        this.initLoadMore();
        this.updateResultsCount();
    }

    generateIcons() {
        const categories = {
            development: ['github', 'code', 'terminal', 'browser', 'server', 'database', 'cloud'],
            ui: ['user', 'settings', 'menu', 'search', 'filter', 'layout'],
            business: ['chart', 'analytics', 'money', 'shopping-cart', 'price-tag'],
            social: ['heart', 'star', 'share', 'message', 'email', 'notification'],
            files: ['folder', 'file', 'download', 'upload', 'save', 'delete'],
            devices: ['mobile', 'desktop', 'laptop', 'tablet', 'phone'],
            media: ['play', 'pause', 'volume', 'camera', 'image']
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

        return icons;
    }

    generateSVG(iconName) {
        // Простые SVG иконки
        const icons = {
            github: '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>',
            code: '<path d="M8 4l4 4-4 4m4-4H4m8 8l-4-4 4-4m-4 4h8"/>',
            user: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z"/>',
            heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
            star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
        };

        return icons[iconName] || '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="2"/>';
    }

    renderIcons() {
        const iconsGrid = document.getElementById('iconsGrid');
        if (!iconsGrid) return;

        this.filteredIcons = this.icons.filter(icon => 
            icon.name.toLowerCase().includes(this.currentSearch.toLowerCase()) &&
            (this.currentFilter === 'all' || icon.category === this.currentFilter)
        );

        const visibleIcons = this.filteredIcons.slice(0, this.visibleCount);

        iconsGrid.innerHTML = visibleIcons.map(icon => `
            <div class="icon-card" data-icon="${icon.name}" data-category="${icon.category}">
                <div class="icon-svg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${icon.svg}
                    </svg>
                </div>
                <div class="icon-name">${this.formatIconName(icon.name)}</div>
            </div>
        `).join('');

        this.attachIconClickHandlers();
        this.updateLoadMoreButton();
        this.updateResultsCount();
    }

    formatIconName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    attachIconClickHandlers() {
        document.querySelectorAll('.icon-card').forEach(card => {
            card.addEventListener('click', () => {
                const iconName = card.getAttribute('data-icon');
                this.copyIconToClipboard(iconName);
            });
        });
    }

    copyIconToClipboard(iconName) {
        const icon = this.icons.find(i => i.name === iconName);
        if (!icon) return;

        const svgCode = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    ${icon.svg}
</svg>`;
        
        navigator.clipboard.writeText(svgCode).then(() => {
            this.showNotification(`Иконка "${this.formatIconName(iconName)}" скопирована!`);
        });
    }

    initSearch() {
        const searchInput = document.getElementById('iconSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearch = e.target.value;
                this.visibleCount = 48;
                this.renderIcons();
            });
        }
    }

    initFilters() {
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                
                this.currentFilter = tag.getAttribute('data-filter');
                this.visibleCount = 48;
                this.renderIcons();
            });
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.visibleCount += 48;
                this.renderIcons();
            });
        }
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = this.visibleCount >= this.filteredIcons.length ? 'none' : 'block';
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const total = this.filteredIcons.length;
            resultsCount.textContent = `${total} иконок найдено`;
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new IconsManager();
});
