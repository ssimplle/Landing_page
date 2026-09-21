// Modal galerie proiect: navigare cu tastatura (Esc, sageti), focus trap, click in afara pentru inchidere.
import { qs, trapFocus } from "../utils.js";

export function createProjectModal(projects) {
  const overlay = qs("#project-modal");
  const closeBtn = qs(".modal__close", overlay);
  const mediaWrap = qs(".modal__media", overlay);
  const titleEl = qs("#modal-title", overlay);
  const descEl = qs("#modal-description", overlay);
  const tagsEl = qs("#modal-tags", overlay);
  const demoLink = qs("#modal-demo", overlay);
  const codeLink = qs("#modal-code", overlay);

  let currentIndex = -1;
  let releaseFocusTrap = () => {};
  let lastFocusedElement = null;

  function render(index) {
    const project = projects[index];
    if (!project) return;

    mediaWrap.innerHTML = project.video
      ? `<video src="${project.video}" muted loop playsinline autoplay poster="/assets/images/${project.image.base}.jpeg"></video>`
      : `<img src="/assets/images/${project.image.base}.jpeg" alt="${project.image.alt}" width="${project.image.width}" height="${project.image.height}">`;

    titleEl.textContent = project.title;
    descEl.textContent = project.description;
    tagsEl.innerHTML = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    demoLink.href = project.demoUrl;
    codeLink.href = project.codeUrl;
  }

  function open(index) {
    currentIndex = index;
    lastFocusedElement = document.activeElement;
    render(index);
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    releaseFocusTrap = trapFocus(overlay);
  }

  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    releaseFocusTrap();
    qs("video", mediaWrap)?.pause();
    lastFocusedElement?.focus();
  }

  function showNext() {
    open((currentIndex + 1) % projects.length);
  }
  function showPrev() {
    open((currentIndex - 1 + projects.length) % projects.length);
  }

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  return { open, close };
}
