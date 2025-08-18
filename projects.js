document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const circles = document.querySelectorAll('.progress-circle');
    const projectSections = document.querySelectorAll('.project-section');
    const progressLine = document.querySelector('.progress-line');
    
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
                
                // Update progress line gradient
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
    
    // Observe all project sections
    projectSections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize progress line
    updateProgressLine();
    
    function updateProgressLine() {
        const activeCircle = document.querySelector('.progress-circle.active');
        const activeIndex = Array.from(circles).indexOf(activeCircle);
        const percentage = (activeIndex / (circles.length - 1)) * 100;
        
        progressLine.style.background = `linear-gradient(to bottom, 
            #3498db 0%, 
            #3498db ${percentage}%, 
            #bdc3c7 ${percentage}%, 
            #bdc3c7 100%)`;
    }
});