document.addEventListener('DOMContentLoaded', function() {
    // Configuration with demo images
    const cardsConfig = {
        aboutCard: {
            images: [
                'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            ],
            defaultOpacity: 0.8,
            currentIndex: 0
        },
        projectsCard: {
            images: [
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            ],
            defaultOpacity: 0.8,
            currentIndex: 0
        }
    };

    // Initialize all cards
    Object.keys(cardsConfig).forEach(cardId => {
        const card = document.getElementById(cardId);
        const cardBg = card.querySelector('.card-bg');
        const config = cardsConfig[cardId];
        
        // Preload all images
        config.images.forEach(imgUrl => {
            new Image().src = imgUrl;
        });
        
        // Set initial image
        updateCardImage();
        
        card.addEventListener('mouseenter', function() {
            // Cycle to next image
            config.currentIndex = (config.currentIndex + 1) % config.images.length;
            updateCardImage();
        });
        
        function updateCardImage() {
            // Fade out current image
            cardBg.style.opacity = 0;
            
            setTimeout(() => {
                // Change image
                cardBg.style.backgroundImage = `url('${config.images[config.currentIndex]}')`;
                // Fade in new image
                cardBg.style.opacity = config.defaultOpacity;
            }, 150);
        }
    });
});