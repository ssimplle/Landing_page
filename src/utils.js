// Utilitare mici, reutilizate in mai multe componente.

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = () =>
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

/** Genereaza atributul srcset pentru o imagine optimizata pe baza numelui de baza si latimilor disponibile. */
export function buildSrcset(base, widths, ext) {
  return widths.map((w) => `/assets/images/optimized/${base}-${w}.${ext} ${w}w`).join(", ");
}

/** Debounce simplu pentru evenimente frecvente (resize, scroll). */
export function debounce(fn, delay = 150) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/** Blocheaza focusul in interiorul unui element (folosit pentru modale). */
export function trapFocus(container) {
  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const focusable = qsa(focusableSelector, container);
  if (!focusable.length) return () => {};

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handleKeydown(e) {
    if (e.key !== "Tab") return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  container.addEventListener("keydown", handleKeydown);
  first.focus();

  return () => container.removeEventListener("keydown", handleKeydown);
}
