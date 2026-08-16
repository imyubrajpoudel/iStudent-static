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

    // 4. Populate Table and Handle Delete
    const tableBody = document.getElementById('studentsTableBody');
    const searchInput = document.getElementById('searchStudent');
    
    // Load students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const renderTable = (dataToRender) => {
        if (!tableBody) return;
        
        tableBody.innerHTML = ''; // clear
        
        if (dataToRender.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No students found.</td></tr>';
            return;
        }

        dataToRender.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td class="name-col">${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td style="text-align: right; white-space: nowrap;">
                    <button class="btn-edit" data-id="${student.id}">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button class="btn-delete" data-id="${student.id}">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Attach event listeners to newly created delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = e.currentTarget.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this student?')) {
                    // Filter out the student to delete
                    students = students.filter(s => s.id !== idToDelete);
                    localStorage.setItem('students', JSON.stringify(students));
                    
                    // Re-render table
                    renderTable(students);
                }
            });
        });

        // Attach event listeners to newly created edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToEdit = e.currentTarget.getAttribute('data-id');
                const student = students.find(s => s.id === idToEdit);
                if (student) {
                    // Split name into first and last
                    const nameParts = student.name.split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';

                    // Populate form
                    document.getElementById('editStudentId').value = student.id;
                    document.getElementById('editFirstName').value = firstName;
                    document.getElementById('editLastName').value = lastName;
                    document.getElementById('editAge').value = student.age;
                    document.getElementById('editCourse').value = student.course;

                    // Show modal
                    document.getElementById('editModalOverlay').style.display = 'flex';
                }
            });
        });
    };

    // Initial render
    renderTable(students);

    // --- Modal Logic ---
    const closeBtn = document.getElementById('closeModalBtn');
    const overlay = document.getElementById('editModalOverlay');
    
    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.style.display = 'none';
        });
        
        // Close when clicking outside modal content
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    const editForm = document.getElementById('editStudentForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.validateForm(e.target)) return;

            const id = document.getElementById('editStudentId').value;
            const firstName = document.getElementById('editFirstName').value.trim();
            const lastName = document.getElementById('editLastName').value.trim();
            const age = document.getElementById('editAge').value;
            const course = document.getElementById('editCourse').value;

            // Find and update student
            const index = students.findIndex(s => s.id === id);
            if (index !== -1) {
                students[index] = {
                    id: id,
                    name: firstName + ' ' + lastName,
                    age: age,
                    course: course
                };
                
                // Save and update UI
                localStorage.setItem('students', JSON.stringify(students));
                renderTable(students);
                
                // Hide modal
                if (overlay) overlay.style.display = 'none';
            }
        });
    }

    // 5. Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = students.filter(s => s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query));
            renderTable(filtered);
        });
    }
});
