document.addEventListener('DOMContentLoaded', function() {
    // Progress indicator functionality
    const circles = document.querySelectorAll('.progress-circle');
    const sections = document.querySelectorAll('section[id]'); // Only sections with IDs
    const progressLine = document.querySelector('.progress-line');
    const body = document.body;
    
    // Click navigation for progress circles
    circles.forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.preventDefault();
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
                
                // Immediately update active state
                circles.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                updateProgressLine();
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
        threshold: 0.3,
        rootMargin: '-20% 0px -30% 0px'
    });
    
    // Observe all sections with IDs
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize progress line and background
    updateProgressLine();
    circles[0]?.classList.add('active');
    updateBackgroundColor('overview');
    
    function updateProgressLine() {
        const activeCircle = document.querySelector('.progress-circle.active');
        if (!activeCircle || !progressLine) return;
        
        const activeIndex = Array.from(circles).indexOf(activeCircle);
        const percentage = (activeIndex / (circles.length - 1)) * 100;
        
        progressLine.style.background = `linear-gradient(to bottom, 
            #4ecca3 0%, 
            #4ecca3 ${percentage}%, 
            #bdc3c7 ${percentage}%, 
            #bdc3c7 100%)`;
    }
    
    function updateBackgroundColor(sectionId) {
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
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            });
            
            // Close lightbox with Escape key
            const closeLightbox = function(e) {
                if (e.key === 'Escape' && document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                    document.removeEventListener('keydown', closeLightbox);
                }
            };
            document.addEventListener('keydown', closeLightbox);
        });
    });
    
    // Prevent default anchor behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
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
    
    // Debounced scroll handler for smoother updates
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Set new timeout
            scrollTimeout = setTimeout(function() {
                // Find the section currently in view
                const scrollPosition = window.scrollY + window.innerHeight / 3;
                
                let currentSection = null;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        currentSection = section.id;
                    }
                });
                
                // Update if we found a current section
                if (currentSection) {
                    circles.forEach(c => c.classList.remove('active'));
                    const activeCircle = document.querySelector(`.progress-circle[data-section="${currentSection}"]`);
                    if (activeCircle) {
                        activeCircle.classList.add('active');
                        updateProgressLine();
                        updateBackgroundColor(currentSection);
                    }
                }
                
                isScrolling = false;
            }, 100);
        }
    }, { passive: true });
});