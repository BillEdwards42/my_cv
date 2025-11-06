// Language switching functionality
class LanguageSwitch {
    constructor() {
        this.currentLang = 'en';
        this.langButton = document.getElementById('langToggle');
        this.init();
    }

    init() {
        // Add click event listener to language button
        this.langButton.addEventListener('click', () => this.toggleLanguage());
        
        // Set initial state - ensure English is shown by default
        document.body.classList.remove('lang-zh');
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'zh' : 'en';
        this.updateContent();
        this.addTransitionEffects();
    }

    updateContent() {
        // Get all dual-language elements including popup content
        const dualLangElements = document.querySelectorAll('.hero-name, .hero-title, .hero-description, .section-heading, .project-title, .project-description, .contact-label, .nav-links a, .popup-title, .about-title');
        
        // Handle popup about paragraphs separately (they have different structure)
        const popupParagraphs = document.querySelectorAll('.popup-about p');
        
        if (this.currentLang === 'zh') {
            document.title = '艾威朋';
            document.body.classList.add('lang-zh');
            
            // Replace content with Chinese text - use stored original HTML
            dualLangElements.forEach(element => {
                if (element.dataset.originalHtml) {
                    // Temporarily restore original HTML to extract Chinese text
                    element.innerHTML = element.dataset.originalHtml;
                    const zhText = element.querySelector('.lang-zh');
                    if (zhText) {
                        // Replace with clean Chinese text
                        element.textContent = zhText.textContent;
                        element.classList.add('chinese-active');
                    }
                }
            });
            
            // Handle keywords specially
            this.updateKeywords('zh');
            
            // Handle popup paragraphs
            popupParagraphs.forEach(p => {
                if (p.classList.contains('lang-en')) {
                    p.style.display = 'none';
                } else if (p.classList.contains('lang-zh')) {
                    p.style.display = 'block';
                }
            });
            
        } else {
            document.title = 'Bill Edwards';
            document.body.classList.remove('lang-zh');
            
            // Show only English content
            dualLangElements.forEach(element => {
                if (element.dataset.originalHtml) {
                    // Restore original to extract English text
                    element.innerHTML = element.dataset.originalHtml;
                    const enText = element.querySelector('.lang-en');
                    if (enText) {
                        element.textContent = enText.textContent;
                    }
                    element.classList.remove('chinese-active');
                }
            });
            
            // Handle keywords specially
            this.updateKeywords('en');
            
            // Handle popup paragraphs
            popupParagraphs.forEach(p => {
                if (p.classList.contains('lang-en')) {
                    p.style.display = 'block';
                } else if (p.classList.contains('lang-zh')) {
                    p.style.display = 'none';
                }
            });
        }
    }
    
    updateKeywords(lang) {
        const keywords = document.querySelectorAll('.keyword');
        keywords.forEach(keyword => {
            if (lang === 'zh') {
                // Restore original HTML first to extract Chinese text
                if (keyword.dataset.originalHtml) {
                    keyword.innerHTML = keyword.dataset.originalHtml;
                }
                const zhText = keyword.querySelector('.lang-zh');
                if (zhText) {
                    // Replace with clean Chinese text
                    keyword.textContent = zhText.textContent;
                    keyword.classList.add('chinese-keyword');
                }
            } else {
                // Show only English text for keywords
                if (keyword.dataset.originalHtml) {
                    keyword.innerHTML = keyword.dataset.originalHtml;
                    const enText = keyword.querySelector('.lang-en');
                    if (enText) {
                        keyword.textContent = enText.textContent;
                    }
                    keyword.classList.remove('chinese-keyword');
                }
            }
        });
    }

    addTransitionEffects() {
        // Add subtle fade effect during language switch
        const mainElements = document.querySelectorAll('.hero-name, .hero-title, .hero-description, .section-heading, .project-title, .project-description, .contact-label');
        
        mainElements.forEach(element => {
            element.style.transition = 'opacity 0.2s ease';
            element.style.opacity = '0.8';
            
            setTimeout(() => {
                element.style.opacity = '1';
            }, 100);
        });
        
        // Button scale animation
        this.langButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.langButton.style.transform = 'scale(1)';
        }, 150);
    }
}

// Font loading optimization for Chinese characters
class FontLoader {
    constructor() {
        this.init();
    }

    init() {
        // Preload Chinese font subset when page loads
        this.preloadChineseFonts();
    }

    preloadChineseFonts() {
        // Create invisible element with Chinese characters to trigger font loading
        const testElement = document.createElement('div');
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        testElement.style.fontFamily = 'Cormorant Garamond';
        testElement.innerHTML = '艾威朋數據科學家電腦愛好者環境分析平台智能能源優化預測性維護套件';
        document.body.appendChild(testElement);
        
        // Remove after font loads
        setTimeout(() => {
            if (document.body.contains(testElement)) {
                document.body.removeChild(testElement);
            }
        }, 1000);
    }
}

// Smooth scrolling enhancement
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Enhanced smooth scrolling that works well with both languages
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Typography adjustments for Chinese characters
class TypographyEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Monitor language changes and adjust typography
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (mutation.target === document.body) {
                        this.adjustTypography();
                    }
                }
            });
        });

        // Observe body class changes
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Initial typography adjustment
        this.adjustTypography();
    }

    adjustTypography() {
        const isChineseMode = document.body.classList.contains('lang-zh');
        
        // Adjust hero name letter spacing
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            heroName.style.letterSpacing = isChineseMode ? '0.1em' : '2px';
        }

        // Adjust hero title letter spacing
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.letterSpacing = isChineseMode ? '0.2em' : '4px';
        }
    }
}

