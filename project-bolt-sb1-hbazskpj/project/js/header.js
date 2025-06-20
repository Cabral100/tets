// Header JavaScript
class Header {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleActiveLink();
        
        // Event listeners
        window.addEventListener('scroll', () => this.handleScroll());
        this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.header.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
    
    handleMobileMenu() {
        // Mobile menu functionality is handled by event listeners
    }
    
    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.nav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Header();
});