/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc, i) => {
  mc.addEventListener("click", () => {
    modalViews[i].classList.remove("active-modal");
  });
});

// Close modal when clicking outside
modalViews.forEach((mv) => {
  mv.addEventListener("click", (e) => {
    if (e.target === mv) {
      mv.classList.remove("active-modal");
    }
  });
});

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  }
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 100,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 100,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title, services__button`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.testimonial__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer, footer__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

const texts = ["Software Developer", "Final Year Computer Science Student"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.home__education');

function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typewriterElement.innerHTML = `<span class="typewriter-text">${currentText.substring(0, charIndex - 1)}</span>`;
        charIndex--;
    } else {
        typewriterElement.innerHTML = `<span class="typewriter-text">${currentText.substring(0, charIndex + 1)}</span>`;
        charIndex++;
    }

    let typeSpeed = 150;

    if (isDeleting) {
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Remove blinking cursor when text is complete
        typewriterElement.innerHTML = `<span class="typewriter-text no-blink">${currentText}</span>`;
        typeSpeed = 1000; // Wait 1 second without blinking
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before typing next text
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start the animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000); // Start after 1 second
});

/*=============== WORK CARD FLIP ANIMATION ===============*/
// Handle work card flip animation
const workCards = document.querySelectorAll('.work__card');
const workExpandButtons = document.querySelectorAll('.work__expand-btn');
const workCloseButtons = document.querySelectorAll('.work__close-btn');

workExpandButtons.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = workCards[index];

    // Close all other flipped cards first
    workCards.forEach((otherCard, otherIndex) => {
      if (otherIndex !== index && otherCard.classList.contains('flipped')) {
        otherCard.classList.remove('flipped');
      }
    });

    // Flip the current card
    card.classList.add('flipped');
  });
});

workCloseButtons.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = workCards[index];
    card.classList.remove('flipped');
  });
});

// Close card when clicking outside the content area
workCards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    // Only close if clicking on the card itself (not on buttons or content)
    if (e.target === card || e.target.closest('.work__card-front')) {
      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
      }
    }
  });
});

// Close all cards when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    workCards.forEach(card => {
      card.classList.remove('flipped');
    });
  }
});

/*=============== ANIMATED COUNTERS ===============*/
function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

/*=============== LOADING SCREEN ===============*/
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const typedText = document.getElementById('typed-text');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    // Typing effect configuration
    const textToType = "Welcome to Jeffin's Portfolio";
    let charIndex = 0;
    let progressValue = 0;

    // Typing animation function
    function typeWriter() {
        if (charIndex < textToType.length) {
            typedText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); // Typing speed (faster)
        }
    }

    // Progress bar animation
    function updateProgress() {
        if (progressValue < 100) {
            progressValue += Math.random() * 15 + 5; // Random increment between 5-20
            if (progressValue > 100) progressValue = 100;

            progressFill.style.width = progressValue + '%';
            progressText.textContent = Math.round(progressValue) + '%';

            setTimeout(updateProgress, 80 + Math.random() * 100); // Random timing (faster)
        }
    }

    // Start animations
    setTimeout(() => {
        typeWriter();
    }, 200); // Start typing after logo animation (reduced from 500ms)

    setTimeout(() => {
        updateProgress();
    }, 400); // Start progress bar (reduced from 1000ms)

    // Hide loading screen after all animations complete
    setTimeout(() => {
        loadingScreen.classList.add('hide');

        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2500); // Show loading for 2.5 seconds (reduced from 4 seconds) to allow animations to complete
});

// Initialize animated counters
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    initFooter();
});

/*=============== FOOTER FUNCTIONALITY ===============*/
function initFooter() {
    // Set current year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Set last updated date
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        lastUpdatedElement.textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
    }


}



function showNewsletterMessage(message, type) {
    const messageDiv = document.getElementById('newsletter-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `footer__newsletter-message ${type}`;
    }
}

/*=============== CUSTOM CURSOR ===============*/
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

// Check if device has a mouse/trackpad and sufficient screen size
const isDesktop = () => window.matchMedia("(min-width: 992px) and (pointer: fine)").matches;

if (cursorDot && cursorOutline) {
    // Always track mouse movement, CSS controls visibility
    window.addEventListener("mousemove", function (e) {
        if (!isDesktop()) return;

        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth follow effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Click animation
    document.addEventListener("mousedown", () => {
        if (!isDesktop()) return;
        document.body.classList.add("clicking");
    });

    document.addEventListener("mouseup", () => {
        if (!isDesktop()) return;
        document.body.classList.remove("clicking");
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .button, .work__card, .services__card, .change-theme, .nav__link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isDesktop()) return;
            document.body.classList.add('hovering');
        });
        
        el.addEventListener('mouseleave', () => {
            if (!isDesktop()) return;
            document.body.classList.remove('hovering');
        });
    });
    
    // Hide custom cursor on inputs/textareas
    const inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isDesktop()) return;
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            if (!isDesktop()) return;
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    });
}

/*=============== SCROLL PROGRESS BAR ===============*/
window.addEventListener('scroll', () => {
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    
    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress}%`;
    }
});

/*=============== CERTIFICATE MODAL ===============*/
const certModal = document.getElementById("cert-modal");
const certImg = document.getElementById("cert-img");
const certCaption = document.getElementById("cert-caption");

function openCertModal(imageSrc, captionText) {
    certModal.style.display = "flex";
    // Add a small delay to allow display:flex to apply before adding opacity
    setTimeout(() => {
        certModal.classList.add("show");
    }, 10);
    certImg.src = imageSrc;
    certCaption.innerHTML = captionText;
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeCertModal() {
    certModal.classList.remove("show");
    setTimeout(() => {
        certModal.style.display = "none";
    }, 300); // Wait for transition to finish
    document.body.style.overflow = "auto"; // Enable scrolling again
}

// Close modal when clicking outside the image
window.addEventListener("click", (e) => {
    if (e.target === certModal) {
        closeCertModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal.style.display === "flex") {
        closeCertModal();
    }
});
