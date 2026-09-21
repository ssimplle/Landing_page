// Comutator tema dark/light, persistat in localStorage si sincronizat cu prefers-color-scheme.
const STORAGE_KEY = "portfolio-theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  applyTheme(getPreferredTheme());

  toggleBtn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
    if (localStorage.getItem(STORAGE_KEY)) return; // preferinta manuala are prioritate
    applyTheme(e.matches ? "light" : "dark");
  });
}
