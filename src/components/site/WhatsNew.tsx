import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { news, type NewsItem } from "@/data/news";
import { SectionHeading } from "./SectionHeading";

const TABS = ["news", "blog", "event"] as const;
const LABELS: Record<(typeof TABS)[number], string> = {
  news: "News",
  blog: "Blogs",
  event: "Events",
};

export function WhatsNew() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("news");
  const list = news.filter((n) => n.type === tab);
  const featured = list.find((n) => n.featured) ?? list[0];
  const rest = list.filter((n) => n !== featured).slice(0, 3);

  return (
    <section className="px-5 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What's new"
            title="Stories, voices and moments from the campus."
          />
          <div className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-14 grid gap-6 lg:grid-cols-5"
          >
            {featured && <FeaturedCard item={featured} />}
            <div className="flex flex-col gap-4 lg:col-span-2">
              {rest.map((item) => (
                <SideCard key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card lg:col-span-3">
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7 text-ivory lg:p-10">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span>{item.category}</span>
            <span className="h-px w-6 bg-accent/60" />
            <span className="text-ivory/70">{item.date}</span>
          </div>
          <h3 className="text-display mt-4 text-3xl leading-tight text-ivory lg:text-4xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-ivory/75">{item.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            Read more <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

function SideCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex items-stretch gap-4 overflow-hidden rounded-2xl border border-border bg-card p-3 transition-all hover:border-accent hover:shadow-card">
      <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center pr-2">
        <p className="text-[10px] uppercase tracking-[0.22em] text-accent-foreground/70">
          {item.category} · {item.date}
        </p>
        <h4 className="mt-1.5 line-clamp-2 font-medium leading-snug text-primary transition-colors group-hover:text-accent-foreground">
          {item.title}
        </h4>
      </div>
    </article>
  );
}
