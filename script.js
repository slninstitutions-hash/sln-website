/* ===============================
   ULTRA PREMIUM INTERACTION ENGINE
================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ===============================
   HAMBURGER MENU
================================== */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
  body.classList.toggle("no-scroll");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("no-scroll");
  });
});


/* ===============================
   NAVBAR SCROLL EFFECT
================================== */

const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.style.padding = "5px 0";
      header.style.background = "rgba(7,21,42,0.95)";
      header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
    } else {
      header.style.padding = "0";
      header.style.background = "rgba(11,31,58,0.85)";
      header.style.boxShadow = "none";
    }
  });
}


/* ===============================
   HERO PARALLAX EFFECT
================================== */

const hero = document.querySelector(".hero");

if (hero) {
  window.addEventListener("scroll", () => {
    let offset = window.scrollY;
    hero.style.backgroundPositionY = offset * 0.5 + "px";
  });
}

/* ===============================
   PREMIUM COUNTER ANIMATION
================================== */

const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const duration = 2000;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 4);
    counter.innerText = Math.floor(easeOut * target);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      counter.innerText = target;
    }
  };

  requestAnimationFrame(animate);
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});


/* ===============================
   SCROLL REVEAL ANIMATION
================================== */

const revealElements = document.querySelectorAll(
  ".glass-card, .facility-item, .gallery-grid img, .testimonial-card"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = "all 0.8s ease";
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(60px)";
  revealObserver.observe(el);
});


/* ===============================
   STAGGER ANIMATION FOR SECTIONS
================================== */

const sections = document.querySelectorAll(".section");

sections.forEach(section => {
  const children = section.querySelectorAll(
    ".glass-card, .facility-item, .gallery-item, .testimonial-card, .principal-card"
  );

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        children.forEach((child, i) => {
          child.style.transition = "all 0.6s ease";
          child.style.transitionDelay = i * 0.1 + "s";
          child.style.opacity = 1;
          child.style.transform = "translateY(0)";
        });
      }
    });
  }, { threshold: 0.2 });

  children.forEach(child => {
    child.style.opacity = 0;
    child.style.transform = "translateY(50px)";
  });

  sectionObserver.observe(section);
});

/* ===============================
   ACTIVE NAV LINK HIGHLIGHT
================================== */

const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 100;

  navLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute("href"));

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.style.color = "#f5d77a";
    } else {
      link.style.color = "white";
    }
  });
});


/* ===============================
   FLOATING HERO STATS ANIMATION
================================== */

const statCards = document.querySelectorAll(".stat-card");

statCards.forEach((card, i) => {
  card.style.animation = `float 4s ease-in-out infinite`;
  card.style.animationDelay = `${i * 0.5}s`;
});


/* ===============================
   BUTTON RIPPLE EFFECT
================================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
  btn.addEventListener("click", function(e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    let rect = this.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/* ================= GALLERY SLIDER ================= */

const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

if (slides && images.length > 0 && dotsContainer) {

  let index = 0;
  let interval;

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => moveToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dots span");

  function moveToSlide(i) {
    index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    resetAutoSlide();
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      index = (index + 1) % images.length;
      slides.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }, 5000); 
  }

  function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
  }

  // Swipe support
  let startX = 0;

  slides.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  slides.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      index = (index + 1) % images.length;
    } else if (endX - startX > 50) {
      index = (index - 1 + images.length) % images.length;
    }

    moveToSlide(index);
  });

  startAutoSlide();
   }


/* ===============================
   SCROLL PROGRESS BAR
================================== */

const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.background = "linear-gradient(to right,#d4af37,#f5d77a)";
progressBar.style.zIndex = "9999";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  let docHeight = document.body.scrollHeight - window.innerHeight;
  let progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});

});
