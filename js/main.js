// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Existing initializations
    initNavbar();
    initModelsSection();
    initHeroAnimations();
    initScrollAnimations();
    initPersonasTabs();
    initCrisisSection();
    
    // Solution related initializations
    initSolutionTabs(); // Ensure this runs first
    initSolutionCarousel();
    initSolutionInteractive();
    initSolutionShowcase();
    initInnovativeSolution();
    
    // Debug check 
    console.log('All initializations complete');
    setTimeout(() => {
        console.log('Re-checking solution tabs...');
        // Re-initialize tabs as a fallback
        initSolutionTabs();
    }, 1000);
});

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
    let autoSlideTimer; // Timer for auto-sliding
    
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
        
        // Reset auto-slide timer when manually changing slides
        resetAutoSlideTimer();
    }
    
    // Start auto-slide timer
    function startAutoSlideTimer() {
        clearTimeout(autoSlideTimer); // Clear any existing timer
        autoSlideTimer = setTimeout(() => {
            let nextIndex = currentSlideIndex + 1;
            if (nextIndex >= galaxySlides.length) nextIndex = 0; // Loop back to first slide
            setActiveSlide(nextIndex);
        }, 30000); // Auto-slide every 30 seconds
    }
    
    // Reset auto-slide timer
    function resetAutoSlideTimer() {
        clearTimeout(autoSlideTimer);
        startAutoSlideTimer();
    }
    
    // Initialize auto-slide
    startAutoSlideTimer();
    
    // Navigation click events
    galaxyNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActiveSlide(index);
        });
    });
    
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
    
    // Keyboard navigation, only active when crisis section is in viewport
    document.addEventListener('keydown', (e) => {
        // Check if crisis section is in viewport before handling keyboard events
        const rect = crisisSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                setActiveSlide(currentSlideIndex + 1);
                e.preventDefault();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                setActiveSlide(currentSlideIndex - 1);
                e.preventDefault();
            }
        }
    });
    
    // Pause auto-slide when user is interacting with the section
    crisisSection.addEventListener('mouseenter', () => {
        clearTimeout(autoSlideTimer);
    });
    
    crisisSection.addEventListener('mouseleave', () => {
        startAutoSlideTimer();
    });
    
    // GSAP Animations for slide content
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
            
            // Animate the floating illustration
            const illustration = slide.querySelector('.floating-illustration');
            if (illustration) {
                gsap.fromTo(illustration,
                    { opacity: 0, scale: 0.8 },
                    { 
                        opacity: 1, 
                        scale: 1,
                        duration: 0.8, 
                        ease: "back.out(1.7)" 
                    }
                );
            }
        }
        
        // Enhanced parallax effect for the background patterns
        const starsBg = document.querySelector('.stars-bg');
        
        // Parallax effect on mouse movement
        crisisSection.addEventListener('mousemove', (e) => {
            if (!starsBg) return;
            
            // Calculate mouse position percentage
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Apply subtle parallax movement to the background patterns
            gsap.to(starsBg, {
                x: (mouseX - 0.5) * 30,
                y: (mouseY - 0.5) * 30,
                duration: 0.5,
                ease: "power1.out"
            });
            
            // Apply movement to the before/after pseudo-elements using CSS variables
            crisisSection.style.setProperty('--parallax-x', `${(mouseX - 0.5) * 20}px`);
            crisisSection.style.setProperty('--parallax-y', `${(mouseY - 0.5) * 20}px`);
        });
        
        // Create a scroll-triggered parallax effect
        ScrollTrigger.create({
            trigger: crisisSection,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const scrollProgress = self.progress;
                
                // Move background elements based on scroll position
                gsap.to(crisisSection, {
                    backgroundPosition: `0% ${scrollProgress * 20}%`,
                    duration: 0.1,
                    ease: "none"
                });
                
                // Parallax effect for floating illustrations
                const illustrations = crisisSection.querySelectorAll('.floating-illustration');
                illustrations.forEach((illustration) => {
                    gsap.to(illustration, {
                        y: (scrollProgress - 0.5) * 30,
                        duration: 0.1,
                        ease: "none"
                    });
                });
            }
        });
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

