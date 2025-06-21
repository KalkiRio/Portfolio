// Theme Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.container = document.getElementById('particles');
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        
        // Random animation duration
        const duration = Math.random() * 8 + 6; // 6-14 seconds
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 200;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Add some variety to particle colors
        const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        this.container.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation and create new one
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
                this.createParticle(); // Create replacement particle
            }
        }, (duration + 5) * 1000);
    }
    
    animate() {
        // This method can be used for additional particle animations if needed
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Link Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Add CSS for active nav link
function addActiveNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--accent);
            position: relative;
        }
        
        .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--accent);
            border-radius: 1px;
        }
    `;
    document.head.appendChild(style);
}

// Form Enhancement
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Add loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Reset button after a delay (since we're using mailto)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.tech-item, .project-card, .section-title');
    animateElements.forEach(el => observer.observe(el));
}

// Add CSS for scroll animations
function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tech-item, .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .section-title {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .tech-item.animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        .project-card.animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let index = 0;
        const typeSpeed = 50;
        
        function typeText() {
            if (index < originalText.length) {
                heroText.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, typeSpeed);
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeText, 1000);
    }
}

// Header Background on Scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    function updateHeaderBackground() {
        const isLightTheme = document.body.getAttribute('data-theme') === 'light';
        
        if (window.scrollY > 50) {
            if (isLightTheme) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
            }
            header.style.backdropFilter = 'blur(20px)';
        } else {
            if (isLightTheme) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            }
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    
    // Also update when theme changes
    const observer = new MutationObserver(updateHeaderBackground);
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Initial call
    updateHeaderBackground();
}

// Mobile Menu (for future enhancement)
function initMobileMenu() {
    // This can be expanded later for mobile hamburger menu
    const mobileBreakpoint = 768;
    
    function handleResize() {
        if (window.innerWidth <= mobileBreakpoint) {
            // Mobile view adjustments
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

// Easter Egg - Konami Code
function initEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.length === konamiCode.length) {
            if (userInput.every((key, index) => key === konamiCode[index])) {
                triggerEasterEgg();
                userInput = [];
            }
        }
    });
}

function triggerEasterEgg() {
    // Create rainbow effect
    const style = document.createElement('style');
    style.textContent = `
        body {
            animation: rainbow-bg 2s ease-in-out;
        }
        
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    
    // Show message
    const message = document.createElement('div');
    message.innerHTML = '🌈 You found the secret! 🌈';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-size: 1.5rem;
        z-index: 10000;
        animation: bounce 0.5s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
        document.head.removeChild(style);
    }, 3000);
}

// Main Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Load theme first
    loadTheme();
    
    // Initialize all components
    addActiveNavStyles();
    addScrollAnimationStyles();
    initSmoothScrolling();
    initActiveNavigation();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
    initMobileMenu();
    initEasterEgg();
    
    // Initialize particle system
    new ParticleSystem();
    
    // Optional: Add typing effect (uncomment if desired)
    // initTypingEffect();
    
    // Add a subtle entrance animation to the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(function() {
    // Any additional scroll-based functionality can go here
}, 16)); // ~60fps