import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";

type NavItem = { label: string; to: string; mega?: boolean };
const NAV: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses", mega: true },
  { label: "Admissions", to: "/admissions" },
  { label: "Life at College", to: "/life" },
  { label: "Gallery", to: "/gallery" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-border/60 py-3"
            : "border-b border-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary">
              <span className="text-display text-base font-bold text-primary-foreground">
                C
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={cn(
                  "text-display text-lg font-semibold tracking-tight",
                  scrolled ? "text-primary" : "text-ivory",
                )}
              >
                Cambridge Heights
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.3em]",
                  scrolled ? "text-muted-foreground" : "text-ivory/70",
                )}
              >
                College — est. 1894
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => item.mega && setMegaOpen(true)}
                onMouseLeave={() => item.mega && setMegaOpen(false)}
              >
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    scrolled
                      ? "text-foreground/80 hover:text-primary"
                      : "text-ivory/85 hover:text-ivory",
                  )}
                  activeProps={{ className: "text-accent" }}
                >
                  {item.label}
                  {item.mega && <ChevronDown className="size-3.5 opacity-60" />}
                </Link>
                {item.mega && (
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 mt-3 w-[640px] -translate-x-1/2 rounded-2xl border border-border bg-card p-6 shadow-elegant"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground/70">
                            Featured Programmes
                          </p>
                          <Link
                            to="/courses"
                            className="text-xs font-medium text-primary hover:text-accent"
                          >
                            View all courses →
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {courses.slice(0, 6).map((c) => (
                            <Link
                              key={c.slug}
                              to="/courses"
                              className="group rounded-lg p-3 transition-colors hover:bg-muted"
                            >
                              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                {c.level}
                              </p>
                              <p className="mt-1 text-sm font-medium text-primary group-hover:text-accent">
                                {c.title}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className={cn(
                "hidden h-10 w-10 items-center justify-center rounded-full border transition-colors sm:flex",
                scrolled
                  ? "border-border text-foreground hover:bg-muted"
                  : "border-ivory/25 text-ivory hover:bg-ivory/10",
              )}
            >
              <Search className="size-4" />
            </button>
            <Link
              to="/admissions"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Apply Now
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
                scrolled
                  ? "border border-border text-foreground"
                  : "border border-ivory/25 text-ivory",
              )}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary text-primary-foreground"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between px-5 py-5"
            >
              <span className="text-display text-lg">Cambridge Heights</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20"
              >
                <X className="size-5" />
              </button>
            </motion.div>
            <nav className="flex flex-col px-5 pt-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-ivory/10"
                >
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-display block py-5 text-4xl tracking-tight hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10"
              >
                <Link
                  to="/admissions"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-foreground"
                >
                  Apply Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
