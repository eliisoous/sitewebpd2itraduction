// Main JavaScript for PD2i Website

// Global error handling
window.addEventListener('error', function(e) {
    console.warn('Resource loading error:', e.filename, e.message);
    // Don't show errors to users in production
    e.preventDefault();
    return true;
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.warn('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Image error handling for all images
document.addEventListener('DOMContentLoaded', function() {
    // Add error handling to all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.dataset.errorHandled) {
                this.dataset.errorHandled = 'true';
                // Create a simple placeholder
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzllYTNhOCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPHN2Zz4=';
                this.alt = 'Image non disponible';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

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

// Initialize mobile menu with multiple attempts
document.addEventListener('DOMContentLoaded', function() {
    // Try immediately
    if (!window.initMobileMenu()) {
        // Try after 100ms
        setTimeout(() => {
            if (!window.initMobileMenu()) {
                // Try after 500ms
                setTimeout(() => {
                    if (!window.initMobileMenu()) {
                        // Try after 1s
                        setTimeout(() => {
                            window.initMobileMenu();
                        }, 1000);
                    }
                }, 500);
            }
        }, 100);
    }
});