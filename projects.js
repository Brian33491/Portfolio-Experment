document.addEventListener('DOMContentLoaded', function() {
    // Make progress circles interactive
    const circles = document.querySelectorAll('.progress-circle');
    
    circles.forEach((circle, index) => {
        circle.addEventListener('click', function() {
            // Update active state
            circles.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to corresponding project (you would need to add IDs to projects)
            // document.getElementById(`project-${index+1}`).scrollIntoView();
        });
    });
    
    // You would add more functionality here for actual project navigation
});