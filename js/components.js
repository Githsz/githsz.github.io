// js/components.js
class ComponentsManager {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        this.initFrameworkTabs();
        this.initCopyButtons();
        this.initDemoComponents();
        this.initCodeHighlighting();
    }

    // Инициализация переключения между фреймворками
    initFrameworkTabs() {
        const tabs = document.querySelectorAll('.framework-tab');
        const contents = document.querySelectorAll('.framework-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const framework = tab.dataset.framework;

                // Убираем активный класс у всех табов и контента
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Добавляем активный класс к выбранному табу и контенту
                tab.classList.add('active');
                document.getElementById(`${framework}-components`).classList.add('active');

                // Сохраняем выбор в localStorage
                localStorage.setItem('selectedFramework', framework);
            });
        });

        // Восстанавливаем выбор из localStorage
        const savedFramework = localStorage.getItem('selectedFramework');
        if (savedFramework) {
            const savedTab = document.querySelector(`[data-framework="${savedFramework}"]`);
            if (savedTab) savedTab.click();
        }
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
            
            // Визуальная обратная связь
            const originalText = button.textContent;
            button.textContent = 'Скопировано!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            this.showNotification('Ошибка при копировании кода', 'error');
            console.error('Ошибка копирования:', err);
        }
    }

    // Инициализация демо-компонентов
    initDemoComponents() {
        this.initModalDemo();
        this.initTabsDemo();
        this.initAccordionDemo();
        this.initToastDemo();
    }

    // Демо модального окна
    initModalDemo() {
        window.openModal = () => {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeModal = () => {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        // Закрытие по клику вне модалки
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('demoModal');
            if (e.target === modal) {
                closeModal();
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('demoModal');
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // Демо табов
    initTabsDemo() {
        const tabsContainer = document.querySelector('.tabs-demo');
        if (!tabsContainer) return;

        const tabs = tabsContainer.querySelectorAll('.tab');
        const contents = tabsContainer.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                
                // Деактивируем все табы
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Активируем выбранный таб
                tab.classList.add('active');
                const content = tabsContainer.querySelector(`#${tabId}`);
                if (content) content.classList.add('active');
            });
        });
    }

    // Демо аккордеона
    initAccordionDemo() {
        const accordionContainer = document.querySelector('.accordion-demo');
        if (!accordionContainer) return;

        const items = accordionContainer.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');

            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight;
                
                // Закрываем все элементы
                this.closeAllAccordions(accordionContainer);
                
                // Открываем текущий, если был закрыт
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    header.classList.add('active');
                    icon.textContent = '−';
                } else {
                    content.style.maxHeight = null;
                    header.classList.remove('active');
                    icon.textContent = '+';
                }
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

    // Демо тостов/уведомлений
    initToastDemo() {
        window.showDemoToast = (type = 'info') => {
            const messages = {
                info: 'Информационное уведомление',
                success: 'Успешное выполнение!',
                warning: 'Предупреждение',
                error: 'Произошла ошибка'
            };

            this.showNotification(messages[type], type);
        };
    }

    // Показать уведомление
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Стили для разных типов уведомлений
        const typeStyles = {
            info: 'background: var(--primary);',
            success: 'background: var(--secondary);',
            warning: 'background: #ff9800;',
            error: 'background: #f44336;'
        };

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
            ${typeStyles[type]}
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

    // Подсветка синтаксиса
    initCodeHighlighting() {
        // Prism уже подключен, просто перерисовываем при смене табов
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (mutation.target.classList.contains('active')) {
                        Prism.highlightAllUnder(mutation.target);
                    }
                }
            });
        });

        document.querySelectorAll('.framework-content').forEach(content => {
            observer.observe(content, { attributes: true });
        });
    }

    // Генератор компонентов
    generateComponent(type, options = {}) {
        switch (type) {
            case 'button':
                return this.generateButton(options);
            case 'modal':
                return this.generateModal(options);
            case 'card':
                return this.generateCard(options);
            default:
                console.warn('Неизвестный тип компонента:', type);
                return null;
        }
    }

    generateButton({ text, variant = 'primary', size = 'medium', disabled = false }) {
        const button = document.createElement('button');
        button.className = `btn btn-${variant} btn-${size}`;
        button.textContent = text;
        button.disabled = disabled;
        return button;
    }

    generateModal({ title, content, showClose = true }) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                ${title ? `<h3>${title}</h3>` : ''}
                <div class="modal-body">${content}</div>
                ${showClose ? '<button class="btn btn-primary modal-close">Закрыть</button>' : ''}
            </div>
        `;
        return modal;
    }

    generateCard({ title, content, actions = [] }) {
        const card = document.createElement('div');
        card.className = 'demo-card';
        card.innerHTML = `
            ${title ? `<h4>${title}</h4>` : ''}
            <div class="card-content">${content}</div>
            ${actions.length ? `
                <div class="card-actions">
                    ${actions.map(action => `<button class="btn ${action.variant || 'primary'}">${action.text}</button>`).join('')}
                </div>
            ` : ''}
        `;
        return card;
    }

    // Утилиты для работы с компонентами
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Регистрация кастомного компонента
    registerComponent(name, componentClass) {
        if (this.components.has(name)) {
            console.warn(`Компонент "${name}" уже зарегистрирован`);
            return false;
        }
        this.components.set(name, componentClass);
        return true;
    }

    // Создание экземпляра компонента
    createComponent(name, options = {}) {
        const ComponentClass = this.components.get(name);
        if (!ComponentClass) {
            console.error(`Компонент "${name}" не найден`);
            return null;
        }
        return new ComponentClass(options);
    }
}

// Глобальные функции для демо
function openModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showComponentDemo(type) {
    const componentsManager = window.componentsManager;
    if (componentsManager) {
        componentsManager.showNotification(`Демо компонента: ${type}`, 'info');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.componentsManager = new ComponentsManager();
    
    // Добавляем стили для демо-компонентов
    const style = document.createElement('style');
    style.textContent = `
        .tabs-demo {
            width: 100%;
        }
        
        .tabs {
            display: flex;
            border-bottom: 2px solid var(--bg-surface-variant);
            margin-bottom: 1rem;
        }
        
        .tab {
            padding: 12px 24px;
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
        }
        
        .tab.active {
            color: var(--primary);
            border-bottom-color: var(--primary);
        }
        
        .tab-content {
            display: none;
            padding: 1rem;
            background: var(--bg-surface);
            border-radius: var(--border-radius-md);
        }
        
        .tab-content.active {
            display: block;
        }
        
        .accordion-demo {
            width: 100%;
        }
        
        .accordion-item {
            border: 1px solid var(--bg-surface-variant);
            border-radius: var(--border-radius-md);
            margin-bottom: 0.5rem;
            overflow: hidden;
        }
        
        .accordion-header {
            width: 100%;
            padding: 1rem;
            background: var(--bg-surface);
            border: none;
            color: var(--text-primary);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.3s ease;
        }
        
        .accordion-header:hover {
            background: var(--bg-surface-variant);
        }
        
        .accordion-header.active {
            background: var(--primary);
            color: var(--text-on-accent);
        }
        
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            background: var(--bg-primary);
        }
        
        .accordion-content p {
            padding: 1rem;
            margin: 0;
        }
        
        .copy-btn.copied {
            background: var(--secondary);
            color: var(--text-on-accent);
            border-color: var(--secondary);
        }
        
        .card-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        
        .loading {
            position: relative;
            pointer-events: none;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
});
