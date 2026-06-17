import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const linkCols = [
  {
    title: "Study",
    links: [
      { label: "Undergraduate", to: "/courses" },
      { label: "Postgraduate", to: "/courses" },
      { label: "Foundation", to: "/courses" },
      { label: "Admissions", to: "/admissions" },
    ],
  },
  {
    title: "College",
    links: [
      { label: "About", to: "/about" },
      { label: "Life at College", to: "/life" },
      { label: "Gallery", to: "/gallery" },
      { label: "News", to: "/news" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Counselling", to: "/contact" },
      { label: "Careers", to: "/about" },
      { label: "Library", to: "/about" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-deep px-5 pb-10 pt-20 text-ivory lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-md bg-accent text-accent-foreground">
                <span className="text-display text-base font-bold">C</span>
              </div>
              <div className="text-display text-2xl">Cambridge Heights</div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
              A premium independent college in the heart of the old quarter — preparing
              students for global careers since 1894.
            </p>
            <div className="mt-8 space-y-3 text-sm text-ivory/75">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                42 Trinity Lane, Cambridge Heights Campus
              </p>
              <p className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                +44 (0)20 7946 0000
              </p>
              <p className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                admissions@cambridgeheights.edu
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {linkCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-ivory/75 transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-display text-2xl">Stay in touch.</h4>
            <p className="mt-3 text-sm text-ivory/70">
              Updates from campus — open days, scholarships, student stories. No spam.
            </p>
            <form
              className="mt-6 flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 p-1.5 backdrop-blur"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent px-4 py-2 text-sm text-ivory outline-none placeholder:text-ivory/40"
              />
              <button
                aria-label="Subscribe"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>

            <div className="mt-8 flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-10 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-accent hover:text-accent"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-ivory/55">
          <p>© {new Date().getFullYear()} Cambridge Heights College. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
            <a href="#" className="hover:text-accent">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
