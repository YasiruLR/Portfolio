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
        
        // Show and animate navigation
        const navbar = document.getElementById('navbar');
        if (navbar) {
            setTimeout(() => {
                navbar.classList.remove('opacity-0', 'invisible');
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
    
    // ===== AI CHATBOT FUNCTIONALITY =====
    
    // Chatbot elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatInterface = document.getElementById('chat-interface');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const chatNotification = document.getElementById('chat-notification');
    const chatTooltip = document.getElementById('chat-tooltip');
    const chatTyping = document.getElementById('chat-typing');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    
    let isChatOpen = false;
    let isTyping = false;
    
    // Enhanced Chatbot responses database with comprehensive questions and answers
    const chatResponses = {
        greetings: [
            "Hello! 👋 I'm YL Assistant, here to help you explore Yasiru's work and experience. Feel free to ask me anything!",
            "Hi there! 🌟 Welcome to Yasiru's portfolio! I can answer questions about his projects, skills, experience, and much more.",
            "Welcome! 🚀 I'm here to help you discover everything about Yasiru Lakshan - from his latest projects to his technical expertise. What would you like to know?"
        ],
        projects: [
            "Yasiru has developed 10+ amazing projects! 🎯 His portfolio includes full-stack web applications, mobile apps, AI-integrated solutions, e-commerce platforms, and student management systems. Would you like details about any specific project?",
            "Great question! 💼 Yasiru's project portfolio showcases expertise in React, Node.js, Spring Boot, and cutting-edge technologies. Each project demonstrates his ability to deliver end-to-end solutions. Check out the Projects section for detailed case studies!",
            "Yasiru's projects span across various domains! 🌟 From healthcare management systems to AI-powered chatbots, e-commerce platforms to mobile applications - each project showcases his full-stack development capabilities and attention to user experience."
        ],
        skills: [
            "Yasiru is proficient in 15+ technologies! 🛠️ Frontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS. Backend: Node.js, Express.js, Spring Boot, Python. Databases: MongoDB, MySQL, PostgreSQL. Also experienced with AI integration, cloud platforms, and mobile development!",
            "His technical expertise is comprehensive! 💻 Full-stack development (92% proficiency), Backend systems (88%), Mobile development (85%), AI Integration (80%). He's also skilled in UI/UX design, DevOps practices, and modern development workflows.",
            "Yasiru's skill set covers the entire development spectrum! 🎯 From crafting pixel-perfect user interfaces to building robust backend systems, managing databases, and integrating AI capabilities. He stays updated with the latest tech trends and best practices."
        ],
        contact: [
            "You can reach Yasiru through multiple channels! 📧 Email: yasiru.lakshan.dev@gmail.com | 💼 LinkedIn: linkedin.com/in/yasiru-lakshan-70b4b4355 | 🐙 GitHub: github.com/YasiruLR | 📱 Available for freelance and full-time opportunities!",
            "Yasiru is actively seeking new opportunities! 🤝 He's available for collaborations, freelance projects, or full-time positions. Connect via LinkedIn for professional inquiries, or check his GitHub for code samples and contributions.",
            "Ready to connect with Yasiru? 🚀 He's open to discussing project ideas, job opportunities, or technical collaborations. You'll find all contact details in the Contact section, plus you can download his comprehensive CV!"
        ],
        cv: [
            "📄 Yasiru's CV showcases his BEng (Hons) Software Engineering degree (Second Class Upper Division) from London Metropolitan University, 3+ years of development experience, and detailed project portfolio. Download it from the navigation or contact section!",
            "His comprehensive CV includes: 🎓 Academic achievements, professional experience, detailed project descriptions, technical certifications, and references. It's regularly updated with his latest accomplishments and skills.",
            "Download Yasiru's CV to see: 📈 Complete project portfolio, technical skill assessments, educational background, professional references, and career progression. Perfect for recruiters and potential collaborators!"
        ],
        experience: [
            "Yasiru brings 3+ years of diverse software development experience! 💼 He's worked on academic projects, commercial applications, freelance work, and personal ventures. His experience spans full-stack development, mobile apps, AI integration, and UI/UX design.",
            "His professional journey includes: 🌟 Full-stack web development, mobile application creation, AI-powered solution implementation, database design and optimization, and collaborative team projects. He's delivered successful projects across multiple industries.",
            "Yasiru's experience encompasses: 🚀 Modern web technologies, mobile development frameworks, AI/ML integration, database management, cloud deployment, and agile development practices. He combines technical expertise with creative problem-solving."
        ],
        education: [
            "Yasiru holds a BEng (Hons) Software Engineering degree with Second Class Upper Division from London Metropolitan University (UK)! 🎓 He also has Higher National Diploma in Computing, Diploma in Academic English, and Diploma in Management.",
            "His educational background is impressive! 📚 Software Engineering degree from a prestigious UK university, complemented by additional qualifications in computing, English proficiency, and management. This diverse education enhances his technical and communication skills.",
            "Academic excellence defines Yasiru's foundation! 🌟 His UK engineering degree provides strong technical fundamentals, while additional diplomas in computing, English, and management give him well-rounded professional capabilities."
        ],
        technologies: [
            "Yasiru works with cutting-edge technologies! 🔥 React & Next.js for frontend, Node.js & Spring Boot for backend, MongoDB & MySQL for databases, TypeScript for type safety, Tailwind CSS for styling, and AI APIs for intelligent features.",
            "His tech stack is modern and versatile! ⚡ Frontend frameworks (React, Vue.js), Backend technologies (Node.js, Express, Spring Boot), Databases (SQL & NoSQL), Mobile development (React Native, Flutter), and emerging tech like AI integration.",
            "Technology expertise includes: 🛠️ JavaScript ecosystem (React, Node.js, TypeScript), Java frameworks (Spring Boot), Python for AI/ML, modern CSS frameworks, database systems, version control (Git), and cloud platforms for deployment."
        ],
        availability: [
            "Yasiru is actively seeking new opportunities! ✅ He's available for full-time positions, freelance projects, consulting work, and collaborative ventures. Currently open to remote work, hybrid arrangements, or relocation for the right opportunity.",
            "He's ready for new challenges! 🚀 Whether it's a startup environment, established company, or innovative project - Yasiru brings enthusiasm, technical expertise, and fresh perspectives to any team or collaboration.",
            "Available and eager to contribute! 💪 Yasiru is looking for roles where he can apply his full-stack skills, work with modern technologies, and contribute to meaningful projects. He's particularly interested in AI integration and user-centric applications."
        ],
        pricing: [
            "Yasiru offers competitive rates for freelance work! 💰 Pricing depends on project complexity, timeline, and requirements. He provides detailed quotes after understanding your specific needs. Contact him for a personalized discussion about your project budget.",
            "His pricing is flexible and fair! 📊 Yasiru considers factors like project scope, technology stack, deadlines, and long-term maintenance needs. He offers both hourly rates and project-based pricing to suit different client preferences.",
            "For pricing information: 💼 Yasiru provides transparent quotes based on project requirements. He's open to discussing various payment structures and can work within reasonable budgets while ensuring quality deliverables."
        ],
        collaboration: [
            "Yasiru loves collaborating with other developers, designers, and entrepreneurs! 🤝 He's experienced in team environments, agile methodologies, version control workflows, and cross-functional communication. Open to both remote and in-person collaborations.",
            "Teamwork makes the dream work! 👥 Yasiru brings strong collaboration skills, clear communication, and a positive attitude to team projects. He's comfortable with project management tools, code reviews, and collaborative development practices.",
            "Ready to team up! 🌟 Whether it's pair programming, code reviews, project planning, or cross-team collaboration - Yasiru contributes effectively to team success while learning from others and sharing his expertise."
        ],
        timeline: [
            "Project timelines vary based on complexity! ⏰ Simple websites: 1-2 weeks, Full-stack applications: 4-8 weeks, Mobile apps: 6-12 weeks, AI integration projects: 3-6 weeks. Yasiru provides realistic estimates and regular progress updates.",
            "He believes in setting realistic expectations! 📅 Yasiru thoroughly analyzes project requirements before providing timeline estimates. He accounts for development, testing, revisions, and deployment phases to ensure quality delivery.",
            "Timeline planning is key! 🎯 Yasiru works with clients to establish clear milestones, deliverables, and deadlines. He's committed to meeting agreed timelines while maintaining high code quality and user experience standards."
        ],
        process: [
            "Yasiru follows a structured development process! 🔄 Discovery & Planning → Design & Architecture → Development → Testing → Deployment → Maintenance. He keeps clients informed throughout and welcomes feedback at each stage.",
            "His workflow is professional and efficient! ⚡ Requirements gathering, technical planning, iterative development, regular client updates, thorough testing, and smooth deployment. Yasiru uses modern tools and best practices throughout.",
            "The development journey with Yasiru: 🛣️ Initial consultation, project scope definition, technology selection, development sprints, regular demos, testing phases, and final deployment with documentation and support."
        ],
        industries: [
            "Yasiru has experience across multiple industries! 🏢 Education (student management systems), Healthcare (appointment systems), E-commerce (online stores), Finance (banking apps), and Technology (SaaS platforms). He adapts quickly to new domains.",
            "Diverse industry experience includes: 🌍 Educational technology, healthcare management, retail and e-commerce, financial services, entertainment, and emerging tech sectors. Yasiru understands different business needs and user expectations.",
            "Cross-industry expertise! 💼 From academic institutions to healthcare providers, from startups to established businesses - Yasiru brings relevant experience and fresh perspectives to projects across various sectors."
        ],
        passion: [
            "Yasiru is passionate about creating digital solutions that make a real difference! ❤️ He loves solving complex problems, learning new technologies, and building applications that improve people's lives and business processes.",
            "What drives him: 🔥 The intersection of technology and human needs. Yasiru enjoys crafting intuitive user experiences, optimizing performance, and staying ahead of tech trends. He's particularly excited about AI's potential to enhance applications.",
            "His motivation comes from: 🌟 Turning ideas into reality, solving challenging technical problems, continuous learning, and contributing to projects that have positive impact. Yasiru thrives on innovation and creative problem-solving."
        ],
        default: [
            "That's an interesting question! 🤔 I can help you learn about Yasiru's projects, technical skills, experience, education, availability, pricing, or anything else related to his professional background. What specific aspect interests you?",
            "I'd be happy to help! ✨ You can ask me about Yasiru's technical expertise, project portfolio, work experience, educational background, availability for new projects, collaboration style, or any other professional topics.",
            "Great question! 🎯 I'm here to provide comprehensive information about Yasiru's professional profile. Feel free to ask about his skills, projects, experience, education, work process, industry experience, or anything else you'd like to know!"
        ]
    };
    
    // Hide tooltip after 5 seconds
    setTimeout(() => {
        if (chatTooltip) {
            chatTooltip.style.opacity = '0';
            chatTooltip.style.transform = 'translateX(4px) scale(0.9)';
        }
    }, 5000);
    
    // Toggle chat interface
    chatToggle.addEventListener('click', function() {
        isChatOpen = !isChatOpen;
        
        if (isChatOpen) {
            chatInterface.classList.add('chat-open');
            chatToggle.classList.add('chat-button-active');
            chatNotification.style.display = 'none';
            if (chatTooltip) chatTooltip.style.display = 'none';
            setTimeout(() => chatInput.focus(), 300);
        } else {
            chatInterface.classList.remove('chat-open');
            chatToggle.classList.remove('chat-button-active');
        }
    });
    
    // Send message function
    function sendMessage(message) {
        if (!message.trim() || isTyping) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTyping();
        
        // Simulate AI response delay
        setTimeout(() => {
            hideTyping();
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 1500 + Math.random() * 1000);
    }
    
    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start space-x-3 chat-message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex-1 flex justify-end">
                    <div class="message-bubble p-3 shadow-sm max-w-xs">
                        <p class="text-sm">${message}</p>
                    </div>
                </div>
                <div class="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-white text-xs"></i>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-white text-xs"></i>
                </div>
                <div class="flex-1">
                    <div class="message-bubble p-3 shadow-sm">
                        <p class="text-sm">${message}</p>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Just now</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Enhanced AI response with comprehensive keyword matching
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
            return getRandomResponse('greetings');
        }
        
        // Project-related responses
        if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio') || lowerMessage.includes('developed') || lowerMessage.includes('built')) {
            return getRandomResponse('projects');
        }
        
        // Skills and technology responses
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('programming') || lowerMessage.includes('framework') || lowerMessage.includes('language')) {
            return getRandomResponse('skills');
        }
        
        // Technology-specific responses
        if (lowerMessage.includes('react') || lowerMessage.includes('node') || lowerMessage.includes('javascript') || lowerMessage.includes('python') || lowerMessage.includes('database') || lowerMessage.includes('frontend') || lowerMessage.includes('backend')) {
            return getRandomResponse('technologies');
        }
        
        // Contact responses
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('connect') || lowerMessage.includes('hire') || lowerMessage.includes('linkedin')) {
            return getRandomResponse('contact');
        }
        
        // CV/Resume responses
        if (lowerMessage.includes('cv') || lowerMessage.includes('resume') || lowerMessage.includes('download') || lowerMessage.includes('qualification')) {
            return getRandomResponse('cv');
        }
        
        // Experience responses
        if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('career') || lowerMessage.includes('professional') || lowerMessage.includes('years')) {
            return getRandomResponse('experience');
        }
        
        // Education responses
        if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('study') || lowerMessage.includes('academic') || lowerMessage.includes('qualification')) {
            return getRandomResponse('education');
        }
        
        // Availability responses
        if (lowerMessage.includes('available') || lowerMessage.includes('free') || lowerMessage.includes('hire') || lowerMessage.includes('opportunity') || lowerMessage.includes('job') || lowerMessage.includes('position')) {
            return getRandomResponse('availability');
        }
        
        // Pricing responses
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('budget') || lowerMessage.includes('payment') || lowerMessage.includes('fee')) {
            return getRandomResponse('pricing');
        }
        
        // Timeline responses
        if (lowerMessage.includes('timeline') || lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('deadline') || lowerMessage.includes('schedule') || lowerMessage.includes('delivery')) {
            return getRandomResponse('timeline');
        }
        
        // Collaboration responses
        if (lowerMessage.includes('collaborate') || lowerMessage.includes('team') || lowerMessage.includes('work together') || lowerMessage.includes('partnership') || lowerMessage.includes('cooperation')) {
            return getRandomResponse('collaboration');
        }
        
        // Process responses
        if (lowerMessage.includes('process') || lowerMessage.includes('workflow') || lowerMessage.includes('method') || lowerMessage.includes('approach') || lowerMessage.includes('how do you')) {
            return getRandomResponse('process');
        }
        
        // Industry responses
        if (lowerMessage.includes('industry') || lowerMessage.includes('domain') || lowerMessage.includes('sector') || lowerMessage.includes('business') || lowerMessage.includes('field')) {
            return getRandomResponse('industries');
        }
        
        // Passion/motivation responses
        if (lowerMessage.includes('passion') || lowerMessage.includes('motivation') || lowerMessage.includes('why') || lowerMessage.includes('inspire') || lowerMessage.includes('love')) {
            return getRandomResponse('passion');
        }
        
        return getRandomResponse('default');
    }
    
    // Get random response from category
    function getRandomResponse(category) {
        const responses = chatResponses[category] || chatResponses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Show typing indicator
    function showTyping() {
        isTyping = true;
        chatTyping.classList.remove('hidden');
    }
    
    // Hide typing indicator
    function hideTyping() {
        isTyping = false;
        chatTyping.classList.add('hidden');
    }
    
    // Event listeners
    sendButton.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatInput.value);
        }
    });
    
    // Enhanced quick action buttons with comprehensive question handling
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = e.target.textContent.trim();
            let message = '';
            
            // Main categories
            if (text.includes('Projects')) {
                message = 'Tell me about Yasiru\'s projects and portfolio';
            } else if (text.includes('Skills')) {
                message = 'What are Yasiru\'s technical skills and expertise?';
            } else if (text.includes('Contact')) {
                message = 'How can I contact Yasiru for opportunities?';
            } else if (text.includes('CV')) {
                message = 'Can I download Yasiru\'s CV and resume?';
            }
            // New enhanced categories
            else if (text.includes('Education')) {
                message = 'What is Yasiru\'s educational background and qualifications?';
            } else if (text.includes('Pricing')) {
                message = 'What are Yasiru\'s rates and pricing for projects?';
            } else if (text.includes('Timeline')) {
                message = 'How long do projects typically take with Yasiru?';
            } else if (text.includes('Collaboration')) {
                message = 'How does Yasiru work with teams and collaborate?';
            } else if (text.includes('Availability')) {
                message = 'Is Yasiru available for new projects and opportunities?';
            } else if (text.includes('Industry')) {
                message = 'What industries has Yasiru worked with?';
            }
            
            if (message) {
                chatInput.value = message;
                sendMessage(message);
            }
        });
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatToggle.contains(e.target) && !chatInterface.contains(e.target) && isChatOpen) {
            // Optionally auto-close chat when clicking outside
            // Uncomment the lines below if you want this behavior
            // isChatOpen = false;
            // chatInterface.classList.remove('chat-open');
            // chatToggle.classList.remove('chat-button-active');
        }
    });
    
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



