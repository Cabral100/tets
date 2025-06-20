// Testimonials Carousel JavaScript
class TestimonialsCarousel {
    constructor() {
        this.track = document.getElementById('testimonialsTrack');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 6000;
        this.isTransitioning = false;

        this.init();
    }

    init() {
        if (!this.track || this.totalSlides === 0) return;

        this.setupEventListeners();
        this.startAutoPlay();
        this.updateSlides();
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        });

        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
            this.startAutoPlay();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
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
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
        this.resetAutoPlay();
    }

    prevSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
        this.resetAutoPlay();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateSlides();
        this.resetAutoPlay();
    }

    updateSlides() {
        this.isTransitioning = true;

        // Remove all classes first
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });

        // Add classes based on current slide
        this.slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index < this.currentSlide) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
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

// Initialize testimonials carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel();
});