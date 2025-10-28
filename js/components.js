// js/components.js
class ComponentsManager {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        this.initCopyButtons();
        this.initDemoComponents();
        this.initCodeHighlighting();
        this.initMobileOptimizations();
    }

    // Оптимизации для мобильных устройств
    initMobileOptimizations() {
        this.adjustCodeBlocksForMobile();
        
        window.addEventListener('resize', () => {
            this.adjustCodeBlocksForMobile();
        });
    }

    // Адаптация блоков кода для мобильных устройств
    adjustCodeBlocksForMobile() {
        const codeBlocks = document.querySelectorAll('.component-code pre');
        const isMobile = window.innerWidth < 768;
        
        codeBlocks.forEach(block => {
            if (isMobile) {
                block.style.fontSize = '0.7rem';
                block.style.lineHeight = '1.3';
            } else {
                block.style.fontSize = '';
                block.style.lineHeight = '';
            }
        });
    }

    // Инициализация кнопок копирования кода
    initCopyButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                this.copyCode(e.target);
            }
        });
    }

    // Копирование кода в буфер обмена
    async copyCode(button) {
        const codeBlock = button.closest('.component-card').querySelector('code');
        const code = codeBlock.textContent;

        try {
            await navigator.clipboard.writeText(code);
            this.showNotification('Код скопирован в буфер обмена!', 'success');
            
            const originalText = button.textContent;
            button.textContent = 'Скопировано!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            this.showNotification('Ошибка при копировании кода', 'error');
            this.fallbackCopyCode(code, button);
        }
    }

    // Fallback метод копирования
    fallbackCopyCode(code, button) {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Код скопирован!', 'success');
            
            const originalText = button.textContent;
            button.textContent = 'Скопировано!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            this.showNotification('Не удалось скопировать код', 'error');
        } finally {
            document.body.removeChild(textArea);
        }
    }

    // Инициализация демо-компонентов
    initDemoComponents() {
        this.initModalDemo();
        this.initTabsDemo();
        this.initAccordionDemo();
    }

    // Демо модального окна
    initModalDemo() {
        window.openModal = () => {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        };

        window.closeModal = () => {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        };

        document.addEventListener('click', (e) => {
            const modal = document.getElementById('demoModal');
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('demoModal');
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // Демо табов
    initTabsDemo() {
        const tabsContainers = document.querySelectorAll('.tabs-demo');
        
        tabsContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab');
            const contents = container.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.dataset.tab;
                    
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    
                    tab.classList.add('active');
                    const content = container.querySelector(`#${tabId}`);
                    if (content) content.classList.add('active');
                });
            });
        });
    }

    // Демо аккордеона
    initAccordionDemo() {
        const accordionContainers = document.querySelectorAll('.accordion-demo');
        
        accordionContainers.forEach(container => {
            const items = container.querySelectorAll('.accordion-item');

            items.forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                const icon = header.querySelector('.accordion-icon');

                header.addEventListener('click', () => {
                    const isOpen = content.style.maxHeight;
                    
                    this.closeAllAccordions(container);
                    
                    if (!isOpen) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        header.classList.add('active');
                        icon.textContent = '−';
                    }
                });
            });
        });
    }

    closeAllAccordions(container) {
        const items = container.querySelectorAll('.accordion-item');
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');
            
            content.style.maxHeight = null;
            header.classList.remove('active');
            icon.textContent = '+';
        });
    }

    // Показать уведомление
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            color: var(--text-on-accent);
            padding: 12px 20px;
            border-radius: var(--border-radius-md);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
            box-shadow: var(--shadow-2);
            background: ${type === 'success' ? 'var(--secondary)' : type === 'error' ? '#f44336' : 'var(--primary)'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Подсветка синтаксиса
    initCodeHighlighting() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (mutation.target.classList.contains('active')) {
                        setTimeout(() => {
                            Prism.highlightAllUnder(mutation.target);
                            this.adjustCodeBlocksForMobile();
                        }, 100);
                    }
                }
            });
        });

        document.querySelectorAll('.framework-content').forEach(content => {
            observer.observe(content, { attributes: true });
        });

        setTimeout(() => {
            Prism.highlightAll();
            this.adjustCodeBlocksForMobile();
        }, 500);
    }
}

