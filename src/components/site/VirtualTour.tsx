import { motion } from "framer-motion";
import { Play, MapPin } from "lucide-react";
import tour from "@/assets/virtual-tour.jpg";

export function VirtualTour() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2rem] bg-navy-deep"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <motion.img
              src={tour}
              alt="Virtual tour of campus"
              loading="lazy"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-navy-deep/40" />

            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute left-[12%] top-[32%] hidden items-center gap-2 rounded-full bg-ivory/95 px-3 py-1.5 text-xs font-medium text-primary shadow-card backdrop-blur md:inline-flex"
            >
              <MapPin className="size-3 text-accent" /> Library Quad
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute right-[18%] top-[55%] hidden items-center gap-2 rounded-full bg-ivory/95 px-3 py-1.5 text-xs font-medium text-primary shadow-card backdrop-blur md:inline-flex"
            >
              <MapPin className="size-3 text-accent" /> Innovation Centre
            </motion.div>

            {/* Play button */}
            <div className="absolute inset-0 grid place-items-center">
              <button className="group relative grid size-20 place-items-center rounded-full bg-accent text-accent-foreground shadow-elegant transition-transform hover:scale-110 sm:size-24">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                <Play className="relative ml-1 size-7 fill-current" />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 lg:p-10">
              <div className="max-w-xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                  Virtual Campus Tour
                </p>
                <h2 className="text-display mt-3 text-3xl leading-tight text-ivory sm:text-5xl">
                  Walk the campus from wherever you are.
                </h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-ivory/30 bg-ivory/10 px-6 py-3 text-sm font-medium text-ivory backdrop-blur transition-colors hover:border-accent hover:text-accent">
                Start Virtual Tour
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
