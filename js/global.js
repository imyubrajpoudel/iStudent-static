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

    // Clear previous dynamic error messages
    const existingErrors = formElement.querySelectorAll('.error-message');
    existingErrors.forEach(err => err.remove());

    const inputs = formElement.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Reset styles
        input.style.borderColor = '';
        let inputError = '';

        // Basic validation for required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e53e3e';
            inputError = `${input.placeholder || input.name || 'This field'} is required.`;
        }

        // Specific field validation based on type or name/placeholder
        const nameKeywords = ['name', 'username', 'first', 'last'];
        const isNameField = nameKeywords.some(keyword => (input.name && input.name.toLowerCase().includes(keyword)) || (input.placeholder && input.placeholder.toLowerCase().includes(keyword)));
        
        if (isNameField && input.value.trim() && !inputError) {
            if (input.value.trim().length <= 1) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
                inputError = 'Name must be more than 1 character.';
            } else if (/^\d+$/.test(input.value.trim())) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
                inputError = 'Name cannot be numbers only.';
            }
        }

        // Advanced Password validation
        if (input.type === 'password' && input.value && !inputError) {
            // 1 Upper, 1 Lower, 8+ chars
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
                inputError = 'Password must be at least 8 characters long, contain 1 uppercase and 1 lowercase letter.';
            }
        }

        // Email validation
        if (input.type === 'email' && input.value && !inputError) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
                inputError = 'Please enter a valid email address.';
            }
        }

        if (inputError) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerText = inputError;

            // Wrap input in a relative container if it's not already wrapped to prevent layout breaks (especially in flex/grid)
            if (!input.parentNode.classList.contains('input-error-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'input-error-wrapper';
                // Copy flex property if parent is a flex container
                const parentStyle = window.getComputedStyle(input.parentNode);
                if (parentStyle.display === 'flex') {
                     const inputStyle = window.getComputedStyle(input);
                     wrapper.style.flex = inputStyle.flex;
                }
                
                // For nested inputs in some structures, this helps keep things intact
                input.parentNode.insertBefore(wrapper, input);
                wrapper.appendChild(input);
                wrapper.appendChild(errorDiv);
            } else {
                input.parentNode.appendChild(errorDiv);
            }
        }
    });

    return isValid;
};
