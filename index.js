// Initialize EmailJS
(function() {
    emailjs.init('fxS5fmF2ZlVrvNyJ5'); // Replace with your EmailJS user ID
})();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Enhanced Navigation Functionality
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const scrollProgress = document.getElementById('scroll-progress');
    const themeIcon = document.getElementById('theme-icon');
    
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    
    // Scroll Progress Bar
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }
    
    // Enhanced Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar Scroll Effects
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Update scroll progress
        updateScrollProgress();
        
        // Navbar hide/show on scroll
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
            
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Scrolling down - hide navbar
                navbar.classList.add('hidden');
            } else {
                // Scrolling up - show navbar
                navbar.classList.remove('hidden');
            }
        } else {
            navbar.classList.remove('scrolled', 'hidden');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttled scroll handler
    function throttledScroll() {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    window.addEventListener('scroll', throttledScroll);
    
    // Active Section Detection
    function updateActiveSection() {
        const sections = ['home', 'about', 'projects', 'skills', 'reviews', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');
        
        let activeSection = 'home';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop;
                const height = section.offsetHeight;
                
                if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
                    activeSection = sectionId;
                }
            }
        });
        
        // Update active nav links
        navLinks.forEach(link => {
            link.classList.remove('section-active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('section-active');
            }
        });
    }
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial call
    
    // Enhanced Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Update theme icon
    function updateThemeIcon(isDark) {
        if (themeIcon) {
            if (isDark) {
                themeIcon.className = 'fas fa-moon text-gray-300 text-xs transition-all duration-300';
            } else {
                themeIcon.className = 'fas fa-sun text-yellow-500 text-xs transition-all duration-300';
            }
        }
    }
    
    // Check for saved user preference or use system preference
    const savedTheme = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'true' || (!savedTheme && systemDark)) {
        html.classList.add('dark');
        darkModeToggle.checked = true;
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
    
    // Toggle dark mode with smooth animation
    darkModeToggle.addEventListener('change', function() {
        const isDark = this.checked;
        
        // Add transition class for smooth animation
        html.classList.add('theme-transition');
        
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
            updateThemeIcon(true);
        } else {
            html.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
            updateThemeIcon(false);
        }
        
        // Remove transition class after animation
        setTimeout(() => {
            html.classList.remove('theme-transition');
        }, 300);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
            const isDark = e.matches;
            if (isDark) {
                html.classList.add('dark');
                darkModeToggle.checked = true;
            } else {
                html.classList.remove('dark');
                darkModeToggle.checked = false;
            }
            updateThemeIcon(isDark);
        }
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    
    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.section-hidden');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Ultra Enhanced Loading Screen System
    const loadingSteps = [
        { id: 'loading-step-1', text: '🎨 Crafting visual experience...', duration: 1200, progress: 25 },
        { id: 'loading-step-2', text: '📱 Loading interactive elements...', duration: 1500, progress: 60 },
        { id: 'loading-step-3', text: '✨ Finalizing magic touch...', duration: 1000, progress: 85 },
        { id: 'loading-step-4', text: '🚀 Ready to explore!', duration: 800, progress: 100 }
    ];

    let currentStep = 0;
    let loadingProgress = 0;
    let startTime = Date.now();
    let assetsLoaded = 0;
    let componentsInitialized = 0;
    
    // Advanced loading status messages
    const statusMessages = [
        "Initializing portfolio experience...",
        "Loading creative components...",
        "Preparing interactive elements...",
        "Optimizing performance...",
        "Almost ready for exploration...",
        "Welcome to the experience!"
    ];
    
    // Get DOM elements
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingProgressBar = document.getElementById('loading-progress-bar');
    const loadingStatus = document.getElementById('loading-status');
    const assetsLoadedElement = document.getElementById('assets-loaded');
    const componentsInitializedElement = document.getElementById('components-initialized');
    const timeElapsedElement = document.getElementById('time-elapsed');
    
    // Smooth progress animation
    function updateProgress(targetProgress) {
        const currentProgress = loadingProgress;
        const progressDiff = targetProgress - currentProgress;
        const steps = 30; // Number of animation frames
        const stepSize = progressDiff / steps;
        let step = 0;
        
        const progressInterval = setInterval(() => {
            step++;
            loadingProgress = Math.min(currentProgress + (stepSize * step), targetProgress);
            
            // Update percentage display
            if (loadingPercentage) {
                loadingPercentage.textContent = Math.round(loadingProgress) + '%';
            }
            
            // Update progress bar
            if (loadingProgressBar) {
                loadingProgressBar.style.width = loadingProgress + '%';
            }
            
            // Update statistics
            updateLoadingStats();
            
            if (step >= steps || loadingProgress >= targetProgress) {
                clearInterval(progressInterval);
                loadingProgress = targetProgress;
            }
        }, 20);
    }
    
    // Update loading statistics
    function updateLoadingStats() {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
        
        if (assetsLoadedElement) {
            assetsLoadedElement.textContent = Math.floor(loadingProgress / 10);
        }
        
        if (componentsInitializedElement) {
            componentsInitializedElement.textContent = Math.floor(loadingProgress / 8);
        }
        
        if (timeElapsedElement) {
            timeElapsedElement.textContent = elapsedTime + 's';
        }
        
        // Simulate realistic asset loading
        if (loadingProgress > 20) assetsLoaded = Math.min(assetsLoaded + 1, 12);
        if (loadingProgress > 40) componentsInitialized = Math.min(componentsInitialized + 1, 8);
    }
    
    // Enhanced step transition with smooth animations
    function showNextStep() {
        // Hide previous step
        if (currentStep > 0) {
            const prevStep = document.getElementById(loadingSteps[currentStep - 1].id);
            if (prevStep) {
                prevStep.classList.remove('opacity-100', 'translate-y-0');
                prevStep.classList.add('opacity-0', '-translate-y-4');
                
                // Mark previous step indicator as complete
                const prevIndicator = prevStep.querySelector('.loading-step-indicator');
                if (prevIndicator) {
                    prevIndicator.classList.add('complete');
                }
            }
        }
        
        if (currentStep < loadingSteps.length) {
            const currentStepData = loadingSteps[currentStep];
            const currentStepElement = document.getElementById(currentStepData.id);
            
            // Show current step with animation
            if (currentStepElement) {
                setTimeout(() => {
                    currentStepElement.classList.remove('opacity-0', 'translate-y-4');
                    currentStepElement.classList.add('opacity-100', 'translate-y-0');
                }, 200);
                
                // Update progress
                updateProgress(currentStepData.progress);
                
                // Update status message
                if (loadingStatus && statusMessages[currentStep]) {
                    setTimeout(() => {
                        loadingStatus.textContent = statusMessages[currentStep];
                    }, 300);
                }
            }
            
            // Schedule next step
            setTimeout(() => {
                currentStep++;
                showNextStep();
            }, currentStepData.duration);
        } else {
            // All steps complete - final animations
            completeLoading();
        }
    }
    
    // Complete loading with celebration effects
    function completeLoading() {
        setTimeout(() => {
            // Final status update
            if (loadingStatus) {
                loadingStatus.textContent = "Welcome to my portfolio!";
            }
            
            // Ensure 100% progress
            updateProgress(100);
            
            // Add completion effects
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                // Add fade-out class for smooth transition
                setTimeout(() => {
                    loadingScreen.style.transform = 'scale(1.05)';
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    // Final cleanup
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.classList.remove('overflow-hidden');
                        
                        // Trigger entrance animations for main content
                        triggerMainContentAnimations();
                    }, 800);
                }, 600);
            }
        }, 500);
    }
    
    // Trigger main content entrance animations
    function triggerMainContentAnimations() {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.classList.add('animate-fade-in');
        }
        
        // Stagger animation for navigation
        const navbar = document.getElementById('navbar');
        if (navbar) {
            setTimeout(() => {
                navbar.classList.add('animate-slide-down');
            }, 200);
        }
    }
    
    // Preload critical resources
    function preloadResources() {
        const imagesToPreload = [
            './assects/yas.png',
            './assects/YasiruLogo.png',
            './assects/home.png',
            './assects/about2.png'
        ];
        
        imagesToPreload.forEach((src, index) => {
            const img = new Image();
            img.onload = () => {
                assetsLoaded++;
                updateLoadingStats();
            };
            img.src = src;
        });
    }
    
    // Start the enhanced loading sequence
    setTimeout(() => {
        // Prevent body scroll during loading
        document.body.classList.add('overflow-hidden');
        
        // Start preloading resources
        preloadResources();
        
        // Begin step sequence
        setTimeout(() => {
            showNextStep();
        }, 300);
    }, 200);
    
    // Add some random loading fluctuations for realism
    function addLoadingFluctuations() {
        setInterval(() => {
            if (loadingProgress < 100) {
                // Small random variations in statistics
                const variation = Math.random() * 2 - 1; // -1 to 1
                if (Math.random() > 0.7) { // 30% chance
                    updateLoadingStats();
                }
            }
        }, 500);
    }
    
    addLoadingFluctuations();
    
    // Rotating Text Animation for Home Section
    const rotatingTextElement = document.getElementById('rotating-text');
    if (rotatingTextElement) {
        const texts = [
            'Software Engineer',
            'Full-Stack Developer', 
            'UI/UX Designer',
            'Problem Solver',
            'AI Enthusiast',
            'Tech Innovator'
        ];
        
        let currentIndex = 0;
        
        function typeText(text, callback) {
            let i = 0;
            const typeInterval = setInterval(() => {
                rotatingTextElement.textContent = text.substring(0, i + 1);
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(callback, 2000); // Wait 2 seconds before callback
                }
            }, 100);
        }
        
        function deleteText(callback) {
            let currentText = rotatingTextElement.textContent;
            let i = currentText.length;
            const deleteInterval = setInterval(() => {
                rotatingTextElement.textContent = currentText.substring(0, i - 1);
                i--;
                if (i <= 0) {
                    clearInterval(deleteInterval);
                    setTimeout(callback, 500); // Wait 0.5 seconds before callback
                }
            }, 50);
        }
        
        function rotateText() {
            typeText(texts[currentIndex], () => {
                deleteText(() => {
                    currentIndex = (currentIndex + 1) % texts.length;
                    rotateText();
                });
            });
        }
        
        // Start the rotation after a delay
        setTimeout(() => {
            rotateText();
        }, 2000);
    }
    
    // Project Modals
    const modalBtns = document.querySelectorAll('.project-modal-btn');
    const modals = document.querySelectorAll('.project-modal');
    const closeBtns = document.querySelectorAll('.close-modal');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).classList.remove('hidden');
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.closest('.project-modal').classList.add('hidden');
        });
    });

    // Close modal when clicking outside modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Load SweetAlert CSS and JS dynamically if not already loaded
    if (!document.querySelector('link[href*="sweetalert"]')) {
        const sweetAlertCSS = document.createElement('link');
        sweetAlertCSS.rel = 'stylesheet';
        sweetAlertCSS.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css';
        document.head.appendChild(sweetAlertCSS);
        
        const sweetAlertJS = document.createElement('script');
        sweetAlertJS.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.body.appendChild(sweetAlertJS);
    }

    // Initialize EmailJS with your public key
    emailjs.init('fxS5fmF2ZlVrvNyJ5'); // Replace with your actual EmailJS public key
    
    // Function to handle form submission
    window.submitContactForm = function() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // Get form data
            const formData = {
                name: contactForm.elements['name'].value,
                email: contactForm.elements['email'].value,
                message: contactForm.elements['message'].value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill in all fields!',
                    showClass: {
                        popup: 'animate__animated animate__shakeX'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut'
                    }
                });
                return false;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_98mt1tk', 'template_cq64weq', formData)
                .then(function(response) {
                    // Show success message with animation
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Message sent successfully!',
                        showConfirmButton: false,
                        timer: 2000,
                        showClass: {
                            popup: 'animate__animated animate__zoomIn'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__zoomOut'
                        }
                    });
                    contactForm.reset();
                }, function(error) {
                    // Show error message with animation
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to send',
                        text: 'Please try again later.',
                        showClass: {
                            popup: 'animate__animated animate__wobble'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOut'
                        }
                    });
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    // Reset button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        }
        
        // Prevent default form submission
        return false;
    };
});

