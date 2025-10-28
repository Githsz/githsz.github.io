// js/components.js - Улучшенная и оптимизированная версия

class ComponentsManager {
    constructor() {
        this.components = new Map();
        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;
        
        this.initFrameworkTabs();
        this.initCopyButtons();
        this.initDemoComponents();
        this.initCodeHighlighting();
        this.initMobileOptimizations();
        this.registerAllComponents();
        this.initPerformanceMonitoring();
        
        this.initialized = true;
    }

    // Регистрация всех компонентов
    registerAllComponents() {
        // Базовые компоненты
        this.registerComponent('Button', Button);
        this.registerComponent('Input', Input);
        this.registerComponent('Card', Card);
        this.registerComponent('Modal', Modal);
        
        // Навигационные компоненты
        this.registerComponent('Tabs', Tabs);
        this.registerComponent('Accordion', Accordion);
        this.registerComponent('Breadcrumbs', Breadcrumbs);
        this.registerComponent('Pagination', Pagination);
        
        // Компоненты форм
        this.registerComponent('Select', Select);
        this.registerComponent('Checkbox', Checkbox);
        this.registerComponent('CheckboxGroup', CheckboxGroup);
        this.registerComponent('Radio', Radio);
        this.registerComponent('RadioGroup', RadioGroup);
        this.registerComponent('Slider', Slider);
        this.registerComponent('RangeSlider', RangeSlider);
        
        // Компоненты данных
        this.registerComponent('Table', Table);
        this.registerComponent('ProgressBar', ProgressBar);
        
        // Компоненты обратной связи
        this.registerComponent('Alert', Alert);
        this.registerComponent('Toast', Toast);
        
        // Утилиты
        this.registerComponent('Tooltip', Tooltip);
        this.registerComponent('Dropdown', Dropdown);
        this.registerComponent('Notification', Notification);

        // Новые компоненты
        this.registerComponent('Carousel', Carousel);
        this.registerComponent('DatePicker', DatePicker);
        this.registerComponent('TimePicker', TimePicker);
        this.registerComponent('Rating', Rating);
        this.registerComponent('Upload', Upload);
    }

    registerComponent(name, ComponentClass) {
        this.components.set(name, ComponentClass);
        if (!window[name]) {
            window[name] = ComponentClass;
        }
    }

    getComponent(name) {
        return this.components.get(name);
    }

    initFrameworkTabs() {
        // Инициализация вкладок фреймворков
        const frameworkTabs = document.querySelectorAll('.framework-tabs');
        frameworkTabs.forEach(container => {
            new Tabs({ container });
        });
    }

