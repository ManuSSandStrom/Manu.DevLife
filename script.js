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

// Contact Form Submission with WhatsApp Integration
const contactForm = document.querySelector('#whatsapp-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const phone = contactForm.querySelector('input[name="phone"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    
    if (!name || !email || !phone || !message) {
        alert('Please fill out all fields.');
        return;
    }
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    
    // Format WhatsApp message
    const whatsappMessage = `Name: ${encodeURIComponent(name)}\nEmail: ${encodeURIComponent(email)}\nPhone: ${encodeURIComponent(phone)}\nMessage: ${encodeURIComponent(message)}`;
    const whatsappURL = `https://wa.me/919515022680?text=${whatsappMessage}`;
    
    // Show success feedback
    alert('Your message is being sent via WhatsApp!');
    
    // Redirect to WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    contactForm.reset();
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