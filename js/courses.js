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
    const tableBody = document.getElementById('coursesTableBody');
    const searchInput = document.getElementById('searchCourse');
    
    // Load courses from localStorage
    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    const renderTable = (dataToRender) => {
        if (!tableBody) return;
        
        tableBody.innerHTML = ''; // clear
        
        if (dataToRender.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No courses found.</td></tr>';
            return;
        }

        dataToRender.forEach((course, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.id}</td>
                <td class="name-col">${course.name}</td>
                <td>${course.category}</td>
                <td>${course.duration} Weeks</td>
                <td style="text-align: right; white-space: nowrap;">
                    <button class="btn-edit" data-id="${course.id}">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button class="btn-delete" data-id="${course.id}">
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
                if (confirm('Are you sure you want to delete this course?')) {
                    // Filter out the course to delete
                    courses = courses.filter(c => c.id !== idToDelete);
                    localStorage.setItem('courses', JSON.stringify(courses));
                    
                    // Re-render table
                    renderTable(courses);
                }
            });
        });

        // Attach event listeners to newly created edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToEdit = e.currentTarget.getAttribute('data-id');
                const course = courses.find(c => c.id === idToEdit);
                if (course) {
                    // Populate form
                    document.getElementById('editCourseId').value = course.id;
                    document.getElementById('editCourseName').value = course.name;
                    document.getElementById('editCategory').value = course.category;
                    document.getElementById('editDuration').value = course.duration;

                    // Show modal
                    document.getElementById('editModalOverlay').style.display = 'flex';
                }
            });
        });
    };

    // Initial render
    renderTable(courses);

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

    const editForm = document.getElementById('editCourseForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.validateForm(e.target)) return;

            const id = document.getElementById('editCourseId').value;
            const courseName = document.getElementById('editCourseName').value.trim();
            const category = document.getElementById('editCategory').value;
            const duration = document.getElementById('editDuration').value;

            // Find and update course
            const index = courses.findIndex(c => c.id === id);
            if (index !== -1) {
                courses[index] = {
                    id: id,
                    name: courseName,
                    category: category,
                    duration: parseInt(duration)
                };
                
                // Save and update UI
                localStorage.setItem('courses', JSON.stringify(courses));
                renderTable(courses);
                
                // Hide modal
                if (overlay) overlay.style.display = 'none';
            }
        });
    }

    // 5. Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = courses.filter(c => c.name.toLowerCase().includes(query) || c.id.toLowerCase().includes(query));
            renderTable(filtered);
        });
    }
});
