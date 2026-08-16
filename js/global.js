document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Add active class to current nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // --- Authentication Check Logic ---
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLinksContainer = document.getElementById('authLinks');

    if (currentUser && authLinksContainer) {
        // User is logged in, replace Login/Register with Dashboard and User Profile
        authLinksContainer.style.display = 'flex';
        authLinksContainer.style.alignItems = 'center';
        authLinksContainer.innerHTML = `
            <a href="dashboard.html" class="nav-item" style="margin-right: 15px;"><i class="fa-solid fa-gauge"></i> Dashboard</a>
            <a href="profile.html" class="user-profile" style="display: flex; align-items: center; gap: 8px; color: var(--text-dark);">
                <i class="fa-solid fa-user-circle" style="font-size: 1.2rem; color: var(--secondary-color);"></i>
                <span style="font-weight: 600;">${currentUser.username}</span>
            </a>
            <a href="#" id="logoutBtn" style="margin-left: 15px; color: #e53e3e; font-size: 0.9rem;"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
        `;

        // Handle Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem('currentUser');
                    window.location.href = 'login.html';
                }
            });
        }
    }

    // --- Settings Submenu & Dark Mode Logic ---
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsSubmenu = document.getElementById('settingsSubmenu');
    const darkModeCheckbox = document.getElementById('darkModeCheckbox');

    // Toggle submenu
    if (settingsToggle && settingsSubmenu) {
        settingsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            settingsSubmenu.style.display = settingsSubmenu.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Handle dark mode toggle
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeCheckbox) darkModeCheckbox.checked = true;
    }

    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// Global Form Validation Utility
window.validateForm = function (formElement) {
    let isValid = true;
    let errorMessages = [];

    // Basic validation for required fields
    const inputs = formElement.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Reset styles
        input.style.borderColor = '';

        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            errorMessages.push(`${input.placeholder || input.name || 'Field'} is required.`);
        }

        // Advanced Password validation
        if (input.type === 'password' && input.value) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = 'red';
                errorMessages.push(`Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.`);
            }
        }
    });

    if (!isValid && errorMessages.length > 0) {
        alert(errorMessages.join('\\n'));
    }

    return isValid;
};
