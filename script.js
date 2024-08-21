window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    if (window.scrollY > headerHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Handle the zoom effect
    const scrollTop = window.scrollY;
    const zoomFactor = 1 + scrollTop / 1000; // Adjust the divisor to control zoom speed

    const projects = document.querySelector('.projects');
    projects.style.backgroundSize = `${100 * zoomFactor}% ${100 * zoomFactor}%`;
});

// Counting animation
function animateCounts() {
    const counts = document.querySelectorAll('.count');
    const speed = 200; // Adjust speed as needed

    counts.forEach(count => {
        const updateCount = () => {
            const target = +count.getAttribute('data-count');
            const current = +count.innerText;
            const increment = target / speed;

            if (current < target) {
                count.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 20);
            } else {
                count.innerText = target;
            }
        };

        updateCount();
    });
}

// Trigger the animation when the stats section is in view
function handleScroll() {
    const statsSection = document.getElementById('stats');
    const statsSectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statsSectionTop < windowHeight) {
        animateCounts();
        window.removeEventListener('scroll', handleScroll);
    }
}

// Gradual loading effect for Why Choose Us section
function handleWhyChooseUsScroll() {
    const whyChooseUsSection = document.getElementById('why-choose-us');
    const sectionTop = whyChooseUsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 50) { // Trigger when the section is slightly in view
        whyChooseUsSection.classList.add('visible');
        window.removeEventListener('scroll', handleWhyChooseUsScroll);
    }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', handleWhyChooseUsScroll);

// Initialize scroll handlers
handleScroll();
handleWhyChooseUsScroll();

// slide
let slideIndex = 0;
let timer;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    const loadingBar = document.getElementById('loading-bar');

    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });

    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    loadingBar.style.animation = 'none';
    setTimeout(() => loadingBar.style.animation = '', 10);

    timer = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function plusSlides(n) {
    clearTimeout(timer);
    slideIndex += n - 1;
    if (slideIndex < 0) {
        slideIndex = document.querySelectorAll('.slide').length - 1;
    }
    showSlides();
}

document.addEventListener('DOMContentLoaded', showSlides);
