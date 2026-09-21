// Anima titlul hero cu efect de reveal pe linii/cuvinte (split-text) folosind GSAP.
import gsap from "gsap";
import { qsa, prefersReducedMotion } from "../utils.js";

function splitIntoWords(line) {
  const text = line.textContent;
  line.textContent = "";
  text.split(" ").forEach((word, index, arr) => {
    const span = document.createElement("span");
    span.textContent = word + (index < arr.length - 1 ? "\u00A0" : "");
    line.appendChild(span);
  });
  return qsa("span", line);
}

export function initHero() {
  const lines = qsa(".hero__title .line");
  if (!lines.length) return;

  if (prefersReducedMotion()) return;

  const words = lines.flatMap(splitIntoWords);
  gsap.set(words, { yPercent: 110, opacity: 0 });
  gsap.to(words, {
    yPercent: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power4.out",
    stagger: 0.05,
    delay: 0.2,
  });

  gsap.from(".hero__status, .hero__subtitle, .hero__actions, .scroll-cue", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.12,
    delay: 0.6,
  });
}
