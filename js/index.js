document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer logic for Register Section
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    if (daysEl && hoursEl && minsEl && secsEl) {
        // Set a date 15 days from now
        let countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 15);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days.toString().padStart(2, '0');
            hoursEl.innerText = hours.toString().padStart(2, '0');
            minsEl.innerText = minutes.toString().padStart(2, '0');
            secsEl.innerText = seconds.toString().padStart(2, '0');
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();
    }
    
    // Subscribe form submission
    const subscribeForm = document.getElementById('homeSubscribeForm');
    if(subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.validateForm(e.target)) return;
            
            alert("Subscription successful!");
            subscribeForm.reset();
        })
    }
});
