import { useMemo, useState } from "react";
import { usePortfolio } from "../../lib/portfolio-store";
import { projectCategories } from "../../lib/portfolio-data";
import SafeImage from "./SafeImage";
import SectionHeading from "./SectionHeading";

export default function Projects({ limit }) {
  const { data } = usePortfolio();
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    const list =
      filter === "All"
        ? data.projects
        : data.projects.filter((project) => project.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [data.projects, filter, limit]);

  return (
    <section id="projects" className="section surface-soft scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Projects & Portfolio"
          title="Selected work and concepts"
          description="Every card below is rendered from the portfolio's mock data layer and managed through the admin panel."
        />

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`btn btn-sm ${filter === category ? "btn-primary" : "btn-outline"}`}
            >
              {category}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <li key={project.id} className="card-base card-hover flex flex-col overflow-hidden">
                <div className="relative">
                  <SafeImage
                    src={project.image}
                    alt={`${project.title} preview`}
                    width={1024}
                    height={640}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  {project.featured ? (
                    <span className="chip chip-accent absolute top-3 left-3 bg-card">★ Featured</span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{project.category}</span>
                    <span className="chip">{project.status}</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-foreground">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {(project.technologies || []).map((tech) => (
                      <li key={tech} className="font-mono text-xs text-royal">
                        #{tech}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.url || "#"}
                    className="btn btn-outline btn-sm mt-5 self-start"
                    aria-label={`View project ${project.title}`}
                  >
                    View Project <span aria-hidden="true">→</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
