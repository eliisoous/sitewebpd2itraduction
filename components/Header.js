/**
 * Header Component - PD2i Website
 * Composant réutilisable pour le header du site
 * Supporte les langues: EN, ZH, FR
 */

class Header {
    constructor(options = {}) {
        // Détection automatique de la langue via l'URL
        this.detectedLang = this.detectLanguageFromURL();
        
        // Initialiser les traductions AVANT de les utiliser
        this.translations = this.getTranslations();
        
        // Mapping des codes de langue vers les noms affichés
        this.languageDisplayNames = {
            'EN': 'EN',
            'ZH': '中文',
            'FR': 'FR'
        };
        
        this.options = {
            logoSrc: options.logoSrc || 'assets/images/logo-pd2i.png',
            logoAlt: options.logoAlt || 'PD2i Logo',
            logoLink: options.logoLink || 'index.html',
            currentPage: options.currentPage || null,
            currentLang: options.currentLang || this.detectedLang,
            languages: options.languages || ['EN', 'ZH', 'FR'],
            navigationItems: options.navigationItems || this.getDefaultNavigation(),
            ...options
        };
        
        this.isMenuOpen = false;
        this.init();
    }
    
    /**
     * Retourne le nom d'affichage pour un code de langue
     */
    getLanguageDisplayName(langCode) {
        return this.languageDisplayNames[langCode] || langCode;
    }
    
    /**
     * Détecte la langue actuelle en fonction de l'URL
     */
    detectLanguageFromURL() {
        const path = window.location.pathname;
        if (path.includes('/zh/')) {
            return 'ZH';
        } else if (path.includes('/fr/')) {
            return 'FR';
        }
        return 'EN';
    }
    
    /**
     * Retourne le préfixe de chemin pour les assets selon la langue
     */
    getAssetPrefix() {
        if (this.detectedLang === 'ZH' || this.detectedLang === 'FR') {
            return '../';
        }
        return '';
    }
    
    /**
     * Retourne le préfixe de chemin pour les liens internes
     */
    getLangPrefix() {
        if (this.detectedLang === 'ZH') {
            return ''; // Les liens restent relatifs dans /zh/
        } else if (this.detectedLang === 'FR') {
            return ''; // Les liens restent relatifs dans /fr/
        }
        return '';
    }
    
    /**
     * Traductions pour le Header
     */
    getTranslations() {
        return {
            EN: {
                home: 'Home',
                coatingEquipments: 'Coating Equipments',
                coatingCompact: 'Coating',
                pvdTooling: 'PVD Technology for Tooling',
                pvdMolds: 'PVD Coating System for Molds & Dies',
                dlcTribological: 'DLC for Tribological Coatings',
                turnkeySolutions: 'Turnkey Solutions',
                edgePreparation: 'Edge Preparation',
                edgePrepCompact: 'Edge Prep',
                greenClean: 'Green Clean',
                plasmaNitriding: 'Plasma Nitriding',
                plasmaCompact: 'Plasma',
                services: 'Services',
                news: 'News',
                aboutUs: 'About us',
                aboutCompact: 'About',
                contact: 'Contact'
            },
            ZH: {
                home: '首页',
                coatingEquipments: '涂层设备',
                coatingCompact: '涂层',
                pvdTooling: '工具的PVD技术',
                pvdMolds: '模具的PVD涂层系统',
                dlcTribological: '摩擦学涂层的DLC',
                turnkeySolutions: '交钥匙解决方案',
                edgePreparation: '刀刃前处理',
                edgePrepCompact: '刀刃处理',
                greenClean: '绿色清洁',
                plasmaNitriding: '等离子氮化',
                plasmaCompact: '氮化',
                services: '服务',
                news: '新闻',
                aboutUs: '关于我们',
                aboutCompact: '关于',
                contact: '联系方式'
            },
            FR: {
                home: 'Accueil',
                coatingEquipments: 'Équipements de revêtement',
                coatingCompact: 'Revêtement',
                pvdTooling: 'Technologie PVD pour l\'outillage',
                pvdMolds: 'Système PVD pour moules et matrices',
                dlcTribological: 'DLC pour revêtements tribologiques',
                turnkeySolutions: 'Solutions clé en main',
                edgePreparation: 'Préparation des arêtes',
                edgePrepCompact: 'Arêtes',
                greenClean: 'Green Clean',
                plasmaNitriding: 'Nitruration plasma',
                plasmaCompact: 'Plasma',
                services: 'Services',
                news: 'Actualités',
                aboutUs: 'À propos',
                aboutCompact: 'À propos',
                contact: 'Contact'
            }
        };
    }
    
