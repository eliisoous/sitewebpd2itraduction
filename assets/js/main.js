// Main JavaScript for PD2i Website - Optimized
(function PD2iApp() {
    'use strict';

    // Hide Tailwind CDN warning
    const originalWarn = console.warn;
    const originalLog = console.log;
    const originalError = console.error;
    
    // Override console.warn to filter Tailwind warning
    console.warn = function(...args) {
        const message = args.join(' ');
        if (message.includes('cdn.tailwindcss.com') || 
            message.includes('should not be used in production') ||
            message.includes('tailwindcss.com/docs/installation')) {
            return; // Don't show Tailwind warnings
        }
        originalWarn.apply(console, args);
    };
    
    // Override console.log to filter Tailwind warning (sometimes it uses log)
    console.log = function(...args) {
        const message = args.join(' ');
        if (message.includes('cdn.tailwindcss.com') || 
            message.includes('should not be used in production') ||
            message.includes('tailwindcss.com/docs/installation')) {
            return; // Don't show Tailwind warnings
        }
        originalLog.apply(console, args);
    };
    
    // Override console.error to filter Tailwind warning (just in case)
    console.error = function(...args) {
        const message = args.join(' ');
        if (message.includes('cdn.tailwindcss.com') || 
            message.includes('should not be used in production') ||
            message.includes('tailwindcss.com/docs/installation')) {
            return; // Don't show Tailwind warnings
        }
        originalError.apply(console, args);
    };

    // Performance monitoring
    const perfStart = performance.now();

    // Global error handling with throttling
    let errorCount = 0;
    const MAX_ERRORS = 5;
    const ERROR_RESET_TIME = 60000; // 1 minute
    
    function handleError(e) {
        if (errorCount >= MAX_ERRORS) return true;
        
        errorCount++;
        
        // Only log meaningful errors, not the ones we're trying to suppress
        if (e.message && !e.message.includes('Script error')) {
            console.warn('PD2i - Resource error:', e.filename || 'Unknown', e.message);
        }
        
        // Reset error count after time limit
        setTimeout(() => errorCount = Math.max(0, errorCount - 1), ERROR_RESET_TIME);
        
        e.preventDefault();
        return true;
    }

    function handlePromiseRejection(e) {
        if (errorCount < MAX_ERRORS && e.reason) {
            console.warn('PD2i - Promise rejection:', e.reason);
            errorCount++;
        }
        e.preventDefault();
        return true;
    }

    // Add error listeners with proper error handling
    try {
        window.addEventListener('error', handleError, { passive: false });
        window.addEventListener('unhandledrejection', handlePromiseRejection, { passive: false });
    } catch (err) {
        // Fallback if event listeners fail
        console.warn('PD2i - Could not attach error handlers:', err);
    }

    // Optimized image error handling with lazy loading
    let imageObserver = null;
    
    try {
        imageObserver = new IntersectionObserver(function handleImageIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add error handling
                    if (!img.dataset.errorHandled) {
                        img.addEventListener('error', function handleImageError() {
                            if (!this.dataset.errorHandled) {
                                this.dataset.errorHandled = 'true';
                                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzllYTNhOCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPHN2Zz4=';
                                this.alt = 'Image non disponible';
                            }
                        }, { once: true });
                    }
                    
                    // Lazy loading implementation
                    if (img.dataset.src && !img.src.startsWith('data:')) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    if (imageObserver) {
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, { 
            rootMargin: '50px',
            threshold: 0.1
        });
    } catch (err) {
        console.warn('PD2i - IntersectionObserver not supported:', err);
        imageObserver = null;
    }

    // Initialize image handling when DOM is ready
    function initializeImages() {
        if (!imageObserver) {
            // Fallback for browsers without IntersectionObserver
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('error', function handleImageError() {
                    if (!this.dataset.errorHandled) {
                        this.dataset.errorHandled = 'true';
                        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzllYTNhOCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPHN2Zz4=';
                        this.alt = 'Image non disponible';
                    }
                }, { once: true });
            });
            return;
        }
        
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Optimized smooth scrolling with performance
    function initializeSmoothScrolling() {
        try {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function handleSmoothScroll(e) {
                    const targetId = this.getAttribute('href').substring(1);
                    if (!targetId) return;
                    
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        
                        // Use requestAnimationFrame for better performance
                        requestAnimationFrame(() => {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        });
                    }
                }, { passive: false });
            });
        } catch (err) {
            console.warn('PD2i - Could not initialize smooth scrolling:', err);
        }
    }

// Global functions for mobile dropdown functionality
window.toggleMobileDropdown = function(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const arrowId = dropdownId.replace('Dropdown', 'Arrow');
    const arrow = document.getElementById(arrowId);
    
    if (dropdown) {
        dropdown.classList.toggle('hidden');
        
        if (arrow) {
            if (dropdown.classList.contains('hidden')) {
                arrow.style.transform = 'rotate(0deg)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
            }
        }
    }
};

window.selectLanguage = function(lang) {
    if (window.headerInstance) {
        window.headerInstance.selectLanguage(lang);
    }
    
    // Close all language dropdowns
    const dropdowns = ['languageDropdown', 'tabletLanguageDropdown', 'mobileLangDropdown'];
    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        if (dropdown) {
            dropdown.classList.add('hidden');
        }
    });
    
    // Dispatch language change event
    const event = new CustomEvent('languageChanged', {
        detail: { language: lang }
    });
    document.dispatchEvent(event);
};

// Mobile Menu functionality - Clean implementation
window.initMobileMenu = function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Remove any existing listeners
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Force toggle
            if (mobileMenu.style.display === 'none' || mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.display = 'block';
                
                // Change to close icon
                const icon = newBtn.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                }
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
                
                // Change to hamburger icon
                const icon = newBtn.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!newBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
                
                const icon = newBtn.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        });
        
        return true;
    }
    
    return false;
};

    // Optimized initialization with performance tracking
    function initializeApp() {
        try {
            // Initialize all components
            initializeImages();
            initializeSmoothScrolling();
            
            // Initialize mobile menu with retry mechanism
            const initMobileMenuWithRetry = (attempts = 0) => {
                if (attempts > 3) return; // Max 4 attempts
                
                try {
                    if (!window.initMobileMenu()) {
                        setTimeout(() => initMobileMenuWithRetry(attempts + 1), 100 * Math.pow(2, attempts));
                    }
                } catch (err) {
                    console.warn('PD2i - Mobile menu initialization failed:', err);
                }
            };
            
            initMobileMenuWithRetry();
            
            // Performance logging (development only)
            const perfEnd = performance.now();
            if (console.debug && typeof console.debug === 'function') {
                console.debug(`PD2i app initialized in ${(perfEnd - perfStart).toFixed(2)}ms`);
            }
        } catch (err) {
            console.error('PD2i - App initialization failed:', err);
        }
    }

    // Initialize when DOM is ready
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
        } else {
            // DOM already loaded
            initializeApp();
        }
    } catch (err) {
        console.error('PD2i - Could not set up initialization:', err);
        // Try immediate initialization as fallback
        setTimeout(initializeApp, 100);
    }

})(); // End IIFE