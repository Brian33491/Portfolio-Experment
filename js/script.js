document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a regular page link
            if (this.getAttribute('href').includes('.html')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll to the section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Add animation to project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const projectsSection = document.querySelector('.projects-hero-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Make projects section visible with transition
                projectsSection.classList.add('visible');
                
                // Animate project cards
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200); // Stagger the animation
                });
            }
        });
    }, { threshold: 0.3 });
    
    // Start observing the projects section
    observer.observe(projectsSection);
    
    // Parallax effect for background images
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('.hero-section');
        const projectsSection = document.querySelector('.projects-hero-section');
        
        // Apply parallax effect to background images
        if (aboutSection) {
            aboutSection.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
        }
        
        if (projectsSection) {
            projectsSection.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
        }
    });
});