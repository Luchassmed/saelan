import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "../../../lib/projects";
import { notFound } from "next/navigation";

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="p-8 max-w-5xl mx-auto scroll-mt-16">
      <style>{`
  .project-layout { position: relative; min-height: calc(100vh - 4rem); }
  .project-image { width: 20rem; height: 20rem; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); object-fit: cover; }
  /* make the side panel the same height as the image so bottom alignment is predictable */
  .project-side { position: absolute; top: calc(50% - 10rem); left: calc(50% + 10rem + 1rem); width: 28rem; display: flex; flex-direction: column; justify-content: space-between; height: 20rem; }
  .project-meta { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; text-align: right; align-items: flex-end; }
        @media (min-width: 768px) {
          .project-image { width: 24rem; height: 24rem; }
          .project-side { top: calc(50% - 12rem); left: calc(50% + 12rem + 1rem); }
        }
        @media (max-width: 767px) {
          .project-image { position: static; width: 100%; height: auto; transform: none; margin: 0 auto; display: block; }
          .project-side { position: static; width: 100%; margin-top: 1rem; }
        }
      `}</style>

      <div className="project-layout">
        <h1 className="sr-only">{project.title}</h1>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-image rounded"
          />
        )}

        <div className="project-side">
          <div>
            <p className="text-sm text-gray-700">{project.description}</p>
          </div>

          <div className="project-meta text-sm text-gray-600">
            <div>
              <div className="text-xs uppercase tracking-wider">
                {project.title}
              </div>
              <div className="text-xs uppercase tracking-wider">
                ÅR.<em className="italic">YEAR</em>{" "}
                <span className="text-sm">{project.year}</span>
              </div>
              <div className="text-xs uppercase tracking-wider">
                HVOR.<em className="italic">WHERE</em>{" "}
                <span className="text-sm">{project.where}</span>
              </div>
              <div className="text-xs uppercase tracking-wider">
                HVEM.<em className="italic">WHO</em>{" "}
                <span className="text-sm">{project.who}</span>
              </div>
            </div>
          </div>
        </div>
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
