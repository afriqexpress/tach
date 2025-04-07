// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in a real app, you'd send the form data to a server here)
            const formContainer = this.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i><h3>Thank You!</h3><p>Your message has been sent successfully. We\'ll get back to you soon.</p>';
            
            // Hide form and show success message
            this.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Reset form for future submissions
            setTimeout(() => {
                this.reset();
                successMessage.remove();
                this.style.display = 'block';
            }, 5000);
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset to account for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation for story cards
    const storyItems = document.querySelectorAll('.story-item');
    storyItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                once: true
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });
    
    // Animation for solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });
    
    // Hover animations for cards
    const cardImages = document.querySelectorAll('.card-img img');
    cardImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });
    
    // Hero background animation - create a more visible animation effect
    gsap.fromTo('.hero-background', 
        { 
            backgroundPosition: '0% 0%'
        }, 
        {
            backgroundPosition: '0% 100%',
            duration: 30, 
            repeat: -1, 
            yoyo: true, 
            ease: "none"
        }
    );
    
    // For-Who section tabs
    const personaTabs = document.querySelectorAll('.persona-tab');
    const personaPanels = document.querySelectorAll('.persona-panel');

    personaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            // Remove active class from all tabs and panels
            personaTabs.forEach(t => t.classList.remove('active'));
            personaPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and matching panel
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // CTA section option tabs
    const ctaOptions = document.querySelectorAll('.cta-option');
    const formHeader = document.querySelector('.form-header h3');
    const formSubheader = document.querySelector('.form-header p');
    const submitBtn = document.querySelector('.submit-btn');

    ctaOptions.forEach(option => {
        option.addEventListener('click', () => {
            const formType = option.dataset.form;
            
            // Remove active class from all options
            ctaOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Change form texts based on form type
            if (formHeader && formSubheader && submitBtn) {
                switch(formType) {
                    case 'tour':
                        formHeader.textContent = 'Book Your Tour';
                        formSubheader.textContent = 'Experience TACH homes in person';
                        submitBtn.textContent = 'Book My Tour';
                        break;
                    case 'info':
                        formHeader.textContent = 'Request Information';
                        formSubheader.textContent = 'Learn more about TACH homes';
                        submitBtn.textContent = 'Send Request';
                        break;
                    case 'invest':
                        formHeader.textContent = 'Investment Opportunities';
                        formSubheader.textContent = 'Discover how to invest in TACH';
                        submitBtn.textContent = 'Get Investment Details';
                        break;
                }
            }
        });
    });
    
    // Image hover animations
    const modelImages = document.querySelectorAll('.model-card .model-image');
    modelImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            const img = image.querySelector('img');
            if (img) {
                gsap.to(img, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
        
        image.addEventListener('mouseleave', () => {
            const img = image.querySelector('img');
            if (img) {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Story navigation
    const storyPrev = document.querySelector('.story-nav-btn.prev');
    const storyNext = document.querySelector('.story-nav-btn.next');
    const storySlides = document.querySelectorAll('.story-slide');
    const storyDots = document.querySelectorAll('.story-dot');
    let currentSlide = 0;

    if (storyNext && storyPrev && storySlides.length > 0 && storyDots.length > 0) {
        const updateStoryNav = (index) => {
            storySlides.forEach(slide => slide.classList.remove('active'));
            storyDots.forEach(dot => dot.classList.remove('active'));
            
            storySlides[index].classList.add('active');
            storyDots[index].classList.add('active');
        };

        storyNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % storySlides.length;
            updateStoryNav(currentSlide);
        });

        storyPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + storySlides.length) % storySlides.length;
            updateStoryNav(currentSlide);
        });

        storyDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateStoryNav(currentSlide);
            });
        });
    }

    // Scroll animations
    const fadeInElements = document.querySelectorAll('[data-scroll]');
    
    fadeInElements.forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Counter animation
    const animateCounter = (el, target) => {
        const duration = 2000;
        const stepTime = 50;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current > target) current = target;
            el.textContent = Math.floor(current);
            
            if (current === target) clearInterval(timer);
        }, stepTime);
    };

    // Start counter animation when counter section is visible
    const counterItems = document.querySelectorAll('.counter');
    
    counterItems.forEach(counter => {
        if (counter.hasAttribute('data-target')) {
            const targetValue = parseInt(counter.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                onEnter: () => animateCounter(counter, targetValue)
            });
        }
    });

    // Hero intro animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .fromTo('.hero-title .line', 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
        )
        .fromTo('.hero-subtitle', 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.8 }, 
            "-=0.3"
        )
        .fromTo('.hero-cta', 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5 }, 
            "-=0.3"
        )
        .fromTo('.scroll-indicator', 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.5 }, 
            "-=0.2"
        );
}); 