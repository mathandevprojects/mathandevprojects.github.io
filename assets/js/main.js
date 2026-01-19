// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        // Change icon based on state
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Modal
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalFeatures = document.getElementById('modalFeatures');
const closeModal = document.querySelector('.close');

// Project Details Data
const projectDetails = {
    'city-academy': {
        title: 'City Academy Portal (LMS & Booking Management System)',
        description: 'Developed and maintained a comprehensive Learning Management System (LMS) and enterprise booking portal for City Academy. The application serves as a central hub for managing student enrollments, course scheduling, tutor management, and financial transactions.',
        tech: ['PHP 8.1', 'Laravel 11', 'MySQL', 'JavaScript', 'Laravel Mix', 'Blade Templating', 'Salesforce', 'Stripe', 'PayPal', 'GoCardless', 'Klaviyo', 'AWS S3'],
        features: [
            'Role-Based Access Control (RBAC) for multiple user roles',
            'Advanced Booking & E-commerce System with multiple payment gateways',
            'Course & Schedule Management with complex scheduling tools',
            'Tutor Portal with dashboard for schedules and availability',
            'Attendance & Access Control with QR code generation and scanning',
            'CRM & Marketing Integration with Salesforce and Klaviyo',
            'Reporting & Analytics with visualized data and export functionality',
            'Upgraded legacy systems to Laravel 11 framework',
            'Designed and implemented "Door Scanner" feature using QR codes',
            'Automated financial workflows for bulk invoice generation and tutor payments'
        ]
    },
    'crs': {
        title: 'Chennai Rental System (CRS) Portal',
        description: 'A comprehensive web-based enterprise resource planning (ERP) solution designed to streamline and automate the rental management lifecycle. The portal serves as a centralized hub for managing clients, inventory, rental applications, quotations, and financial transactions.',
        tech: ['PHP 8.2', 'Laravel 10', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Blade Templating', 'barryvdh/laravel-dompdf', 'maatwebsite/excel', 'Guzzle HTTP'],
        features: [
            'Rental Lifecycle Management from lead generation to return management',
            'Inventory & Stock Control with real-time tracking of rental assets',
            'Financial Operations with automated generation of quotations and invoices',
            'Client & User Management with Role-Based Access Control (RBAC)',
            'Communication Hub with integrated email templates and WhatsApp notifications',
            'Reporting & Analytics dashboard for payment projections and summaries',
            'GST invoice management and payment status tracking',
            'Complex database schemas for rental logic and partial payments'
        ]
    },
    'madras-academy': {
        title: 'Madras Academy (Course Management System)',
        description: 'Developed and maintained "Madras Academy," a comprehensive Learning Management System (LMS) designed to facilitate online education, student administration, and course delivery. The system integrates with Zerodha Kite Connect API for specialized financial/trading course features.',
        tech: ['PHP 8.1', 'Laravel 11', 'MySQL', 'Blade Templates', 'JavaScript', 'HTML5', 'CSS3', 'Zerodha Kite Connect API', 'Guzzle HTTP Client', 'Laravel Sanctum', 'JWT-Auth', 'AWS S3'],
        features: [
            'Advanced Course Management with flexible CRUD system',
            'User & Role Management with secure authentication',
            'Tutor & Student Portals with dedicated interfaces',
            'Dynamic Content Management (CMS) for website pages',
            'Fintech Integration with Zerodha Kite Connect API for live stock data',
            'API Development for external application integration',
            'Document & Media Handling with AWS S3 storage',
            'RESTful APIs with JWT Authentication for mobile app support',
            'Automated student enquiry handling and batch allocation'
        ]
    },
    'medical-center': {
        title: 'Medical Center / Coaching Platform',
        description: 'A comprehensive WordPress-based platform designed for a Medical Center or Life Coaching business. The application serves as a dynamic portal for managing professional profiles, displaying membership plans via external API integration, and publishing case studies.',
        tech: ['WordPress CMS', 'PHP 7.4+', 'HTML5', 'CSS3', 'JavaScript', 'Elementor Page Builder', 'Custom Plugin Dev', 'REST API', 'MySQL'],
        features: [
            'Professional Profile Management for Coaches/Doctors with extensive attributes',
            'Membership & Subscription System with external REST API integration',
            'Advanced Search & Filtering for Case Studies',
            'Dynamic Content & Customization with Shortcodes',
            'Custom Admin Settings page for API credentials and payment gateway',
            'Responsive grid layouts with hover effects and glassmorphism elements',
            'Custom theme based on "Infine" with professional color palette'
        ]
    },
    'sri-senthil': {
        title: 'Sri Senthil Store App (Grocery E-commerce)',
        description: 'Developed a cross-platform mobile grocery shopping application using Ionic and Angular, designed to provide a seamless e-commerce experience on both Android and iOS via Capacitor. The app enables users to browse products, manage carts, and track orders.',
        tech: ['Ionic 6', 'Angular 14', 'Capacitor', 'TypeScript', 'RxJS', 'SASS'],
        features: [
            'Scalable Single Page Application (SPA) with lazy loading for 25+ modules',
            'Centralized state management using RxJS BehaviorSubject',
            'Comprehensive user flows including OTP-based authentication and order tracking',
            'Native Device Integration with Capacitor plugins',
            'Responsive and intuitive interface using SASS and Ionic components',
            'Wishlist management and address delivery management',
            'High-performance, native-like interface on both Android and iOS'
        ]
    },
    'minderestry': {
        title: 'Minderestry - Mindfulness Platform',
        description: 'A comprehensive mindfulness and meditation platform designed to help users practice mindfulness, access guided meditations, and track their progress. The website features a clean, calming interface with user authentication, course management, and content delivery systems.',
        tech: ['WordPress', 'PHP', 'JavaScript', 'MySQL', 'Elementor', 'Custom Plugins', 'REST API'],
        features: [
            'User registration and authentication system',
            'Course and content management with categorized meditation resources',
            'Progress tracking and personal dashboard for users',
            'Responsive design optimized for mobile and desktop',
            'Custom WordPress plugins for specific mindfulness features',
            'Integration with payment systems for premium content access',
            'SEO optimization for better visibility',
            'Performance optimization for fast loading times'
        ]
    },
    'cofferapl': {
        title: 'Coffer APL - Coffee Business Website',
        description: 'A professional website for a coffee business featuring e-commerce capabilities, product catalog, and customer management. The platform showcases various coffee products, handles online orders, and provides information about the company\'s values and story.',
        tech: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'MySQL', 'Elementor', 'Payment Gateway Integration'],
        features: [
            'E-commerce functionality with WooCommerce integration',
            'Product catalog with detailed descriptions and images',
            'Shopping cart and secure checkout process',
            'Customer account management and order tracking',
            'Responsive design for optimal viewing on all devices',
            'SEO-friendly structure and content optimization',
            'Social media integration for marketing',
            'Custom contact forms and customer support features'
        ]
    }
};

// View Project Details
document.querySelectorAll('.view-project').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        const project = projectDetails[projectId];

        if (project) {
            if (modalTitle) modalTitle.textContent = project.title;
            if (modalDescription) modalDescription.textContent = project.description;

            // Clear and populate tech tags
            if (modalTech) {
                modalTech.innerHTML = '';
                project.tech.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.className = 'tech-tag';
                    tag.textContent = tech;
                    modalTech.appendChild(tag);
                });
            }

            // Clear and populate features
            if (modalFeatures) {
                modalFeatures.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
            }

            if (modal) modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close Modal
if (closeModal) {
    closeModal.addEventListener('click', function () {
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

if (modal) {
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const btn = this.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Simulate sending
        setTimeout(() => {
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            this.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// Add animation on scroll
const animateOnScroll = function () {
    const elements = document.querySelectorAll('.skill-card, .project-card, .edu-card, .timeline-item, .section-title');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.15;

        if (elementPosition < screenPosition) {
            element.classList.add('fade-in-up');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);
