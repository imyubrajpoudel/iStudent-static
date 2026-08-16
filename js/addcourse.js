document.addEventListener('DOMContentLoaded', () => {
    // 1. Auth Protection
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Populate User Data
    const welcomeUserName = document.getElementById('welcomeUserName');
    if (welcomeUserName) {
        welcomeUserName.innerText = currentUser.name || currentUser.username;
    }

    // 3. Sidebar Logout functionality
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

    // 4. Add Course Form Logic
    const addCourseForm = document.getElementById('addCourseForm');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.validateForm(e.target)) return;

            const courseId = document.getElementById('courseId').value.trim();
            const courseName = document.getElementById('courseName').value.trim();
            const category = document.getElementById('category').value;
            const duration = document.getElementById('duration').value;

            // Simple validation
            if (!courseId || !courseName || !category || !duration) {
                alert('Please fill all fields');
                return;
            }

            // Fetch existing courses
            let courses = JSON.parse(localStorage.getItem('courses')) || [];

            // Check if ID exists
            if (courses.some(c => c.id === courseId)) {
                alert('A course with this ID already exists!');
                return;
            }

            const newCourse = {
                id: courseId,
                name: courseName,
                category: category,
                duration: parseInt(duration)
            };

            courses.push(newCourse);
            localStorage.setItem('courses', JSON.stringify(courses));

            alert('Course added successfully!');
            window.location.href = 'courses.html'; // Redirect to list
        });
    }
});
