import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import { courses } from "@/data/courses";
import { news } from "@/data/news";

const TABS = ["Courses", "News", "Blogs", "Events"] as const;
type Tab = (typeof TABS)[number];

export function SearchTabs() {
  const [tab, setTab] = useState<Tab>("Courses");
  const [q, setQ] = useState("");

  const results = (() => {
    const query = q.toLowerCase().trim();
    if (tab === "Courses") {
      const list = courses.filter((c) =>
        !query
          ? true
          : c.title.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query),
      );
      return list.slice(0, 4).map((c) => ({
        title: c.title,
        meta: `${c.level} · ${c.duration}`,
      }));
    }
    const typeMap: Record<Exclude<Tab, "Courses">, "news" | "blog" | "event"> = {
      News: "news",
      Blogs: "blog",
      Events: "event",
    };
    return news
      .filter((n) => n.type === typeMap[tab as Exclude<Tab, "Courses">])
      .filter((n) => (query ? n.title.toLowerCase().includes(query) : true))
      .slice(0, 4)
      .map((n) => ({ title: n.title, meta: `${n.category} · ${n.date}` }));
  })();

  return (
    <section className="relative z-20 -mt-20 px-5 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
        >
          <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 p-2">
            <span className="ml-3 mr-2 hidden text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:inline">
              I'm looking for
            </span>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  tab === t ? "text-primary-foreground" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="tab-pill"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${tab.toLowerCase()}…`}
              className="w-full bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground"
            />
          </div>
          <AnimatePresence mode="wait">
            {results.length > 0 && (
              <motion.ul
                key={tab + q}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="border-t border-border"
              >
                {results.map((r, i) => (
                  <li
                    key={i}
                    className="group flex cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-primary group-hover:text-accent-foreground">
                        {r.title}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">{r.meta}</p>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
