/**
 * Breadcrumbs Component for PD2i Website
 * SEO-friendly breadcrumb navigation
 */
class Breadcrumbs {
    constructor(containerId, items = []) {
        this.containerId = containerId;
        this.items = items; // Array of {label, href}
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.warn(`Breadcrumbs: Container #${this.containerId} not found`);
            return;
        }

        container.innerHTML = this.generateHTML();
    }

    generateHTML() {
        if (!this.items || this.items.length === 0) {
            return '';
        }

        let html = '<nav aria-label="Breadcrumb" class="container mx-auto px-4 py-4">';
        html += '<ol class="flex items-center space-x-2 text-sm text-gray-600 flex-wrap">';

        this.items.forEach((item, index) => {
            const isLast = index === this.items.length - 1;

            if (isLast) {
                // Last item - no link, current page
                html += `<li class="text-pd2i-black font-semibold" aria-current="page">${this.escapeHtml(item.label)}</li>`;
            } else {
                // Regular item with link
                html += `<li><a href="${item.href}" class="hover:text-pd2i-blue transition-colors duration-200">${this.escapeHtml(item.label)}</a></li>`;
                html += '<li><span class="mx-2 text-gray-400" aria-hidden="true">/</span></li>';
            }
        });

        html += '</ol>';
        html += '</nav>';

        return html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

