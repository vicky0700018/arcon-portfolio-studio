import { Link } from "@tanstack/react-router";
import { usePortfolio } from "../../lib/portfolio-store";
import SafeImage from "./SafeImage";

export default function Hero() {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
        <div>
          <span className="eyebrow rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1.5 text-cyan">
            {hero.badge}
          </span>
          <h1 className="heading-xl mt-6 text-navy-foreground">{hero.heading}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="btn btn-primary">
              {hero.primaryButton}
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              {hero.secondaryButton}
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.id} className="rounded-xl border border-navy-foreground/12 bg-navy-foreground/5 p-4">
                <dt className="text-xs font-semibold tracking-[0.1em] text-navy-foreground/60 uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 text-sm font-bold text-cyan">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl border border-navy-foreground/12" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl border border-navy-foreground/15 shadow-lift">
            <SafeImage
              src={hero.image}
              alt="Technology and web development banner for the Prospera Arcon portfolio"
              eager
              width={1280}
              height={800}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-navy-foreground/55">
            <span>React</span>
            <span aria-hidden="true">/</span>
            <span>Vite</span>
            <span aria-hidden="true">/</span>
            <span>Tailwind CSS</span>
            <span aria-hidden="true">/</span>
            <span>Responsive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
