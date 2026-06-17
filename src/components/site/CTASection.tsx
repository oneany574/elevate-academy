import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-deep via-primary to-navy-deep p-10 text-ivory sm:p-16 lg:p-24"
        >
          {/* grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(var(--ivory) 1px, transparent 1px), linear-gradient(90deg, var(--ivory) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-primary/60 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">
              Ready when you are
            </p>
            <h2 className="text-display mt-5 text-balance text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Ready to start your <span className="italic text-accent">journey?</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">
              Apply for Autumn 2026, book a one-to-one counselling session, or
              download the full prospectus. We'll meet you wherever you are.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_40px_-5px_var(--gold)]"
              >
                Apply Now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:border-accent hover:text-accent"
              >
                <Calendar className="size-4" /> Book Counselling
              </Link>
              <button className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:border-accent hover:text-accent">
                <FileText className="size-4" /> Download Prospectus
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
