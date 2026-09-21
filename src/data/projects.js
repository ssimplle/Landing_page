// Sursa unica de date pentru proiecte. Adauga un obiect nou in array pentru a adauga un proiect in grid.
// Inlocuieste imaginile/video-urile din public/assets/ si actualizeaza caile de mai jos.
export const CATEGORIES = ["Toate", "Frontend", "Fullstack", "UI"];

export const projects = [
  {
    id: "epiata",
    featured: true,
    title: "ePiata",
    category: "Fullstack",
    description:
      "Platforma tip piata online, construita in PHP si MySQL, pentru listarea si gestionarea produselor.",
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    image: {
      base: "project-featured",
      width: 1408,
      height: 768,
      alt: "Previzualizare proiect: ePiata",
    },
    video: null,
    demoUrl: "#",
    codeUrl: "https://github.com/ssimplle/ePiata",
  },
  {
    id: "to-do",
    featured: false,
    title: "To_Do",
    category: "Fullstack",
    description: "Aplicatie de gestionare a sarcinilor, cu backend PHP/MySQL pentru salvarea si organizarea task-urilor.",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    image: {
      base: "project-1",
      width: 1408,
      height: 768,
      alt: "Previzualizare proiect: To_Do",
    },
    video: null,
    demoUrl: "#",
    codeUrl: "https://github.com/ssimplle/To_Do",
  },
  {
    id: "portofoliu",
    featured: false,
    title: "Portofoliu Web Developer",
    category: "Frontend",
    description: "Acest site — un portofoliu interactiv construit doar cu HTML, CSS si JavaScript.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: {
      base: "project-2",
      width: 1024,
      height: 1024,
      alt: "Previzualizare proiect: portofoliu web developer",
    },
    video: null,
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: "cars",
    featured: false,
    title: "Cars",
    category: "UI",
    description: "Catalog/galerie de masini cu carduri interactive si efecte de hover.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: {
      base: "project-3",
      width: 1024,
      height: 1024,
      alt: "Previzualizare proiect: galerie masini cu efecte hover",
    },
    video: null,
    demoUrl: "#",
    codeUrl: "#",
  },
];
