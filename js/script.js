document.addEventListener('DOMContentLoaded', function() {
    // Image rotation for About Me card
    const aboutCard = document.getElementById('aboutCard');
    const aboutBg = aboutCard.querySelector('.card-bg');
    
    const aboutImages = [
        'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];
    
    // Image rotation for Projects card
    const projectsCard = document.getElementById('projectsCard');
    const projectsBg = projectsCard.querySelector('.card-bg');
    
    const projectsImages = [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];

    // Preload images
    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Initialize both cards
    function initCard(card, bg, images) {
        let index = 0;
        bg.style.backgroundImage = `url('${images[0]}')`;
        bg.style.opacity = '0.8';
        
        card.addEventListener('mouseenter', function() {
            index = (index + 1) % images.length;
            bg.style.opacity = '0';
            
            setTimeout(() => {
                bg.style.backgroundImage = `url('${images[index]}')`;
                bg.style.opacity = '0.8';
            }, 800); // Matches CSS transition duration
        });
    }

    // Preload all images
    preloadImages([...aboutImages, ...projectsImages]);
    
    // Initialize cards
    initCard(aboutCard, aboutBg, aboutImages);
    initCard(projectsCard, projectsBg, projectsImages);
});