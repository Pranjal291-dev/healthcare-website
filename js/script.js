// ==========================================
// HealthCare+ Website JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // Mobile Navigation
    // ==============================

    const menuBtn = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }

        });

        // Close menu when a navigation link is clicked

        document.querySelectorAll(".navbar a").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }

    // ==============================
    // Header Shadow on Scroll
    // ==============================

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.10)";
            header.style.background = "#ffffff";

        } else {

            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
            header.style.background = "#ffffff";

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);

    // ==============================
    // Scroll Animation
    // ==============================

    const animatedItems = document.querySelectorAll(
        ".feature-card, .service-card, .doctor-card, .stat-box, .testimonial-box, .timeline-item, .info-box"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    animatedItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = "all .6s ease";

        observer.observe(item);

    });

   // ==========================================
// Appointment Form
// ==========================================

const appointmentForm = document.querySelector(".appointment-form form");

if (appointmentForm) {

    // Create notification container
    const notification = document.createElement("div");
    notification.className = "form-notification";
    appointmentForm.prepend(notification);

    function showMessage(type, message) {

        notification.className = "form-notification " + type;
        notification.innerHTML = message;
        notification.style.display = "block";

        notification.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

    function clearErrors() {

        notification.style.display = "none";

        appointmentForm.querySelectorAll("input, select, textarea").forEach(field => {

            field.classList.remove("error");

        });

    }

    appointmentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();

        const fullName = appointmentForm.querySelector('input[type="text"]');
        const email = appointmentForm.querySelector('input[type="email"]');
        const phone = appointmentForm.querySelector('input[type="tel"]');
        const date = appointmentForm.querySelector('input[type="date"]');
        const department = appointmentForm.querySelectorAll("select")[0];
        const doctor = appointmentForm.querySelectorAll("select")[1];
        const message = appointmentForm.querySelector("textarea");

        let valid = true;

        // Name
        if (fullName.value.trim().length < 3) {

            fullName.classList.add("error");
            valid = false;

        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value.trim())) {

            email.classList.add("error");
            valid = false;

        }

        // Phone
        const phoneRegex = /^[0-9+\-\s()]{8,15}$/;

        if (!phoneRegex.test(phone.value.trim())) {

            phone.classList.add("error");
            valid = false;

        }

        // Date
        const selectedDate = new Date(date.value);
        const today = new Date();

        today.setHours(0,0,0,0);

        if (!date.value || selectedDate < today) {

            date.classList.add("error");
            valid = false;

        }

        // Department
        if (department.selectedIndex === 0) {

            department.classList.add("error");
            valid = false;

        }

        // Doctor
        if (doctor.selectedIndex === 0) {

            doctor.classList.add("error");
            valid = false;

        }

        // Message
        if (message.value.trim().length < 15) {

            message.classList.add("error");
            valid = false;

        }

        if (!valid) {

            showMessage(
                "error",
                "<strong>Please correct the highlighted fields before submitting.</strong>"
            );

            return;

        }

        const submitBtn = appointmentForm.querySelector(".btn");

        submitBtn.disabled = true;

        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Booking Appointment...';

        setTimeout(() => {

            submitBtn.disabled = false;

            submitBtn.innerHTML = "Book Appointment";

            appointmentForm.reset();

            showMessage(
                "success",
                `
                <strong>Appointment Request Submitted!</strong><br><br>
                Thank you for choosing <b>FindBestSupport+</b>.<br>
                Your appointment request has been received successfully.<br><br>

                ✔ Our scheduling team will review your request.<br>
                ✔ You will receive a confirmation email shortly.<br>
                ✔ One of our representatives will contact you within 24 hours.
                `
            );

        }, 2200);

    });

}
    // ==============================
    // Contact Form
    // ==============================

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    const submitBtn = contactForm.querySelector(".submit-btn");
    const successModal = document.getElementById("successModal");
    const closeModal = document.getElementById("closeModal");

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        submitBtn.disabled = true;

        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(function(){

            contactForm.reset();

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                '<span>Send Message</span>';

            if(successModal){

                successModal.classList.add("show");

            }

        },1800);

    });

    if(closeModal){

        closeModal.addEventListener("click",function(){

            successModal.classList.remove("show");

        });

    }

}

window.addEventListener("click", function(e){

    if(e.target === successModal){

        successModal.classList.remove("show");

    }

});

    // ==============================
    // Smooth Scroll for Anchors
    // ==============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});