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
/* ===== Hero Carousel ===== */
.hero-carousel{
  position: relative;
  width: 100%;
  height: 380px;            /* matches your previous hero__img height */
  overflow: hidden;
  border-radius: var(--radius);
  background: rgba(255,255,255,.03);
}

.hero-carousel__track{
  display: flex;
  height: 100%;
  transition: transform 500ms ease;
  will-change: transform;
}

.hero-carousel__slide{
  min-width: 100%;
  height: 100%;
  position: relative;
}

.hero-carousel__slide img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Buttons */
.hero-carousel__btn{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(11,18,32,.55);
  color: var(--text);
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
  backdrop-filter: blur(10px);
}
.hero-carousel__btn:hover{ filter: brightness(1.08); }
.hero-carousel__btn--prev{ left: 10px; }
.hero-carousel__btn--next{ right: 10px; }

/* Dots */
.hero-carousel__dots{
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(11,18,32,.45);
  border: 1px solid var(--line);
  backdrop-filter: blur(10px);
}
.hero-carousel__dot{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.35);
  background: rgba(255,255,255,.22);
  cursor: pointer;
}
.hero-carousel__dot.is-active{
  background: var(--accent);
  border-color: rgba(53,208,166,.8);
}

/* Responsive height */
@media (max-width: 920px){
  .hero-carousel{ height: 320px; }
}
