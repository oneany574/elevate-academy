import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-navy-deep px-5 py-28 text-ivory lg:px-8 lg:py-40">
      {/* animated background shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-12 size-96 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
        <div
          className="absolute -right-24 bottom-12 size-[28rem] rounded-full bg-primary/40 blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
              Student Voices
            </p>
            <h2 className="text-display mt-4 max-w-xl text-balance text-4xl leading-[1.05] sm:text-5xl">
              The proof is in our graduates.
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={prev}
              aria-label="Previous"
              className="grid size-12 place-items-center rounded-full border border-ivory/20 transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="grid size-12 place-items-center rounded-full border border-ivory/20 transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-10 lg:grid-cols-[280px_1fr]"
          >
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -right-4 -top-4 grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                <Quote className="size-5" />
              </div>
            </div>
            <div>
              <blockquote className="text-display text-balance text-3xl leading-snug text-ivory sm:text-4xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 border-t border-ivory/15 pt-6">
                <div className="text-display text-xl text-ivory">{t.name}</div>
                <div className="mt-1 text-sm text-ivory/70">
                  {t.course} — {t.year}
                </div>
              </figcaption>
            </div>
          </motion.figure>
        </AnimatePresence>

        <div className="mt-10 flex gap-2 sm:hidden">
          <button onClick={prev} className="grid size-11 place-items-center rounded-full border border-ivory/20">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={next} className="grid size-11 place-items-center rounded-full border border-ivory/20">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
