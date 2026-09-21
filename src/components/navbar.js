// Navbar: hide/show la scroll, link activ prin IntersectionObserver, meniu mobil.
import { qs, qsa, prefersReducedMotion } from "../utils.js";

export function initNavbar() {
  const navbar = qs("#navbar");
  const toggleBtn = qs("#nav-toggle");
  const overlay = qs("#nav-overlay");
  const navLinks = qsa(".nav-link");
  const sections = qsa("main section[id]");
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  function onScroll() {
    const currentY = window.scrollY;
    navbar.classList.toggle("is-scrolled", currentY > 24);

    if (currentY > lastScrollY && currentY > 160) {
      navbar.classList.add("is-hidden");
    } else {
      navbar.classList.remove("is-hidden");
    }
    lastScrollY = currentY;
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Meniu mobil (hamburger + overlay animat)
  function closeMenu() {
    overlay?.classList.remove("is-open");
    toggleBtn?.classList.remove("is-open");
    toggleBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  toggleBtn?.addEventListener("click", () => {
    const isOpen = overlay?.classList.toggle("is-open");
    toggleBtn.classList.toggle("is-open", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(Boolean(isOpen)));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  qsa(".nav-overlay .nav-link").forEach((link) => link.addEventListener("click", closeMenu));
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Scroll linistit pentru linkurile interne
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    });
  });

  // Highlight link activ pe baza sectiunii vizibile
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }
}
