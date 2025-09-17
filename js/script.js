document.addEventListener('DOMContentLoaded', function() {
    // Update section header based on scroll position
    const headerText = document.getElementById('header-text');
    const aboutSection = document.getElementById('about');
    const projectsSection = document.getElementById('projects');
    
    function updateHeaderText() {
        const scrollPosition = window.scrollY + 100;
        const aboutPosition = aboutSection.offsetTop;
        const projectsPosition = projectsSection.offsetTop;
        
        if (scrollPosition >= projectsPosition) {
            headerText.textContent = 'Projects';
        } else {
            headerText.textContent = 'About Me';
        }
    }
    
    // Initial call and scroll event listener
    updateHeaderText();
    window.addEventListener('scroll', updateHeaderText);
    
    // Scroll functionality for indicators
    const scrollDownIndicator = document.querySelector('.scroll-indicator');
    const scrollUpIndicator = document.querySelector('.scroll-up-indicator');
    const viewWorkButton = document.querySelector('.view-work-btn');
    
    function scrollToProjects() {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    function scrollToAbout() {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    scrollDownIndicator.addEventListener('click', scrollToProjects);
    scrollUpIndicator.addEventListener('click', scrollToAbout);
    viewWorkButton.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToProjects();
    });
    
    // Project Carousel Functionality
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const projectsSectionEl = document.querySelector('.projects-hero-section');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        
        // Activate the corresponding dot
        dots[index].classList.add('active');
        
        // Update the theme based on the current slide
        const theme = slides[index].getAttribute('data-theme');
        projectsSectionEl.setAttribute('data-theme', theme);
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Add event listeners to controls
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Add event listeners to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });
    
    // Auto-advance slides (optional)
    let slideInterval = setInterval(nextSlide, 7000);
    
    // Pause auto-advancement when hovering over carousel
    const carousel = document.querySelector('.project-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 7000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Prevent scroll snapping on carousel interaction
    const carouselElements = document.querySelectorAll('.carousel-prev, .carousel-next, .dot');
    carouselElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});