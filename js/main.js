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
    
    // Animation for story cards with more interactive effects
    const storyItems = document.querySelectorAll('.story-item');
    storyItems.forEach((item, index) => {
        // Create staggered entrance animations
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                once: true
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.3,
            ease: "power2.out"
        });
        
        // Add parallax effect to the images
        const illustration = item.querySelector('.story-illustration img');
        if (illustration) {
            ScrollTrigger.create({
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(illustration, {
                        y: progress * 50,
                        duration: 0.1,
                        ease: "none"
                    });
                }
            });
        }
        
        // Add rotation effect to the numbers
        const number = item.querySelector('.story-number');
        if (number) {
            ScrollTrigger.create({
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => {
                    gsap.from(number, {
                        rotation: -180,
                        scale: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)"
                    });
                }
            });
        }
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

    // Enhanced animation for the story conclusion
    const storyConclusion = document.querySelector('.story-conclusion');
    if (storyConclusion) {
        gsap.from(storyConclusion, {
            scrollTrigger: {
                trigger: storyConclusion,
                start: "top 80%",
                once: true
            },
            opacity: 0,
            scale: 0.9,
            y: 30,
            duration: 1,
            ease: "power3.out"
        });
        
        // Add pulse animation to the CTA button
        const storyCta = storyConclusion.querySelector('.story-cta');
        if (storyCta) {
            const pulseTimeline = gsap.timeline({repeat: -1, yoyo: true, repeatDelay: 1});
            pulseTimeline.to(storyCta, {
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
                scale: 1.05,
                duration: 1.5,
                ease: "power1.inOut"
            });
        }
    }

    // Crisis section animations - updated for Galaxy theme
    initCrisisSection();
});

// Crisis section animations - updated for Galaxy theme
function initCrisisSection() {
    const crisisSection = document.querySelector('.crisis-galaxy');
    if (!crisisSection) return;
    
    // Variables for navigation
    const galaxyNavItems = document.querySelectorAll('.galaxy-nav-item');
    const galaxySlides = document.querySelectorAll('.galaxy-slide');
    const progressFill = document.querySelector('.progress-fill');
    let currentSlideIndex = 0;
    let isAnimating = false;
    let touchStartY = 0;
    let touchEndY = 0;
    
    // Initialize slides
    function setActiveSlide(index) {
        // Prevent rapid changes
        if (isAnimating) return;
        isAnimating = true;
        
        // Constrain index
        if (index < 0) index = 0;
        if (index >= galaxySlides.length) index = galaxySlides.length - 1;
        
        // Update current index
        currentSlideIndex = index;
        
        // Update navigation items
        galaxyNavItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Update slides
        galaxySlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update progress bar
        if (progressFill) {
            const progressWidth = ((index + 1) / galaxySlides.length) * 100;
            progressFill.style.width = `${progressWidth}%`;
        }
        
        // Allow animations after a delay
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Match this with slide transition duration
    }
    
    // Navigation click events
    galaxyNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActiveSlide(index);
        });
    });
    
    // Mouse wheel navigation
    crisisSection.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (e.deltaY > 0) {
            // Scrolling down
            setActiveSlide(currentSlideIndex + 1);
        } else {
            // Scrolling up
            setActiveSlide(currentSlideIndex - 1);
        }
    }, { passive: false });
    
    // Touch events for mobile
    crisisSection.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    crisisSection.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchStartY - touchEndY > swipeThreshold) {
            // Swipe up
            setActiveSlide(currentSlideIndex + 1);
        } else if (touchEndY - touchStartY > swipeThreshold) {
            // Swipe down
            setActiveSlide(currentSlideIndex - 1);
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isElementInViewport(crisisSection)) {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                setActiveSlide(currentSlideIndex + 1);
                e.preventDefault();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                setActiveSlide(currentSlideIndex - 1);
                e.preventDefault();
            }
        }
    });
    
    // GSAP Animations for each slide
    if (window.gsap) {
        // Initial animations for the first slide
        animateSlideContent(galaxySlides[0]);
        
        // Observer to detect when slides become active
        const slideObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const slide = mutation.target;
                    if (slide.classList.contains('active')) {
                        animateSlideContent(slide);
                    }
                }
            });
        });
        
        // Observe all slides for class changes
        galaxySlides.forEach(slide => {
            slideObserver.observe(slide, { attributes: true });
        });
        
        // Function to animate slide content
        function animateSlideContent(slide) {
            if (!slide) return;
            
            const tl = gsap.timeline();
            
            // Animate title
            tl.fromTo(slide.querySelector('.slide-title'), 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
            
            // Animate stat
            tl.fromTo(slide.querySelector('.slide-stat'), 
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.5"
            );
            
            // Animate description
            tl.fromTo(slide.querySelector('.slide-description'), 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );
            
            // Animate impact section
            tl.fromTo(slide.querySelector('.slide-impact'), 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );
            
            // Animate floating illustrations
            const illustrations = slide.querySelectorAll('.floating-illustration');
            illustrations.forEach((illustration, i) => {
                gsap.fromTo(illustration,
                    { opacity: 0, scale: 0, rotation: -30 },
                    { 
                        opacity: 1, 
                        scale: 1, 
                        rotation: 0, 
                        duration: 1, 
                        delay: 0.2 + (i * 0.15), 
                        ease: "back.out(1.7)" 
                    }
                );
            });
        }
        
        // Add stars twinkling effect
        const starsBg = document.querySelector('.stars-bg');
        if (starsBg) {
            gsap.to(starsBg, {
                opacity: 0.7,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
        
        // Add nebula movement
        const nebulaBg = document.querySelector('.nebula-bg');
        if (nebulaBg) {
            gsap.to(nebulaBg, {
                backgroundPosition: '10% 20%',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
        }
    }
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
} 