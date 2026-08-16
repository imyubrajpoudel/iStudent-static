document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('loginError');

    // Redirect if already logged in
    if(localStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.validateForm(e.target)) return;

            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            errorMsg.innerText = '';

            if (!username || !password) {
                errorMsg.innerText = 'Please enter username and password.';
                return;
            }

            // Get existing users
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Authenticate
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Remove password before saving to active session
                const sessionUser = { ...user };
                delete sessionUser.password;
                
                localStorage.setItem('currentUser', JSON.stringify(sessionUser));
                window.location.href = 'dashboard.html';
            } else {
                errorMsg.innerText = 'Invalid username or password.';
            }
        });
    }
});
