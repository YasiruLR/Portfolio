// Initialize EmailJS
(function() {
    emailjs.init('fxS5fmF2ZlVrvNyJ5'); // Replace with your EmailJS user ID
})();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved user preference or use system preference
    if (localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            html.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
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
    
    // Hide loading screen
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('opacity-0');
        setTimeout(function() {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 500);
    }, 1000);
    
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



