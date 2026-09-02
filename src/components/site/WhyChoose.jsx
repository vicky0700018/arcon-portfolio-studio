import { usePortfolio } from "../../lib/portfolio-store";
import SectionHeading from "./SectionHeading";

export default function WhyChoose() {
  const { data } = usePortfolio();

  return (
    <section className="section bg-background">
      <div className="shell">
        <SectionHeading
          eyebrow="Why This Portfolio"
          title="Principles applied to every screen"
          align="center"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.whyChoose.map((item) => (
            <li key={item.id} className="card-base card-hover p-6">
              <span aria-hidden="true" className="text-xl text-cyan">
                {item.icon}
              </span>
              <h3 className="mt-3 text-base font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
