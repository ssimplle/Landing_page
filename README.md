# Portofoliu Web Developer

Portofoliu single-page interactiv, construit cu **Vite + JavaScript vanilla (ES modules)** si **GSAP/ScrollTrigger** pentru animatii. Continutul (nume, proiecte, contact) este marcat cu placeholder-uri `[ASA]` pentru a fi inlocuit usor.

## Structura proiectului

```
├── index.html                  # Pagina principala (continut + placeholder-uri)
├── package.json
├── vite.config.js
├── scripts/
│   └── optimize-images.mjs     # Genereaza variante WebP/AVIF din imaginile sursa
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── images/             # Imagini sursa (.jpeg/.png) + /optimized (generate)
│       └── video/              # Fisiere video (.mp4)
└── src/
    ├── main.js                 # Punct de intrare, initializeaza toate componentele
    ├── utils.js                # Functii ajutatoare (qs, debounce, focus trap etc.)
    ├── data/
    │   └── projects.js         # Sursa unica de date pentru proiecte
    ├── styles/
    │   ├── main.css            # Importa toate fisierele de stil
    │   ├── theme.css           # Variabile CSS + tema dark/light
    │   ├── base.css             # Reset si stiluri de baza
    │   ├── components.css      # Navbar, hero, carduri, modal, formular etc.
    │   └── layout.css          # Breakpoint-uri responsive
    └── components/
        ├── theme.js             # Comutator tema (localStorage + prefers-color-scheme)
        ├── cursor.js            # Cursor personalizat (dezactivat pe touch)
        ├── navbar.js            # Navbar sticky, meniu mobil, link activ
        ├── scrollProgress.js    # Bara de progres a scroll-ului
        ├── hero.js              # Animatie split-text pentru headline
        ├── about.js             # Parallax portret + bare de skill animate
        ├── projects.js          # Randare grid, filtre, hover video, deschidere modal
        ├── modal.js             # Modal galerie (focus trap, Esc, sageti)
        ├── lazyVideo.js         # Incarcare/redare video controlata de vizibilitate
        └── reveal.js            # Reveal la scroll (GSAP ScrollTrigger)
```

## Comenzi

```bash
npm install        # instaleaza dependintele (prima data)
npm run dev        # server de dezvoltare cu reincarcare instant
npm run build      # build de productie in /dist
npm run preview    # previzualizeaza build-ul de productie local
npm run optimize-images  # regenereaza variantele WebP/AVIF dupa ce adaugi imagini noi
```

## 1. Inlocuirea continutului

Deschide [index.html](index.html) si cauta textele intre paranteze patrate (unele au fost deja completate cu date reale):

- `[NAME]` — numele tau (apare in navbar, hero, footer, meta tag-uri OG)
- `[TITLE]` — titlul tau (ex: "Dezvoltator Web Full-Stack Junior")
- `[SHORT BIO]` — o scurta descriere, folosita si in `<meta name="description">`
- Email, telefon si GitHub sunt deja completate in sectiunea Contact si Footer. LinkedIn nu este inca adaugat — vezi comentariile `<!-- LinkedIn: ... -->` din `index.html` pentru a-l adauga cand ai link-ul.

Actualizeaza si titlul paginii (`<title>`) si meta tag-urile Open Graph din `<head>`.

## 2. Adaugarea de imagini si video-uri noi

1. Pune fisierele originale (`.jpeg`/`.png` pentru imagini, `.mp4` pentru video) in `public/assets/images/` respectiv `public/assets/video/`.
2. Pentru imagini, ruleaza `npm run optimize-images` — se vor genera automat variante `.webp` si `.avif` la latimile 480/768/1200/1920px in `public/assets/images/optimized/`.
3. Refera imaginea in cod folosind structura `<picture>` existenta (vezi `src/components/projects.js` sau sectiunea "Despre mine" din `index.html`) — actualizeaza doar numele de baza al fisierului.
4. Pentru video, adauga si o varianta `.webm` daca ai un tool de conversie (ex. `ffmpeg`) pentru suport mai larg; momentan proiectul foloseste doar `.mp4`.
5. Video-urile sunt incarcate lazy (sursa reala e setata doar cand elementul intra in viewport) prin `data-src` in loc de `src` — respecta acest pattern la adaugarea de video-uri noi.

## 3. Adaugarea unui proiect nou

Deschide [src/data/projects.js](src/data/projects.js) si adauga un obiect nou in array-ul `projects`:

```js
{
  id: "proiect-nou",
  featured: false,               // true pentru cardul mare "Proiect Recomandat"
  title: "Titlul proiectului",
  category: "Frontend",          // trebuie sa fie una din CATEGORIES
  description: "Descriere scurta a proiectului.",
  tags: ["React", "REST API"],
  image: {
    base: "numele-fisierului-fara-extensie", // ex: daca fisierul e project-5.jpeg -> "project-5"
    width: 1408,                              // latimea reala a imaginii (pixelWidth)
    height: 768,                               // inaltimea reala a imaginii
    alt: "Text alternativ descriptiv",
  },
  video: null,                     // sau calea catre un video de preview (.mp4) pentru hover
  demoUrl: "#",                    // link real catre demo, sau "#" ca placeholder
  codeUrl: "#",                    // link real catre codul sursa (GitHub), sau "#"
}
```

Grid-ul, filtrele si modalul se genereaza automat din acest array — nu e nevoie sa editezi HTML.

## 4. Contact

Sectiunea de Contact afiseaza doar informatii directe (email, telefon, GitHub, LinkedIn) — fara formular, pentru ca nu necesita conectare la un backend. Daca vrei sa adaugi ulterior un formular conectat la Formspree/EmailJS, poti recrea structura in [index.html](index.html) si un modul similar celor din `src/components/`.

## 5. Deploy

### GitHub Pages

```bash
npm run build
```

Publica folderul `dist/` pe branch-ul `gh-pages` (manual sau cu o actiune GitHub), sau foloseste un pachet precum `gh-pages`:

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

Daca site-ul e publicat la `https://user.github.io/nume-repo/`, seteaza `base: "/nume-repo/"` in `vite.config.js` inainte de build.

### Netlify

1. Conecteaza repository-ul in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

Sau, pentru un deploy rapid fara Git: `npm run build` apoi trage folderul `dist/` in interfata Netlify (drag & drop).

## Accesibilitate si performanta

- Respecta `prefers-reduced-motion`: animatiile GSAP si autoplay-ul video sunt dezactivate, elementele apar direct vizibile.
- Cursorul personalizat este dezactivat automat pe dispozitive touch.
- Toate imaginile au `alt`, `width`/`height` (pentru a preveni layout shift) si `loading="lazy"` acolo unde nu sunt in prima vizualizare (above the fold).
- Navigarea este complet posibila de la tastatura (focus vizibil, modal cu focus trap, Esc/sageti in galerie).
