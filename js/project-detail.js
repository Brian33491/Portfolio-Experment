document.addEventListener('DOMContentLoaded', function() {
    // Progress indicator functionality
    const circles = document.querySelectorAll('.progress-circle');
    const sections = document.querySelectorAll('.project-details, .project-detail-hero');
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
                document.querySelector(`.progress-circle[data-section="${sectionId}"]`).classList.add('active');
                
                // Update progress line gradient
                updateProgressLine();
                
                // Update background color
                updateBackgroundColor(sectionId);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -30% 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize progress line and background
    updateProgressLine();
    updateBackgroundColor('overview');
    
    function updateProgressLine() {
        const activeCircle = document.querySelector('.progress-circle.active');
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
    
    // Simple fade-in animation for sections
    const detailSections = document.querySelectorAll('.detail-section, .project-gallery');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    detailSections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        sectionObserver.observe(section);
    });
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1000';
            lightbox.style.cursor = 'pointer';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '10px';
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
});