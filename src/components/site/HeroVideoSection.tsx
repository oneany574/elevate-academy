import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, GraduationCap, Globe2, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroPoster from "@/assets/hero-campus.jpg";
import { SplitReveal } from "./RevealText";

// Royalty-free Pexels stock video — campus / students. Swap with your own URL anytime.
const HERO_VIDEO =
  "https://videos.pexels.com/video-files/8199646/8199646-uhd_2560_1440_25fps.mp4";

export function HeroVideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = document.getElementById("hero-bg") as HTMLVideoElement | null;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-navy-deep"
    >
      {/* Background video + poster */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={heroPoster}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          id="hero-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/50 to-navy-deep/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-40 lg:px-8 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-ivory/80 backdrop-blur"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          Applications open for Autumn 2026
        </motion.div>

        <h1 className="text-display max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-ivory sm:text-7xl lg:text-[6.5rem]">
          <SplitReveal text="Shape your future" delay={0.55} />
          <br />
          <span className="italic text-accent">
            <SplitReveal text="with a global" delay={0.95} />
          </span>{" "}
          <SplitReveal text="education." delay={1.35} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80"
        >
          World-class learning, international partnerships, and a vibrant student
          life — designed to prepare you for the work that matters next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Explore Courses
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:border-accent hover:text-accent"
          >
            Apply Now
          </Link>
        </motion.div>

        {/* Floating stats card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="mt-14 grid w-full max-w-3xl grid-cols-3 divide-x divide-ivory/15 overflow-hidden rounded-2xl border border-ivory/15 bg-ivory/5 backdrop-blur-md"
        >
          {[
            { Icon: Users, value: "8,400+", label: "Students" },
            { Icon: GraduationCap, value: "94%", label: "Graduate Employability" },
            { Icon: Globe2, value: "32", label: "Partner Universities" },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-5 sm:px-6">
              <Icon className="size-5 shrink-0 text-accent" />
              <div className="min-w-0">
                <div className="text-display text-2xl font-semibold text-ivory">
                  {value}
                </div>
                <div className="truncate text-[11px] uppercase tracking-[0.2em] text-ivory/70">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory/60"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="size-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