// Solution section interactive 3D container model
function initSolutionInteractive() {
    const containerSection = document.querySelector('.solution-interactive');
    if (!containerSection) return;
    
    const container3D = document.getElementById('containerModel');
    const transformBtns = document.querySelectorAll('.transform-btn');
    const featurePanels = document.querySelectorAll('.feature-panel');
    
    let isDragging = false;
    let startX, startY;
    let currentX = 30, currentY = -20;
    
    // Initialize with first state active
    container3D.setAttribute('data-state', 'container');
    
    // Mouse/touch controls for 3D rotation
    const containerScene = document.querySelector('.container-3d-scene');
    
    containerScene.addEventListener('mousedown', handleDragStart);
    containerScene.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        handleDragStart({ clientX: touch.clientX, clientY: touch.clientY });
    });
    
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const touch = e.touches[0];
        e.preventDefault();
        handleDragMove({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });
    
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    
    function handleDragStart(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        containerScene.style.cursor = 'grabbing';
    }
    
    function handleDragMove(e) {
        if (!isDragging) return;
        
        // Calculate rotation based on mouse/touch movement
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Update rotation values (limit to reasonable angles)
        currentX = Math.min(180, Math.max(-180, currentX + deltaX * 0.5));
        currentY = Math.min(45, Math.max(-90, currentY + deltaY * 0.5));
        
        // Apply rotation transform
        updateContainerRotation();
        
        // Update starting position for next move
        startX = e.clientX;
        startY = e.clientY;
    }
    
    function handleDragEnd() {
        isDragging = false;
        containerScene.style.cursor = 'grab';
    }
    
    function updateContainerRotation() {
        const state = container3D.getAttribute('data-state') || 'container';
        let additionalTransform = '';
        
        // Add state-specific transforms
        switch (state) {
            case 'frame':
                additionalTransform = 'scale(1.1)';
                break;
            case 'living':
                additionalTransform = 'scale(1.1)';
                break;
            case 'solar':
                additionalTransform = 'scale(1.15)';
                break;
            case 'complete':
                additionalTransform = 'scale(1.2)';
                break;
            default:
                additionalTransform = '';
        }
        
        container3D.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg) ${additionalTransform}`;
    }
    
    // Transform button event listeners
    transformBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const transformType = btn.getAttribute('data-transform');
            
            // Update active state for buttons
            transformBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update container state
            container3D.setAttribute('data-state', transformType);
            updateContainerRotation();
            
            // Update visible panel
            featurePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${transformType}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });
    
    // Optional: fade in and show interaction hint after a delay
    setTimeout(() => {
        const hint = document.querySelector('.interaction-hint');
        if (hint) {
            hint.style.opacity = '1';
        }
    }, 2000);
    
    // Optional: GSAP animations for enhanced visual effects
    if (window.gsap) {
        // Initial animation
        gsap.from(container3D, {
            duration: 1.5,
            y: 50,
            opacity: 0,
            rotateX: -90,
            ease: "back.out(1.7)"
        });
        
        // Animate in buttons with stagger
        gsap.from('.transform-btn', {
            duration: 0.5,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            delay: 0.5,
            ease: "power2.out"
        });
        
        // Animate initial panel
        gsap.from('#container-panel', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: 0.8,
            ease: "power2.out"
        });
        
        // Create scroll trigger for container
        ScrollTrigger.create({
            trigger: '.solution-stage',
            start: "top bottom-=100",
            end: "bottom top+=200",
            onEnter: () => {
                // Additional animation when container enters viewport
                gsap.to(container3D, {
                    duration: 1,
                    rotateY: 360,
                    ease: "power2.inOut",
                    onComplete: () => {
                        currentX = 30; // Reset to default position after full rotation
                        updateContainerRotation();
                    }
                });
            },
            once: true
        });
    }
}

// Initialize the solution showcase section
function initSolutionShowcase() {
    const solutionSection = document.querySelector('.solution-showcase');
    if (!solutionSection) return;
    
    const pathDots = document.querySelectorAll('.path-dot');
    const detailPanels = document.querySelectorAll('.detail-panel');
    
    let currentStep = 1;
    const totalSteps = detailPanels.length;
    let autoSlideTimer; // Timer for auto-sliding
    
    // Initialize the first step (usually already set in HTML)
    function setActiveStep(step) {
        // Update current step
        currentStep = step;
        
        // Update path dots
        pathDots.forEach(dot => {
            const dotStep = parseInt(dot.getAttribute('data-step'));
            dot.classList.toggle('active', dotStep === step);
        });
        
        // Update detail panels
        detailPanels.forEach(panel => {
            const panelStep = parseInt(panel.getAttribute('data-step'));
            panel.classList.toggle('active', panelStep === step);
        });
        
        // Reset auto-slide timer when manually changing steps
        resetAutoSlideTimer();
    }
    
    // Start auto-slide timer
    function startAutoSlideTimer() {
        clearTimeout(autoSlideTimer); // Clear any existing timer
        autoSlideTimer = setTimeout(() => {
            let nextStep = currentStep + 1;
            if (nextStep > totalSteps) nextStep = 1; // Loop back to first step
            setActiveStep(nextStep);
        }, 30000); // Auto-slide every 30 seconds
    }
    
    // Reset auto-slide timer
    function resetAutoSlideTimer() {
        clearTimeout(autoSlideTimer);
        startAutoSlideTimer();
    }
    
    // Initialize auto-slide
    startAutoSlideTimer();
    
    // Path dot click events
    pathDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const step = parseInt(dot.getAttribute('data-step'));
            setActiveStep(step);
        });
    });
    
    // Navigation buttons for path
    const prevPathNav = document.querySelector('.solution-path .path-nav.prev');
    const nextPathNav = document.querySelector('.solution-path .path-nav.next');
    
    if (prevPathNav) {
        prevPathNav.addEventListener('click', () => {
            let prevStep = currentStep - 1;
            if (prevStep < 1) prevStep = totalSteps;
            setActiveStep(prevStep);
        });
    }
    
    if (nextPathNav) {
        nextPathNav.addEventListener('click', () => {
            let nextStep = currentStep + 1;
            if (nextStep > totalSteps) nextStep = 1;
            setActiveStep(nextStep);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only handle keyboard when the solution section is in view
        if (!isElementInViewport(solutionSection)) return;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            let nextStep = currentStep + 1;
            if (nextStep > totalSteps) nextStep = 1;
            setActiveStep(nextStep);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            let prevStep = currentStep - 1;
            if (prevStep < 1) prevStep = totalSteps;
            setActiveStep(prevStep);
        }
    });
    
    // Pause auto-slide when user is interacting with the section
    solutionSection.addEventListener('mouseenter', () => {
        clearTimeout(autoSlideTimer);
    });
    
    solutionSection.addEventListener('mouseleave', () => {
        startAutoSlideTimer();
    });
    
    // GSAP animations
    if (window.gsap) {
        // Entrance animation for the path
        gsap.from('.solution-path', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.solution-path',
                start: 'top 85%'
            }
        });
        
        // Shimmer effect on path lines
        gsap.to('.path-line::after', {
            left: '130%',
            duration: 2,
            repeat: -1,
            ease: 'none'
        });
        
        // Float animation for the next-section button
        gsap.to('.next-section-btn', {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
        
        // Animate the current detail panel when it becomes active
        function animateActivePanel() {
            const activePanel = document.querySelector('.detail-panel.active');
            
            if (activePanel) {
                // Reset any previous animations first
                gsap.set(activePanel.querySelectorAll('.feature-item'), {
                    clearProps: 'all'
                });
                
                // Animate the detail panel elements
                const tl = gsap.timeline();
                
                tl.fromTo(activePanel.querySelector('.detail-icon'), 
                    { scale: 0.5, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
                );
                
                tl.fromTo(activePanel.querySelector('.detail-heading'), 
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                    '-=0.3'
                );
                
                tl.fromTo(activePanel.querySelector('.detail-description p'), 
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                    '-=0.2'
                );
                
                // Animate feature items with stagger
                tl.fromTo(activePanel.querySelectorAll('.feature-item'), 
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
                    '-=0.2'
                );
            }
        }
        
        // Initial animation for the first panel
        animateActivePanel();
        
        // Observe changes to detail panels to animate when they become active
        const panelObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && 
                    mutation.target.classList.contains('active')) {
                    animateActivePanel();
                }
            });
        });
        
        // Observe all detail panels
        detailPanels.forEach(panel => {
            panelObserver.observe(panel, { attributes: true });
        });
    }
}

// Models section tabs and thumbnail functionality
function initModelsSection() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const modelPanels = document.querySelectorAll('.model-panel');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Tab switching functionality
    if (tabButtons.length > 0 && modelPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modelType = button.getAttribute('data-model');
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active model panel
                modelPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === `${modelType}-panel`) {
                        panel.classList.add('active');
                        
                        // Animate panel entrance
                        if (window.gsap) {
                            gsap.fromTo(panel, 
                                { opacity: 0, y: 20 }, 
                                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                            );
                        }
                    }
                });
            });
        });
    }
    
    // Thumbnail image switching
    if (thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Get parent container and main image
                const slider = thumb.closest('.model-image-slider');
                const mainImage = slider.querySelector('.model-main-image img');
                const thumbImage = thumb.querySelector('img');
                
                // Update active thumbnail
                slider.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                // Update main image with thumbnail source (but larger size)
                // We're using a simple string replacement to get the high-res version
                const highResUrl = thumbImage.src.replace('w=200', 'w=1200');
                
                // Animate the image change
                if (window.gsap) {
                    gsap.to(mainImage, { opacity: 0, duration: 0.2, onComplete: () => {
                        mainImage.src = highResUrl;
                        gsap.to(mainImage, { opacity: 1, duration: 0.3 });
                    }});
                } else {
                    mainImage.src = highResUrl;
                }
            });
        });
    }
    
    // Floor plan view functionality
    const floorplanButtons = document.querySelectorAll('.view-floorplan');
    
    if (floorplanButtons.length > 0) {
        floorplanButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const modelType = button.getAttribute('data-model');
                
                // Here you would typically show a modal with the floor plan
                // For this implementation, we'll use a simple alert
                alert(`Floor plan for ${modelType} would display in a modal here`);
                
                // In a real implementation, you might have:
                // openFloorplanModal(modelType);
            });
        });
    }
}

// Initialize Innovative Solution Section
function initInnovativeSolution() {
    // Solution Cards Flip Effect
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('click', function() {
            this.querySelector('.card-inner').classList.toggle('flipped');
        });
        
        // Allow clicking the back button specifically
        const backBtn = card.querySelector('.card-back .card-flip-btn');
        if (backBtn) {
            backBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the card click event
                card.querySelector('.card-inner').classList.remove('flipped');
            });
        }
    });

    // Showcase Tabs
    const showcaseTabs = document.querySelectorAll('.showcase-tab');
    const showcasePanels = document.querySelectorAll('.showcase-panel');
    
    showcaseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-showcase');
            
            // Update active tab
            showcaseTabs.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding panel
            showcasePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('data-showcase') === target) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // Hotspot animations
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        // Add entrance animation for hotspots
        gsap.from(hotspot, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            delay: Math.random() * 0.8,
            ease: "back.out"
        });
    });

    // Animate solution section elements on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate background shapes
    gsap.utils.toArray('.bg-shape').forEach((shape, i) => {
        gsap.from(shape, {
            opacity: 0,
            scale: 0.8,
            duration: 1.5,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: '.solution-innovative',
                start: 'top 80%',
            }
        });
    });
    
    // Animate solution cards
    gsap.from('.solution-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.solution-cards',
            start: 'top 80%',
        }
    });
    
    // Animate showcase container
    gsap.from('.showcase-container', {
        y: 80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.showcase-container',
            start: 'top 80%',
        }
    });
    
    // Floating particles
    const particles = document.querySelectorAll('.solution-particle');
    
    particles.forEach((particle, i) => {
        gsap.to(particle, {
            x: `random(-100, 100)`,
            y: `random(-100, 100)`,
            opacity: `random(0.2, 0.5)`,
            duration: `random(20, 40)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}

