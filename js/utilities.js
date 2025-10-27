// js/utilities.js
class UtilitiesManager {
    constructor() {
        this.init();
    }

    init() {
        this.initUtilityCards();
    }

    initUtilityCards() {
        // Добавляем обработчики для демо-функциональности
        document.querySelectorAll('.utility-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const utilityName = e.target.closest('.utility-card').querySelector('h3').textContent;
                this.showNotification(`Утилита "${utilityName}" скоро будет доступна!`);
            });
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

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
}

// Глобальные функции для утилит
function openColorGenerator() {
    showNotification('Генератор цветов скоро будет доступен!');
}

function openCSSGenerator() {
    showNotification('CSS Генератор в разработке!');
}

function openTextUtils() {
    showNotification('Текст утилиты скоро появятся!');
}

function openJSONValidator() {
    showNotification('JSON Валидатор в процессе разработки!');
}

function openBase64Encoder() {
    showNotification('Base64 Кодер скоро будет готов!');
}

function openTimers() {
    showNotification('Таймеры в разработке!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

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

document.addEventListener('DOMContentLoaded', () => {
    new UtilitiesManager();
});
