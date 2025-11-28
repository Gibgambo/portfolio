// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // Hier kannst du ein Mobile Menu implementieren
        alert('Mobile Menu - Du kannst hier ein Dropdown-Menü implementieren');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe project cards and skill items
document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
});


document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("hobby-carousel");
  const slides = Array.from(carousel.querySelectorAll(".carousel-image"));
  const dotsContainer = document.getElementById("hobby-dots");

  if (!slides.length) return;

  // Konfiguration
  const INTERVAL_MS = 12000; // 12 Sekunden
  let index = 0;
  let timer = null;

  // Erzeuge Dots dynamisch
  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "w-3 h-3 rounded-full border border-slate-600 bg-slate-600/40 transition-transform transform hover:scale-110 focus:outline-none";
    btn.setAttribute("aria-label", `Slide ${i+1}`);
    btn.dataset.index = i;
    // keyboard accessibility
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setSlide(i);
      }
    });
    btn.addEventListener("click", () => setSlide(i));
    dotsContainer.appendChild(btn);
  });

  const dots = Array.from(dotsContainer.children);

  // Hilfsfunktion: aktiven Slide setzen
  function updateSlides() {
    slides.forEach((s, i) => {
      if (i === index) {
        s.classList.remove("opacity-0");
        s.classList.add("opacity-100");
        s.style.zIndex = 10;
      } else {
        s.classList.remove("opacity-100");
        s.classList.add("opacity-0");
        s.style.zIndex = 0;
      }
    });

    // Dots styling (aktiv anzeigen)
    dots.forEach((d, i) => {
      if (i === index) {
        d.classList.remove("bg-slate-600/40", "border-slate-600");
        d.classList.add("bg-indigo-400", "border-indigo-400", "scale-110");
        d.setAttribute("aria-current", "true");
      } else {
        d.classList.remove("bg-indigo-400", "border-indigo-400", "scale-110");
        d.classList.add("bg-slate-600/40", "border-slate-600");
        d.removeAttribute("aria-current");
      }
    });
  }

  // Setze Slide per Index und reset Timer
  function setSlide(i) {
    index = (i + slides.length) % slides.length;
    updateSlides();
    resetTimer();
  }

  // Auto-Advance
  function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlides();
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, INTERVAL_MS);
  }

  // Initialisieren: zeige ersten Slide und start Timer
  slides.forEach(s => {
    // Sicherstellen, dass alle slides absolute/inset-0 haben (falls CSS fehlt)
    s.style.position = "absolute";
    s.style.top = "0";
    s.style.left = "0";
    s.style.width = "100%";
    s.style.height = "100%";
    s.style.objectFit = "cover";
  });

  index = 0;
  updateSlides();
  resetTimer();

  // Optional: Pause on hover (für Desktop)
  carousel.addEventListener("mouseenter", () => {
    if (timer) clearInterval(timer);
  });
  carousel.addEventListener("mouseleave", () => {
    resetTimer();
  });

  // Optional: Touch swipe support (einfach)
  let startX = 0;
  let isTouching = false;
  carousel.addEventListener("touchstart", e => {
    isTouching = true;
    startX = e.touches[0].clientX;
    if (timer) clearInterval(timer);
  }, { passive: true });

  carousel.addEventListener("touchmove", e => {
    if (!isTouching) return;
    // (keine Live-Dragging-Animation, einfache Swipe-Erkennung)
  }, { passive: true });

  carousel.addEventListener("touchend", e => {
    isTouching = false;
    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
    const dx = endX - startX;
    const SWIPE_THRESHOLD = 40; // px
    if (dx > SWIPE_THRESHOLD) {
      // swipe right -> prev
      index = (index - 1 + slides.length) % slides.length;
      updateSlides();
    } else if (dx < -SWIPE_THRESHOLD) {
      // swipe left -> next
      index = (index + 1) % slides.length;
      updateSlides();
    }
    resetTimer();
  }, { passive: true });

});

// Log when page is loaded
console.log('Portfolio loaded successfully! 🚀');