// Базовые компоненты
class Button {
    constructor(options = {}) {
        this.options = {
            text: 'Button',
            variant: 'primary',
            size: 'md',
            disabled: false,
            loading: false,
            onClick: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('button');
        this.element.className = `btn btn-${this.options.variant} btn-${this.options.size} ${this.options.loading ? 'loading' : ''}`;
        this.element.textContent = this.options.text;
        this.element.disabled = this.options.disabled;

        if (this.options.onClick) {
            this.element.addEventListener('click', this.options.onClick);
        }

        return this.element;
    }
}

class Input {
    constructor(options = {}) {
        this.options = {
            type: 'text',
            placeholder: '',
            value: '',
            disabled: false,
            required: false,
            onChange: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('input');
        this.element.type = this.options.type;
        this.element.placeholder = this.options.placeholder;
        this.element.value = this.options.value;
        this.element.disabled = this.options.disabled;
        this.element.required = this.options.required;
        this.element.className = 'search-input';
        this.element.style.maxWidth = '100%';
        this.element.style.margin = '5px 0';

        if (this.options.onChange) {
            this.element.addEventListener('input', (e) => {
                this.options.onChange(e.target.value, e);
            });
        }

        return this.element;
    }
}

class Card {
    constructor(options = {}) {
        this.options = {
            title: '',
            content: '',
            actions: [],
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'demo-card';
        this.element.style.maxWidth = '100%';

        let html = '';

        if (this.options.title) {
            html += `<h4>${this.options.title}</h4>`;
        }

        html += `<p>${this.options.content}</p>`;

        if (this.options.actions && this.options.actions.length > 0) {
            html += '<div class="card-actions">';
            this.options.actions.forEach(action => {
                html += `<button class="btn btn-${action.variant || 'primary'}" style="min-width: 100px;">${action.text}</button>`;
            });
            html += '</div>';
        }

        this.element.innerHTML = html;

        if (this.options.actions && this.options.actions.length > 0) {
            const actionButtons = this.element.querySelectorAll('.card-actions .btn');
            actionButtons.forEach((button, index) => {
                const action = this.options.actions[index];
                if (action.onClick) {
                    button.addEventListener('click', action.onClick);
                }
            });
        }

        return this.element;
    }
}

class Modal {
    constructor(options = {}) {
        this.options = {
            element: null,
            title: '',
            content: '',
            actions: [],
            ...options
        };
        this.element = typeof this.options.element === 'string' 
            ? document.querySelector(this.options.element)
            : this.options.element;
        this.isOpen = false;
    }

    open() {
        if (this.element) {
            this.element.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.isOpen = true;

            setTimeout(() => {
                this.element.classList.add('active');
            }, 10);
        }
    }

    close() {
        if (this.element) {
            this.element.classList.remove('active');
            
            setTimeout(() => {
                this.element.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.isOpen = false;
            }, 300);
        }
    }
}

class Tabs {
    constructor(options = {}) {
        this.options = {
            container: null,
            ...options
        };
        this.container = typeof this.options.container === 'string'
            ? document.querySelector(this.options.container)
            : this.options.container;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        const tabs = this.container.querySelectorAll('.tab');
        const contents = this.container.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.activateTab(tabId);
            });
        });
    }

    activateTab(tabId) {
        const tabs = this.container.querySelectorAll('.tab');
        const contents = this.container.querySelectorAll('.tab-content');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        const targetTab = this.container.querySelector(`[data-tab="${tabId}"]`);
        const targetContent = this.container.querySelector(`#${tabId}`);

        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }
}

class Accordion {
    constructor(options = {}) {
        this.options = {
            container: null,
            ...options
        };
        this.container = typeof this.options.container === 'string'
            ? document.querySelector(this.options.container)
            : this.options.container;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        const items = this.container.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');

            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight;
                
                this.closeAll();
                
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    header.classList.add('active');
                    icon.textContent = '−';
                }
            });
        });
    }

    closeAll() {
        const items = this.container.querySelectorAll('.accordion-item');
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');
            
            content.style.maxHeight = null;
            header.classList.remove('active');
            icon.textContent = '+';
        });
    }
}

// Глобальная инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.componentsManager = new ComponentsManager();
});
