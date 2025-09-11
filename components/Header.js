/**
 * Header Component - PD2i Website
 * Composant réutilisable pour le header du site
 */

class Header {
    constructor(options = {}) {
        this.options = {
            logoSrc: options.logoSrc || 'assets/images/logo-pd2i.png',
            logoAlt: options.logoAlt || 'PD2i Logo',
            currentLang: options.currentLang || 'EN',
            languages: options.languages || ['EN', 'FR'],
            navigationItems: options.navigationItems || this.getDefaultNavigation(),
            ...options
        };
        
        this.isMenuOpen = false;
        this.init();
    }
    
    getDefaultNavigation() {
        return [
            { label: 'Home', href: '#', type: 'link' },
            {
                label: 'Coating Equipments',
                labelCompact: 'Coating',
                type: 'dropdown',
                items: [
                    { label: 'PVD Technology for Tooling', href: 'pvd-cutting-tools.html' },
                    { label: 'PVD Coating System for Molds & Dies', href: 'pvd-molds-dies.html' },
                    { label: 'DLC for Tribological Coatings', href: '#' }
                ]
            },
            { label: 'Edge Preparation', labelCompact: 'Edge Prep', href: '#', type: 'link' },
            {
                label: 'Turnkey',
                type: 'dropdown',
                items: [
                    { label: 'Turnkey Solutions', href: '#' },
                    { label: 'Greenclean Ultrasonic Cleaning', href: '#' }
                ]
            },
            { label: 'Plasma Nitriding', labelCompact: 'Plasma', href: '#', type: 'link' },
            { label: 'Services', href: '#', type: 'link' },
            { label: 'About us', labelCompact: 'About', href: '#', type: 'link' }
        ];
    }
    
    init() {
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        const headerHTML = this.generateHTML();
        const headerElement = document.querySelector('header') || document.createElement('header');
        headerElement.innerHTML = headerHTML;
        headerElement.className = 'bg-white shadow-sm';
        
        if (!document.querySelector('header')) {
            document.body.insertBefore(headerElement, document.body.firstChild);
        }
        
        return headerElement;
    }
    
    generateHTML() {
        return `
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between h-24">
                    <!-- Logo -->
                    <div class="flex-shrink-0">
                        <a href="#" class="flex items-center">
                            <img src="${this.options.logoSrc}" alt="${this.options.logoAlt}" class="h-16 w-auto">
                        </a>
                    </div>
                    
                    ${this.generateTabletNavigation()}
                    ${this.generateDesktopNavigation()}
                    ${this.generateTabletActions()}
                    ${this.generateDesktopActions()}
                    
                    <!-- Mobile Menu Button -->
                    <div class="lg:hidden xl:hidden">
                        <button class="text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 p-2" id="mobileMenuBtn">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                ${this.generateMobileNavigation()}
            </div>
        `;
    }
    
    generateTabletNavigation() {
        return `
            <!-- Tablet Compact Navigation (1024px - 1279px) -->
            <nav class="hidden lg:flex xl:hidden items-center space-x-4">
                ${this.options.navigationItems.map(item => {
                    if (item.type === 'dropdown') {
                        return this.generateDropdown(item, 'tablet');
                    }
                    return `<a href="${item.href}" class="text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 font-medium text-sm">${item.labelCompact || item.label}</a>`;
                }).join('')}
            </nav>
        `;
    }
    
    generateDesktopNavigation() {
        return `
            <!-- Desktop Full Navigation (1280px+) -->
            <nav class="hidden xl:flex items-center space-x-6 2xl:space-x-8">
                ${this.options.navigationItems.map(item => {
                    if (item.type === 'dropdown') {
                        return this.generateDropdown(item, 'desktop');
                    }
                    return `<a href="${item.href}" class="text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 font-medium">${item.label}</a>`;
                }).join('')}
            </nav>
        `;
    }
    
