// ===================================
// Battle Eternal Website JavaScript
// Sacred Geometry Animation & Interactions
// ===================================

// ===================================
// Sacred Geometry Canvas Background
// ===================================
class GeometryBackground {
    constructor() {
        this.canvas = document.getElementById('geometryCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.particleCount = 80;
        this.maxDistance = 150;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.updateMouse(e));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    updateMouse(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
        this.ctx.fill();
    }
    
    drawConnection(p1, p2, distance) {
        const opacity = (1 - distance / this.maxDistance) * 0.3;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(78, 205, 196, ${opacity})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
    }
    
    updateParticle(particle) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
        
        // Mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                particle.vx += (dx / distance) * force * 0.2;
                particle.vy += (dy / distance) * force * 0.2;
            }
        }
        
        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    this.drawConnection(this.particles[i], this.particles[j], distance);
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('section, .escalation-item, .universe-card, .character-card, .theme-card, .media-card');
        this.init();
    }
    
    init() {
        this.setupObserver();
    }
    
    setupObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        
        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ===================================
// Smooth Scroll for Navigation
// ===================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// Navigation Background on Scroll
// ===================================
class NavigationScroll {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.style.background = 'rgba(10, 10, 15, 0.95)';
                this.nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            } else {
                this.nav.style.background = 'rgba(10, 10, 15, 0.85)';
                this.nav.style.boxShadow = 'none';
            }
        });
    }
}

// ===================================
// Escalation Timeline Animation
// ===================================
class EscalationTimeline {
    constructor() {
        this.items = document.querySelectorAll('.escalation-item');
        this.init();
    }
    
    init() {
        this.items.forEach((item, index) => {
            setTimeout(() => {
                this.animateItem(item);
            }, index * 200);
        });
    }
    
    animateItem(item) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
            });
        }, { threshold: 0.3 });
        
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.95)';
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    }
}

// ===================================
// Character Card Hover Effects
// ===================================
class CharacterCards {
    constructor() {
        this.cards = document.querySelectorAll('.character-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });
        });
    }
    
    addGlowEffect(card) {
        const placeholder = card.querySelector('.character-placeholder');
        if (placeholder) {
            placeholder.style.filter = 'brightness(1.2) saturate(1.3)';
            placeholder.style.transition = 'filter 0.3s ease';
        }
    }
    
    removeGlowEffect(card) {
        const placeholder = card.querySelector('.character-placeholder');
        if (placeholder) {
            placeholder.style.filter = 'brightness(1) saturate(1)';
        }
    }
}

// ===================================
// Parallax Effect for Hero Section
// ===================================
class ParallaxHero {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.symbol = document.querySelector('.hero-symbol');
        this.init();
    }
    
    init() {
        if (!this.hero || !this.symbol) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                this.symbol.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// ===================================
// Typing Effect for Hero Subtitle
// ===================================
class TypingEffect {
    constructor() {
        this.subtitle = document.querySelector('.hero-subtitle');
        this.text = 'Ancient gods return to judge.';
        this.index = 0;
        this.speed = 80;
        this.init();
    }
    
    init() {
        if (!this.subtitle) return;
        
        this.subtitle.textContent = '';
        this.type();
    }
    
    type() {
        if (this.index < this.text.length) {
            this.subtitle.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// ===================================
// Card Tilt Effect
// ===================================
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.universe-card, .theme-card, .media-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.tiltCard(card, e);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCard(card);
            });
        });
    }
    
    tiltCard(card, e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    }
    
    resetCard(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
}

// ===================================
// Back to Top Button
// ===================================
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        // Show/hide button on scroll
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100));
        
        // Smooth scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// Initialize All Components
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new GeometryBackground();
    new ScrollAnimations();
    new SmoothScroll();
    new NavigationScroll();
    new EscalationTimeline();
    new CharacterCards();
    new ParallaxHero();
    new BackToTop();
    
    // Typing effect with delay
    setTimeout(() => {
        new TypingEffect();
    }, 500);
    
    // Card tilt effect
    new CardTilt();
    
    // Console easter egg
    console.log('%cBATTLE ETERNAL', 'color: #FFD700; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
    console.log('%cWhere consciousness itself is the ultimate battlefield', 'color: #4ECDC4; font-size: 14px;');
    console.log('%c"When academy gossip tears reality apart, ancient gods return to judge."', 'color: #FF6B6B; font-size: 12px; font-style: italic;');
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
