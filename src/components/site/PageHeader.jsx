export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="shell relative py-14 sm:py-20">
        <span className="eyebrow text-cyan">
          <span aria-hidden="true">—</span>
          {eyebrow}
        </span>
        <h1 className="heading-lg mt-3 max-w-3xl text-navy-foreground">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-foreground/70">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
