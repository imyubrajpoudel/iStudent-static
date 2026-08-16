# iStudent - Student Management System

![iStudent Logo](https://img.shields.io/badge/iStudent-Management%20System-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Welcome to **iStudent**, a comprehensive, responsive, and aesthetically pleasing Student Management System and online learning platform. This project provides seamless tools for managing course records, student databases, user profiles, and features an engaging public-facing portal for prospective students.

---

## ✨ Features

- **Robust Authentication System**: Full client-side registration and login functionality utilizing `localStorage`. Enforces strong password policies (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character).
- **Comprehensive Dashboard**: A dynamic administrative dashboard displaying real-time statistics (Total Students, Total Courses) synced directly from local storage.
- **Student Management**: Functionality to add new students and view a comprehensive data table of all enrolled students.
- **Course Management**: Functionality to add new courses and view an extensive catalog of available courses.
- **Global Dark Mode**: A unified dark mode theme across the entire application, featuring a toggle in the sidebar and saving user preferences persistently via `localStorage`.
- **Form Validation**: Interactive, strict client-side form validation across all input areas (contact forms, auth forms, data entry) ensuring clean data collection.
- **Responsive & Premium UI**: Built with modern CSS (Flexbox/Grid), featuring vibrant colors, hover micro-animations, glassmorphism elements, and a completely mobile-responsive layout.

---

## 🗺️ Sitemap Overview

The website is logically separated into a **Public Portal** and a **Management Dashboard**.

```text
iStudent Platform
│
├── Public Portal
│   ├── Home (index.html) - Landing page, features, community experts
│   ├── About Us (about.html) - Platform details, FAQ section
│   ├── Blogs (blogs.html) - Latest news, career guides, and articles
│   ├── Contact Us (contact.html) - Support form, location, contact details
│   └── Authentication
│       ├── Login (login.html) - User sign-in
│       └── Register (register.html) - New account creation
│
└── Management Dashboard (Requires Authentication)
    ├── Dashboard (dashboard.html) - Overview statistics and quick actions
    ├── Students
    │   ├── View Students (students.html) - Tabular view of all students
    │   └── Add Student (addstudent.html) - Form to register a new student
    ├── Courses
    │   ├── View Courses (courses.html) - Tabular view of all courses
    │   └── Add Course (addcourse.html) - Form to publish a new course
    └── User Settings
        └── Profile (profile.html) - User profile details and settings
```

---

## 📄 Page Descriptions & Components

### Public Pages
- **`index.html`**: The landing page designed to convert visitors. It contains a hero section, key platform features, a community experts grid, and dynamic call-to-actions.
- **`about.html`**: Tells the story of iStudent. Features a responsive FAQ accordion for quick answers to common questions.
- **`blogs.html`**: A grid layout showcasing educational articles, career advice, and updates.
- **`contact.html`**: A clean, accessible contact interface featuring email and phone links, social media integration, and a validated contact form.
- **`login.html` & `register.html`**: Secure entry points to the application. Forms are validated dynamically before allowing submission.

### Dashboard Pages (Management Portal)
- **`dashboard.html`**: The control center. It renders numerical statistics summarizing the active state of the platform (reading from the `students` and `courses` arrays in local storage).
- **`students.html` / `courses.html`**: Data tables optimized for readability. In dark mode, these tables automatically adjust to high-contrast themes to maintain accessibility.
- **`addstudent.html` / `addcourse.html`**: Clean, validated input forms for administrators to populate the system. Data is serialized and pushed to `localStorage` arrays upon successful submission.
- **`profile.html`**: Allows the logged-in user to view their credentials.

### Shared Components
- **Global Navbar**: Responsive navigation that automatically switches links to the Dashboard/Profile when a user is authenticated.
- **Sidebar**: Present on all Dashboard pages. Features navigation links, a Dark Mode toggle, and a robust Logout button equipped with a confirmation dialog.
- **Footer**: A rich footer with quick links, newsletter subscription, and external social media links (configured to open safely in a new tab).

---

## 🚀 How to Use the Website (Step-by-Step Guide)

1. **Getting Started**
   - Open `index.html` in any modern web browser.
   - Explore the public pages (About, Blogs, Contact) via the top navigation bar.

2. **Creating an Account**
   - Click **Register** in the top navigation.
   - Fill in your details. *Note: Ensure your password contains at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character.*
   - Submit the form to create your account. You will be redirected to the login page.

3. **Logging In**
   - Enter your newly created credentials on the `login.html` page.
   - Upon successful login, the top navigation will dynamically update to show **Dashboard**, **Profile**, and **Logout**.

4. **Navigating the Dashboard**
   - Click **Dashboard** to enter the management portal.
   - You will see the Sidebar on the left and your main statistics overview on the right.
   - **Dark Mode**: Click on "Settings" in the sidebar, then toggle "Dark Mode" to instantly switch the entire app's theme.

5. **Managing Data**
   - **Adding a Student**: Click **Add Student** in the sidebar. Fill out the ID, Name, Email, and select a Faculty. Click Save.
   - **Viewing Students**: Click **Students** to see the student you just added populated in the data table.
   - **Adding a Course**: Click **Add Course** in the sidebar. Fill out the Course ID, Name, Faculty, and Duration. Click Save.
   - **Viewing Courses**: Click **Courses** to view your updated course list.

6. **Logging Out**
   - Click the **Logout** button either in the top navigation or at the bottom of the sidebar.
   - A confirmation prompt will appear. Click **OK** to securely end your session and return to the public site.

---

*Designed and Developed for seamless educational management.*
