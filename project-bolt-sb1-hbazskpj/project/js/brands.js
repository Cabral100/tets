// Brands Carousel JavaScript
class BrandsCarousel {
    constructor() {
        this.track = document.getElementById('brandsTrack');
        this.prevBtn = document.getElementById('brandsPrev');
        this.nextBtn = document.getElementById('brandsNext');
        this.indicators = document.getElementById('brandsIndicators');
        this.slides = document.querySelectorAll('.brands-slide');

        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000;

        this.init();
    }

    init() {
        if (!this.track || this.totalSlides === 0) return;

        this.setupEventListeners();
        this.startAutoPlay();
        this.updateCarousel();
    }

    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Indicators
        if (this.indicators) {
            this.indicators.addEventListener('click', (e) => {
                if (e.target.classList.contains('indicator')) {
                    const slideIndex = parseInt(e.target.dataset.slide);
                    this.goToSlide(slideIndex);
                }
            });
        }

        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        this.setupTouchEvents();
    }

    setupTouchEvents() {
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
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    updateCarousel() {
        // Move track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update indicators
        if (this.indicators) {
            const indicatorElements = this.indicators.querySelectorAll('.indicator');
            indicatorElements.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
        }

        // Update button states
        this.updateButtonStates();
    }

    updateButtonStates() {
        // Enable/disable buttons based on current slide
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }

        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (this.currentSlide === this.totalSlides - 1) {
                this.goToSlide(0);
            } else {
                this.nextSlide();
            }
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

// Initialize brands carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BrandsCarousel();
});