    initCopyButtons() {
        // Инициализация кнопок копирования кода
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                this.handleCopyCode(e.target);
            }
        });
    }

    handleCopyCode(button) {
        const codeBlock = button.closest('.component-card').querySelector('code');
        const code = codeBlock.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Скопировано!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            button.textContent = 'Ошибка!';
        });
    }

    initDemoComponents() {
        // Инициализация демо-компонентов
        const demoComponents = {
            tabs: document.querySelectorAll('[data-demo-tabs]'),
            accordions: document.querySelectorAll('[data-demo-accordion]'),
            modals: document.querySelectorAll('[data-demo-modal]')
        };

        demoComponents.tabs.forEach(container => {
            new Tabs({ container });
        });

        demoComponents.accordions.forEach(container => {
            new Accordion({ container });
        });
    }

    initCodeHighlighting() {
        // Автоматическое применение подсветки синтаксиса
        if (window.Prism) {
            Prism.highlightAll();
        }
    }

    initMobileOptimizations() {
        // Оптимизации для мобильных устройств
        this.setupTouchEvents();
        this.setupViewportHeight();
        this.setupSwipeGestures();
    }

    setupTouchEvents() {
        // Улучшенная обработка touch событий
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function() {}, { passive: true });
    }

    setupViewportHeight() {
        // Исправление высоты viewport на мобильных
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVh();
        window.addEventListener('resize', setVh);
        window.addEventListener('orientationchange', setVh);
    }

    setupSwipeGestures() {
        // Обработка свайпов для мобильной навигации
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Горизонтальный свайп (минимум 50px)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Свайп влево
                    this.handleSwipeLeft();
                } else {
                    // Свайп вправо
                    this.handleSwipeRight();
                }
            }

            startX = 0;
            startY = 0;
        }, { passive: true });
    }

    handleSwipeLeft() {
        // Закрытие мобильного меню при свайпе влево
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    }

    handleSwipeRight() {
        // Открытие мобильного меню при свайпе вправо (только на мобильных)
        if (window.innerWidth > 768) return;
        
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && !navMenu.classList.contains('active')) {
            navMenu.classList.add('active');
            navToggle?.classList.add('active');
        }
    }

    initPerformanceMonitoring() {
        // Мониторинг производительности компонентов
        if (typeof PerformanceObserver !== 'undefined') {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'measure') {
                        console.log(`Компонент ${entry.name}: ${entry.duration}ms`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['measure'] });
        }
    }

    // Утилиты для разработки
    static logPerformance(componentName, startTime) {
        const duration = performance.now() - startTime;
        console.log(`⚡ ${componentName} rendered in ${duration.toFixed(2)}ms`);
        
        if (typeof PerformanceObserver !== 'undefined') {
            performance.measure(componentName, {
                start: startTime,
                end: performance.now()
            });
        }
    }

    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
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
            icon: null,
            iconPosition: 'left',
            onClick: null,
            ...options
        };
        this.element = null;
        this.eventHandlers = new Map();
    }

    render() {
        const startTime = performance.now();
        
        this.element = document.createElement('button');
        this.element.className = this.getClassNames();
        this.element.innerHTML = this.getInnerHTML();
        this.element.disabled = this.options.disabled;

        this.setupEventListeners();
        
        ComponentsManager.logPerformance('Button', startTime);
        return this.element;
    }

    getClassNames() {
        const classes = [
            'btn',
            `btn-${this.options.variant}`,
            `btn-${this.options.size}`,
            this.options.loading ? 'loading' : '',
            this.options.icon ? 'btn-with-icon' : ''
        ];
        return classes.filter(Boolean).join(' ');
    }

    getInnerHTML() {
        if (!this.options.icon) {
            return this.options.text;
        }

        const iconHTML = `<span class="btn-icon">${this.options.icon}</span>`;
        const textHTML = `<span class="btn-text">${this.options.text}</span>`;

        return this.options.iconPosition === 'left' 
            ? `${iconHTML}${textHTML}`
            : `${textHTML}${iconHTML}`;
    }

    setupEventListeners() {
        if (this.options.onClick) {
            const handler = (e) => {
                if (!this.options.loading && !this.options.disabled) {
                    this.options.onClick(e);
                }
            };
            this.eventHandlers.set('click', handler);
            this.element.addEventListener('click', handler);
        }
    }

    setText(text) {
        this.options.text = text;
        if (this.element) {
            const textElement = this.element.querySelector('.btn-text');
            if (textElement) {
                textElement.textContent = text;
            } else {
                this.element.textContent = text;
            }
        }
    }

    setLoading(loading) {
        this.options.loading = loading;
        if (this.element) {
            if (loading) {
                this.element.classList.add('loading');
                this.element.disabled = true;
            } else {
                this.element.classList.remove('loading');
                this.element.disabled = this.options.disabled;
            }
        }
    }

    setDisabled(disabled) {
        this.options.disabled = disabled;
        if (this.element) {
            this.element.disabled = disabled;
        }
    }

    setVariant(variant) {
        this.options.variant = variant;
        if (this.element) {
            // Удаляем старые классы вариантов
            const variantClasses = ['btn-primary', 'btn-secondary', 'btn-outline', 'btn-ghost', 'btn-danger', 'btn-success'];
            this.element.classList.remove(...variantClasses);
            // Добавляем новый класс
            this.element.classList.add(`btn-${variant}`);
        }
    }

    destroy() {
        // Удаляем все обработчики событий
        this.eventHandlers.forEach((handler, event) => {
            this.element.removeEventListener(event, handler);
        });
        this.eventHandlers.clear();

        if (this.element) {
            this.element.remove();
            this.element = null;
        }
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
            validation: {},
            onChange: null,
            onFocus: null,
            onBlur: null,
            onInput: null,
            ...options
        };
        this.element = null;
        this.errorElement = null;
        this.eventHandlers = new Map();
    }

    render() {
        const startTime = performance.now();
        
        const container = document.createElement('div');
        container.className = 'input-container';

        this.element = document.createElement('input');
        this.element.type = this.options.type;
        this.element.placeholder = this.options.placeholder;
        this.element.value = this.options.value;
        this.element.disabled = this.options.disabled;
        this.element.required = this.options.required;
        this.element.className = 'input';

        this.setupEventListeners();
        this.setupValidation();

        container.appendChild(this.element);
        
        ComponentsManager.logPerformance('Input', startTime);
        return container;
    }

    setupEventListeners() {
        const events = {
            input: (e) => {
                this.options.value = e.target.value;
                if (this.options.onInput) this.options.onInput(e.target.value, e);
                if (this.options.onChange) this.options.onChange(e.target.value, e);
            },
            change: (e) => {
                if (this.options.onChange) this.options.onChange(e.target.value, e);
            },
            focus: (e) => {
                if (this.options.onFocus) this.options.onFocus(e);
            },
            blur: (e) => {
                this.validate();
                if (this.options.onBlur) this.options.onBlur(e);
            }
        };

        Object.entries(events).forEach(([event, handler]) => {
            if (this.options[`on${event.charAt(0).toUpperCase() + event.slice(1)}`]) {
                this.eventHandlers.set(event, handler);
                this.element.addEventListener(event, handler);
            }
        });
    }

    setupValidation() {
        const { validation } = this.options;

        if (validation.pattern) {
            this.element.pattern = validation.pattern instanceof RegExp 
                ? validation.pattern.source 
                : validation.pattern;
        }

        if (validation.minLength) this.element.minLength = validation.minLength;
        if (validation.maxLength) this.element.maxLength = validation.maxLength;
        if (validation.min !== undefined) this.element.min = validation.min;
        if (validation.max !== undefined) this.element.max = validation.max;
        if (validation.step) this.element.step = validation.step;
    }

    validate() {
        const value = this.getValue();
        let isValid = true;
        let errorMessage = '';

        // Проверка обязательного поля
        if (this.options.required && !value.trim()) {
            isValid = false;
            errorMessage = 'Это поле обязательно для заполнения';
        }
        // Проверка паттерна
        else if (this.options.validation.pattern && !new RegExp(this.options.validation.pattern).test(value)) {
            isValid = false;
            errorMessage = this.options.validation.patternMessage || 'Неверный формат';
        }
        // Проверка минимальной длины
        else if (this.options.validation.minLength && value.length < this.options.validation.minLength) {
            isValid = false;
            errorMessage = `Минимальная длина: ${this.options.validation.minLength} символов`;
        }
        // Проверка максимальной длины
        else if (this.options.validation.maxLength && value.length > this.options.validation.maxLength) {
            isValid = false;
            errorMessage = `Максимальная длина: ${this.options.validation.maxLength} символов`;
        }

        this.setError(!isValid, errorMessage);
        return isValid;
    }

    setError(hasError, message = '') {
        if (this.element) {
            if (hasError) {
                this.element.classList.add('input-error');
                if (message) {
                    if (!this.errorElement) {
                        this.errorElement = document.createElement('div');
                        this.errorElement.className = 'field-error';
                        this.element.parentNode.appendChild(this.errorElement);
                    }
                    this.errorElement.textContent = message;
                    this.errorElement.style.display = 'block';
                }
            } else {
                this.element.classList.remove('input-error');
                if (this.errorElement) {
                    this.errorElement.style.display = 'none';
                }
            }
        }
    }

    getValue() {
        return this.element ? this.element.value : this.options.value;
    }

    setValue(value) {
        this.options.value = value;
        if (this.element) {
            this.element.value = value;
        }
    }

    focus() {
        if (this.element) {
            this.element.focus();
        }
    }

    blur() {
        if (this.element) {
            this.element.blur();
        }
    }

    destroy() {
        this.eventHandlers.forEach((handler, event) => {
            this.element.removeEventListener(event, handler);
        });
        this.eventHandlers.clear();

        if (this.element) {
            this.element.remove();
        }
        if (this.errorElement) {
            this.errorElement.remove();
        }
    }
}

