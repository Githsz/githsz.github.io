// js/tools.js
class ToolsManager {
    constructor() {
        this.init();
    }

    init() {
        this.initNavigation();
        this.initCopyButtons();
        this.initCodeHighlighting();
        this.initToolFilters();
    }

    initNavigation() {
        // Инициализация мобильного меню
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Блокировка скролла при открытом меню
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Закрытие меню при клике на ссылку
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Закрытие меню при ресайзе
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const toolCard = e.target.closest('.tool-card');
                const codeBlock = toolCard?.querySelector('code');
                
                if (codeBlock) {
                    this.copyToClipboard(codeBlock.textContent);
                    this.showNotification('✅ Код скопирован в буфер обмена!', 'success');
                    
                    // Визуальная обратная связь
                    const originalText = btn.textContent;
                    const originalHTML = btn.innerHTML;
                    
                    btn.innerHTML = '<span>✅ Скопировано!</span>';
                    btn.classList.add('copied');
                    btn.disabled = true;
                    
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('copied');
                        btn.disabled = false;
                    }, 2000);
                }
            });
        });
    }

    initCodeHighlighting() {
        // Улучшенная подсветка синтаксиса
        document.querySelectorAll('.tool-code code').forEach(code => {
            const text = code.textContent || code.innerText;
            
            let highlighted = text
                // GitHub Actions ключевые слова
                .replace(/(name:|on:|jobs:|steps:|uses:|run:|with:|env:|secrets:|if:|needs:)/g, '<span class="code-keyword">$1</span>')
                // Комментарии
                .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
                // Строки в кавычках
                .replace(/("[^"]*"|'[^']*')/g, '<span class="code-string">$1</span>')
                // Переменные GitHub
                .replace(/(\$\{\{\s*[^}]+\s*\}\})/g, '<span class="code-variable">$1</span>')
                // Номера версий
                .replace(/(@v\d+)/g, '<span class="code-number">$1</span>')
                // Ветки и теги
                .replace(/(branches:.*|tags:.*)/g, '<span class="code-string">$1</span>')
                // Шелл команды
                .replace(/(echo |git |npm |docker |python )/g, '<span class="code-keyword">$1</span>');

            code.innerHTML = highlighted;
        });
    }

    initToolFilters() {
        // Базовая система фильтрации для будущего расширения
        const filterTags = document.querySelectorAll('.filter-tag');
        
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const filter = tag.dataset.filter;
                this.filterTools(filter);
                
                // Обновление активного состояния
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
            });
        });
    }

    filterTools(filter) {
        const tools = document.querySelectorAll('.tool-card');
        
        tools.forEach(tool => {
            if (filter === 'all' || tool.dataset.category === filter) {
                tool.style.display = 'block';
                setTimeout(() => {
                    tool.style.opacity = '1';
                    tool.style.transform = 'translateY(0)';
                }, 50);
            } else {
                tool.style.opacity = '0';
                tool.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    tool.style.display = 'none';
                }, 300);
            }
        });
    }

    copyToClipboard(text) {
        // Очистка текста от HTML тегов для чистого копирования
        const cleanText = text.replace(/<[^>]*>/g, '');
        
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(cleanText);
        } else {
            // Fallback для старых браузеров и HTTP
            const textArea = document.createElement('textarea');
            textArea.value = cleanText;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            return new Promise((res, rej) => {
                document.execCommand('copy') ? res() : rej();
                textArea.remove();
            });
        }
    }

    showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: var(--primary);
            color: var(--text-on-accent);
            padding: 12px 20px;
            border-radius: var(--border-radius-md);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-weight: 600;
            box-shadow: var(--shadow-3);
            max-width: 350px;
            word-wrap: break-word;
            border-left: 4px solid var(--secondary);
        `;

        // Стили для разных типов уведомлений
        if (type === 'success') {
            notification.style.background = 'var(--secondary)';
            notification.style.borderLeftColor = 'var(--primary)';
        } else if (type === 'error') {
            notification.style.background = '#CF6679';
            notification.style.borderLeftColor = '#B00020';
        } else if (type === 'warning') {
            notification.style.background = '#ff9800';
            notification.style.borderLeftColor = '#f57c00';
        }

        document.body.appendChild(notification);

        // Анимация появления
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);

        // Закрытие по клику
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
}

// Инициализация при полной загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ToolsManager();
    });
} else {
    new ToolsManager();
}
