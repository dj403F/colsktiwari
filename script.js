// ---- Basic site data (edit these numbers) ----
const statsData = {
  wins: 12,
  years: 18,
  events: 65
};

// ---- Mobile nav toggle ----
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after selecting a link (mobile)
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- Animate counters ----
function animateCounter(el, to, duration = 900) {
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (to - start) * p);
    el.textContent = String(value).padStart(2, "0");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

animateCounter(document.getElementById("statWins"), statsData.wins);
animateCounter(document.getElementById("statYears"), statsData.years);
animateCounter(document.getElementById("statEvents"), statsData.events);

// ---- Current year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Gallery search/filter ----
const gallerySearch = document.getElementById("gallerySearch");
const clearSearch = document.getElementById("clearSearch");
const items = Array.from(document.querySelectorAll(".gallery__item"));

function filterGallery(q) {
  const query = q.trim().toLowerCase();
  items.forEach(item => {
    const tags = (item.getAttribute("data-tags") || "").toLowerCase();
    const caption = (item.querySelector("figcaption")?.textContent || "").toLowerCase();
    const match = !query || tags.includes(query) || caption.includes(query);
    item.classList.toggle("hidden", !match);
  });
}

if (gallerySearch) {
  gallerySearch.addEventListener("input", e => filterGallery(e.target.value));
}
if (clearSearch) {
  clearSearch.addEventListener("click", () => {
    gallerySearch.value = "";
    filterGallery("");
    gallerySearch.focus();
  });
}

// ---- Lightbox ----
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxOverlay = document.getElementById("lightboxOverlay");

function openLightbox(src, caption, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightboxCaption.textContent = caption || "";
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  // Clear src to stop loading if user closes quickly
  lightboxImg.src = "";
}

items.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption = item.querySelector("figcaption")?.textContent || "";
    openLightbox(img.src, caption, img.alt);
  });
});

[lightboxClose, lightboxOverlay].forEach(el => {
  if (el) el.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
});

// ---- Contact form (demo UI) ----
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Thanks! Your message is ready to be sent (enable Netlify Forms to make it live).";
    contactForm.reset();
  });
}
// ===== Hero Carousel =====
(function () {
  const carousel = document.getElementById("heroCarousel");
  const track = document.getElementById("heroCarouselTrack");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  const dotsWrap = document.getElementById("heroDots");

  if (!carousel || !track || !prevBtn || !nextBtn || !dotsWrap) return;

  const slides = Array.from(track.querySelectorAll(".hero-carousel__slide"));
  let index = 0;
  let timer = null;
  const AUTOPLAY_MS = 3500;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "hero-carousel__dot" + (i === 0 ? " is-active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".hero-carousel__dot"));

  function updateUI() {
    track.style.transform = `translateX(${-index * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  function goTo(i, userAction = false) {
    index = (i + slides.length) % slides.length;
    updateUI();
    if (userAction) restartAutoplay();
  }

  function next() { goTo(index + 1, true); }
  function prev() { goTo(index - 1, true); }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => {
      index = (index + 1) % slides.length;
      updateUI();
    }, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function restartAutoplay() {
    startAutoplay();
  }

  // Pause on hover/focus
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  // Keyboard support
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
  carousel.setAttribute("tabindex", "0");

  // Start
  updateUI();
  startAutoplay();
})();
// ===== Active menu highlighting on scroll =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".premium-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
