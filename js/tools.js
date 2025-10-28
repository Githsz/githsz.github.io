// tools.js
class ToolsManager {
    constructor() {
        this.init();
    }

    init() {
        this.initCopyButtons();
        this.initCodeHighlighting();
        this.initMobileMenu();
    }

    initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const codeBlock = e.target.closest('.tool-card').querySelector('code');
                if (codeBlock) {
                    this.copyToClipboard(codeBlock.textContent);
                    this.showNotification('Код скопирован в буфер обмена!', 'success');
                }
            });
        });
    }

    initCodeHighlighting() {
        // Простая подсветка синтаксиса
        document.querySelectorAll('.tool-code code').forEach(code => {
            const text = code.textContent;
            // Подсветка ключевых слов
            let highlighted = text
                .replace(/(name:|on:|jobs:|steps:|uses:|run:|with:)/g, '<span class="code-keyword">$1</span>')
                .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
                .replace(/(".*?")/g, '<span class="code-string">$1</span>')
                .replace(/(\$\{\{.*?\}\})/g, '<span class="code-variable">$1</span>')
                .replace(/(\b(echo|if|then|else|fi|for|in|do|done|while|function)\b)/g, '<span class="code-keyword">$1</span>');
            
            code.innerHTML = highlighted;
        });
    }

    initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Ошибка копирования: ', err);
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Анимация появления
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

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
    new ToolsManager();
});
