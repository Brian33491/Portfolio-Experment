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
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update background color
                updateBackgroundColor(sectionId);
            }
        });
    });
    
    // Intersection Observer for active states
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
        threshold: 0.5,
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
        });
    });

    // Manual scroll event listener as backup
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        isScrolling = true;
        
        // Find which section is currently in view
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            if (!section.id) return;
            
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update progress circles
                circles.forEach(c => c.classList.remove('active'));
                const activeCircle = document.querySelector(`.progress-circle[data-section="${section.id}"]`);
                if (activeCircle) {
                    activeCircle.classList.add('active');
                }
                
                // Update progress line gradient
                updateProgressLine();
                
                // Update background color
                updateBackgroundColor(section.id);
            }
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    });
});