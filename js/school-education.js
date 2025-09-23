document.addEventListener('DOMContentLoaded', function() {
    // Progress indicator functionality
    const circles = document.querySelectorAll('.progress-circle');
    const sections = document.querySelectorAll('.project-detail-hero, .project-details');
    const progressLine = document.querySelector('.progress-line');
    const body = document.body;
    
    // Click navigation for progress circles
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                // Calculate offset for fixed header
                const offset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update background color
                updateBackgroundColor(sectionId);
            }
        });
    });
    
    // Improved Intersection Observer for active states
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Update progress circles
                circles.forEach(c => c.classList.remove('active'));
                const activeCircle = document.querySelector(`.progress-circle[data-section="${sectionId}"]`);
                if (activeCircle) {
                    activeCircle.classList.add('active');
                }
                
                // Update progress line gradient
                updateProgressLine();
                
                // Update background color
                updateBackgroundColor(sectionId);
            }
        });
    }, {
        threshold: 0.3, // Lower threshold for better detection
        rootMargin: '-20% 0px -30% 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
    
    // Initialize progress line and background
    updateProgressLine();
    updateBackgroundColor('overview');
    
    function updateProgressLine() {
        const activeCircle = document.querySelector('.progress-circle.active');
        if (!activeCircle) return;
        
        const activeIndex = Array.from(circles).indexOf(activeCircle);
        const percentage = (activeIndex / (circles.length - 1)) * 100;
        
        progressLine.style.background = `linear-gradient(to bottom, 
            #4ecca3 0%, 
            #4ecca3 ${percentage}%, 
            #bdc3c7 ${percentage}%, 
            #bdc3c7 100%)`;
    }
    
    function updateBackgroundColor(sectionId) {
        // Remove all section classes
        body.removeAttribute('data-section');
        
        // Add the current section class
        body.setAttribute('data-section', sectionId);
    }
    
    // Fade-in animation for sections
    const detailSections = document.querySelectorAll('.detail-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    detailSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Image lightbox functionality
    const imageItems = document.querySelectorAll('.image-item img, .design-item img');
    
    imageItems.forEach(item => {
        item.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const img = document.createElement('img');
            img.src = this.src;
            img.alt = this.alt;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // Close lightbox with Escape key
            document.addEventListener('keydown', function closeLightbox(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(lightbox);
                    document.removeEventListener('keydown', closeLightbox);
                }
            });
        });
    });

    // Improved scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Clear the timeout if it's already set
        clearTimeout(scrollTimeout);
        
        // Set a new timeout
        scrollTimeout = setTimeout(() => {
            // Find which section is currently in view
            const scrollPosition = window.scrollY + 100;
            
            let currentSection = 'overview';
            let minDistance = Infinity;
            
            sections.forEach(section => {
                if (!section.id) return;
                
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionCenter = sectionTop + (sectionHeight / 2);
                const distance = Math.abs(scrollPosition - sectionCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSection = section.id;
                }
            });
            
            // Update progress circles
            circles.forEach(c => c.classList.remove('active'));
            const activeCircle = document.querySelector(`.progress-circle[data-section="${currentSection}"]`);
            if (activeCircle) {
                activeCircle.classList.add('active');
            }
            
            // Update progress line gradient
            updateProgressLine();
            
            // Update background color
            updateBackgroundColor(currentSection);
        }, 50); // Reduced timeout for more responsive scrolling
    });
    
    // Prevent default anchor behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});