    /**
     * Obtient le texte traduit
     */
    t(key) {
        const lang = this.options.currentLang;
        return this.translations[lang]?.[key] || this.translations['EN'][key] || key;
    }
    
    getDefaultNavigation() {
        const lang = this.detectedLang;
        const t = this.translations[lang] || this.translations['EN'];
        
        return [
            { label: t.home, href: 'index.html', type: 'link', pageId: 'home' },
            {
                label: t.coatingEquipments,
                labelCompact: t.coatingCompact,
                type: 'dropdown',
                pageId: 'coating-equipments',
                href: '#',
                items: [
                    { label: t.pvdTooling, href: 'pvd-cutting-tools.html', pageId: 'pvd-cutting-tools' },
                    { label: t.pvdMolds, href: 'pvd-molds-dies.html', pageId: 'pvd-molds-dies' },
                    { label: t.dlcTribological, href: 'dlc.html', pageId: 'dlc' },
                    { label: t.turnkeySolutions, href: 'turnkey-solutions.html', pageId: 'turnkey-solutions' }
                ]
            },
            { label: t.edgePreparation, labelCompact: t.edgePrepCompact, href: 'edge-preparation.html', type: 'link', pageId: 'edge-preparation' },
            { label: t.greenClean, href: 'greenclean-ultrasonic-cleaning.html', type: 'link', pageId: 'greenclean-ultrasonic-cleaning' },
            { label: t.plasmaNitriding, labelCompact: t.plasmaCompact, href: 'plasma-nitriding.html', type: 'link', pageId: 'plasma-nitriding' },
            { label: t.services, href: 'services.html', type: 'link', pageId: 'services' },
            { label: t.news, href: 'news.html', type: 'link', pageId: 'news' },
            { label: t.aboutUs, labelCompact: t.aboutCompact, href: 'about-us.html', type: 'link', pageId: 'about-us' }
        ];
    }
    
    isLinkActive(item) {
        return this.options.currentPage && item.pageId === this.options.currentPage;
    }
    