// Solution Carousel
function initSolutionCarousel() {
    const carousel = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.solution-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        // Update card positions
        cards.forEach((card, index) => {
            const angle = (index - currentIndex) * 120;
            const z = Math.abs(index - currentIndex) * -200;
            card.style.transform = `translate(-50%, -50%) translateZ(${z}px) rotateY(${angle}deg)`;
            card.classList.toggle('active', index === currentIndex);
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Initialize carousel
    updateCarousel();
}

// Solution Tabs
function initSolutionTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    const solutionPanels = document.querySelectorAll('.solution-panel');
    
    if (!tabItems.length || !solutionPanels.length) {
        console.log('Solution tabs elements not found');
        return;
    }
    
    console.log('Solution tabs initialized with:', tabItems.length, 'tabs and', solutionPanels.length, 'panels');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the solution data attribute
            const solutionType = tab.getAttribute('data-solution');
            console.log('Tab clicked:', solutionType);
            
            // Remove active class from all tabs and panels
            tabItems.forEach(item => item.classList.remove('active'));
            solutionPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to the clicked tab
            tab.classList.add('active');
            
            // Activate the corresponding panel
            const targetPanel = document.getElementById(`${solutionType}-solution`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                console.log('Activated panel:', solutionType);
            } else {
                console.log('Target panel not found:', `${solutionType}-solution`);
            }
            
            // Smooth scroll to the solution content on mobile
            if (window.innerWidth < 768) {
                const solutionContent = document.querySelector('.solution-content');
                if (solutionContent) {
                    solutionContent.scrollIntoView({behavior: 'smooth'});
                }
            }
        });
    });
    
    // Make sure all tabs have proper cursor style
    tabItems.forEach(tab => {
        tab.style.cursor = 'pointer';
    });
} 