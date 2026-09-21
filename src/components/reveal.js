// Reveal la scroll pentru orice element cu [data-reveal], folosind GSAP + ScrollTrigger.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { qsa, prefersReducedMotion } from "../utils.js";

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal() {
  const items = qsa("[data-reveal]");
  if (!items.length) return;

  if (prefersReducedMotion()) {
    items.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
    return;
  }

  items.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: (index % 4) * 0.08,
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
}
