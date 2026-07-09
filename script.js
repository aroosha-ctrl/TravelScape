// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ===========================
// FILTER GALLERY
// ===========================

const filterButtons = document.querySelectorAll(".filter-buttons button");
const galleryItems = document.querySelectorAll(".gallery-item");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        galleryItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "scale(.9)";
            setTimeout(() => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.style.display = "";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 100);
                } else {
                    item.style.display = "none";
                }
            }, 250);
        });
    });
});


// ===========================
// LIGHTBOX
// ===========================

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const images = document.querySelectorAll(".gallery-item img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxLocation = document.getElementById("lightbox-location");
const imageCounter = document.getElementById("image-counter");
const downloadBtn = document.getElementById("download-btn");
let currentIndex = 0;
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});
function showImage() {
    const image = images[currentIndex];
    const card = image.closest(".gallery-item");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = card.dataset.title;
    lightboxLocation.textContent = card.dataset.location;
    imageCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    downloadBtn.href = image.src;
}
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
});
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
});
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeBtn.click();
    }
});


// ===========================
// FAVORITE BUTTON
// ===========================

document.querySelectorAll(".favorite").forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        const icon = button.querySelector("i");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
        if (icon.classList.contains("fa-solid")) {
            button.style.color = "#ff4d6d";
        } else {
            button.style.color = "#fff";
        }
    });
});


// ===========================
// PAGE LOADER
// ===========================

const loader = document.getElementById("loader");
window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 1000);
});


// ===========================
// ANIMATED COUNTERS
// ===========================

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            let current = 0;
            const updateCounter = () => {
                const increment = Math.max(1, Math.ceil(target / 100));
                current += increment;
                if (current < target) {
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + "+";
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});
counters.forEach(counter => {
    counterObserver.observe(counter);
});


// ===========================
// DARK MODE
// ===========================

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        localStorage.setItem("theme", "light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
});


// ===========================
// MOBILE MENU
// ===========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuIcon = menuToggle.querySelector("i");
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }
});
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    });
});