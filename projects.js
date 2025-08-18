document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const circles = document.querySelectorAll('.progress-circle');
    const projectSections = document.querySelectorAll('.project-section');
    const separators = document.querySelectorAll('.separator');
    const circleIcons = document.querySelectorAll('.circle-icon');
    const projectImages = document.querySelectorAll('.project-image');
    
    // Click navigation for progress circles
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const targetSection = document.getElementById(`project-${projectId}`);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Intersection Observer for active states
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectId = entry.target.id.split('-')[1];
                
                // Update progress circles
                circles.forEach(c => c.classList.remove('active'));
                document.querySelector(`.progress-circle[data-project="${projectId}"]`).classList.add('active');
                
                // Update separator line gradient
                const progressLine = document.querySelector('.progress-line');
                const activeIndex = Array.from(circles).findIndex(c => c.classList.contains('active'));
                const percentage = (activeIndex / (circles.length - 1)) * 100;
                
                progressLine.style.background = `linear-gradient(to bottom, 
                    #3498db 0%, 
                    #3498db ${percentage}%, 
                    #bdc3c7 ${percentage}%, 
                    #bdc3c7 100%)`;
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -30% 0px'
    });
    
    projectSections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle image hover and separator visibility
    projectSections.forEach((section, index) => {
        const card = section.querySelector('.project-card');
        const separator = section.querySelector('.separator');
        const circleIcon = section.querySelector('.circle-icon');
        const image = section.querySelector('.project-image');
        
        card.addEventListener('mouseenter', () => {
            separator.style.opacity = '0';
            circleIcon.style.opacity = '0';
            image.style.transform = 'scale(1.05)';
            image.style.zIndex = '2';
        });
        
        card.addEventListener('mouseleave', () => {
            separator.style.opacity = '1';
            circleIcon.style.opacity = '1';
            image.style.transform = 'scale(1)';
            image.style.zIndex = '1';
        });
    });
    
    // Initialize progress line gradient
    updateProgressLine();
    
    function updateProgressLine() {
        const activeCircle = document.querySelector('.progress-circle.active');
        const activeIndex = Array.from(circles).indexOf(activeCircle);
        const percentage = (activeIndex / (circles.length - 1)) * 100;
        
        document.querySelector('.progress-line').style.background = `linear-gradient(to bottom, 
            #3498db 0%, 
            #3498db ${percentage}%, 
            #bdc3c7 ${percentage}%, 
            #bdc3c7 100%)`;
    }
});