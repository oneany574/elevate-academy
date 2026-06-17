import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plane, Briefcase, Award, BookOpen, Building2, Repeat } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { Icon: Plane, title: "International Mobility", text: "Semester or full-year exchanges at 32 partner universities." },
  { Icon: Briefcase, title: "Work in the UK", text: "Two-year graduate work visa pathway via partner degrees." },
  { Icon: Award, title: "Global Accreditation", text: "Degrees recognised by UK QAA, AACSB and EU regulators." },
  { Icon: BookOpen, title: "Semester Abroad", text: "Subsidised study terms in London, Sydney and Singapore." },
  { Icon: Building2, title: "Partner Universities", text: "Direct dual-degree routes with UWE, Keele and Leeds Beckett." },
  { Icon: Repeat, title: "Exchange Programme", text: "Welcoming inbound students from 40+ countries each year." },
];

export function GlobalExperience() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".global-card");
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-muted px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Global Experience"
          title="Your campus stretches across four continents."
          description="A Cambridge Heights degree is built to travel. From semester exchanges to dual qualifications, your global pathway is part of the curriculum — not an afterthought."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="global-card group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-card"
            >
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Global
                </span>
              </div>
              <h3 className="text-display mt-6 text-2xl text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
