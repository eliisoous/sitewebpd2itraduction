/**
 * Footer Component - PD2i Website
 * Composant réutilisable pour le footer du site
 */

class Footer {
    constructor(options = {}) {
        this.options = {
            logoSrc: options.logoSrc || 'assets/images/logo-pd2i.png',
            logoAlt: options.logoAlt || 'PD2i Logo',
            slogan: options.slogan || 'Your Partner When Performance Matters',
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
    
    getDefaultNavigation() {
        return [
            { label: 'About us', href: 'about-us.html' },
            { label: 'Contact', href: 'contacts.html' },
            { label: 'Download', href: 'download.html' },
            { label: 'News', href: 'news.html' }
        ];
    }
    
    getDefaultSocialLinks() {
        return [
            { 
                platform: 'linkedin', 
                href: 'https://linkedin.com/company/pd2i',
                icon: 'linkedin',
                label: 'Follow us'
            }
        ];
    }
    
    getDefaultBottomLinks() {
        return [
            { label: 'Cookies', href: 'cookies.html' },
            { label: 'Privacy policy', href: 'privacy.html' },
            { label: 'Legal Informations', href: 'legal.html' }
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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <div class="mb-3">
                    <img src="${this.options.logoSrc}" alt="${this.options.logoAlt}" class="h-14 w-auto mb-2 filter brightness-0 invert">
                    <p class="text-white text-base font-medium leading-snug">
                        ${this.options.slogan}
                    </p>
                </div>
            </div>
        `;
    }
    
    generateContactSection() {
        const { companyInfo } = this.options;
        return `
            <div class="lg:col-span-1">
                <h3 class="text-white font-semibold text-base mb-2">Contact</h3>
                <div class="space-y-1 text-white text-sm">
                    <p class="font-medium">${companyInfo.name}</p>
                    <p>${companyInfo.address}</p>
                    <p>${companyInfo.city}</p>
                    <p class="mt-1.5">Tel : ${companyInfo.phone}</p>
                    <a href="mailto:${companyInfo.email}" class="text-white hover:text-blue-200 transition-colors duration-200 underline">
                        ${companyInfo.email}
                    </a>
                </div>
            </div>
        `;
    }
    
    generateNavigationSection() {
        return `
            <div class="lg:col-span-1">
                <h3 class="text-white font-semibold text-base mb-2">Navigation</h3>
                <ul class="space-y-1.5">
                    ${this.options.navigationLinks.map(link => `
                        <li>
                            <a href="${link.href}" class="text-white hover:text-blue-200 transition-colors duration-200 text-sm">
                                ${link.label}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    generateSocialSection() {
        return `
            <div class="lg:col-span-1">
                <h3 class="text-white font-semibold text-base mb-2">Follow us</h3>
                <div class="flex space-x-4">
                    ${this.options.socialLinks.map(social => `
                        <a href="${social.href}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="text-white hover:text-blue-200 transition-colors duration-200 flex items-center text-sm"
                           aria-label="${social.platform}">
                            ${this.getSocialIcon(social.icon)}
                            <span class="ml-2">${social.label}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    getSocialIcon(platform) {
        const icons = {
            linkedin: `
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            `,
            facebook: `
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            `,
            twitter: `
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            `
        };
        
        return icons[platform] || icons.linkedin;
    }
    
    generateBottomSection() {
        return `
            <div class="border-t border-blue-400 bg-pd2i-blue">
                <div class="container mx-auto px-4 py-2">
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div class="text-white text-sm">
                            PD2i ${this.options.copyrightYear} © All rights reserved
                        </div>
                        <div class="flex flex-wrap justify-center md:justify-end space-x-6">
                            ${this.options.bottomLinks.map(link => `
                                <a href="${link.href}" class="text-white hover:text-blue-200 transition-colors duration-200 text-sm">
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
