// Simple project data and helpers for the projects list
export const projects = [
  {
    slug: "projekt-1",
    title: "Projekt 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna. Etiam dapibus turpis ut mauris congue tristique. Aliquam non ornare felis. In efficitur ligula ac sapien pharetra mollis. Morbi efficitur dolor ut feugiat scelerisque. Aenean eu feugiat eros. Cras non accumsan augue, vel cursus tellus. Pellentesque tempus lectus dignissim dui efficitur luctus. Nullam nec justo nisl. Ut commodo risus nulla. Fusce nulla enim, gravida ac mi scelerisque, feugiat dignissim elit. Maecenas ut ante in dui pretium commodo.",
    image: "/PH.jpg",
  },
  {
    slug: "projekt-2",
    title: "Projekt 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna. Etiam dapibus turpis ut mauris congue tristique. Aliquam non ornare felis. In efficitur ligula ac sapien pharetra mollis. Morbi efficitur dolor ut feugiat scelerisque. Aenean eu feugiat eros. Cras non accumsan augue, vel cursus tellus. Pellentesque tempus lectus dignissim dui efficitur luctus. Nullam nec justo nisl. Ut commodo risus nulla. Fusce nulla enim, gravida ac mi scelerisque, feugiat dignissim elit. Maecenas ut ante in dui pretium commodo.",
    image: "/PH.jpg",
  },
  {
    slug: "projekt-3",
    title: "Projekt 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in elementum dolor, semper tristique magna. Etiam dapibus turpis ut mauris congue tristique. Aliquam non ornare felis. In efficitur ligula ac sapien pharetra mollis. Morbi efficitur dolor ut feugiat scelerisque. Aenean eu feugiat eros. Cras non accumsan augue, vel cursus tellus. Pellentesque tempus lectus dignissim dui efficitur luctus. Nullam nec justo nisl. Ut commodo risus nulla. Fusce nulla enim, gravida ac mi scelerisque, feugiat dignissim elit. Maecenas ut ante in dui pretium commodo.",
    image: "/PH.jpg",
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}
