import Link from "next/link";
import { getAllProjects } from "../../lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Projekter</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block no-underline"
            >
              <div className="font-semibold text-lg">{project.title}</div>
              <p className="text-sm text-gray-600 mt-1">
                {project.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}
