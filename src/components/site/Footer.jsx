import { Link } from "@tanstack/react-router";
import { usePortfolio } from "../../lib/portfolio-store";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const { data } = usePortfolio();
  const { contact, settings } = data;

  return (
    <footer className="surface-dark">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="grid size-10 place-items-center rounded-lg bg-royal font-mono text-sm font-bold text-primary-foreground">
            PA
          </span>
          <h2 className="mt-4 text-lg font-bold text-navy-foreground">{contact.businessName}</h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-foreground/65">
            A demo technical portfolio presenting modern frontend development, responsive interfaces and clean
            component architecture.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-sm font-semibold tracking-[0.14em] text-navy-foreground uppercase">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-navy-foreground/65 transition-colors hover:text-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.14em] text-navy-foreground uppercase">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/65">
            <li>{contact.address}</li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-cyan">
                {contact.phone}
              </a>
            </li>
            <li>{contact.email}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.14em] text-navy-foreground uppercase">Follow</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {contact.socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  className="inline-flex rounded-md border border-navy-foreground/20 px-3 py-1.5 text-xs font-semibold text-navy-foreground/75 transition-colors hover:border-cyan hover:text-cyan"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <Link to="/admin/login" className="btn btn-outline-light btn-sm mt-6">
            Admin Login
          </Link>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-navy-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{settings.copyright}</p>
          <p>Demo portfolio • Mock data only • No backend</p>
        </div>
      </div>
    </footer>
  );
}
