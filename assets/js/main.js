// Main JavaScript for PD2i Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                // Show hamburger icon
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                // Show close icon
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
    }
    
    // Language Dropdown Toggle
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            languageDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.add('hidden');
            }
        });
    }
    
    // Mobile Dropdown Toggle Function
    window.toggleMobileDropdown = function(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const arrowId = dropdownId === 'coatingDropdown' ? 'coatingArrow' : 'turnkeyArrow';
        const arrow = document.getElementById(arrowId);
        
        if (dropdown && arrow) {
            dropdown.classList.toggle('hidden');
            
            // Rotate arrow
            if (dropdown.classList.contains('hidden')) {
                arrow.style.transform = 'rotate(0deg)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
            }
        }
    };
    
    // Mobile Language Dropdown
    const mobileLangBtn = document.getElementById('mobileLangBtn');
    const mobileLangDropdown = document.getElementById('mobileLangDropdown');
    
    if (mobileLangBtn && mobileLangDropdown) {
        mobileLangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileLangDropdown.classList.toggle('hidden');
            
            // Rotate arrow
            const arrow = mobileLangBtn.querySelector('svg');
            if (mobileLangDropdown.classList.contains('hidden')) {
                arrow.style.transform = 'rotate(0deg)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileLangBtn.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
                mobileLangDropdown.classList.add('hidden');
                const arrow = mobileLangBtn.querySelector('svg');
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Tablet Language Dropdown
    const tabletLangBtn = document.getElementById('tabletLanguageBtn');
    const tabletLangDropdown = document.getElementById('tabletLanguageDropdown');
    
    if (tabletLangBtn && tabletLangDropdown) {
        tabletLangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tabletLangDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!tabletLangBtn.contains(e.target) && !tabletLangDropdown.contains(e.target)) {
                tabletLangDropdown.classList.add('hidden');
            }
        });
    }
    
    // Language Selection Function
    window.selectLanguage = function(lang) {
        const mobileLangBtn = document.getElementById('mobileLangBtn');
        const mobileLangDropdown = document.getElementById('mobileLangDropdown');
        
        if (mobileLangBtn) {
            // Update button text
            const textNode = mobileLangBtn.childNodes[0];
            textNode.textContent = lang + ' ';
            
            // Close dropdown
            if (mobileLangDropdown) {
                mobileLangDropdown.classList.add('hidden');
                const arrow = mobileLangBtn.querySelector('svg');
                arrow.style.transform = 'rotate(0deg)';
            }
        }
        
        // Here you can add logic to actually change the language
        console.log('Language selected:', lang);
    };
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect (optional enhancement)
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    if (header) {
        header.style.transition = 'transform 0.3s ease-in-out';
    }
    
    // Performance: Lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Form validation and security (for future forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Basic XSS protection
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (input.type !== 'password') {
                    input.value = input.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                }
            });
        });
    });
    
    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // You can add a placeholder image here
            // this.src = 'assets/images/placeholder.png';
        });
    });
    
    // Console security message
    console.warn('%c⚠️ ATTENTION SÉCURITÉ', 'color: red; font-size: 20px; font-weight: bold;');
    console.warn('%cCe site est protégé. Toute tentative de piratage sera détectée et signalée.', 'color: red; font-size: 14px;');
    console.warn('%cSi vous êtes développeur et souhaitez contribuer, contactez-nous via notre formulaire officiel.', 'color: blue; font-size: 12px;');
});

// Security: Disable right-click context menu (optional)
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// Security: Disable F12, Ctrl+Shift+I, Ctrl+U (optional)
// document.addEventListener('keydown', function(e) {
//     if (e.key === 'F12' || 
//         (e.ctrlKey && e.shiftKey && e.key === 'I') ||
//         (e.ctrlKey && e.key === 'u')) {
//         e.preventDefault();
//     }
// });

// Performance: Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'assets/images/logo-pd2i.png'
        // Add other critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();
