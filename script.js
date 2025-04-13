// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navbar Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Close mobile menu after clicking a link
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Scroll Animations for Sections
const sections = document.querySelectorAll('section');

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view'); // Optional: Remove class when out of view
        }
    });
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Contact Form Submission (Placeholder)
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();
    
    if (name && email && message) {
        // Placeholder for form submission logic
        alert('Thank you for your message! I’ll get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

// Close Mobile Menu on Resize (if window is enlarged)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Ensure initial visibility on page load
window.addEventListener('load', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight) {
            section.classList.add('in-view');
        }
    });
});