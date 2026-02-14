/**
 * THE SKIN INVESTOR - JAVASCRIPT
 * ========================================
 * Handles all interactive functionality including theme toggle
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // PAGE LOADER
    // ========================================
    const loader = document.querySelector('.loader');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1500); // 1.5 second loader duration
    });
    
    // Fallback: hide loader after max 3 seconds
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 3000);
    
    // ========================================
    // THEME TOGGLE FUNCTIONALITY
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme on page load
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        // Default to light mode
        body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Check if dark mode is now active
            const isDarkMode = body.classList.contains('dark-mode');
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Update icon
            updateThemeIcon(isDarkMode);
        });
    }
    
    // Function to update theme toggle icon
    function updateThemeIcon(isDarkMode) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (isDarkMode) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }
    
    // ========================================
    // FADE IN ON SCROLL ANIMATION
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    fadeElements.forEach(function(element) {
        observer.observe(element);
    });
    
    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // WHATSAPP BOOKING FORM
    // ========================================
    const bookingForm = document.getElementById('bookingForm');
    const preferredDateInput = document.getElementById('preferredDate');
    const preferredTimeInput = document.getElementById('preferredTime');
    
    // Set minimum date to today (block past dates)
    if (preferredDateInput) {
        const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const today = `${year}-${month}-${day}`;

preferredDateInput.setAttribute('min', today);
        preferredDateInput.setAttribute('min', today);
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const location = document.getElementById('location').value.trim();
            const preferredDate = document.getElementById('preferredDate').value;
            const preferredTime = document.getElementById('preferredTime').value;
    
            // Validate inputs
            if (!fullName || !location || !preferredDate || !preferredTime) {
                alert('Please fill in all fields');
                return;
            }
    
            // Validate weekend booking safely
            const [year, month, day] = preferredDate.split('-').map(Number);
            const selectedDate = new Date(year, month - 1, day);
            const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                alert('Consultations are available on weekends only (Saturday & Sunday).');
                return;
            }
    
            // Format date & time for WhatsApp message
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = selectedDate.toLocaleDateString('en-US', dateOptions);
    
            const [hours, minutes] = preferredTime.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            const formattedTime = `${hour12}:${minutes} ${ampm}`;
    
            // Create WhatsApp message
            const message = `Hello The Skin Investor 🌿
    
    I would like to book a skincare consultation.
    
    Name: ${fullName}
    Location: ${location}
    
    Preferred Appointment:
    Date: ${formattedDate}
    Time: ${formattedTime}
    
    I will proceed with payment and complete the consultation form.
    
    Kindly confirm availability.
    Thank you.`;
    
            const encodedMessage = encodeURIComponent(message);
            const phoneNumber = '233261577159';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
            // Show success modal
            const modal = document.getElementById('successModal');
            modal.classList.add('show');
    
            // Wait 2 seconds, then redirect to WhatsApp and hide modal
            setTimeout(function() {
                window.open(whatsappUrl, '_blank');
                modal.classList.remove('show');
            }, 2000);
        });
    }
    

    // ========================================
    // NAVBAR SCROLL EFFECT (Optional Enhancement)
    // ========================================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for navbar styling
        if (currentScroll > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // PARALLAX EFFECT FOR HERO (Optional Enhancement)
    // ========================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            // Only apply parallax if hero is in view
            if (scrollPosition < heroHeight) {
                hero.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
            }
        });
    }
    
    // ========================================
    // ACTIVE LINK HIGHLIGHTING (Optional Enhancement)
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ========================================
    // FORM INPUT VALIDATION FEEDBACK
    // ========================================
    const formInputs = document.querySelectorAll('.booking-form input');
    
    formInputs.forEach(function(input) {
        // Add visual feedback on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove visual feedback on blur
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Validate on input change
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
            }
        });
    });
    
    // ========================================
    // SCROLL TO TOP BUTTON (Optional Enhancement)
    // ========================================
    // Create scroll to top button
    const scrollTopBtn = document.createElement('a');
    scrollTopBtn.href = '#home';
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Style the button
    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '100px',
        right: '30px',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #C6A96E 0%, #B8956A 100%)',
        color: '#FFFFFF',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: '999',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // ========================================
    // KEYBOARD ACCESSIBILITY
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Allow Escape to close any open modals (if added later)
        if (e.key === 'Escape') {
            // Close any open elements
        }
        
        // Enter key triggers button clicks on links
        if (e.key === 'Enter' && e.target.tagName === 'A') {
            e.target.click();
        }
    });
    
    // ========================================
    // PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Remove animations for users who prefer reduced motion
        document.querySelectorAll('.fade-in').forEach(function(el) {
            el.classList.add('visible');
            el.style.transition = 'none';
        });
        
        document.querySelector('.loader').classList.add('hidden');
        document.querySelector('.scroll-indicator').style.display = 'none';
    }
    
    // ========================================
    // DEBUG: CONSOLE WELCOME MESSAGE
    // ========================================
    console.log('%c🌿 The Skin Investor', 'font-size: 24px; font-weight: bold; color: #C6A96E;');
    console.log('%cPersonalized Skincare Consultation', 'font-size: 14px; color: #666;');
    console.log('%cThank you for visiting!', 'font-size: 12px; color: #999;');
    
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function for performance
 */
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

/**
 * Throttle function for scroll events
 */
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

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, duration) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

/**
 * Format phone number for WhatsApp
 */
function formatPhoneForWhatsApp(phone) {
    // Remove all non-digit characters
    return phone.replace(/\D/g, '');
}

