// js/contact.js
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.initContactForm();
        this.initSocialLinks();
    }

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Показываем индикатор загрузки
            btnText.style.display = 'none';
            btnLoading.style.display = 'block';
            submitBtn.disabled = true;

            try {
                // Имитация отправки формы
                await this.simulateFormSubmit(formData);
                
                this.showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
                form.reset();
            } catch (error) {
                this.showNotification('Ошибка при отправке сообщения. Попробуйте еще раз.', 'error');
            } finally {
                // Скрываем индикатор загрузки
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });

        // Добавляем валидацию в реальном времени
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email обязателен';
                } else if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Введите корректный email';
                }
                break;
            case 'text':
                if (field.required && !value) {
                    isValid = false;
                    errorMessage = 'Это поле обязательно';
                }
                break;
            case 'textarea':
                if (field.required && !value) {
                    isValid = false;
                    errorMessage = 'Сообщение обязательно';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Сообщение должно содержать минимум 10 символов';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#CF6679';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #CF6679;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    async simulateFormSubmit(formData) {
        // Имитация задержки сети
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 90% шанс успешной отправки для демонстрации
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    initSocialLinks() {
        // Добавляем анимацию при наведении на социальные ссылки
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0)';
            });
        });
    }

    showNotification(message, type = 'info') {
        const backgroundColor = type === 'success' ? '#03DAC6' : 
                              type === 'error' ? '#CF6679' : 
                              '#BB86FC';

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${backgroundColor};
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
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});
