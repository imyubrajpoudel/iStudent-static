document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Populate display
    const populateDisplay = () => {
        document.getElementById('displayFullName').innerText = currentUser.name || currentUser.username;
        document.getElementById('displayEmail').innerText = currentUser.email || 'No email provided';
        document.getElementById('displayUsername').innerText = currentUser.username;
        
        // Populate inputs
        document.getElementById('updateName').value = currentUser.name || '';
        document.getElementById('updateEmail').value = currentUser.email || '';
        document.getElementById('updateUsername').value = currentUser.username || '';
        
        // Also update topbar
        const welcomeUserName = document.getElementById('welcomeUserName');
        if (welcomeUserName) {
            welcomeUserName.innerText = currentUser.name || currentUser.username;
        }
    };

    populateDisplay();

    // Handle Profile Update
    document.getElementById('updateProfileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!window.validateForm(e.target)) return;

        const newName = document.getElementById('updateName').value.trim();
        const newEmail = document.getElementById('updateEmail').value.trim();
        const newUsername = document.getElementById('updateUsername').value.trim();
        const msgEl = document.getElementById('profileMsg');

        // Update in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        
        if (userIndex !== -1) {
            // Check if new username is taken
            if (newUsername !== currentUser.username && users.some(u => u.username === newUsername)) {
                msgEl.innerText = 'Username is already taken.';
                msgEl.className = 'form-msg error';
                return;
            }

            users[userIndex].name = newName;
            users[userIndex].email = newEmail;
            users[userIndex].username = newUsername;
            
            localStorage.setItem('users', JSON.stringify(users));
            
            // Update currentUser
            currentUser.name = newName;
            currentUser.email = newEmail;
            currentUser.username = newUsername;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            populateDisplay();
            
            msgEl.innerText = 'Profile updated successfully!';
            msgEl.className = 'form-msg success';
            setTimeout(() => { msgEl.innerText = ''; }, 3000);
        }
    });

    // Handle Password Update
    document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!window.validateForm(e.target)) return;

        const oldPass = document.getElementById('oldPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmNewPassword').value;
        const msgEl = document.getElementById('passwordMsg');

        if (newPass !== confirmPass) {
            msgEl.innerText = 'New passwords do not match.';
            msgEl.className = 'form-msg error';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === currentUser.username && u.password === oldPass);

        if (userIndex !== -1) {
            users[userIndex].password = newPass;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Optionally update currentUser password if we store it
            currentUser.password = newPass;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            msgEl.innerText = 'Password updated successfully!';
            msgEl.className = 'form-msg success';
            e.target.reset();
            setTimeout(() => { msgEl.innerText = ''; }, 3000);
        } else {
            msgEl.innerText = 'Incorrect old password.';
            msgEl.className = 'form-msg error';
        }
    });
    
    // Sidebar Logout functionality
    const sidebarLogout = document.getElementById('sidebarLogout');
    if (sidebarLogout) {
        sidebarLogout.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        });
    }
});
