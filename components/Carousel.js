/**
 * Carousel Component - PD2i Website
 * Composant réutilisable pour les carrousels d'images
 */

class Carousel {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            slides: options.slides || [],
            autoPlay: options.autoPlay !== false, // true par défaut
            autoPlayInterval: options.autoPlayInterval || 5000,
            showIndicators: options.showIndicators !== false,
            showArrows: options.showArrows !== false,
            pauseOnHover: options.pauseOnHover !== false,
            loop: options.loop !== false,
            ...options
        };
        
        this.currentSlide = 0;
        this.autoPlayTimer = null;
        this.isPlaying = this.options.autoPlay;
        
        this.init();
    }
    
    init() {
        this.createCarouselHTML();
        this.attachEventListeners();
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }
    }
    
    createCarouselHTML() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Carousel container with id "${this.containerId}" not found`);
            return;
        }
        
        container.innerHTML = `
            <div class="carousel-wrapper relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden shadow-lg">
                <!-- Slides Container -->
                <div class="carousel-slides relative w-full h-full">
                    ${this.generateSlidesHTML()}
                </div>
                
                <!-- Navigation Arrows -->
                ${this.options.showArrows ? this.generateArrowsHTML() : ''}
                
                <!-- Indicators -->
                ${this.options.showIndicators ? this.generateIndicatorsHTML() : ''}
                
                <!-- Play/Pause Button -->
                <button class="carousel-play-pause absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200 z-20" id="playPauseBtn-${this.containerId}">
                    ${this.isPlaying ? this.getPauseIcon() : this.getPlayIcon()}
                </button>
            </div>
        `;
        
        container.className = 'carousel-container';
    }
    
    generateSlidesHTML() {
        return this.options.slides.map((slide, index) => {
            // Pour le 2ème slide (index 1 = Im2.png), alignement à droite
            // Pour le 3ème slide (index 2 = Im3.png), alignement à droite
            // Pour le 4ème slide (index 3 = Im4.png), alignement à gauche
            const isLeftAligned = index === 3;
            const isRightAligned = index === 1 || index === 2;
            
        
            const isFirstSlide = index === 0;  // Nouvelle condition pour Im1

            let containerClasses, textClasses;

            if (isFirstSlide) {
                // Im1 - Texte TRÈS TRÈS haut
                containerClasses = "absolute inset-0 flex items-start justify-center pt-8 md:pt-12 lg:pt-16";
                textClasses = "text-center text-white px-4 max-w-4xl";
            } else if (isLeftAligned) {
                // Im4 - Texte à gauche, centré verticalement
                containerClasses = "absolute inset-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24";
                textClasses = "text-left text-white px-4 max-w-2xl";
            } else if (isRightAligned) {
                // Im2 et Im3 - Texte à droite, centré verticalement
                containerClasses = "absolute inset-0 flex items-center justify-end pr-8 md:pr-16 lg:pr-24";
                textClasses = "text-right text-white px-4 max-w-2xl";
            } else {
                // Par défaut - centré verticalement
                containerClasses = "absolute inset-0 flex items-center justify-center";
                textClasses = "text-center text-white px-4 max-w-4xl";
            }
            
            return `
            <div class="carousel-slide absolute inset-0 transition-all duration-500 ease-in-out ${index === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}" data-slide="${index}">
                <div class="relative w-full h-full">
                    <img src="${slide.image}" alt="${slide.alt || `Slide ${index + 1}`}" class="w-full h-full object-cover" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMDA4M0NBIi8+Cjx0ZXh0IHg9IjYwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtZmFtaWx5PSJBcmlhbCI+UEQyaTwvdGV4dD4KPHN2Zz4=';">
                    
                    ${slide.title || slide.description ? `
                        <div class="${containerClasses}">
                            <div class="${textClasses}">
                                ${slide.title ? `<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">${slide.title}</h2>` : ''}
                                ${slide.description ? `<p class="text-lg md:text-xl mb-6 leading-relaxed">${slide.description}</p>` : ''}
                                ${slide.buttonText && slide.buttonLink ? `
                                    <a href="${slide.buttonLink}" class="inline-block bg-pd2i-blue hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded transition-colors duration-200" style="text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);">
                                        ${slide.buttonText}
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        }).join('');
    }
    
    generateArrowsHTML() {
        return `
            <!-- Previous Arrow -->
            <button class="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-pd2i-blue p-3 rounded-full shadow-lg transition-all duration-200 z-20" id="prevBtn-${this.containerId}">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            
            <!-- Next Arrow -->
            <button class="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-pd2i-blue p-3 rounded-full shadow-lg transition-all duration-200 z-20" id="nextBtn-${this.containerId}">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        `;
    }
    
    generateIndicatorsHTML() {
        return `
            <div class="carousel-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                ${this.options.slides.map((_, index) => `
                    <button class="carousel-indicator w-3 h-3 rounded-full transition-all duration-200 ${index === 0 ? 'bg-white' : 'bg-white bg-opacity-50'}" data-slide="${index}"></button>
                `).join('')}
            </div>
        `;
    }
    
    getPlayIcon() {
        return `
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
    }
    
    getPauseIcon() {
        return `
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `;
    }
    
    attachEventListeners() {
        const container = document.getElementById(this.containerId);
        
        // Navigation arrows
        if (this.options.showArrows) {
            const prevBtn = document.getElementById(`prevBtn-${this.containerId}`);
            const nextBtn = document.getElementById(`nextBtn-${this.containerId}`);
            
            if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
            if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Indicators
        if (this.options.showIndicators) {
            const indicators = container.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
        }
        
        // Play/Pause button
        const playPauseBtn = document.getElementById(`playPauseBtn-${this.containerId}`);
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.toggleAutoPlay());
        }
        
        // Pause on hover
        if (this.options.pauseOnHover) {
            container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            container.addEventListener('mouseleave', () => {
                if (this.isPlaying) this.startAutoPlay();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (container.matches(':hover')) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
                if (e.key === ' ') {
                    e.preventDefault();
                    this.toggleAutoPlay();
                }
            }
        });
        
        // Touch/Swipe support
        this.addTouchSupport(container);
    }
    
    addTouchSupport(container) {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Vérifier si c'est un swipe horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.options.slides.length) return;
        
        const container = document.getElementById(this.containerId);
        const slides = container.querySelectorAll('.carousel-slide');
        const indicators = container.querySelectorAll('.carousel-indicator');
        
        // Hide current slide
        slides[this.currentSlide].classList.add('opacity-0', 'translate-x-full');
        slides[this.currentSlide].classList.remove('opacity-100', 'translate-x-0');
        
        // Update indicators
        if (indicators.length > 0) {
            indicators[this.currentSlide].classList.remove('bg-white');
            indicators[this.currentSlide].classList.add('bg-white', 'bg-opacity-50');
        }
        
        // Show new slide
        setTimeout(() => {
            this.currentSlide = index;
            slides[this.currentSlide].classList.remove('opacity-0', 'translate-x-full');
            slides[this.currentSlide].classList.add('opacity-100', 'translate-x-0');
            
            // Update indicators
            if (indicators.length > 0) {
                indicators[this.currentSlide].classList.remove('bg-opacity-50');
                indicators[this.currentSlide].classList.add('bg-white');
            }
        }, 100);
    }
    
    nextSlide() {
        const nextIndex = this.options.loop 
            ? (this.currentSlide + 1) % this.options.slides.length
            : Math.min(this.currentSlide + 1, this.options.slides.length - 1);
        
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = this.options.loop
            ? (this.currentSlide - 1 + this.options.slides.length) % this.options.slides.length
            : Math.max(this.currentSlide - 1, 0);
        
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        if (!this.options.autoPlay) return;
        
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoPlayInterval);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
    
    toggleAutoPlay() {
        this.isPlaying = !this.isPlaying;
        const playPauseBtn = document.getElementById(`playPauseBtn-${this.containerId}`);
        
        if (this.isPlaying) {
            this.startAutoPlay();
            if (playPauseBtn) playPauseBtn.innerHTML = this.getPauseIcon();
        } else {
            this.pauseAutoPlay();
            if (playPauseBtn) playPauseBtn.innerHTML = this.getPlayIcon();
        }
    }
    
    // Public methods
    updateSlides(newSlides) {
        this.options.slides = newSlides;
        this.currentSlide = 0;
        this.createCarouselHTML();
        this.attachEventListeners();
        if (this.isPlaying) {
            this.startAutoPlay();
        }
    }
    
    destroy() {
        this.pauseAutoPlay();
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
            container.className = '';
        }
    }
    
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.options.slides.length;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Carousel;
}

window.Carousel = Carousel;
