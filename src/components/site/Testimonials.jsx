import { usePortfolio } from "../../lib/portfolio-store";
import SafeImage from "./SafeImage";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const { data } = usePortfolio();

  return (
    <section className="section surface-soft">
      <div className="shell">
        <SectionHeading
          eyebrow="Demo Testimonials"
          title="Feedback (mock content)"
          description="These testimonials are demo placeholders included to show the section layout — they are not real client statements."
          align="center"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {data.testimonials.map((item) => (
            <li key={item.id} className="card-base card-hover flex flex-col p-6">
              <span className="chip chip-accent self-start">Demo</span>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{item.content}”
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                {item.image ? (
                  <SafeImage
                    src={item.image}
                    alt={`${item.name} portrait`}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-full bg-royal/10 text-sm font-bold text-royal"
                  >
                    {item.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