// Function to toggle project details view
function toggleAllProjects() {
    const btn = document.getElementById('toggleProjectsBtn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // This is a simple example - you can enhance this to show/hide additional details
    // For now, it just provides a visual feedback
    if (btn.textContent.includes('Show')) {
        btn.innerHTML = '<i class="fas fa-eye-slash mr-2"></i>Hide Project Details';
        // You could show additional project information here
        projectCards.forEach(card => {
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
    } else {
        btn.innerHTML = '<i class="fas fa-eye mr-2"></i>Show Project Details';
        projectCards.forEach(card => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
        });
    }
}

// Review System
class ReviewSystem {
    constructor() {
        this.reviews = JSON.parse(localStorage.getItem('portfolioReviews')) || [];
        this.currentRating = 0;
        this.init();
    }

    init() {
        this.setupStarRating();
        this.setupReviewForm();
        this.displayReviews();
        this.updateStats();
    }

    setupStarRating() {
        const starButtons = document.querySelectorAll('.star-btn');
        const ratingValue = document.getElementById('ratingValue');
        const ratingText = document.getElementById('ratingText');

        starButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const rating = parseInt(button.dataset.rating);
                this.currentRating = rating;
                ratingValue.value = rating;

                // Update star display
                starButtons.forEach((star, index) => {
                    if (index < rating) {
                        star.classList.remove('text-gray-300');
                        star.classList.add('text-yellow-400');
                    } else {
                        star.classList.remove('text-yellow-400');
                        star.classList.add('text-gray-300');
                    }
                });

                // Update rating text
                const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
                ratingText.textContent = ratingTexts[rating];
            });

            // Hover effect
            button.addEventListener('mouseenter', () => {
                const rating = parseInt(button.dataset.rating);
                starButtons.forEach((star, index) => {
                    if (index < rating) {
                        star.style.transform = 'scale(1.1)';
                    }
                });
            });

            button.addEventListener('mouseleave', () => {
                starButtons.forEach(star => {
                    star.style.transform = 'scale(1)';
                });
            });
        });
    }

    setupReviewForm() {
        const form = document.getElementById('reviewForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview();
        });
    }

    submitReview() {
        const name = document.getElementById('reviewName').value.trim();
        const company = document.getElementById('reviewCompany').value.trim();
        const project = document.getElementById('reviewProject').value;
        const rating = this.currentRating;
        const text = document.getElementById('reviewText').value.trim();

        if (!name || !rating || !text || !project) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        const review = {
            id: Date.now(),
            name,
            company,
            project,
            rating,
            text,
            date: new Date().toISOString(),
            approved: true // Auto-approve for demo purposes
        };

        this.reviews.unshift(review);
        this.saveReviews();
        this.displayReviews();
        this.updateStats();
        this.resetForm();
        this.showNotification('Thank you for your review! It has been posted.', 'success');
    }

    saveReviews() {
        localStorage.setItem('portfolioReviews', JSON.stringify(this.reviews));
    }

    displayReviews() {
        const reviewsList = document.getElementById('reviewsList');
        const noReviews = document.getElementById('noReviews');

        if (this.reviews.length === 0) {
            reviewsList.innerHTML = '';
            noReviews.classList.remove('hidden');
            return;
        }

        noReviews.classList.add('hidden');
        reviewsList.innerHTML = this.reviews.map(review => this.createReviewHTML(review)).join('');
    }

    createReviewHTML(review) {
        const projectTypes = {
            'web-development': 'Web Development',
            'mobile-app': 'Mobile App',
            'ai-integration': 'AI Integration',
            'full-stack': 'Full-Stack',
            'ui-ux-design': 'UI/UX Design',
            'consultation': 'Consultation',
            'other': 'Other'
        };

        const projectColors = {
            'web-development': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
            'mobile-app': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
            'ai-integration': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
            'full-stack': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
            'ui-ux-design': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
            'consultation': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
            'other': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
        };

        const timeAgo = this.getTimeAgo(review.date);
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        return `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-3">
                    <div>
                        <h5 class="font-semibold text-gray-900 dark:text-white">${this.escapeHTML(review.name)}</h5>
                        ${review.company ? `<p class="text-sm text-gray-500 dark:text-gray-400">${this.escapeHTML(review.company)}</p>` : ''}
                    </div>
                    <div class="flex text-yellow-400 text-sm">
                        ${stars.split('').map(star => `<span>${star}</span>`).join('')}
                    </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                    "${this.escapeHTML(review.text)}"
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-xs ${projectColors[review.project]} px-2 py-1 rounded-full">
                        ${projectTypes[review.project]}
                    </span>
                    <span class="text-xs text-gray-400">${timeAgo}</span>
                </div>
            </div>
        `;
    }

    updateStats() {
        const averageRatingEl = document.getElementById('averageRating');
        const averageStarsEl = document.getElementById('averageStars');
        const totalReviewsEl = document.getElementById('totalReviews');

        if (this.reviews.length === 0) {
            averageRatingEl.textContent = '5.0';
            totalReviewsEl.textContent = 'Based on 0 reviews';
            return;
        }

        const average = this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length;
        averageRatingEl.textContent = average.toFixed(1);
        totalReviewsEl.textContent = `Based on ${this.reviews.length} review${this.reviews.length !== 1 ? 's' : ''}`;

        // Update star display
        const fullStars = Math.floor(average);
        const hasHalfStar = average % 1 >= 0.5;
        
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHTML += '<i class="fas fa-star text-yellow-400"></i>';
            } else if (i === fullStars && hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
            } else {
                starsHTML += '<i class="far fa-star text-yellow-400"></i>';
            }
        }
        averageStarsEl.innerHTML = starsHTML;
    }

    resetForm() {
        document.getElementById('reviewForm').reset();
        document.getElementById('ratingValue').value = '';
        document.getElementById('ratingText').textContent = 'Click to rate';
        this.currentRating = 0;

        // Reset stars
        const starButtons = document.querySelectorAll('.star-btn');
        starButtons.forEach(star => {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300');
        });
    }

    getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays}d ago`;
        
        const diffInMonths = Math.floor(diffInDays / 30);
        return `${diffInMonths}mo ago`;
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-2"></i>
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize Review System
document.addEventListener('DOMContentLoaded', function() {
    new ReviewSystem();
});



