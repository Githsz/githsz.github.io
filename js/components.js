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
        this.registerAllComponents();
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
    }

    // Остальные методы остаются без изменений...
    // (initFrameworkTabs, initCopyButtons, initDemoComponents, etc.)
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

    setText(text) {
        this.options.text = text;
        if (this.element) {
            this.element.textContent = text;
        }
    }

    setLoading(loading) {
        this.options.loading = loading;
        if (this.element) {
            if (loading) {
                this.element.classList.add('loading');
            } else {
                this.element.classList.remove('loading');
            }
        }
    }

    setDisabled(disabled) {
        this.options.disabled = disabled;
        if (this.element) {
            this.element.disabled = disabled;
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
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
            ...options
        };
        this.element = null;
        this.errorElement = null;
    }

    render() {
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
        return container;
    }

    setupEventListeners() {
        if (this.options.onChange) {
            this.element.addEventListener('input', (e) => {
                this.options.onChange(e.target.value, e);
            });
        }

        if (this.options.onFocus) {
            this.element.addEventListener('focus', this.options.onFocus);
        }

        if (this.options.onBlur) {
            this.element.addEventListener('blur', (e) => {
                this.validate();
                this.options.onBlur(e);
            });
        }
    }

    setupValidation() {
        if (this.options.validation.pattern) {
            this.element.pattern = this.options.validation.pattern;
        }

        if (this.options.validation.minLength) {
            this.element.minLength = this.options.validation.minLength;
        }

        if (this.options.validation.maxLength) {
            this.element.maxLength = this.options.validation.maxLength;
        }

        if (this.options.validation.min) {
            this.element.min = this.options.validation.min;
        }

        if (this.options.validation.max) {
            this.element.max = this.options.validation.max;
        }
    }

    validate() {
        const value = this.getValue();
        let isValid = true;
        let errorMessage = '';

        if (this.options.required && !value) {
            isValid = false;
            errorMessage = 'Это поле обязательно для заполнения';
        } else if (this.options.validation.pattern && !this.options.validation.pattern.test(value)) {
            isValid = false;
            errorMessage = 'Неверный формат';
        } else if (this.options.validation.minLength && value.length < this.options.validation.minLength) {
            isValid = false;
            errorMessage = `Минимальная длина: ${this.options.validation.minLength}`;
        } else if (this.options.validation.maxLength && value.length > this.options.validation.maxLength) {
            isValid = false;
            errorMessage = `Максимальная длина: ${this.options.validation.maxLength}`;
        }

        this.setError(!isValid, errorMessage);
        return isValid;
    }

    setError(hasError, message = '') {
        if (this.element) {
            if (hasError) {
                this.element.classList.add('input-error');
                if (message && !this.errorElement) {
                    this.errorElement = document.createElement('div');
                    this.errorElement.className = 'field-error';
                    this.errorElement.textContent = message;
                    this.element.parentNode.appendChild(this.errorElement);
                } else if (this.errorElement) {
                    this.errorElement.textContent = message;
                }
            } else {
                this.element.classList.remove('input-error');
                if (this.errorElement) {
                    this.errorElement.remove();
                    this.errorElement = null;
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

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class Card {
    constructor(options = {}) {
        this.options = {
            title: '',
            content: '',
            actions: [],
            variant: 'default',
            elevation: 0,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `card card-${this.options.variant}`;
        if (this.options.elevation > 0) {
            this.element.classList.add('card-elevated');
        }

        let html = '';

        if (this.options.title) {
            html += `
                <div class="card-header">
                    <h3 class="card-title">${this.options.title}</h3>
                </div>
            `;
        }

        html += `
            <div class="card-content">
                ${this.options.content}
            </div>
        `;

        if (this.options.actions && this.options.actions.length > 0) {
            html += '<div class="card-actions">';
            this.options.actions.forEach(action => {
                html += `<button class="btn btn-${action.variant || 'primary'}">${action.text}</button>`;
            });
            html += '</div>';
        }

        this.element.innerHTML = html;

        // Добавляем обработчики событий для действий
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

    setTitle(title) {
        this.options.title = title;
        if (this.element) {
            const titleElement = this.element.querySelector('.card-title');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }
    }

    setContent(content) {
        this.options.content = content;
        if (this.element) {
            const contentElement = this.element.querySelector('.card-content');
            if (contentElement) {
                contentElement.innerHTML = content;
            }
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class Modal {
    constructor(options = {}) {
        this.options = {
            element: null,
            title: '',
            content: '',
            size: 'md',
            closeOnOverlayClick: true,
            closeOnEsc: true,
            showCloseButton: true,
            actions: [],
            onOpen: null,
            onClose: null,
            ...options
        };
        this.element = typeof this.options.element === 'string' 
            ? document.querySelector(this.options.element)
            : this.options.element;
        this.isOpen = false;
        
        if (!this.element) {
            this.createModal();
        }
        
        this.init();
    }

    createModal() {
        this.element = document.createElement('div');
        this.element.className = 'modal';
        this.element.innerHTML = `
            <div class="modal-content modal-${this.options.size}">
                ${this.options.showCloseButton ? '<button class="modal-close">&times;</button>' : ''}
                ${this.options.title ? `<h3>${this.options.title}</h3>` : ''}
                <div class="modal-body">${this.options.content}</div>
                ${this.options.actions.length ? `
                    <div class="modal-actions">
                        ${this.options.actions.map(action => 
                            `<button class="btn btn-${action.variant || 'primary'}">${action.text}</button>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        document.body.appendChild(this.element);
    }

    init() {
        // Обработчик закрытия по клику на overlay
        if (this.options.closeOnOverlayClick) {
            this.element.addEventListener('click', (e) => {
                if (e.target === this.element) {
                    this.close();
                }
            });
        }

        // Обработчик закрытия по ESC
        if (this.options.closeOnEsc) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }

        // Обработчик кнопки закрытия
        const closeBtn = this.element.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Обработчики действий
        const actionButtons = this.element.querySelectorAll('.modal-actions .btn');
        actionButtons.forEach((button, index) => {
            const action = this.options.actions[index];
            if (action && action.onClick) {
                button.addEventListener('click', () => {
                    action.onClick(this);
                });
            }
        });
    }

    open() {
        this.element.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        setTimeout(() => {
            this.element.classList.add('active');
        }, 10);

        if (this.options.onOpen) {
            this.options.onOpen(this);
        }
    }

    close() {
        this.element.classList.remove('active');
        
        setTimeout(() => {
            this.element.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.isOpen = false;

            if (this.options.onClose) {
                this.options.onClose(this);
            }
        }, 300);
    }

    setContent(content) {
        const body = this.element.querySelector('.modal-body');
        if (body) {
            body.innerHTML = content;
        }
    }

    setTitle(title) {
        const titleElement = this.element.querySelector('h3');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    destroy() {
        this.close();
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Навигационные компоненты
class Tabs {
    constructor(options = {}) {
        this.options = {
            container: null,
            tabs: [],
            variant: 'default',
            onChange: null,
            ...options
        };
        this.container = typeof this.options.container === 'string'
            ? document.querySelector(this.options.container)
            : this.options.container;
        this.activeTab = null;
        
        this.init();
    }

    init() {
        if (!this.container) return;

        const tabs = this.container.querySelectorAll('.tab');
        const contents = this.container.querySelectorAll('.tab-content');

        // Находим активную вкладку
        this.activeTab = this.container.querySelector('.tab.active');
        if (!this.activeTab && tabs.length > 0) {
            this.activeTab = tabs[0];
            this.activeTab.classList.add('active');
            
            const contentId = this.activeTab.dataset.tab;
            const content = this.container.querySelector(`#${contentId}`);
            if (content) {
                content.classList.add('active');
            }
        }

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

        if (targetTab) {
            targetTab.classList.add('active');
            this.activeTab = targetTab;
        }

        if (targetContent) {
            targetContent.classList.add('active');
        }

        if (this.options.onChange) {
            this.options.onChange(tabId);
        }
    }

    addTab(tabConfig) {
        // Реализация добавления новой вкладки
    }

    removeTab(tabId) {
        // Реализация удаления вкладки
    }

    destroy() {
        const tabs = this.container.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.removeEventListener('click', this.activateTab);
        });
    }
}

class Accordion {
    constructor(options = {}) {
        this.options = {
            container: null,
            items: [],
            allowMultiple: false,
            variant: 'default',
            onToggle: null,
            ...options
        };
        this.container = typeof this.options.container === 'string'
            ? document.querySelector(this.options.container)
            : this.options.container;
        
        this.init();
    }

    init() {
        if (!this.container) return;

        const items = this.container.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');

            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight;

                if (!this.options.allowMultiple) {
                    this.closeAll();
                }

                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    header.classList.add('active');
                    if (icon) icon.textContent = '−';
                    
                    if (this.options.onToggle) {
                        this.options.onToggle(item, true);
                    }
                } else {
                    content.style.maxHeight = null;
                    header.classList.remove('active');
                    if (icon) icon.textContent = '+';
                    
                    if (this.options.onToggle) {
                        this.options.onToggle(item, false);
                    }
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
            if (icon) icon.textContent = '+';
        });
    }

    openAll() {
        const items = this.container.querySelectorAll('.accordion-item');
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');

            content.style.maxHeight = content.scrollHeight + 'px';
            header.classList.add('active');
            if (icon) icon.textContent = '−';
        });
    }

    destroy() {
        const headers = this.container.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.removeEventListener('click', this.toggleAccordion);
        });
    }
}

class Breadcrumbs {
    constructor(options = {}) {
        this.options = {
            items: [],
            separator: '/',
            showHome: true,
            homeIcon: '🏠',
            onClick: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('nav');
        this.element.className = 'breadcrumbs';

        let html = '';

        if (this.options.showHome) {
            html += `
                <a href="/" class="breadcrumb-item">${this.options.homeIcon}</a>
                <span class="breadcrumb-separator">${this.options.separator}</span>
            `;
        }

        this.options.items.forEach((item, index) => {
            if (item.active) {
                html += `<span class="breadcrumb-item active">${item.label}</span>`;
            } else {
                html += `
                    <a href="${item.href}" class="breadcrumb-item">${item.label}</a>
                `;
            }

            if (index < this.options.items.length - 1) {
                html += `<span class="breadcrumb-separator">${this.options.separator}</span>`;
            }
        });

        this.element.innerHTML = html;

        // Добавляем обработчики событий
        const links = this.element.querySelectorAll('.breadcrumb-item[href]');
        links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                if (this.options.onClick) {
                    e.preventDefault();
                    const item = this.options.items[index + (this.options.showHome ? -1 : 0)];
                    this.options.onClick(item, index);
                }
            });
        });

        return this.element;
    }

    updateItems(newItems) {
        this.options.items = newItems;
        if (this.element) {
            const newElement = this.render();
            this.element.parentNode.replaceChild(newElement, this.element);
            this.element = newElement;
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class Pagination {
    constructor(options = {}) {
        this.options = {
            totalItems: 0,
            itemsPerPage: 10,
            currentPage: 1,
            visiblePages: 5,
            showPrevNext: true,
            showFirstLast: true,
            prevText: '‹',
            nextText: '›',
            firstText: '«',
            lastText: '»',
            onPageChange: null,
            ...options
        };
        this.element = null;
        this.totalPages = Math.ceil(this.options.totalItems / this.options.itemsPerPage);
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'pagination';

        this.update();

        return this.element;
    }

    update() {
        if (!this.element) return;

        let html = '';
        const { currentPage, totalPages, visiblePages } = this;

        // Кнопка "Первая"
        if (this.options.showFirstLast && currentPage > 1) {
            html += `<button class="pagination-item" data-page="1">${this.options.firstText}</button>`;
        }

        // Кнопка "Предыдущая"
        if (this.options.showPrevNext && currentPage > 1) {
            html += `<button class="pagination-item" data-page="${currentPage - 1}">${this.options.prevText}</button>`;
        }

        // Номера страниц
        let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let endPage = Math.min(totalPages, startPage + visiblePages - 1);

        if (endPage - startPage + 1 < visiblePages) {
            startPage = Math.max(1, endPage - visiblePages + 1);
        }

        if (startPage > 1) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                html += `<button class="pagination-item active">${i}</button>`;
            } else {
                html += `<button class="pagination-item" data-page="${i}">${i}</button>`;
            }
        }

        if (endPage < totalPages) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        // Кнопка "Следующая"
        if (this.options.showPrevNext && currentPage < totalPages) {
            html += `<button class="pagination-item" data-page="${currentPage + 1}">${this.options.nextText}</button>`;
        }

        // Кнопка "Последняя"
        if (this.options.showFirstLast && currentPage < totalPages) {
            html += `<button class="pagination-item" data-page="${totalPages}">${this.options.lastText}</button>`;
        }

        this.element.innerHTML = html;

        // Добавляем обработчики событий
        const buttons = this.element.querySelectorAll('.pagination-item[data-page]');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const page = parseInt(button.dataset.page);
                this.setPage(page);
            });
        });
    }

    setPage(page) {
        if (page < 1 || page > this.totalPages || page === this.options.currentPage) {
            return;
        }

        this.options.currentPage = page;

        if (this.options.onPageChange) {
            this.options.onPageChange(page);
        }

        this.update();
    }

    setTotalItems(totalItems) {
        this.options.totalItems = totalItems;
        this.totalPages = Math.ceil(totalItems / this.options.itemsPerPage);
        this.update();
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

// Компоненты форм
class Select {
    constructor(options = {}) {
        this.options = {
            options: [],
            placeholder: 'Выберите опцию',
            multiple: false,
            searchable: false,
            clearable: false,
            value: '',
            onChange: null,
            ...options
        };
        this.element = null;
        this.isOpen = false;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'select-container';

        const selectedText = this.getSelectedText();
        
        this.element.innerHTML = `
            <div class="select-trigger">
                <span class="select-value">${selectedText}</span>
                <span class="select-arrow">▼</span>
            </div>
            <div class="select-dropdown">
                ${this.options.searchable ? `
                    <div class="select-search">
                        <input type="text" class="select-search-input" placeholder="Поиск...">
                    </div>
                ` : ''}
                <div class="select-options">
                    ${this.options.options.map(option => `
                        <div class="select-option ${this.isSelected(option) ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}" 
                             data-value="${option.value}">
                            ${option.label}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.setupEventListeners();
        return this.element;
    }

    setupEventListeners() {
        const trigger = this.element.querySelector('.select-trigger');
        const dropdown = this.element.querySelector('.select-dropdown');
        const options = this.element.querySelectorAll('.select-option');

        trigger.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            dropdown.style.display = this.isOpen ? 'block' : 'none';
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                if (option.classList.contains('disabled')) return;

                const value = option.dataset.value;
                
                if (this.options.multiple) {
                    this.toggleValue(value);
                } else {
                    this.setValue(value);
                    this.isOpen = false;
                    dropdown.style.display = 'none';
                }

                if (this.options.onChange) {
                    this.options.onChange(this.options.multiple ? this.options.value : value);
                }
            });
        });

        // Закрытие при клике вне компонента
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.isOpen = false;
                dropdown.style.display = 'none';
            }
        });

        // Поиск
        if (this.options.searchable) {
            const searchInput = this.element.querySelector('.select-search-input');
            searchInput.addEventListener('input', (e) => {
                this.filterOptions(e.target.value);
            });
        }
    }

    getSelectedText() {
        if (this.options.multiple && Array.isArray(this.options.value)) {
            const selectedOptions = this.options.options.filter(opt => 
                this.options.value.includes(opt.value)
            );
            return selectedOptions.map(opt => opt.label).join(', ') || this.options.placeholder;
        } else {
            const selectedOption = this.options.options.find(opt => 
                opt.value === this.options.value
            );
            return selectedOption ? selectedOption.label : this.options.placeholder;
        }
    }

    isSelected(option) {
        if (this.options.multiple) {
            return Array.isArray(this.options.value) && this.options.value.includes(option.value);
        } else {
            return this.options.value === option.value;
        }
    }

    setValue(value) {
        this.options.value = value;
        this.updateDisplay();
    }

    toggleValue(value) {
        if (!Array.isArray(this.options.value)) {
            this.options.value = [];
        }

        const index = this.options.value.indexOf(value);
        if (index > -1) {
            this.options.value.splice(index, 1);
        } else {
            this.options.value.push(value);
        }

        this.updateDisplay();
    }

    updateDisplay() {
        const valueElement = this.element.querySelector('.select-value');
        if (valueElement) {
            valueElement.textContent = this.getSelectedText();
        }

        // Обновляем выделение опций
        const options = this.element.querySelectorAll('.select-option');
        options.forEach(option => {
            const value = option.dataset.value;
            if (this.isSelected({ value })) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }

    filterOptions(searchTerm) {
        const options = this.element.querySelectorAll('.select-option');
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(searchTerm.toLowerCase())) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class Checkbox {
    constructor(options = {}) {
        this.options = {
            label: '',
            checked: false,
            disabled: false,
            onChange: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('label');
        this.element.className = 'checkbox';
        
        this.element.innerHTML = `
            <input type="checkbox" ${this.options.checked ? 'checked' : ''} ${this.options.disabled ? 'disabled' : ''}>
            <span class="checkmark"></span>
            <span class="label">${this.options.label}</span>
        `;

        const input = this.element.querySelector('input');
        input.addEventListener('change', (e) => {
            this.options.checked = e.target.checked;
            if (this.options.onChange) {
                this.options.onChange(this.options.checked);
            }
        });

        return this.element;
    }

    setChecked(checked) {
        this.options.checked = checked;
        const input = this.element.querySelector('input');
        if (input) {
            input.checked = checked;
        }
    }

    setDisabled(disabled) {
        this.options.disabled = disabled;
        const input = this.element.querySelector('input');
        if (input) {
            input.disabled = disabled;
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class CheckboxGroup {
    constructor(options = {}) {
        this.options = {
            options: [],
            name: 'checkbox-group',
            onChange: null,
            ...options
        };
        this.element = null;
        this.checkboxes = [];
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'checkbox-group';

        this.options.options.forEach((option, index) => {
            const checkbox = new Checkbox({
                label: option.label,
                checked: option.checked || false,
                disabled: option.disabled || false,
                onChange: (checked) => {
                    this.handleChange(option.value, checked);
                }
            });

            this.checkboxes.push(checkbox);
            this.element.appendChild(checkbox.render());
        });

        return this.element;
    }

    handleChange(value, checked) {
        if (this.options.onChange) {
            const values = this.getValues();
            this.options.onChange(values);
        }
    }

    getValues() {
        return this.options.options
            .filter((option, index) => this.checkboxes[index] && this.checkboxes[index].options.checked)
            .map(option => option.value);
    }

    setValues(values) {
        this.options.options.forEach((option, index) => {
            if (this.checkboxes[index]) {
                this.checkboxes[index].setChecked(values.includes(option.value));
            }
        });
    }

    destroy() {
        this.checkboxes.forEach(checkbox => checkbox.destroy());
        if (this.element) {
            this.element.remove();
        }
    }
}

class Radio {
    constructor(options = {}) {
        this.options = {
            label: '',
            value: '',
            checked: false,
            name: 'radio',
            disabled: false,
            onChange: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('label');
        this.element.className = 'radio';
        
        this.element.innerHTML = `
            <input type="radio" name="${this.options.name}" value="${this.options.value}" 
                   ${this.options.checked ? 'checked' : ''} ${this.options.disabled ? 'disabled' : ''}>
            <span class="radiomark"></span>
            <span class="label">${this.options.label}</span>
        `;

        const input = this.element.querySelector('input');
        input.addEventListener('change', (e) => {
            if (e.target.checked && this.options.onChange) {
                this.options.onChange(this.options.value);
            }
        });

        return this.element;
    }

    setChecked(checked) {
        this.options.checked = checked;
        const input = this.element.querySelector('input');
        if (input) {
            input.checked = checked;
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class RadioGroup {
    constructor(options = {}) {
        this.options = {
            options: [],
            name: 'radio-group',
            value: '',
            onChange: null,
            ...options
        };
        this.element = null;
        this.radios = [];
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'radio-group';

        this.options.options.forEach((option, index) => {
            const radio = new Radio({
                label: option.label,
                value: option.value,
                checked: option.value === this.options.value,
                name: this.options.name,
                disabled: option.disabled || false,
                onChange: (value) => {
                    this.setValue(value);
                }
            });

            this.radios.push(radio);
            this.element.appendChild(radio.render());
        });

        return this.element;
    }

    setValue(value) {
        this.options.value = value;
        
        this.radios.forEach(radio => {
            radio.setChecked(radio.options.value === value);
        });

        if (this.options.onChange) {
            this.options.onChange(value);
        }
    }

    getValue() {
        return this.options.value;
    }

    destroy() {
        this.radios.forEach(radio => radio.destroy());
        if (this.element) {
            this.element.remove();
        }
    }
}

class Slider {
    constructor(options = {}) {
        this.options = {
            min: 0,
            max: 100,
            value: 50,
            step: 1,
            disabled: false,
            showValue: true,
            onChange: null,
            onInput: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'slider-container';

        this.element.innerHTML = `
            <input type="range" class="slider" 
                   min="${this.options.min}" 
                   max="${this.options.max}" 
                   value="${this.options.value}" 
                   step="${this.options.step}"
                   ${this.options.disabled ? 'disabled' : ''}>
            ${this.options.showValue ? `
                <div class="slider-value">${this.options.value}</div>
            ` : ''}
        `;

        const input = this.element.querySelector('input');
        const valueDisplay = this.element.querySelector('.slider-value');

        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            if (valueDisplay) {
                valueDisplay.textContent = value;
            }

            if (this.options.onInput) {
                this.options.onInput(value);
            }
        });

        input.addEventListener('change', (e) => {
            const value = e.target.value;
            this.options.value = value;

            if (this.options.onChange) {
                this.options.onChange(value);
            }
        });

        return this.element;
    }

    setValue(value) {
        this.options.value = value;
        const input = this.element.querySelector('input');
        const valueDisplay = this.element.querySelector('.slider-value');

        if (input) {
            input.value = value;
        }

        if (valueDisplay) {
            valueDisplay.textContent = value;
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class RangeSlider {
    constructor(options = {}) {
        this.options = {
            min: 0,
            max: 100,
            values: [25, 75],
            step: 1,
            showValues: true,
            onChange: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'range-slider-container';

        // Для простоты используем два отдельных слайдера
        this.element.innerHTML = `
            <div class="range-slider">
                <input type="range" class="slider slider-min" 
                       min="${this.options.min}" 
                       max="${this.options.max}" 
                       value="${this.options.values[0]}" 
                       step="${this.options.step}">
                <input type="range" class="slider slider-max" 
                       min="${this.options.min}" 
                       max="${this.options.max}" 
                       value="${this.options.values[1]}" 
                       step="${this.options.step}">
            </div>
            ${this.options.showValues ? `
                <div class="slider-values">${this.options.values[0]} - ${this.options.values[1]}</div>
            ` : ''}
        `;

        const minSlider = this.element.querySelector('.slider-min');
        const maxSlider = this.element.querySelector('.slider-max');
        const valuesDisplay = this.element.querySelector('.slider-values');

        const updateValues = () => {
            const minValue = parseInt(minSlider.value);
            const maxValue = parseInt(maxSlider.value);

            // Ensure min doesn't exceed max
            if (minValue > maxValue) {
                minSlider.value = maxValue;
                this.options.values[0] = maxValue;
            } else {
                this.options.values[0] = minValue;
            }

            // Ensure max doesn't go below min
            if (maxValue < minValue) {
                maxSlider.value = minValue;
                this.options.values[1] = minValue;
            } else {
                this.options.values[1] = maxValue;
            }

            if (valuesDisplay) {
                valuesDisplay.textContent = `${this.options.values[0]} - ${this.options.values[1]}`;
            }

            if (this.options.onChange) {
                this.options.onChange([...this.options.values]);
            }
        };

        minSlider.addEventListener('input', updateValues);
        maxSlider.addEventListener('input', updateValues);

        return this.element;
    }

    setValues(values) {
        this.options.values = [...values];
        const minSlider = this.element.querySelector('.slider-min');
        const maxSlider = this.element.querySelector('.slider-max');
        const valuesDisplay = this.element.querySelector('.slider-values');

        if (minSlider) minSlider.value = values[0];
        if (maxSlider) maxSlider.value = values[1];
        if (valuesDisplay) {
            valuesDisplay.textContent = `${values[0]} - ${values[1]}`;
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

// Компоненты данных
class Table {
    constructor(options = {}) {
        this.options = {
            columns: [],
            data: [],
            sortable: false,
            searchable: false,
            pagination: false,
            itemsPerPage: 10,
            onRowClick: null,
            onSort: null,
            ...options
        };
        this.element = null;
        this.currentPage = 1;
        this.sortColumn = null;
        this.sortDirection = 'asc';
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'table-container';

        this.update();

        return this.element;
    }

    update() {
        if (!this.element) return;

        let html = '';

        // Поиск
        if (this.options.searchable) {
            html += `
                <div class="table-search">
                    <input type="text" class="search-input" placeholder="Поиск...">
                </div>
            `;
        }

        // Таблица
        html += `
            <table class="table">
                <thead>
                    <tr>
                        ${this.options.columns.map(column => `
                            <th data-column="${column.key}" class="${column.sortable ? 'sortable' : ''}">
                                ${column.label}
                                ${column.sortable ? '<span class="sort-icon"></span>' : ''}
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${this.getCurrentPageData().map((row, index) => `
                        <tr data-index="${index}">
                            ${this.options.columns.map(column => `
                                <td>
                                    ${column.render ? column.render(row[column.key], row) : row[column.key]}
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        // Пагинация
        if (this.options.pagination) {
            const totalPages = Math.ceil(this.options.data.length / this.options.itemsPerPage);
            if (totalPages > 1) {
                html += `
                    <div class="table-pagination">
                        <button class="btn btn-outline" ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">‹</button>
                        <span>Страница ${this.currentPage} из ${totalPages}</span>
                        <button class="btn btn-outline" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">›</button>
                    </div>
                `;
            }
        }

        this.element.innerHTML = html;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Сортировка
        if (this.options.sortable) {
            const sortableHeaders = this.element.querySelectorAll('th.sortable');
            sortableHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const column = header.dataset.column;
                    this.sort(column);
                });
            });
        }

        // Клик по строке
        if (this.options.onRowClick) {
            const rows = this.element.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.addEventListener('click', () => {
                    const index = parseInt(row.dataset.index);
                    const rowData = this.getCurrentPageData()[index];
                    this.options.onRowClick(rowData);
                });
            });
        }

        // Пагинация
        if (this.options.pagination) {
            const paginationButtons = this.element.querySelectorAll('.table-pagination button');
            paginationButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const page = parseInt(button.dataset.page);
                    this.setPage(page);
                });
            });
        }

        // Поиск
        if (this.options.searchable) {
            const searchInput = this.element.querySelector('.table-search input');
            searchInput.addEventListener('input', (e) => {
                this.search(e.target.value);
            });
        }
    }

    sort(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        this.options.data.sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];

            if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        if (this.options.onSort) {
            this.options.onSort(column, this.sortDirection);
        }

        this.update();
    }

    search(term) {
        // Простая реализация поиска
        const filteredData = this.options.data.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(term.toLowerCase())
            )
        );

        // В реальной реализации здесь была бы фильтрация данных
        console.log('Search:', term, filteredData);
    }

    getCurrentPageData() {
        if (!this.options.pagination) {
            return this.options.data;
        }

        const start = (this.currentPage - 1) * this.options.itemsPerPage;
        const end = start + this.options.itemsPerPage;
        return this.options.data.slice(start, end);
    }

    setPage(page) {
        const totalPages = Math.ceil(this.options.data.length / this.options.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.update();
        }
    }

    setData(data) {
        this.options.data = data;
        this.currentPage = 1;
        this.update();
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class ProgressBar {
    constructor(options = {}) {
        this.options = {
            value: 0,
            max: 100,
            variant: 'default',
            showLabel: true,
            striped: false,
            animated: false,
            height: '8px',
            onComplete: null,
            ...options
        };
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'progress';

        const percentage = (this.options.value / this.options.max) * 100;
        
        this.element.innerHTML = `
            <div class="progress-bar progress-${this.options.variant} ${this.options.striped ? 'striped' : ''} ${this.options.animated ? 'animated' : ''}" 
                 style="width: ${percentage}%; height: ${this.options.height}">
                ${this.options.showLabel ? `
                    <span class="progress-label">${Math.round(percentage)}%</span>
                ` : ''}
            </div>
        `;

        // Проверка завершения
        if (percentage >= 100 && this.options.onComplete) {
            setTimeout(() => {
                this.options.onComplete();
            }, 300);
        }

        return this.element;
    }

    setValue(value) {
        this.options.value = value;
        if (this.element) {
            const percentage = (value / this.options.max) * 100;
            const bar = this.element.querySelector('.progress-bar');
            if (bar) {
                bar.style.width = `${percentage}%`;
                
                const label = bar.querySelector('.progress-label');
                if (label) {
                    label.textContent = `${Math.round(percentage)}%`;
                }
            }

            // Проверка завершения
            if (percentage >= 100 && this.options.onComplete) {
                setTimeout(() => {
                    this.options.onComplete();
                }, 300);
            }
        }
    }

    setVariant(variant) {
        this.options.variant = variant;
        if (this.element) {
            const bar = this.element.querySelector('.progress-bar');
            if (bar) {
                bar.className = `progress-bar progress-${variant} ${this.options.striped ? 'striped' : ''} ${this.options.animated ? 'animated' : ''}`;
            }
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

// Компоненты обратной связи
class Alert {
    constructor(options = {}) {
        this.options = {
            message: '',
            variant: 'info',
            title: '',
            dismissible: true,
            autoDismiss: false,
            duration: 5000,
            onDismiss: null,
            ...options
        };
        this.element = null;
        this.timeoutId = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `alert alert-${this.options.variant}`;
        
        this.element.innerHTML = `
            <div class="alert-content">
                ${this.options.title ? `<strong>${this.options.title}</strong> ` : ''}
                ${this.options.message}
            </div>
            ${this.options.dismissible ? `
                <button class="alert-close">×</button>
            ` : ''}
        `;

        if (this.options.dismissible) {
            const closeBtn = this.element.querySelector('.alert-close');
            closeBtn.addEventListener('click', () => {
                this.dismiss();
            });
        }

        if (this.options.autoDismiss) {
            this.timeoutId = setTimeout(() => {
                this.dismiss();
            }, this.options.duration);
        }

        return this.element;
    }

    show(container = document.body) {
        if (!this.element) {
            this.render();
        }
        container.appendChild(this.element);
    }

    dismiss() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (this.element) {
            this.element.style.opacity = '0';
            this.element.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
            }, 300);
        }

        if (this.options.onDismiss) {
            this.options.onDismiss();
        }
    }

    static show(message, variant = 'info', duration = 5000) {
        const alert = new Alert({
            message,
            variant,
            autoDismiss: true,
            duration
        });
        alert.show();
        return alert;
    }

    static success(message, duration = 5000) {
        return Alert.show(message, 'success', duration);
    }

    static error(message, duration = 5000) {
        return Alert.show(message, 'error', duration);
    }

    static warning(message, duration = 5000) {
        return Alert.show(message, 'warning', duration);
    }

    static info(message, duration = 5000) {
        return Alert.show(message, 'info', duration);
    }

    destroy() {
        this.dismiss();
    }
}

class Toast {
    constructor(options = {}) {
        this.options = {
            message: '',
            variant: 'info',
            duration: 5000,
            position: 'top-right',
            showIcon: true,
            showClose: true,
            onClose: null,
            ...options
        };
        this.element = null;
        this.timeoutId = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `toast ${this.options.variant}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        this.element.innerHTML = `
            ${this.options.showIcon ? `
                <span class="toast-icon">${icons[this.options.variant] || icons.info}</span>
            ` : ''}
            <div class="toast-content">${this.options.message}</div>
            ${this.options.showClose ? `
                <button class="toast-close">×</button>
            ` : ''}
        `;

        if (this.options.showClose) {
            const closeBtn = this.element.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        return this.element;
    }

    show() {
        if (!this.element) {
            this.render();
        }

        // Получаем или создаем контейнер для тостов
        let container = document.querySelector(`.toast-container.${this.options.position}`);
        if (!container) {
            container = document.createElement('div');
            container.className = `toast-container ${this.options.position}`;
            document.body.appendChild(container);
        }

        container.appendChild(this.element);

        // Автоматическое закрытие
        if (this.options.duration > 0) {
            this.timeoutId = setTimeout(() => {
                this.close();
            }, this.options.duration);
        }

        // Анимация появления
        setTimeout(() => {
            if (this.element) {
                this.element.style.transform = 'translateX(0)';
                this.element.style.opacity = '1';
            }
        }, 10);
    }

    close() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (this.element) {
            this.element.classList.add('fade-out');
            
            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
            }, 300);
        }

        if (this.options.onClose) {
            this.options.onClose();
        }
    }

    static show(message, variant = 'info', duration = 5000) {
        const toast = new Toast({
            message,
            variant,
            duration
        });
        toast.show();
        return toast;
    }

    static success(message, duration = 5000) {
        return Toast.show(message, 'success', duration);
    }

    static error(message, duration = 5000) {
        return Toast.show(message, 'error', duration);
    }

    static warning(message, duration = 5000) {
        return Toast.show(message, 'warning', duration);
    }

    static info(message, duration = 5000) {
        return Toast.show(message, 'info', duration);
    }

    destroy() {
        this.close();
    }
}

// Утилиты
class Tooltip {
    constructor(options = {}) {
        this.options = {
            content: '',
            position: 'top',
            trigger: 'hover',
            delay: 100,
            ...options
        };
        this.element = null;
        this.tooltipElement = null;
        this.showTimeout = null;
        this.hideTimeout = null;
    }

    attachTo(element) {
        this.element = element;

        if (this.options.trigger === 'hover') {
            element.addEventListener('mouseenter', this.show.bind(this));
            element.addEventListener('mouseleave', this.hide.bind(this));
        } else if (this.options.trigger === 'click') {
            element.addEventListener('click', this.toggle.bind(this));
        }

        // Создаем элемент тултипа
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = `tooltip tooltip-${this.options.position}`;
        this.tooltipElement.innerHTML = `
            <div class="tooltip-content">${this.options.content}</div>
            <div class="tooltip-arrow"></div>
        `;
        this.tooltipElement.style.display = 'none';
        document.body.appendChild(this.tooltipElement);
    }

    show() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }

        this.showTimeout = setTimeout(() => {
            if (!this.tooltipElement || !this.element) return;

            const rect = this.element.getBoundingClientRect();
            this.positionTooltip(rect);
            this.tooltipElement.style.display = 'block';
            this.tooltipElement.style.opacity = '1';
        }, this.options.delay);
    }

    hide() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        this.hideTimeout = setTimeout(() => {
            if (this.tooltipElement) {
                this.tooltipElement.style.opacity = '0';
                setTimeout(() => {
                    if (this.tooltipElement) {
                        this.tooltipElement.style.display = 'none';
                    }
                }, 300);
            }
        }, this.options.delay);
    }

    toggle() {
        if (this.tooltipElement.style.display === 'none') {
            this.show();
        } else {
            this.hide();
        }
    }

    positionTooltip(rect) {
        if (!this.tooltipElement) return;

        const tooltipRect = this.tooltipElement.getBoundingClientRect();
        let top, left;

        switch (this.options.position) {
            case 'top':
                top = rect.top - tooltipRect.height - 8;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + 8;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - 8;
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + 8;
                break;
        }

        this.tooltipElement.style.top = `${top}px`;
        this.tooltipElement.style.left = `${left}px`;
    }

    setContent(content) {
        this.options.content = content;
        if (this.tooltipElement) {
            const contentElement = this.tooltipElement.querySelector('.tooltip-content');
            if (contentElement) {
                contentElement.textContent = content;
            }
        }
    }

    destroy() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        if (this.element) {
            this.element.removeEventListener('mouseenter', this.show);
            this.element.removeEventListener('mouseleave', this.hide);
            this.element.removeEventListener('click', this.toggle);
        }

        if (this.tooltipElement && this.tooltipElement.parentNode) {
            this.tooltipElement.parentNode.removeChild(this.tooltipElement);
        }
    }
}

class Dropdown {
    constructor(options = {}) {
        this.options = {
            trigger: null,
            menu: null,
            position: 'bottom-left',
            closeOnClick: true,
            onShow: null,
            onHide: null,
            ...options
        };
        this.trigger = typeof this.options.trigger === 'string'
            ? document.querySelector(this.options.trigger)
            : this.options.trigger;
        this.menu = typeof this.options.menu === 'string'
            ? document.querySelector(this.options.menu)
            : this.options.menu;
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.trigger || !this.menu) return;

        this.menu.style.display = 'none';

        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        if (this.options.closeOnClick) {
            document.addEventListener('click', () => {
                if (this.isOpen) {
                    this.hide();
                }
            });

            this.menu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        if (this.isOpen) return;

        this.positionMenu();
        this.menu.style.display = 'block';
        this.isOpen = true;

        if (this.options.onShow) {
            this.options.onShow();
        }
    }

    hide() {
        if (!this.isOpen) return;

        this.menu.style.display = 'none';
        this.isOpen = false;

        if (this.options.onHide) {
            this.options.onHide();
        }
    }

    positionMenu() {
        const triggerRect = this.trigger.getBoundingClientRect();
        const menuRect = this.menu.getBoundingClientRect();

        let top, left;

        switch (this.options.position) {
            case 'bottom-left':
                top = triggerRect.bottom;
                left = triggerRect.left;
                break;
            case 'bottom-right':
                top = triggerRect.bottom;
                left = triggerRect.right - menuRect.width;
                break;
            case 'top-left':
                top = triggerRect.top - menuRect.height;
                left = triggerRect.left;
                break;
            case 'top-right':
                top = triggerRect.top - menuRect.height;
                left = triggerRect.right - menuRect.width;
                break;
        }

        this.menu.style.top = `${top}px`;
        this.menu.style.left = `${left}px`;
    }

    destroy() {
        if (this.trigger) {
            this.trigger.removeEventListener('click', this.toggle);
        }
        document.removeEventListener('click', this.hide);
    }
}

class Notification {
    constructor(options = {}) {
        this.options = {
            title: '',
            message: '',
            type: 'info',
            duration: 5000,
            action: null,
            ...options
        };
        this.element = null;
        this.timeoutId = null;
    }

    show() {
        this.element = document.createElement('div');
        this.element.className = `notification ${this.options.type}`;
        
        this.element.innerHTML = `
            <div class="notification-content">
                ${this.options.title ? `<div class="notification-title">${this.options.title}</div>` : ''}
                <div class="notification-message">${this.options.message}</div>
            </div>
            ${this.options.action ? `
                <button class="notification-action">${this.options.action.text}</button>
            ` : ''}
            <button class="notification-close">×</button>
        `;

        document.body.appendChild(this.element);

        // Анимация появления
        setTimeout(() => {
            if (this.element) {
                this.element.style.transform = 'translateX(0)';
                this.element.style.opacity = '1';
            }
        }, 10);

        // Обработчики событий
        const closeBtn = this.element.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.close();
        });

        if (this.options.action) {
            const actionBtn = this.element.querySelector('.notification-action');
            actionBtn.addEventListener('click', () => {
                this.options.action.onClick();
                this.close();
            });
        }

        // Автоматическое закрытие
        if (this.options.duration > 0) {
            this.timeoutId = setTimeout(() => {
                this.close();
            }, this.options.duration);
        }
    }

    close() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (this.element) {
            this.element.style.transform = 'translateX(100%)';
            this.element.style.opacity = '0';
            
            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
            }, 300);
        }
    }

    static show(options) {
        const notification = new Notification(options);
        notification.show();
        return notification;
    }

    destroy() {
        this.close();
    }
}

// Глобальная инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.componentsManager = new ComponentsManager();
    
    // Глобальные утилиты
    window.Alert = Alert;
    window.Toast = Toast;
    window.Notification = Notification;
});
