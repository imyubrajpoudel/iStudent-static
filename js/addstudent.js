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

    // 4. Add Student Form Logic
    const addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.validateForm(e.target)) return;

            const studentId = document.getElementById('studentId').value.trim();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const age = document.getElementById('age').value;
            const course = document.getElementById('course').value;

            // Simple validation
            if (!studentId || !firstName || !lastName || !age || !course) {
                alert('Please fill all fields');
                return;
            }

            // Fetch existing students
            let students = JSON.parse(localStorage.getItem('students')) || [];

            // Check if ID exists
            if (students.some(s => s.id === studentId)) {
                alert('A student with this ID already exists!');
                return;
            }

            const newStudent = {
                id: studentId,
                name: `${firstName} ${lastName}`, // The mockup combines name
                age: parseInt(age),
                course: course
            };

            students.push(newStudent);
            localStorage.setItem('students', JSON.stringify(students));

            alert('Student added successfully!');
            window.location.href = 'students.html'; // Redirect to list
        });
    }
});
