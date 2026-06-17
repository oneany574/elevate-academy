import { cn } from "@/lib/utils";
import { RevealText } from "./RevealText";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <RevealText
          as="div"
          className={cn(
            "mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]",
            invert ? "text-accent" : "text-accent-foreground/70",
          )}
        >
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </RevealText>
      )}
      <RevealText
        as="h2"
        delay={0.05}
        className={cn(
          "text-display text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl",
          invert ? "text-ivory" : "text-primary",
        )}
      >
        {title}
      </RevealText>
      {description && (
        <RevealText
          as="p"
          delay={0.15}
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed",
            align === "center" && "mx-auto",
            invert ? "text-ivory/75" : "text-muted-foreground",
          )}
        >
          {description}
        </RevealText>
      )}
    </div>
  );
}
