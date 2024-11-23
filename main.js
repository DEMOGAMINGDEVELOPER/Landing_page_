let slidestoshow, arrowmark;

function setResponsiveValues() {
    if (window.matchMedia("(max-width: 920px)").matches) {
        slidestoshow = 1;
        arrowmark = false;
    } else {
        slidestoshow = 4;
        arrowmark = true;
    }
}

// Check if element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function handleScroll() {
    const elements = document.querySelectorAll('.fade-in-content');
    
    elements.forEach((el) => {
        // Check if the element is in the viewport
        if (isInViewport(el)) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible'); // Remove visible class when leaving the viewport
        }
    });

    // Update the header background color (transparent to black effect)
    const header = document.querySelector('.header');
    if (header) {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Calculate the opacity based on scroll position
        let opacity = currentScroll / 200; // Adjust the '200' value for faster/slower transitions
        if (opacity > 1) opacity = 1; // Max opacity of 1 (fully black)
        if (opacity < 0) opacity = 0; // Min opacity of 0 (fully transparent)

        // Apply the calculated opacity to the header background
        header.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }
}

// Trigger fade-in animation and header background color change on scroll and on load
window.addEventListener('scroll', handleScroll);

// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {

    // Preloader Logic
    window.addEventListener("load", function () {
        const preloader = document.getElementById("preloader");
        preloader.classList.add("loaded");
        // After preloader animation ends, remove it from the DOM
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add("loaded"); // Enable scrolling after preloader
        }, 1500); // Timeout should match the preloader animation duration
    });

    // Menu Toggle Logic for Mobile View
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Fade-in effect when scrolling
    const fadeInElements = document.querySelectorAll('.fade-in-content');

    function fadeInOnScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;

        fadeInElements.forEach((element) => {
            const elementTop = element.offsetTop;

            // Add the 'visible' class to trigger the fade-in effect when the element comes into view
            if (scrollPosition > elementTop) {
                element.classList.add("visible");
            }
        });
    }

    // Call fade-in effect initially in case the user starts scrolled down
    fadeInOnScroll();

    // Add event listener to trigger fade-in when user scrolls
    window.addEventListener("scroll", fadeInOnScroll);

    // Scroll to the top functionality when clicking on the logo
    const logo = document.querySelector(".logo img");
    if (logo) {
        logo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
