import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getProjectBySlug, getAllProjects } from "../../../lib/projects";
import { notFound } from "next/navigation";
import ImageCarousel from "../../../components/ImageCarousel";

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="fade-in p-8 mx-auto scroll-mt-16 overflow-visible">
      <style>{`
  .project-layout { position: relative; min-height: calc(100vh - 4rem); }
  .project-image { width: 20rem; height: 20rem; max-width: none; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); object-fit: cover; }
  /* make the side panel the same height as the image so bottom alignment is predictable */
  .project-side { position: absolute; top: calc(50% - 10rem); left: calc(50% + 10rem + 1rem); width: 28rem; display: flex; flex-direction: column; justify-content: space-between; height: 20rem; }
  .project-meta { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; text-align: right; align-items: flex-end; }
  /* fade-in animation for page transitions */
  .fade-in { opacity: 0; animation: fadeIn 200ms ease-out forwards; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (min-width: 768px) {
          .project-image { width: 24rem; height: 24rem; }
          .project-side { top: calc(50% - 12rem); left: calc(50% + 12rem + 1rem); }
        }
        @media (max-width: 767px) {
          .project-image { position: static; width: 100%; height: 20rem; transform: none; margin: 0 auto; display: block; }
          .project-side { position: static; width: 100%; margin-top: 1rem; }
        }
      `}</style>

      <div className="project-layout">
        <h1 className="sr-only">{project.title}</h1>

        <ImageCarousel images={project.images} alt={project.title} />

        <div className="project-side">
          <div>
            <div className="text-sm text-gray-700">
              {Array.isArray(project.description) ? (
                <BlocksRenderer content={project.description} />
              ) : (
                <p>{project.description}</p>
              )}
            </div>
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
    </main>
  );
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
