import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/about", hash: "skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Experience", to: "/about", hash: "experience" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 surface-dark border-b border-navy-foreground/10 transition-all duration-300 ${
        scrolled ? "shadow-lift" : ""
      }`}
    >
      <nav aria-label="Main navigation" className="shell">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-20"}`}>
          <Link to="/" className="flex items-center gap-2.5" aria-label="Prospera Arcon LLP home">
            <span className="grid size-9 place-items-center rounded-lg bg-royal font-mono text-sm font-bold text-primary-foreground">
              PA
            </span>
            <span className="text-base font-bold tracking-tight text-navy-foreground">Prospera Arcon LLP</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  className="rounded-md px-3 py-2 text-sm font-medium text-navy-foreground/75 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn btn-accent btn-sm hidden sm:inline-flex">
              Let's Talk
            </Link>
            <button
              type="button"
              className="btn btn-outline-light btn-sm lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="text-base leading-none">
                {open ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <ul id="mobile-nav" className="border-t border-navy-foreground/10 py-3 lg:hidden">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-navy-foreground/80 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-3 pt-2">
              <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-accent w-full">
                Let's Talk
              </Link>
            </li>
          </ul>
        ) : null}
      </nav>
    </header>
  );
}
