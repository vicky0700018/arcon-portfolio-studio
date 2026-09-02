import { usePortfolio } from "../../lib/portfolio-store";
import SectionHeading from "./SectionHeading";

export default function Technologies() {
  const { data } = usePortfolio();

  return (
    <section id="technologies" className="section bg-background scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Technologies"
          title="The toolkit in daily use"
          description="A deliberately small stack, used well — no unnecessary dependencies."
          align="center"
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.technologies.map((tech) => (
            <li key={tech.id} className="card-base card-hover p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-foreground">{tech.name}</h3>
                <span className="chip chip-accent">{tech.category}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tech.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