    isDropdownActive(item) {
        if (this.isLinkActive(item)) {
            return true;
        }
        
        if (item.items && item.items.length > 0) {
            return item.items.some(subItem => subItem.pageId && subItem.pageId === this.options.currentPage);
        }
        
        return false;
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
                        <a href="${this.options.logoLink}" class="flex items-center">
                            <img src="${this.options.logoSrc}" alt="${this.options.logoAlt}" width="1408" height="600" class="h-16 w-auto" decoding="async">
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
                    const isActive = this.isLinkActive(item);
                    const activeClass = isActive ? 'text-pd2i-blue nav-active' : 'text-pd2i-black hover:text-pd2i-blue';
                    return `<a href="${item.href}" class="${activeClass} transition-colors duration-200 font-medium text-sm">${item.labelCompact || item.label}</a>`;
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
                    const isActive = this.isLinkActive(item);
                    const activeClass = isActive ? 'text-pd2i-blue nav-active' : 'text-pd2i-black hover:text-pd2i-blue';
                    return `<a href="${item.href}" class="${activeClass} transition-colors duration-200 font-medium">${item.label}</a>`;
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
        
        const isActive = this.isDropdownActive(item);
        const activeClass = isActive ? 'text-pd2i-blue nav-active' : 'text-pd2i-black hover:text-pd2i-blue';
        
        return `
            <div class="relative group">
                <span class="${activeClass} transition-colors duration-200 font-medium flex items-center ${textSize} cursor-pointer">
                    ${isTablet ? (item.labelCompact || item.label) : item.label}
                    <svg class="${iconSize} ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </span>
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
        const contactText = this.t('contact');
        return `
            <!-- Tablet Contacts & Language (1024px - 1279px) -->
            <div class="hidden lg:flex xl:hidden items-center space-x-3">
                <a href="contacts.html" class="bg-transparent border-2 border-pd2i-blue text-pd2i-blue hover:bg-pd2i-blue hover:text-white transition-all duration-200 px-4 py-1 text-sm font-medium">
                    ${contactText}
                </a>
                ${this.generateLanguageSelector('tablet')}
            </div>
        `;
    }
    
    generateDesktopActions() {
        const contactText = this.t('contact');
        return `
            <!-- Desktop Contacts & Language Selector -->
            <div class="hidden xl:flex items-center space-x-4">
                <a href="contacts.html" class="bg-transparent border-2 border-pd2i-blue text-pd2i-blue hover:bg-pd2i-blue hover:text-white transition-all duration-200 px-6 py-2 font-medium">
                    ${contactText}
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
                    ${this.getLanguageDisplayName(this.options.currentLang)}
                    <svg class="${iconSize} ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="absolute right-0 mt-2 w-20 bg-white border border-gray-200 rounded-md shadow-lg hidden" id="${dropdownId}">
                    ${this.options.languages.map(lang => 
                        `<a href="#" class="block px-3 py-2 ${itemSize} text-pd2i-black hover:bg-gray-100" data-lang="${lang}">${this.getLanguageDisplayName(lang)}</a>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    generateMobileNavigation() {
        const contactText = this.t('contact');
        return `
            <!-- Mobile Navigation -->
            <div class="lg:hidden hidden" id="mobileMenu">
                <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                    ${this.options.navigationItems.map(item => {
                        if (item.type === 'dropdown') {
                            return this.generateMobileDropdown(item);
                        }
                        const isActive = this.isLinkActive(item);
                        const activeClass = isActive ? 'text-pd2i-blue nav-active' : 'text-pd2i-black hover:text-pd2i-blue';
                        return `<a href="${item.href}" class="block px-3 py-2 ${activeClass} transition-colors duration-200 font-medium">${item.label}</a>`;
                    }).join('')}
                    
                    <div class="px-3 py-2">
                        <a href="contacts.html" class="inline-block bg-transparent border-2 border-pd2i-blue text-pd2i-blue hover:bg-pd2i-blue hover:text-white transition-all duration-200 px-6 py-2 font-medium">
                            ${contactText}
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
        const dropdownId = item.label.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '') + 'Dropdown';
        const arrowId = item.label.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '') + 'Arrow';
        
        const isActive = this.isDropdownActive(item);
        const activeClass = isActive ? 'text-pd2i-blue nav-active' : 'text-pd2i-black hover:text-pd2i-blue';
        
        return `
            <div class="mobile-dropdown">
                <div class="w-full flex items-center justify-between">
                    <span class="flex-1 px-3 py-2 ${activeClass} transition-colors duration-200 font-medium cursor-pointer">${item.label}</span>
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
                    ${this.getLanguageDisplayName(this.options.currentLang)}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="absolute left-0 mt-1 w-20 bg-white border border-gray-300 rounded shadow-lg hidden z-50" id="mobileLangDropdown">
                    ${this.options.languages.map(lang => 
                        `<a href="#" class="block px-3 py-2 text-sm text-pd2i-black hover:bg-gray-100 hover:text-pd2i-blue transition-colors duration-200" data-lang="${lang}">${this.getLanguageDisplayName(lang)}</a>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Handle mobile menu directly in header component
        this.attachMobileMenuListeners();
        
        // Language Dropdowns
        this.attachLanguageListeners('languageBtn', 'languageDropdown');
        this.attachLanguageListeners('tabletLanguageBtn', 'tabletLanguageDropdown');
        this.attachLanguageListeners('mobileLangBtn', 'mobileLangDropdown');
        
        // Language selection with redirection
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-lang')) {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            }
        });
    }
    
    attachMobileMenuListeners() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            const newBtn = mobileMenuBtn.cloneNode(true);
            mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
            
            document.addEventListener('click', (e) => {
                if (!newBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
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
            
            const icon = mobileMenuBtn.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    }
    
    /**
     * Change de langue et redirige vers la bonne page
     */
    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        let newPath = '';
        
        // Déterminer le chemin de base (sans /zh/ ou /fr/)
        let basePage = currentPage;
        
        if (lang === 'EN') {
            // Aller vers la version anglaise (racine)
            if (this.detectedLang === 'ZH' || this.detectedLang === 'FR') {
                newPath = '../' + basePage;
            } else {
                newPath = basePage;
            }
        } else if (lang === 'ZH') {
            // Aller vers la version chinoise
            if (this.detectedLang === 'EN') {
                newPath = 'zh/' + basePage;
            } else if (this.detectedLang === 'FR') {
                newPath = '../zh/' + basePage;
            } else {
                newPath = basePage; // Déjà en chinois
            }
        } else if (lang === 'FR') {
            // Aller vers la version française
            if (this.detectedLang === 'EN') {
                newPath = 'fr/' + basePage;
            } else if (this.detectedLang === 'ZH') {
                newPath = '../fr/' + basePage;
            } else {
                newPath = basePage; // Déjà en français
            }
        }
        
        if (newPath && newPath !== currentPage) {
            window.location.href = newPath;
        }
    }
    
    // Legacy method for backward compatibility
    selectLanguage(lang) {
        this.switchLanguage(lang);
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
        this.switchLanguage(lang);
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
        window.headerInstance.switchLanguage(lang);
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}

window.Header = Header;
