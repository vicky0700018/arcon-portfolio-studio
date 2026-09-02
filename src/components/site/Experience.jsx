import { usePortfolio } from "../../lib/portfolio-store";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="section surface-dark scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="My Digital Journey"
          description="A short timeline of how this practice has developed, year by year."
          tone="dark"
        />
        <ol className="mt-12 space-y-6 border-l border-navy-foreground/15 pl-6 sm:pl-8">
          {data.experience.map((entry) => (
            <li key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full bg-cyan sm:-left-[2.4rem]"
              />
              <span className="font-mono text-sm font-bold text-cyan">{entry.year}</span>
              <h3 className="mt-1 text-lg font-bold text-navy-foreground">{entry.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-foreground/70">{entry.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
