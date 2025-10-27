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
            development: [
                'github', 'git', 'code', 'terminal', 'browser', 'server', 'database', 
                'cloud', 'network', 'security', 'api', 'debug', 'deploy', 'build',
                'package', 'npm', 'yarn', 'docker', 'kubernetes', 'aws', 'azure'
            ],
            ui: [
                'user', 'users', 'settings', 'cog', 'wrench', 'hammer', 'palette',
                'brush', 'layout', 'grid', 'list', 'menu', 'filter', 'sort',
                'zoom-in', 'zoom-out', 'search', 'eye', 'eye-closed', 'lock', 'unlock'
            ],
            business: [
                'chart', 'graph', 'analytics', 'money', 'credit-card', 'shopping-cart',
                'price-tag', 'receipt', 'bank', 'growth', 'target', 'goal', 'report',
                'presentation', 'meeting', 'briefcase', 'office', 'workflow'
            ],
            social: [
                'heart', 'like', 'star', 'share', 'comment', 'message', 'email',
                'chat', 'notification', 'bell', 'feed', 'social', 'connect',
                'friends', 'group', 'community', 'follow', 'retweet', 'upvote'
            ],
            files: [
                'folder', 'file', 'image', 'video', 'music', 'download', 'upload',
                'save', 'document', 'pdf', 'zip', 'archive', 'copy', 'paste',
                'cut', 'delete', 'trash', 'recycle', 'restore'
            ],
            devices: [
                'mobile', 'desktop', 'laptop', 'tablet', 'watch', 'phone',
                'camera', 'headphones', 'microphone', 'speaker', 'printer',
                'scanner', 'keyboard', 'mouse', 'display', 'server-rack'
            ],
            media: [
                'play', 'pause', 'stop', 'next', 'previous', 'volume', 'mute',
                'camera', 'video-camera', 'microphone', 'headphones', 'speaker',
                'film', 'music', 'image', 'gallery', 'album', 'playlist'
            ]
        };

        const icons = [];
        
        Object.entries(categories).forEach(([category, categoryIcons]) => {
            categoryIcons.forEach(icon => {
                icons.push({
                    name: icon,
                    category: category,
                    tags: [icon, ...category.split('-')],
                    svg: this.generateSVG(icon, category)
                });
            });
        });

        // Добавляем больше иконок для демонстрации
        const additionalIcons = [
            'home', 'info', 'warning', 'error', 'success', 'help', 'question',
            'add', 'remove', 'close', 'check', 'cancel', 'refresh', 'loading',
            'time', 'calendar', 'location', 'map', 'navigation', 'direction',
            'weather', 'sun', 'moon', 'cloud', 'rain', 'snow', 'wind',
            'food', 'drink', 'health', 'medical', 'fitness', 'sport',
            'education', 'book', 'learning', 'school', 'university',
            'travel', 'transport', 'car', 'bus', 'train', 'plane', 'bike'
        ];

        additionalIcons.forEach(icon => {
            const category = this.getCategoryForIcon(icon);
            icons.push({
                name: icon,
                category: category,
                tags: [icon, ...category.split('-')],
                svg: this.generateSVG(icon, category)
            });
        });

        return icons;
    }

    getCategoryForIcon(iconName) {
        const categoryMap = {
            'home': 'ui',
            'info': 'ui',
            'warning': 'ui',
            'error': 'ui',
            'success': 'ui',
            'help': 'ui',
            'question': 'ui',
            'add': 'ui',
            'remove': 'ui',
            'close': 'ui',
            'check': 'ui',
            'cancel': 'ui',
            'refresh': 'ui',
            'loading': 'ui',
            'time': 'business',
            'calendar': 'business',
            'location': 'business',
            'map': 'business',
            'navigation': 'business',
            'direction': 'business',
            'weather': 'media',
            'sun': 'media',
            'moon': 'media',
            'cloud': 'media',
            'rain': 'media',
            'snow': 'media',
            'wind': 'media',
            'food': 'social',
            'drink': 'social',
            'health': 'social',
            'medical': 'social',
            'fitness': 'social',
            'sport': 'social',
            'education': 'business',
            'book': 'business',
            'learning': 'business',
            'school': 'business',
            'university': 'business',
            'travel': 'business',
            'transport': 'business',
            'car': 'devices',
            'bus': 'devices',
            'train': 'devices',
            'plane': 'devices',
            'bike': 'devices'
        };

        return categoryMap[iconName] || 'ui';
    }

    generateSVG(iconName, category) {
        // Простые SVG паттерны для разных категорий
        const patterns = {
            development: this.generateDevelopmentIcon(iconName),
            ui: this.generateUIIcon(iconName),
            business: this.generateBusinessIcon(iconName),
            social: this.generateSocialIcon(iconName),
            files: this.generateFilesIcon(iconName),
            devices: this.generateDevicesIcon(iconName),
            media: this.generateMediaIcon(iconName)
        };

        return patterns[category] || this.generateDefaultIcon(iconName);
    }

    generateDevelopmentIcon(name) {
        const shapes = [
            '<rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>',
            '<path d="M8 8L16 8M8 12L16 12M8 16L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
            '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>'
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    generateUIIcon(name) {
        const shapes = [
            '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>',
            '<rect x="6" y="6" width="12" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>',
            '<path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    generateBusinessIcon(name) {
        const shapes = [
            '<path d="M6 20L18 20M6 16L18 16M8 12L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
            '<path d="M12 6L12 18M6 12L18 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
            '<path d="M8 8L16 16M8 16L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    generateSocialIcon(name) {
        const shapes = [
            '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="none" stroke="currentColor" stroke-width="2"/>',
            '<circle cx="12" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 20C6 15.58 8.69 12 12 12C15.31 12 18 15.58 18 20" stroke="currentColor" stroke-width="2"/>',
            '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 20C7 16.13 9.24 13 12 13C14.76 13 17 16.13 17 20" stroke="currentColor" stroke-width="2"/>'
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    generateFilesIcon(name) {
        const shapes = [
            '<path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="2"/>',
            '<rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 8H16M8 12H16M8 16H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
            '<path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="none" stroke="currentColor" stroke-width="2"/>'
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    generateDevicesIcon(name) {
        const shapes = [
            '<rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/>',
            '<rect x="3" y="6" width="18" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6" stroke="currentColor" stroke-width="2"/>',
            '<rect x="2" y="4" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="16" r="1" fill="currentColor"/>'
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    generateMediaIcon(name) {
        const shapes = [
            '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="10,8 16,12 10,16" fill="currentColor"/>',
            '<rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
            '<path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 7C18.1 7 19 7.9 19 9C19 10.1 18.1 11 17 11C15.9 11 15 10.1 15 9C15 7.9 15.9 7 17 7Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 7C8.1 7 9 7.9 9 9C9 10.1 8.1 11 7 11C5.9 11 5 10.1 5 9C5 7.9 5.9 7 7 7Z" fill="none" stroke="currentColor" stroke-width="2"/>'
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    generateDefaultIcon(name) {
        return '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        return name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
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
    <!-- ${this.formatIconName(iconName)} icon -->
    ${icon.svg}
</svg>`;
        
        navigator.clipboard.writeText(svgCode).then(() => {
            this.showNotification(`Иконка "${this.formatIconName(iconName)}" скопирована в буфер обмена!`);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            // Fallback для старых браузеров
            this.fallbackCopyToClipboard(svgCode, iconName);
        });
    }

    fallbackCopyToClipboard(text, iconName) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification(`Иконка "${this.formatIconName(iconName)}" скопирована!`);
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            this.showNotification('Ошибка копирования. Попробуйте еще раз.', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    initSearch() {
        const searchInput = document.getElementById('iconSearch');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                this.currentSearch = e.target.value;
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.visibleCount = 48;
                    this.renderIcons();
                }, 300);
            });

            // Очистка поиска
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    this.currentSearch = '';
                    this.visibleCount = 48;
                    this.renderIcons();
                }
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
                
                // Прокрутка к новым иконкам
                setTimeout(() => {
                    loadMoreBtn.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
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
                loadMoreBtn.textContent = `Загрузить еще (${Math.min(48, this.filteredIcons.length - this.visibleCount)})`;
            }
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const total = this.filteredIcons.length;
            const showing = Math.min(this.visibleCount, total);
            resultsCount.textContent = total === this.icons.length ? 
                `500+ иконок доступно` : 
                `Показано ${showing} из ${total} иконок`;
        }
    }

    showNotification(message, type = 'success') {
        // Удаляем существующие уведомления
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
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
    
    // Добавляем обработчики для примеров кода
    document.querySelectorAll('.tool-code').forEach(codeBlock => {
        codeBlock.addEventListener('click', function() {
            const code = this.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                // Показываем временное уведомление
                const originalText = this.querySelector('p');
                const originalHtml = originalText.innerHTML;
                originalText.innerHTML = '<span style="color: var(--secondary);">✓ Код скопирован!</span>';
                setTimeout(() => {
                    originalText.innerHTML = originalHtml;
                }, 2000);
            });
        });
    });
});