    generateDropdown(item, size) {
        const isTablet = size === 'tablet';
        const iconSize = isTablet ? 'w-3 h-3' : 'w-4 h-4';
        const textSize = isTablet ? 'text-sm' : '';
        const dropdownWidth = isTablet ? 'w-56' : 'w-64';
        const itemTextSize = isTablet ? 'text-xs' : 'text-sm';
        const itemPadding = isTablet ? 'px-3 py-2' : 'px-4 py-2';
        
        return `
            <div class="relative group">
                <a href="${item.href || '#'}" class="text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 font-medium flex items-center ${textSize}">
                    ${isTablet ? (item.labelCompact || item.label) : item.label}
                    <svg class="${iconSize} ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </a>
                <div class="absolute left-0 mt-2 ${dropdownWidth} bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div class="py-2">
                        ${item.items.map(subItem => 
                            `<a href="${subItem.href}" class="block ${itemPadding} ${itemTextSize} text-pd2i-black hover:bg-gray-100 hover:text-pd2i-blue transition-colors duration-200">${subItem.label}</a>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    generateTabletActions() {
        return `
            <!-- Tablet Contacts & Language (1024px - 1279px) -->
            <div class="hidden lg:flex xl:hidden items-center space-x-3">
                <a href="#" class="bg-transparent border-2 border-pd2i-blue text-pd2i-blue hover:bg-pd2i-blue hover:text-white transition-all duration-200 px-4 py-1 text-sm font-medium">
                    Contacts
                </a>
                ${this.generateLanguageSelector('tablet')}
            </div>
        `;
    }
    
    generateDesktopActions() {
        return `
            <!-- Desktop Contacts & Language Selector -->
            <div class="hidden xl:flex items-center space-x-4">
                <a href="#" class="bg-transparent border-2 border-pd2i-blue text-pd2i-blue hover:bg-pd2i-blue hover:text-white transition-all duration-200 px-6 py-2 font-medium">
                    Contacts
                </a>
                ${this.generateLanguageSelector('desktop')}
            </div>
        `;
    }
    
    generateLanguageSelector(size) {
        const isTablet = size === 'tablet';
        const buttonId = isTablet ? 'tabletLanguageBtn' : 'languageBtn';
        const dropdownId = isTablet ? 'tabletLanguageDropdown' : 'languageDropdown';
        const iconSize = isTablet ? 'w-3 h-3' : 'w-4 h-4';
        const textSize = isTablet ? 'text-sm' : '';
        const itemSize = isTablet ? 'text-xs' : 'text-sm';
        
        return `
            <div class="relative">
                <button class="flex items-center text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 font-medium ${textSize}" id="${buttonId}">
                    ${this.options.currentLang}
                    <svg class="${iconSize} ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="absolute right-0 mt-2 w-20 bg-white border border-gray-200 rounded-md shadow-lg hidden" id="${dropdownId}">
                    ${this.options.languages.map(lang => 
                        `<a href="#" class="block px-3 py-2 ${itemSize} text-pd2i-black hover:bg-gray-100" data-lang="${lang}">${lang}</a>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    generateMobileNavigation() {
        return `
            <!-- Mobile Navigation -->
            <div class="lg:hidden hidden" id="mobileMenu">
                <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                    ${this.options.navigationItems.map(item => {
                        if (item.type === 'dropdown') {
                            return this.generateMobileDropdown(item);
                        }
                        return `<a href="${item.href}" class="block px-3 py-2 text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 font-medium">${item.label}</a>`;
                    }).join('')}
                    
                    <div class="px-3 py-2">
                        <a href="#" class="inline-block bg-transparent border-2 border-pd2i-blue text-pd2i-blue hover:bg-pd2i-blue hover:text-white transition-all duration-200 px-6 py-2 font-medium">
                            Contacts
                        </a>
                    </div>
                    <div class="px-3 py-2">
                        ${this.generateMobileLanguageSelector()}
                    </div>
                </div>
            </div>
        `;
    }
    
    generateMobileDropdown(item) {
        const dropdownId = item.label.toLowerCase().replace(/\s+/g, '') + 'Dropdown';
        const arrowId = item.label.toLowerCase().replace(/\s+/g, '') + 'Arrow';
        
        return `
            <div class="mobile-dropdown">
                <div class="w-full flex items-center justify-between">
                    <a href="${item.href || '#'}" class="flex-1 px-3 py-2 text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 font-medium">${item.label}</a>
                    <button class="px-3 py-2 text-pd2i-black hover:text-pd2i-blue transition-colors duration-200" onclick="toggleMobileDropdown('${dropdownId}')">
                        <svg class="w-4 h-4 transform transition-transform duration-200" id="${arrowId}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>
                <div class="hidden pl-6 space-y-1" id="${dropdownId}">
                    ${item.items.map(subItem => 
                        `<a href="${subItem.href}" class="block px-3 py-2 text-sm text-pd2i-black hover:text-pd2i-blue transition-colors duration-200">${subItem.label}</a>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    generateMobileLanguageSelector() {
        return `
            <div class="relative">
                <button class="flex items-center text-pd2i-black hover:text-pd2i-blue transition-colors duration-200 font-medium bg-white border border-gray-300 px-3 py-2 rounded w-20 justify-between" id="mobileLangBtn">
                    ${this.options.currentLang}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="absolute left-0 mt-1 w-20 bg-white border border-gray-300 rounded shadow-lg hidden z-50" id="mobileLangDropdown">
                    ${this.options.languages.map(lang => 
                        `<a href="#" class="block px-3 py-2 text-sm text-pd2i-black hover:bg-gray-100 hover:text-pd2i-blue transition-colors duration-200" onclick="selectLanguage('${lang}')" data-lang="${lang}">${lang}</a>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Let the main.js handle mobile menu for better reliability
        // We'll just handle language dropdowns here
        
        // Language Dropdowns
        this.attachLanguageListeners('languageBtn', 'languageDropdown');
        this.attachLanguageListeners('tabletLanguageBtn', 'tabletLanguageDropdown');
        this.attachLanguageListeners('mobileLangBtn', 'mobileLangDropdown');
        
        // Language selection
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-lang')) {
                e.preventDefault();
                this.selectLanguage(e.target.getAttribute('data-lang'));
            }
        });
    }
    
