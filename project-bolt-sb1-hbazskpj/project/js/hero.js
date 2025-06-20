// Hero JavaScript
class Hero {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroContent = document.querySelector('.hero-content');
        
        this.init();
    }
    
    init() {
        this.handleParallax();
        this.animateContent();
        
        // Event listeners
        window.addEventListener('scroll', () => this.handleParallax());
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleParallax() {
        if (!this.hero) return;
        
        const scrollY = window.scrollY;
        const heroHeight = this.hero.offsetHeight;
        const scrollPercent = scrollY / heroHeight;
        
        // Parallax effect for background
        const heroImage = this.hero.querySelector('.hero-image');
        if (heroImage && scrollPercent < 1) {
            heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        // Fade out content on scroll
        if (this.heroContent && scrollPercent < 1) {
            const opacity = Math.max(0, 1 - scrollPercent * 1.5);
            this.heroContent.style.opacity = opacity;
            this.heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    }
    
    animateContent() {
        if (!this.heroContent) return;
        
        // Animate hero content on load
        setTimeout(() => {
            this.heroContent.style.opacity = '1';
            this.heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    handleResize() {
        // Reset transforms on resize
        if (window.innerWidth <= 768) {
            const heroImage = this.hero?.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = 'none';
            }
            
            if (this.heroContent) {
                this.heroContent.style.transform = 'none';
            }
        }
    }
}

// Initialize hero when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Hero();
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on a link (mobile)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Scroll down arrow function
function scrollToNext() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}

// Hide scroll arrow when user scrolls
window.addEventListener('scroll', () => {
    const scrollArrow = document.querySelector('.scroll-down');
    if (window.scrollY > 100) {
        scrollArrow.style.opacity = '0';
        scrollArrow.style.pointerEvents = 'none';
    } else {
        scrollArrow.style.opacity = '1';
        scrollArrow.style.pointerEvents = 'auto';
    }
});