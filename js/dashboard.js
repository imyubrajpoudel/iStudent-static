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

    // 3. Populate Dashboard Stats
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const totalStudentsEl = document.getElementById('totalStudents');
    if (totalStudentsEl) {
        totalStudentsEl.innerText = students.length;
    }

    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const totalCoursesEl = document.getElementById('totalCourses');
    if (totalCoursesEl) {
        totalCoursesEl.innerText = courses.length;
    }

    // 4. Sidebar Logout functionality
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
