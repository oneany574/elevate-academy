import { motion } from "framer-motion";
import { features } from "@/data/features";
import { SectionHeading } from "./SectionHeading";

export function MoreThanCollege() {
  return (
    <section className="relative px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="More than a college"
          title="A campus built around how students actually learn — and live."
          description="Six anchors of student life. Each one designed not as an add-on, but as part of how a Cambridge Heights education works."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-card"
            >
              <div className="absolute -right-12 -top-12 size-44 rounded-full bg-gradient-to-br from-accent/0 to-accent/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 grid size-12 place-items-center rounded-xl border border-border bg-muted transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <f.Icon className="size-5" />
                </div>
                <h3 className="text-display text-2xl text-primary">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-foreground/70 transition-colors group-hover:text-accent">
                  <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
                  Learn more
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
