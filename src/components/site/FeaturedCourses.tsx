import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { courses, type Course } from "@/data/courses";
import { SectionHeading } from "./SectionHeading";
import { Link } from "@tanstack/react-router";

const CATS = ["All", "Computing", "Business", "Security", "Hospitality"] as const;

export function FeaturedCourses() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list: Course[] =
    cat === "All" ? courses : courses.filter((c) => c.category === cat);

  return (
    <section className="bg-primary px-5 py-28 text-ivory lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            invert
            eyebrow="Featured Courses"
            title="Programmes built for the next decade of work."
            description="Industry-validated curricula delivered with our UK university partners — across computing, business, security and design."
          />
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  cat === c
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-ivory/20 text-ivory/70 hover:border-accent hover:text-ivory"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => (
              <motion.article
                layout
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-ivory/10 bg-ivory/[0.03] transition-colors hover:border-accent/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory backdrop-blur">
                    {c.level}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
                    {c.awardingBody}
                  </p>
                  <h3 className="text-display mt-3 text-2xl leading-tight text-ivory">
                    {c.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ivory/70">
                    {c.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-5 text-sm">
                    <span className="text-ivory/60">{c.duration}</span>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-1.5 font-medium text-accent transition-transform hover:translate-x-0.5"
                    >
                      View Course
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
