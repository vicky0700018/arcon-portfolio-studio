export default function SectionHeading({ eyebrow, title, description, align = "left", tone = "light" }) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <span className={`eyebrow ${tone === "dark" ? "text-cyan" : "text-royal"}`}>
          <span aria-hidden="true">—</span>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`heading-lg mt-3 ${tone === "dark" ? "text-navy-foreground" : "text-foreground"}`}>{title}</h2>
      {description ? (
        <p className={`mt-4 text-base leading-relaxed ${tone === "dark" ? "text-navy-foreground/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
