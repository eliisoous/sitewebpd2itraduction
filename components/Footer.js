/**
 * Footer Component - PD2i Website
 * Composant réutilisable pour le footer du site
 * Supporte les langues: EN, ZH, FR
 */

class Footer {
    constructor(options = {}) {
        // Détection automatique de la langue via l'URL
        this.detectedLang = this.detectLanguageFromURL();
        
        this.translations = this.getTranslations();
        
        this.options = {
            logoSrc: options.logoSrc || 'assets/images/logo-pd2i.png',
            logoAlt: options.logoAlt || 'PD2i Logo',
            slogan: options.slogan || this.t('slogan'),
            companyInfo: options.companyInfo || {
                name: 'PD2i FRANCE',
                address: '86, bd Malesherbes',
                city: '75008 Paris',
                phone: '+33 (0) 153 75 45 05',
                email: 'admin@pd2i.com'
            },
            navigationLinks: options.navigationLinks || this.getDefaultNavigation(),
            socialLinks: options.socialLinks || this.getDefaultSocialLinks(),
            bottomLinks: options.bottomLinks || this.getDefaultBottomLinks(),
            copyrightYear: options.copyrightYear || new Date().getFullYear(),
            ...options
        };
        
        this.init();
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
     * Traductions pour le Footer
     */
    getTranslations() {
        return {
            EN: {
                slogan: 'Your Partner When Performance Matters',
                contact: 'Contact',
                navigation: 'Navigation',
                followUs: 'Follow us',
                allRightsReserved: 'All rights reserved',
                aboutUs: 'About us',
                download: 'Download',
                news: 'News',
                cookies: 'Cookies',
                privacyPolicy: 'Privacy policy',
                legalInformations: 'Legal Informations',
                tel: 'Tel'
            },
            ZH: {
                slogan: '当性能至关重要时的合作伙伴',
                contact: '联系方式',
                navigation: '导航',
                followUs: '关注我们',
                allRightsReserved: '版权所有',
                aboutUs: '关于我们',
                download: '下载',
                news: '新闻',
                cookies: 'Cookie政策',
                privacyPolicy: '隐私政策',
                legalInformations: '法律信息',
                tel: '电话'
            },
            FR: {
                slogan: 'Votre partenaire quand la performance compte',
                contact: 'Contact',
                navigation: 'Navigation',
                followUs: 'Suivez-nous',
                allRightsReserved: 'Tous droits réservés',
                aboutUs: 'À propos',
                download: 'Téléchargements',
                news: 'Actualités',
                cookies: 'Cookies',
                privacyPolicy: 'Politique de confidentialité',
                legalInformations: 'Mentions légales',
                tel: 'Tél'
            }
        };
    }
    
    /**
     * Obtient le texte traduit
     */
    t(key) {
        const lang = this.detectedLang;
        return this.translations[lang]?.[key] || this.translations['EN'][key] || key;
    }
    
    getDefaultNavigation() {
        return [
            { label: this.t('aboutUs'), href: 'about-us.html' },
            { label: this.t('contact'), href: 'contacts.html' },
            { label: this.t('download'), href: 'download.html' },
            { label: this.t('news'), href: 'news.html' }
        ];
    }
    
    getDefaultSocialLinks() {
        return [
            { 
                platform: 'linkedin', 
                href: 'https://linkedin.com/company/pd2i',
                icon: 'linkedin',
                label: this.t('followUs')
            }
        ];
    }
    
    getDefaultBottomLinks() {
        return [
            { label: this.t('cookies'), href: 'cookies.html' },
            { label: this.t('privacyPolicy'), href: 'privacy.html' },
            { label: this.t('legalInformations'), href: 'legal.html' }
        ];
    }
    
    init() {
        this.render();
    }
    
    render() {
        const footerHTML = this.generateHTML();
        let footerElement = document.querySelector('footer');
        
        if (!footerElement) {
            footerElement = document.createElement('footer');
            document.body.appendChild(footerElement);
        }
        
        footerElement.innerHTML = footerHTML;
        footerElement.className = 'bg-pd2i-blue text-white';
        
        return footerElement;
    }
    
    generateHTML() {
        return `
            <div class="container mx-auto px-4 py-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    ${this.generateLogoSection()}
                    ${this.generateContactSection()}
                    ${this.generateNavigationSection()}
                    ${this.generateSocialSection()}
                </div>
            </div>
            ${this.generateBottomSection()}
        `;
    }
    
    generateLogoSection() {
        return `
            <div class="lg:col-span-1">
                <div class="mb-4">
                    <img src="${this.options.logoSrc}" alt="${this.options.logoAlt}" width="150" height="72" class="h-14 w-auto mb-3 filter brightness-0 invert" decoding="async">
                    <p class="text-white text-sm md:text-base font-medium leading-relaxed">
                        ${this.options.slogan}
                    </p>
                </div>
            </div>
        `;
    }
    
    generateContactSection() {
        const { companyInfo } = this.options;
        const contactTitle = this.t('contact');
        const telLabel = this.t('tel');
        
        return `
            <div class="lg:col-span-1">
                <h3 class="text-white font-semibold text-base mb-3">${contactTitle}</h3>
                <div class="space-y-1.5 text-white text-sm">
                    <p class="font-medium">${companyInfo.name}</p>
                    <p>${companyInfo.address}</p>
                    <p>${companyInfo.city}</p>
                    <p class="mt-2">${telLabel} : ${companyInfo.phone}</p>
                    <a href="mailto:${companyInfo.email}" class="text-white hover:text-blue-200 transition-colors duration-200 underline break-all">
                        ${companyInfo.email}
                    </a>
                </div>
            </div>
        `;
    }
    
    generateNavigationSection() {
        const navigationTitle = this.t('navigation');
        
        return `
            <div class="lg:col-span-1">
                <h3 class="text-white font-semibold text-base mb-3">${navigationTitle}</h3>
                <ul class="space-y-2">
                    ${this.options.navigationLinks.map(link => `
                        <li>
                            <a href="${link.href}" class="text-white hover:text-blue-200 transition-colors duration-200 text-sm block">
                                ${link.label}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    generateSocialSection() {
        const followUsTitle = this.t('followUs');
        
        return `
            <div class="lg:col-span-1">
                <h3 class="text-white font-semibold text-base mb-3">${followUsTitle}</h3>
                <div class="flex flex-wrap gap-4">
                    ${this.options.socialLinks.map(social => `
                        <a href="${social.href}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="text-white hover:text-blue-200 transition-colors duration-200 flex items-center gap-2 text-sm"
                           aria-label="${social.platform}">
                            ${this.getSocialIcon(social.icon)}
                            <span>${social.label}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    getSocialIcon(platform) {
        const icons = {
            linkedin: `
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            `,
            facebook: `
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            `,
            twitter: `
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            `
        };
        
        return icons[platform] || icons.linkedin;
    }
    
    generateBottomSection() {
        const allRightsReserved = this.t('allRightsReserved');
        
        return `
            <div class="border-t border-blue-400 bg-pd2i-blue">
                <div class="container mx-auto px-4 py-4">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div class="text-white text-xs md:text-sm text-center md:text-left">
                            PD2i ${this.options.copyrightYear} © ${allRightsReserved}
                        </div>
                        <div class="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                            ${this.options.bottomLinks.map(link => `
                                <a href="${link.href}" class="text-white hover:text-blue-200 transition-colors duration-200 text-xs md:text-sm">
                                    ${link.label}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Public methods for external control
    updateCompanyInfo(newInfo) {
        this.options.companyInfo = { ...this.options.companyInfo, ...newInfo };
        this.render();
    }
    
    updateNavigation(newNavigation) {
        this.options.navigationLinks = newNavigation;
        this.render();
    }
    
    updateSocialLinks(newSocialLinks) {
        this.options.socialLinks = newSocialLinks;
        this.render();
    }
    
    updateBottomLinks(newBottomLinks) {
        this.options.bottomLinks = newBottomLinks;
        this.render();
    }
    
    setCopyrightYear(year) {
        this.options.copyrightYear = year;
        this.render();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Footer;
}

window.Footer = Footer;
