document.addEventListener('DOMContentLoaded', function() {
    const aboutCard = document.getElementById('aboutCard');
    const cardBg = aboutCard.querySelector('.card-bg');
    
    // Array of your images (replace with your actual image paths)
    const aboutImages = [
        'path/to/your-image1.jpg',
        'path/to/your-image2.jpg',
        'path/to/your-image3.jpg',
        'path/to/your-image4.jpg'
    ];
    
    let currentImageIndex = 0;
    let isHovering = false;
    
    // Preload all images
    aboutImages.forEach(imgUrl => {
        const img = new Image();
        img.src = imgUrl;
    });
    
    // Initialize with first image
    cardBg.style.backgroundImage = `url('${aboutImages[currentImageIndex]}')`;
    cardBg.style.opacity = '0';
    
    aboutCard.addEventListener('mouseenter', function() {
        isHovering = true;
        cycleImage();
    });
    
    aboutCard.addEventListener('mouseleave', function() {
        isHovering = false;
        // Keep current image visible
        cardBg.style.opacity = '0.8';
    });
    
    function cycleImage() {
        if (!isHovering) return;
        
        // Cycle to next image
        currentImageIndex = (currentImageIndex + 1) % aboutImages.length;
        
        // Fade out current image
        cardBg.style.opacity = '0';
        
        // Change image after fade out completes
        setTimeout(() => {
            cardBg.style.backgroundImage = `url('${aboutImages[currentImageIndex]}')`;
            cardBg.style.opacity = '0.8';
            
            // Continue cycling if still hovering
            if (isHovering) {
                setTimeout(cycleImage, 2000); // 2 second delay between cycles
            }
        }, 300); // 0.3s fade duration
    }
});