document.addEventListener('DOMContentLoaded', function() {
    // About Me Card Image Rotation
    const aboutCard = document.getElementById('aboutCard');
    const aboutBg = aboutCard.querySelector('.card-bg');
    
    const aboutImages = [
        'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];
    
    let aboutIndex = 0;
    
    // Set initial image
    aboutBg.style.backgroundImage = `url('${aboutImages[0]}')`;
    aboutBg.style.opacity = '0.8';
    
    aboutCard.addEventListener('mouseenter', function() {
        aboutIndex = (aboutIndex + 1) % aboutImages.length;
        aboutBg.style.opacity = '0';
        
        setTimeout(() => {
            aboutBg.style.backgroundImage = `url('${aboutImages[aboutIndex]}')`;
            aboutBg.style.opacity = '0.8';
        }, 300);
    });

    // Projects Card Image Rotation
    const projectsCard = document.getElementById('projectsCard');
    const projectsBg = projectsCard.querySelector('.card-bg');
    
    const projectsImages = [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];
    
    let projectsIndex = 0;
    
    // Set initial image
    projectsBg.style.backgroundImage = `url('${projectsImages[0]}')`;
    projectsBg.style.opacity = '0.8';
    
    projectsCard.addEventListener('mouseenter', function() {
        projectsIndex = (projectsIndex + 1) % projectsImages.length;
        projectsBg.style.opacity = '0';
        
        setTimeout(() => {
            projectsBg.style.backgroundImage = `url('${projectsImages[projectsIndex]}')`;
            projectsBg.style.opacity = '0.8';
        }, 300);
    });
});