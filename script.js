// Navigation Menu Toggle
function toggleNav() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Modal Functions
function showVolunteerForm() {
    document.getElementById('volunteerModal').style.display = 'block';
}

function showDonationForm() {
    document.getElementById('donationModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Form Submission Functions
function submitContact(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    console.log('Contact form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

function submitVolunteer(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        availability: formData.get('availability'),
        skills: formData.get('skills')
    };
    
    // Simulate form submission
    console.log('Volunteer application submitted:', data);
    
    // Show success message
    alert('Thank you for volunteering! We will be in touch soon.');
    
    // Reset form and close modal
    event.target.reset();
    closeModal('volunteerModal');
}

function submitDonation(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        amount: formData.get('amount'),
        paymentMethod: formData.get('paymentMethod')
    };
    
    // Simulate form submission
    console.log('Donation submitted:', data);
    
    // Show success message
    alert('Thank you for your generous donation!');
    
    // Reset form and close modal
    event.target.reset();
    closeModal('donationModal');
}

function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset form
    event.target.reset();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', toggleNav);
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            scrollToSection(sectionId);
        });
    });
    
    // Footer navigation links
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            scrollToSection(sectionId);
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const volunteerModal = document.getElementById('volunteerModal');
        const donationModal = document.getElementById('donationModal');
        
        if (event.target === volunteerModal) {
            closeModal('volunteerModal');
        }
        if (event.target === donationModal) {
            closeModal('donationModal');
        }
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .program-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });
});

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced form validation
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.get('firstName') || formData.get('firstName').length < 2) {
        errors.push('First name must be at least 2 characters');
    }
    
    if (!formData.get('lastName') || formData.get('lastName').length < 2) {
        errors.push('Last name must be at least 2 characters');
    }
    
    if (!formData.get('email') || !validateEmail(formData.get('email'))) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('service')) {
        errors.push('Please select a service');
    }
    
    if (!formData.get('message') || formData.get('message').length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    
    return errors;
}

// Add loading states to buttons
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.disabled = true;
        button.textContent = button.textContent.includes('Submitting') ? button.textContent : 'Submitting...';
    } else {
        button.disabled = false;
        button.textContent = button.textContent.replace('Submitting...', '').replace('Loading...', '');
    }
}

// Smooth reveal animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when stat card is visible
document.addEventListener('DOMContentLoaded', function() {
    const statNumber = document.querySelector('.stat-number');
    if (statNumber) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(statNumber, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statNumber);
    }
});

// Add form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
});

// Add parallax effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Print debugging information
console.log('MindCare Foundation website loaded successfully');
console.log('Interactive elements initialized');
console.log('Contact: danwamachowork@gmail.com | Phone: +254791874958');

