// Grid de proiecte: randare din date, filtrare animata, previzualizare video la hover, deschidere modal.
import gsap from "gsap";
import { projects, CATEGORIES } from "../data/projects.js";
import { qs, qsa, buildSrcset, isTouchDevice } from "../utils.js";
import { createProjectModal } from "./modal.js";
import { observeLazyVideo } from "./lazyVideo.js";

const IMAGE_WIDTHS = [480, 768, 1200, 1920];

function pictureMarkup(image) {
  const widths = IMAGE_WIDTHS.filter((w) => w <= image.width);
  return `
    <picture>
      <source type="image/avif" srcset="${buildSrcset(image.base, widths, "avif")}" sizes="(min-width: 900px) 33vw, 100vw">
      <source type="image/webp" srcset="${buildSrcset(image.base, widths, "webp")}" sizes="(min-width: 900px) 33vw, 100vw">
      <img
        src="/assets/images/${image.base}.jpeg"
        alt="${image.alt}"
        width="${image.width}"
        height="${image.height}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

function cardMarkup(project, index) {
  const videoMarkup = project.video
    ? `<video data-lazy muted loop playsinline preload="metadata">
         <source data-src="${project.video}" type="video/mp4">
       </video>`
    : "";

  return `
    <article class="project-card${project.featured ? " project-card--featured" : ""}"
      data-category="${project.category}" data-index="${index}" tabindex="0" role="button"
      aria-label="Deschide detalii pentru ${project.title}">
      <div class="project-card__media">
        ${pictureMarkup(project.image)}
        ${videoMarkup}
        <div class="project-card__overlay">
          <h3>${project.title}</h3>
          <div class="tags">${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        </div>
      </div>
      <div class="project-card__body">
        ${project.featured ? '<span class="project-card__badge">Proiect Recomandat</span>' : ""}
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
    </article>`;
}

function filtersMarkup() {
  return CATEGORIES.map(
    (category, i) =>
      `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-category="${category}" type="button">${category}</button>`
  ).join("");
}

export function initProjects() {
  const grid = qs("#projects-grid");
  const filtersWrap = qs("#projects-filters");
  if (!grid) return;

  grid.innerHTML = projects.map(cardMarkup).join("");
  if (filtersWrap) filtersWrap.innerHTML = filtersMarkup();

  const cards = qsa(".project-card", grid);
  const modal = createProjectModal(projects);

  // Preview video la hover (doar pe dispozitive non-touch, incarcat lazy)
  if (!isTouchDevice()) {
    cards.forEach((card) => {
      const video = qs("video[data-lazy]", card);
      if (!video) return;
      const observer = observeLazyVideo(video, { autoplay: false });
      card.addEventListener("mouseenter", () => {
        if (video.dataset.loaded === "true") {
          video.play().catch(() => {});
          video.classList.add("is-ready");
        }
      });
      card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
      card.addEventListener("mouseover", () => observer && video.dataset.loaded === "true" && video.classList.add("is-ready"));
    });
  }

  // Deschidere modal la click / Enter
  cards.forEach((card) => {
    const index = Number(card.dataset.index);
    card.addEventListener("click", () => modal.open(index));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        modal.open(index);
      }
    });
  });

  // Filtrare animata pe categorie
  qsa(".filter-btn", filtersWrap).forEach((btn) => {
    btn.addEventListener("click", () => {
      qsa(".filter-btn", filtersWrap).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const category = btn.dataset.category;

      cards.forEach((card) => {
        const matches = category === "Toate" || card.dataset.category === category;
        if (matches) {
          card.classList.remove("is-hidden");
          gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(card, {
            opacity: 0,
            y: 16,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => card.classList.add("is-hidden"),
          });
        }
      });
    });
  });
}
