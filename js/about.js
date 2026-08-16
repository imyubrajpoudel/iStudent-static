document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            // Close all other accordions (optional, but good UX)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('i').classList.remove('fa-minus');
                otherItem.querySelector('i').classList.add('fa-plus');
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
});
