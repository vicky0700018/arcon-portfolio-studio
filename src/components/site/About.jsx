import { usePortfolio } from "../../lib/portfolio-store";
import SafeImage from "./SafeImage";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="section bg-background">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="dot-pattern absolute -top-5 -left-5 h-24 w-24 rounded-xl opacity-70" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
            <SafeImage
              src={about.image}
              alt="Developer workspace representing the portfolio's building process"
              width={1024}
              height={1024}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="card-base mt-[-2.5rem] ml-auto w-fit max-w-[75%] p-4 font-mono text-xs text-muted-foreground">
            <span className="text-royal">const</span> portfolio ={" "}
            <span className="text-accent-foreground">"living resume"</span>;
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="About" title={about.heading} description={about.description} />

          <ul className="mt-8 space-y-3">
            {about.highlights.map((highlight) => (
              <li key={highlight.id} className="flex gap-3 text-sm text-foreground">
                <span aria-hidden="true" className="mt-0.5 text-royal">
                  ▸
                </span>
                <span>{highlight.text}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.stats.map((stat) => (
              <div key={stat.id} className="rounded-xl surface-soft border border-border p-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold text-royal">{stat.value}</span>
                  <span className="mt-1 block text-xs font-semibold text-muted-foreground uppercase">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
