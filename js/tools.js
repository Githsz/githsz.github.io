// js/tools.js
class ToolsManager {
    constructor() {
        this.init();
    }

    init() {
        this.initCopyButtons();
        this.initCodeHighlighting();
    }

    initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const codeBlock = e.target.closest('.tool-card').querySelector('code');
                if (codeBlock) {
                    this.copyToClipboard(codeBlock.textContent);
                    this.showNotification('Код скопирован в буфер обмена!');
                }
            });
        });
    }

    initCodeHighlighting() {
        // Простая подсветка синтаксиса
        document.querySelectorAll('code').forEach(code => {
            const text = code.textContent;
            // Подсветка ключевых слов
            let highlighted = text
                .replace(/(name:|on:|jobs:|steps:|uses:|run:)/g, '<span class="code-keyword">$1</span>')
                .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
                .replace(/(".*?")/g, '<span class="code-string">$1</span>')
                .replace(/(\$\{\{.*?\}\})/g, '<span class="code-variable">$1</span>');
            
            code.innerHTML = highlighted;
        });
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

document.addEventListener('DOMContentLoaded', () => {
    new ToolsManager();
});
