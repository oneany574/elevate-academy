import { partners } from "@/data/partners";

export function PartnerMarquee() {
  const loop = [...partners, ...partners];
  return (
    <section className="border-y border-border bg-background py-14">
      <div className="mx-auto mb-8 max-w-7xl px-5 lg:px-8">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Partner Universities & Awarding Bodies
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-14 px-5">
          {loop.map((p, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-3 opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
            >
              <div className="grid size-10 place-items-center rounded-full border border-border bg-muted text-xs font-bold text-primary">
                {p.short.charAt(0)}
              </div>
              <span className="text-display text-lg font-medium tracking-tight text-primary">
                {p.short}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
