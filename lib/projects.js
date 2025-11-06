export const projects = [
  {
    slug: "a01",
    title: "A01",
    category: "architecture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna.",
    image: "/PH.jpg",
    year: "2025",
    where: "Copenhagen",
    who: "Oskar Sælan Halskov",
  },
  {
    slug: "i01",
    title: "I01",
    category: "illustration",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna.",
    image: "/PH.jpg",
    year: "2025",
    where: "London",
    who: "Oskar Sælan Halskov",
  },
  {
    slug: "o01",
    title: "O01",
    category: "other",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna.",
    image: "/PH.jpg",
    year: "2025",
    where: "Odense",
    who: "Oskar Sælan Halskov",
  },
  {
    slug: "a02",
    title: "A02",
    category: "architecture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna.",
    image: "/PH.jpg",
    year: "2025",
    where: "Odense",
    who: "Oskar Sælan Halskov",
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getProjectsByCategory(category) {
  return projects.filter((p) => p.category === category);
}
