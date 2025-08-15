document.addEventListener('DOMContentLoaded', function() {
    // Preload hover images for smoother transition
    const preloadImages = () => {
        const images = [
            'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ];
        
        images.forEach(image => {
            const img = new Image();
            img.src = image;
        });
    };
    
    // Initialize
    preloadImages();
});