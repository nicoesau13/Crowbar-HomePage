import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({ id, eyebrow, title, intro, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-prose text-center" : "max-w-prose"}>
      <p className={`eyebrow flex items-center gap-2 ${centered ? "justify-center" : ""}`}>
        <span aria-hidden className="inline-block h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-balance font-display text-display-lg font-bold">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{intro}</p>
      ) : null}
    </Reveal>
  );
}
