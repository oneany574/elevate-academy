import { motion } from "framer-motion";
import library from "@/assets/life-library.jpg";
import innovation from "@/assets/life-innovation.jpg";
import sports from "@/assets/life-sports.jpg";
import grad from "@/assets/life-graduation.jpg";
import { SectionHeading } from "./SectionHeading";

interface Cell {
  title: string;
  tag: string;
  image: string;
  className: string;
}

const cells: Cell[] = [
  { title: "Clubs & Communities", tag: "Belong", image: library, className: "lg:col-span-2 lg:row-span-2" },
  { title: "Sports & Wellness", tag: "Move", image: sports, className: "" },
  { title: "Career Opportunities", tag: "Launch", image: innovation, className: "" },
  { title: "Events & Activities", tag: "Live", image: grad, className: "lg:col-span-2" },
];

export function LifeBento() {
  return (
    <section className="px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Life at College"
          title="Four years that change you — not just your CV."
          description="A campus alive with sport, performance, service and serious play. This is where the friendships, the founders and the future versions of you are made."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
          {cells.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl ${c.className}`}
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-full min-h-[280px] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{c.tag}</p>
                <h3 className="text-display mt-2 text-2xl leading-tight text-ivory lg:text-3xl">
                  {c.title}
                </h3>
              </div>
              <div className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-ivory/30 bg-ivory/5 text-ivory opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                +
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
