import { usePortfolio } from "../../lib/portfolio-store";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const { data } = usePortfolio();

  return (
    <section id="skills" className="section surface-soft scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Skills & Expertise"
          title="Capabilities behind every build"
          description="A focused frontend skill set applied across portfolios, dashboards and marketing sites."
          align="center"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.skills.map((skill, index) => (
            <li key={skill.id} className="card-base card-hover p-6">
              <span className="font-mono text-xs font-bold text-royal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-bold text-foreground">{skill.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
