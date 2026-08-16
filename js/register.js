document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorMsg = document.getElementById('regError');

    // Redirect if already logged in
    if(localStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.validateForm(e.target)) return;

            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            
            errorMsg.innerText = '';

            // Basic Validation
            if (!name || !email || !username || !password) {
                errorMsg.innerText = 'All fields are required.';
                return;
            }

            if (password !== confirmPassword) {
                errorMsg.innerText = 'Passwords do not match.';
                return;
            }

            // Get existing users or initialize empty array
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if username or email already exists
            const userExists = users.some(u => u.username === username || u.email === email);
            if (userExists) {
                errorMsg.innerText = 'Username or Email already exists.';
                return;
            }

            // Save new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                username,
                password // Note: In a real app, NEVER store plain text passwords!
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }
});
