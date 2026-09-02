import { usePortfolio } from "../../lib/portfolio-store";
import SectionHeading from "./SectionHeading";

export default function Services() {
  const { data } = usePortfolio();

  return (
    <section id="services" className="section bg-background scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Services"
          title="How this skill set is applied"
          description="Frontend-focused services, delivered with clean structure and responsive behaviour by default."
          align="center"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service) => (
            <li key={service.id} className="card-base card-hover p-6">
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-xl bg-royal/10 font-mono text-base font-bold text-royal"
              >
                {service.icon}
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
