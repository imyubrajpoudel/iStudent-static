document.addEventListener('DOMContentLoaded', () => {
    // Simple interaction for Read More buttons
    const readMoreBtns = document.querySelectorAll('.read-more');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real application, this would navigate to the full post
            console.log("Navigating to full blog post...");
        });
    });
});
