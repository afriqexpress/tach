// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            const formFields = this.elements;
            let formData = {};
            
            for (let i = 0; i < formFields.length; i++) {
                if (formFields[i].name && formFields[i].value) {
                    formData[formFields[i].name] = formFields[i].value;
                }
            }
            
            console.log('Form submitted with:', formData);
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
        });
    }
    
    // Simple fade-in animations for scroll elements
    gsap.utils.toArray('[data-scroll]').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true
            },
            y: 20,
            opacity: 0.5,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    // Counter animation function
    function animateCounter(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 30)); // Update every 30ms
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current > target) {
                current = target;
                clearInterval(timer);
            }
            counterElement.textContent = current;
        }, 30);
    }
    
    // Start counter animations when visible
    const counterElements = document.querySelectorAll('.counter');
    counterElements.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: () => animateCounter(counter),
            once: true
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hover animations for cards
    const solutionCardImages = document.querySelectorAll('.card-img img');
    solutionCardImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.05,
                duration: 0.4
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.4
            });
        });
    });
    
    // Hero intro animation sequence
    const introTimeline = gsap.timeline();
    
    introTimeline
        .from('.hero-background', {
            opacity: 0,
            duration: 1
        })
        .from('.animate-text', {
            y: 30,
            opacity: 0,
            duration: 0.7
        }, '-=0.5')
        .from('.animate-text-delay', {
            y: 30,
            opacity: 0,
            duration: 0.7
        }, '-=0.3')
        .from('.animate-button', {
            y: 30,
            opacity: 0,
            duration: 0.7
        }, '-=0.3');
}); 