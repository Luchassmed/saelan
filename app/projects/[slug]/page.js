import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "../../../lib/projects";
import { notFound } from "next/navigation";

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{project.description}</p>
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="mb-4 w-full object-cover rounded"
        />
      )}

      <div className="prose">
        <p>
          Bare en placeholder side for projekt: <strong>{project.title}</strong>
          .
        </p>
      </div>

      <div className="mt-6">
        <Link href="/" className="hover:underline">
          ← Back
        </Link>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}