// Остальные классы компонентов остаются аналогичными, но с улучшениями...

// Новые компоненты
class Carousel {
    constructor(options = {}) {
        this.options = {
            items: [],
            autoPlay: false,
            interval: 5000,
            showIndicators: true,
            showControls: true,
            onSlideChange: null,
            ...options
        };
        this.currentIndex = 0;
        this.intervalId = null;
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'carousel';
        this.element.innerHTML = this.getCarouselHTML();

        this.setupEventListeners();
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }

        return this.element;
    }

    getCarouselHTML() {
        return `
            <div class="carousel-container">
                <div class="carousel-track">
                    ${this.options.items.map((item, index) => `
                        <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                            ${item}
                        </div>
                    `).join('')}
                </div>
            </div>
            ${this.options.showControls ? `
                <button class="carousel-control prev">‹</button>
                <button class="carousel-control next">›</button>
            ` : ''}
            ${this.options.showIndicators ? `
                <div class="carousel-indicators">
                    ${this.options.items.map((_, index) => `
                        <button class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                    `).join('')}
                </div>
            ` : ''}
        `;
    }

    next() {
        this.goToSlide(this.currentIndex + 1);
    }

    prev() {
        this.goToSlide(this.currentIndex - 1);
    }

    goToSlide(index) {
        const slides = this.element.querySelectorAll('.carousel-slide');
        const indicators = this.element.querySelectorAll('.indicator');
        
        // Корректируем индекс для циклической навигации
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Обновляем активный слайд
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        this.currentIndex = index;

        if (this.options.onSlideChange) {
            this.options.onSlideChange(index);
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.intervalId = setInterval(() => {
            this.next();
        }, this.options.interval);
    }

    stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    setupEventListeners() {
        const prevBtn = this.element.querySelector('.carousel-control.prev');
        const nextBtn = this.element.querySelector('.carousel-control.next');
        const indicators = this.element.querySelectorAll('.indicator');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prev());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });

        // Пауза автоплея при наведении
        if (this.options.autoPlay) {
            this.element.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.element.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Touch events для мобильных
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        let startX = 0;
        let endX = 0;

        this.element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        this.element.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) { // Минимальное расстояние свайпа
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }, { passive: true });
    }

    destroy() {
        this.stopAutoPlay();
        if (this.element) {
            this.element.remove();
        }
    }
}

// Глобальная инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.componentsManager = new ComponentsManager();
    
    // Глобальные утилиты
    window.Alert = Alert;
    window.Toast = Toast;
    window.Notification = Notification;
    
    // Новые глобальные компоненты
    window.Carousel = Carousel;
    
    console.log('🚀 UI Components Library initialized successfully!');
});

// Экспорт для использования в модульных системах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ComponentsManager,
        Button,
        Input,
        Card,
        Modal,
        Tabs,
        Accordion,
        Breadcrumbs,
        Pagination,
        Select,
        Checkbox,
        CheckboxGroup,
        Radio,
        RadioGroup,
        Slider,
        RangeSlider,
        Table,
        ProgressBar,
        Alert,
        Toast,
        Tooltip,
        Dropdown,
        Notification,
        Carousel
    };
}