// Image Slideshow Manager
class ImageSlideshow {
    constructor(container) {
        this.container = container;
        this.images = container.querySelectorAll('.popup-images img');
        this.dots = container.querySelectorAll('.dot');
        this.currentIndex = 0;
        this.autoAdvanceTimer = null;
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        // Add click handlers to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.pauseAutoAdvance();
        });
        
        // Resume on mouse leave
        this.container.addEventListener('mouseleave', () => {
            if (this.isActive) {
                this.startAutoAdvance();
            }
        });
    }
    
    goToSlide(index) {
        if (index === this.currentIndex) return;
        
        // Remove active class from current slide and dot
        this.images[this.currentIndex].classList.remove('active-slide');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Add active class to new slide and dot
        this.currentIndex = index;
        this.images[this.currentIndex].classList.add('active-slide');
        this.dots[this.currentIndex].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoAdvance() {
        if (this.images.length <= 1) return; // No need to auto-advance single images
        
        this.autoAdvanceTimer = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 seconds
    }
    
    pauseAutoAdvance() {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }
    
    start() {
        this.isActive = true;
        this.startAutoAdvance();
    }
    
    stop() {
        this.isActive = false;
        this.pauseAutoAdvance();
    }
}

// Project Popup Manager
class ProjectPopup {
    constructor() {
        this.popups = {
            'green-moment': document.getElementById('greenMomentPopup'),
            'uni-map': document.getElementById('uniMapPopup'),
            'home-server': document.getElementById('homeServerPopup')
        };
        this.currentPopup = null;
        this.currentSlideshow = null;
        this.slideshows = new Map();
        
        this.init();
        this.initializeSlideshows();
    }
    
    init() {
        // Add click handlers to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                if (projectId && this.popups[projectId]) {
                    this.openPopup(projectId);
                }
            });
            
            // Add cursor pointer to indicate clickable
            card.style.cursor = 'pointer';
        });
        
        // Add event listeners to all popups
        Object.values(this.popups).forEach(popup => {
            const closeBtn = popup.querySelector('.popup-close');
            
            // Close button event
            closeBtn.addEventListener('click', () => this.closePopup());
            
            // Close on overlay click
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    this.closePopup();
                }
            });
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentPopup) {
                this.closePopup();
            }
        });
    }
    
    initializeSlideshows() {
        // Initialize slideshow for each popup
        Object.entries(this.popups).forEach(([popupId, popup]) => {
            const imageSection = popup.querySelector('.popup-image-section');
            if (imageSection) {
                const slideshow = new ImageSlideshow(imageSection);
                this.slideshows.set(popupId, slideshow);
                
                // Add enlargeable functionality
                this.initEnlargeableImages(popup);
            }
        });
    }
    
    initEnlargeableImages(popup) {
        const enlargeableImages = popup.querySelectorAll('img.enlargeable');
        
        enlargeableImages.forEach(img => {
            img.addEventListener('click', () => {
                // Pause slideshow when enlarging
                const popupId = Object.keys(this.popups).find(id => this.popups[id] === popup);
                const slideshow = this.slideshows.get(popupId);
                
                if (img.classList.contains('enlarged')) {
                    // Un-enlarge
                    img.classList.remove('enlarged');
                    if (slideshow) slideshow.start();
                } else {
                    // Enlarge
                    img.classList.add('enlarged');
                    if (slideshow) slideshow.pauseAutoAdvance();
                }
            });
        });
    }
    
    openPopup(projectId) {
        const popup = this.popups[projectId];
        if (!popup) return;
        
        // Close any currently open popup
        if (this.currentPopup) {
            this.closePopup();
        }
        
        this.currentPopup = popup;
        this.currentSlideshow = this.slideshows.get(projectId);
        
        // Show popup with animation
        popup.classList.add('show');
        popup.setAttribute('aria-hidden', 'false');
        
        // Start slideshow
        if (this.currentSlideshow) {
            this.currentSlideshow.start();
        }
        
        // Focus on title for accessibility
        const title = popup.querySelector('.popup-title');
        if (title) {
            title.focus();
        }
    }
    
    closePopup() {
        if (this.currentPopup) {
            this.currentPopup.classList.remove('show');
            this.currentPopup.setAttribute('aria-hidden', 'true');
            
            // Stop slideshow
            if (this.currentSlideshow) {
                this.currentSlideshow.stop();
            }
            
            this.currentPopup = null;
            this.currentSlideshow = null;
        }
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Store original HTML structure for language switching  
    const dualLangElements = document.querySelectorAll('.hero-name, .hero-title, .hero-description, .section-heading, .project-title, .project-description, .contact-label, .nav-links a, .keyword, .popup-title, .about-title');
    dualLangElements.forEach(element => {
        element.dataset.originalHtml = element.innerHTML;
        
        // Initialize to show only English text
        const enText = element.querySelector('.lang-en');
        if (enText) {
            element.textContent = enText.textContent;
        }
    });
    
    // Initialize popup paragraphs to show only English
    const popupParagraphs = document.querySelectorAll('.popup-about p');
    popupParagraphs.forEach(p => {
        if (p.classList.contains('lang-en')) {
            p.style.display = 'block';
        } else if (p.classList.contains('lang-zh')) {
            p.style.display = 'none';
        }
    });
    
    const languageSwitch = new LanguageSwitch();
    const projectPopup = new ProjectPopup();
    
    new FontLoader();
    new SmoothScroll();
    new TypographyEnhancer();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});