    attachLanguageListeners(btnId, dropdownId) {
        const btn = document.getElementById(btnId);
        const dropdown = document.getElementById(dropdownId);
        
        if (btn && dropdown) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('hidden');
                
                if (btnId === 'mobileLangBtn') {
                    const arrow = btn.querySelector('svg');
                    if (dropdown.classList.contains('hidden')) {
                        arrow.style.transform = 'rotate(0deg)';
                    } else {
                        arrow.style.transform = 'rotate(180deg)';
                    }
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.add('hidden');
                    if (btnId === 'mobileLangBtn') {
                        const arrow = btn.querySelector('svg');
                        arrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
        }
    }
    
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenu && mobileMenuBtn) {
            mobileMenu.classList.toggle('hidden');
            this.isMenuOpen = !this.isMenuOpen;
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (this.isMenuOpen) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        }
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenu && mobileMenuBtn && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            this.isMenuOpen = false;
            
            // Reset hamburger icon
            const icon = mobileMenuBtn.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    }
    
    selectLanguage(lang) {
        this.options.currentLang = lang;
        
        // Update all language buttons
        const buttons = ['languageBtn', 'tabletLanguageBtn', 'mobileLangBtn'];
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                const textNode = btn.childNodes[0];
                if (textNode) {
                    textNode.textContent = lang + ' ';
                }
            }
        });
        
        // Close all dropdowns
        const dropdowns = ['languageDropdown', 'tabletLanguageDropdown', 'mobileLangDropdown'];
        dropdowns.forEach(dropdownId => {
            const dropdown = document.getElementById(dropdownId);
            if (dropdown) {
                dropdown.classList.add('hidden');
            }
        });
        
        // Reset mobile language arrow
        const mobileLangBtn = document.getElementById('mobileLangBtn');
        if (mobileLangBtn) {
            const arrow = mobileLangBtn.querySelector('svg');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
        
        // Trigger custom event for language change
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
        
        console.log('Language selected:', lang);
    }
    
    // Public methods for external control
    updateNavigation(newNavigation) {
        this.options.navigationItems = newNavigation;
        this.render();
        this.attachEventListeners();
    }
    
    updateLanguages(newLanguages) {
        this.options.languages = newLanguages;
        this.render();
        this.attachEventListeners();
    }
    
    setCurrentLanguage(lang) {
        this.selectLanguage(lang);
    }
}

// Global functions for backward compatibility
window.toggleMobileDropdown = function(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const arrowId = dropdownId.replace('Dropdown', 'Arrow');
    const arrow = document.getElementById(arrowId);
    
    if (dropdown && arrow) {
        dropdown.classList.toggle('hidden');
        
        if (dropdown.classList.contains('hidden')) {
            arrow.style.transform = 'rotate(0deg)';
        } else {
            arrow.style.transform = 'rotate(180deg)';
        }
    }
};

window.selectLanguage = function(lang) {
    if (window.headerInstance) {
        window.headerInstance.selectLanguage(lang);
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}

window.Header = Header;
