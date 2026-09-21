// Incarcare si redare video controlate de vizibilitate (IntersectionObserver).
// Sursele reale sunt setate din data-src / data-src-webm doar cand elementul intra in viewport.
import { prefersReducedMotion } from "../utils.js";

function loadSources(video) {
  if (video.dataset.loaded === "true") return;
  const sources = video.querySelectorAll("source[data-src]");
  sources.forEach((source) => {
    source.src = source.dataset.src;
  });
  video.load();
  video.dataset.loaded = "true";
}

/**
 * Initializeaza un video cu incarcare + redare/pauza legate de vizibilitate.
 * @param {HTMLVideoElement} video
 * @param {{ autoplay?: boolean }} options
 */
export function observeLazyVideo(video, { autoplay = false } = {}) {
  if (!video) return;

  const reduced = prefersReducedMotion();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadSources(video);
          if (autoplay && !reduced) {
            video.play().catch(() => {});
          }
        } else if (autoplay) {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(video);
  return observer;
}

export function initLazyVideos() {
  document.querySelectorAll("video[data-lazy]").forEach((video) => {
    observeLazyVideo(video, { autoplay: video.hasAttribute("data-autoplay") });
  });
}
