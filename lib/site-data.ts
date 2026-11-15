/** Site content & editable config — update contact, images, and projects here. */

export const BASE_PATH = "/ath-website";
export const SITE_URL = "https://linamandresy.github.io/ath-website";

/**
 * Public asset path that respects GitHub Pages basePath.
 * Absolute http(s) URLs are left unchanged. Root-relative and relative
 * public paths are prefixed with `/ath-website`.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  if (path.startsWith(BASE_PATH + "/") || path === BASE_PATH) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

export const SITE_CONFIG = {
  images: {
    hero: "",
    about: "",
    cta: "",
    services: ["", "", "", ""] as string[],
  },
  contact: {
    whatsapp: "+1(416)732-9879",
    phone: "+1(416)732-9879",
    email: "mandresy.rabenandrasana@outlook.com",
    address: "24 Mansur Terrace, Toronto, ON M3J 3R1",
    facebook: "https://www.facebook.com/Baguyo",
  },
};

export type Project = {
  id: number;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  cover: string;
  images: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Maison familiale",
    location: "",
    category: "Maisons individuelles",
    year: "",
    description: "",
    cover: "",
    images: ["", "", ""],
  },
  {
    id: 2,
    title: "Villa contemporaine",
    location: "",
    category: "Villas",
    year: "",
    description: "",
    cover: "",
    images: ["", "", ""],
  },
  {
    id: 3,
    title: "Résidence",
    location: "",
    category: "Résidences",
    year: "",
    description: "",
    cover: "",
    images: ["", ""],
  },
  {
    id: 4,
    title: "Maison à étage",
    location: "",
    category: "Maisons individuelles",
    year: "",
    description: "",
    cover: "",
    images: ["", "", ""],
  },
  {
    id: 5,
    title: "Villa avec terrasse",
    location: "",
    category: "Villas",
    year: "",
    description: "",
    cover: "",
    images: ["", ""],
  },
  {
    id: 6,
    title: "Autre réalisation",
    location: "",
    category: "Autres réalisations",
    year: "",
    description: "",
    cover: "",
    images: [""],
  },
];

export const CATS = [
  "Tous les projets",
  "Maisons individuelles",
  "Villas",
  "Résidences",
  "Autres réalisations",
] as const;

export const SERVICES: [string, string][] = [
  [
    "Construction de maisons",
    "Nous réalisons des projets de construction résidentielle en accordant une attention particulière aux exigences techniques, à la qualité des matériaux et aux finitions.",
  ],
  [
    "Études et planification",
    "Nous accompagnons la préparation de votre projet en tenant compte de vos besoins, des contraintes techniques et des objectifs de réalisation.",
  ],
  [
    "Rénovation et extension",
    "Nous transformons et modernisons les habitations existantes afin de les adapter aux nouveaux besoins de leurs occupants.",
  ],
  [
    "Suivi et gestion de chantier",
    "Nous assurons un suivi rigoureux des travaux afin de veiller à la bonne exécution du projet à chaque étape.",
  ],
];

export const STEPS: [string, string][] = [
  [
    "Comprendre votre projet",
    "Nous échangeons avec vous afin de comprendre vos attentes, vos besoins et votre vision.",
  ],
  [
    "Étudier et planifier",
    "Nous préparons les éléments techniques et organisons les différentes étapes du projet.",
  ],
  [
    "Préparer le chantier",
    "Nous organisons les ressources et préparons le démarrage des travaux.",
  ],
  [
    "Construire et suivre",
    "Nous suivons l'avancement des travaux et veillons à la qualité de leur réalisation.",
  ],
  [
    "Livrer votre projet",
    "Nous finalisons les travaux et procédons à la livraison de votre habitation.",
  ],
];

export const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#entreprise", label: "L'entreprise" },
  { href: "#services", label: "Nos services" },
  { href: "#realisations", label: "Nos réalisations" },
  { href: "#approche", label: "Notre approche" },
] as const;

export const WHYS = [
  {
    n: "01",
    title: "Expertise en ingénierie",
    text: "Une approche technique et méthodique pour concevoir et réaliser des constructions adaptées à vos besoins.",
  },
  {
    n: "02",
    title: "Entreprise familiale",
    text: "Une relation de proximité et un engagement personnel dans chaque projet.",
  },
  {
    n: "03",
    title: "Approche personnalisée",
    text: "Chaque projet est unique. Nous prenons le temps de comprendre les attentes de nos clients.",
  },
  {
    n: "04",
    title: "Qualité d'exécution",
    text: "Une attention particulière portée aux détails, aux matériaux et aux différentes étapes de réalisation.",
  },
  {
    n: "05",
    title: "Accompagnement",
    text: "Un interlocuteur engagé pour accompagner votre projet tout au long de sa réalisation.",
  },
] as const;

export function digitsWhatsApp(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function isWhatsAppConfigured(raw: string): boolean {
  return /\d{6,}/.test(digitsWhatsApp(raw));
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "ATH Constructions",
  alternateName: "ATH Constructions Madagascar",
  description:
    "Entreprise familiale spécialisée dans la construction de maisons et l'ingénierie à Madagascar.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/logo.jpg`,
  image: `${SITE_URL}/assets/logo.jpg`,
  areaServed: {
    "@type": "Country",
    name: "Madagascar",
  },
  knowsAbout: [
    "Construction de maisons",
    "Études et planification",
    "Rénovation et extension",
    "Suivi et gestion de chantier",
  ],
  slogan: "Construction & Ingénierie",
};
