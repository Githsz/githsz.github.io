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
        this.initMobileOptimizations();
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
                const targetContent = document.getElementById(`${framework}-components`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // Сохраняем выбор в localStorage
                localStorage.setItem('selectedFramework', framework);
                
                // Перерисовываем код для мобильных устройств
                this.adjustCodeBlocksForMobile();
            });
        });

        // Восстанавливаем выбор из localStorage
        const savedFramework = localStorage.getItem('selectedFramework');
        if (savedFramework) {
            const savedTab = document.querySelector(`[data-framework="${savedFramework}"]`);
            if (savedTab) savedTab.click();
        }
    }

    // Оптимизации для мобильных устройств
    initMobileOptimizations() {
        this.adjustCodeBlocksForMobile();
        
        // Пересчитываем при изменении размера окна
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
            
            // Fallback для старых браузеров
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
        this.initCarouselDemo();
        this.initFormValidationDemo();
    }

    // Демо модального окна
    initModalDemo() {
        window.openModal = () => {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Добавляем класс для анимации
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
        const tabsContainers = document.querySelectorAll('.tabs-demo');
        
        tabsContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab');
            const contents = container.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.dataset.tab;
                    
                    // Деактивируем все табы
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    
                    // Активируем выбранный таб
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
                    
                    // Закрываем все элементы в этом контейнере
                    this.closeAllAccordions(container);
                    
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

    // Демо карусели
    initCarouselDemo() {
        // Создаем демо карусель если нужно
        const carouselPreviews = document.querySelectorAll('.component-preview');
        carouselPreviews.forEach(preview => {
            if (preview.textContent.includes('Carousel Preview')) {
                this.createDemoCarousel(preview);
            }
        });
    }

    createDemoCarousel(container) {
        const carouselHTML = `
            <div class="demo-carousel" style="width: 100%; height: 100px; background: var(--bg-surface-variant); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); position: relative;">
                <div class="carousel-slide active">Slide 1</div>
                <div class="carousel-slide">Slide 2</div>
                <div class="carousel-slide">Slide 3</div>
                <button class="carousel-prev" style="position: absolute; left: 10px; background: rgba(0,0,0,0.5); color: white; border: none; padding: 5px 10px; border-radius: 4px;">‹</button>
                <button class="carousel-next" style="position: absolute; right: 10px; background: rgba(0,0,0,0.5); color: white; border: none; padding: 5px 10px; border-radius: 4px;">›</button>
            </div>
        `;
        
        container.innerHTML = carouselHTML;
        
        // Инициализация простой карусели
        const carousel = container.querySelector('.demo-carousel');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'flex' : 'none';
            });
            currentSlide = index;
        }

        prevBtn.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        });

        showSlide(0);
    }

    // Демо валидации формы
    initFormValidationDemo() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (!input.parentNode.classList.contains('search-box')) {
                input.addEventListener('blur', (e) => {
                    this.validateEmailField(e.target);
                });
                
                input.addEventListener('input', (e) => {
                    this.clearFieldError(e.target);
                });
            }
        });
    }

    validateEmailField(field) {
        const value = field.value.trim();
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            this.showFieldError(field, 'Invalid email format');
        } else {
            this.clearFieldError(field);
        }
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#CF6679';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
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
                        // Даем время для отображения контента
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

        // Первоначальная подсветка
        setTimeout(() => {
            Prism.highlightAll();
            this.adjustCodeBlocksForMobile();
        }, 500);
    }

    // Генератор компонентов
    generateComponent(type, options = {}) {
        const generators = {
            button: this.generateButton,
            modal: this.generateModal,
            card: this.generateCard,
            input: this.generateInput,
            alert: this.generateAlert
        };

        const generator = generators[type];
        return generator ? generator.call(this, options) : null;
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

    generateInput({ type = 'text', placeholder, value = '' }) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        input.className = 'search-input';
        input.style.maxWidth = '200px';
        return input;
    }

    generateAlert({ message, variant = 'info' }) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${variant}`;
        alert.innerHTML = `
            <div class="alert-content">${message}</div>
            <button class="alert-close">×</button>
        `;
        return alert;
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
});
