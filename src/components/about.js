// Sectiunea Despre mine: parallax subtil pe portret + umplere animata a barelor de skill.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { qs, qsa, prefersReducedMotion } from "../utils.js";

gsap.registerPlugin(ScrollTrigger);

export function initAbout() {
  const portrait = qs("#about-portrait");
  const bars = qsa(".skill-badge__bar span");

  if (portrait && !prefersReducedMotion()) {
    gsap.to(portrait, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: portrait,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  bars.forEach((bar) => {
    const target = bar.dataset.level || "0";
    if (prefersReducedMotion()) {
      bar.style.width = `${target}%`;
      return;
    }
    ScrollTrigger.create({
      trigger: bar,
      start: "top 90%",
      once: true,
      onEnter: () => {
        bar.style.width = `${target}%`;
      },
    });
  });
}
