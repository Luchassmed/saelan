// Simple project data and helpers for the projects list
export const projects = [
  {
    slug: "projekt-1",
    title: "Projekt 1",
    category: "architecture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna.",
    image: "/PH.jpg",
  },
  {
    slug: "projekt-2",
    title: "Projekt 2",
    category: "illustration",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna.",
    image: "/PH.jpg",
  },
  {
    slug: "projekt-3",
    title: "Projekt 3",
    category: "other",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna.",
    image: "/PH.jpg",
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
