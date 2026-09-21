// Punct de intrare al aplicatiei: importa stilurile si initializeaza toate componentele.
import "./styles/main.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initTheme } from "./components/theme.js";
import { initCursor } from "./components/cursor.js";
import { initNavbar } from "./components/navbar.js";
import { initScrollProgress } from "./components/scrollProgress.js";
import { initHero } from "./components/hero.js";
import { initAbout } from "./components/about.js";
import { initProjects } from "./components/projects.js";
import { initScrollReveal } from "./components/reveal.js";
import { initLazyVideos } from "./components/lazyVideo.js";
import { prefersReducedMotion } from "./utils.js";

gsap.registerPlugin(ScrollTrigger);

if (prefersReducedMotion()) {
  document.documentElement.classList.add("reduced-motion");
}

initTheme();
initCursor();
initNavbar();
initScrollProgress();
initHero();
initAbout();
initProjects();
initLazyVideos();
initScrollReveal();

// Recalculeaza pozitiile ScrollTrigger dupa ce continutul dinamic (proiecte) e randat.
window.addEventListener("load", () => ScrollTrigger.refresh());
