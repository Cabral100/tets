// Blog Carousel JavaScript
class BlogCarousel {
    constructor() {
        this.track = document.getElementById('blogTrack');
        this.prevBtn = document.getElementById('blogPrev');
        this.nextBtn = document.getElementById('blogNext');
        this.slides = document.querySelectorAll('.blog-slide');
        
        this.currentIndex = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.totalSlides = this.slides.length;
        this.slideWidth = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000;
        
        this.init();
    }
    
    init() {
        if (!this.track || this.totalSlides === 0) return;
        
        this.calculateDimensions();
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateCarousel();
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.slidesPerView = this.getSlidesPerView();
            this.calculateDimensions();
            this.updateCarousel();
        });
    }
    
    getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 968) return 2.5;
        return 3;
    }
    
    calculateDimensions() {
        if (this.slides.length > 0) {
            const slide = this.slides[0];
            const slideStyle = window.getComputedStyle(slide);
            const slideMargin = parseInt(slideStyle.marginRight) || 0;
            this.slideWidth = slide.offsetWidth + slideMargin;
        }
    }
    
    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Click on blog slides
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.selectSlide(index));
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    nextSlide() {
        const maxIndex = Math.max(0, this.totalSlides - Math.floor(this.slidesPerView));
        this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    selectSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to selected slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        this.resetAutoPlay();
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * this.slideWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update active slide
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentIndex) {
                slide.classList.add('active');
            }
        });
        
        // Update button states
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        }
        
        if (this.nextBtn) {
            const maxIndex = Math.max(0, this.totalSlides - Math.floor(this.slidesPerView));
            this.nextBtn.disabled = this.currentIndex >= maxIndex;
            this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            const maxIndex = Math.max(0, this.totalSlides - Math.floor(this.slidesPerView));
            if (this.currentIndex >= maxIndex) {
                this.currentIndex = 0;
            } else {
                this.nextSlide();
                return; // Don't call updateCarousel again
            }
            this.updateCarousel();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize blog carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogCarousel();
});