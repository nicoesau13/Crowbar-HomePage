import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { features } from "@/lib/content";

type FeatureKey = (typeof features)[number]["key"];

function FeatureIcon({ name }: { name: FeatureKey }) {
  const common = {
    viewBox: "0 0 32 32",
    className: "h-8 w-8",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true,
  } as const;
  switch (name) {
    case "cite":
      return (
        <svg {...common}>
          <path d="M4 8h24M4 14h16M4 20h20" />
          <rect x="21" y="11" width="9" height="6" className="stroke-accent" />
          <path d="M25.5 17v6l-3 3" className="stroke-accent" />
        </svg>
      );
    case "panel":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="26" height="22" />
          <path d="M3 10h26" />
          <rect x="19" y="10" width="10" height="17" className="fill-accent/20 stroke-accent" />
        </svg>
      );
    case "students":
      return (
        <svg {...common}>
          <path d="M3 12l13-6 13 6-13 6z" />
          <path d="M9 15v7c2 2 4.5 3 7 3s5-1 7-3v-7" />
          <path d="M27 13v8" className="stroke-accent" />
        </svg>
      );
  }
}

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="border-b border-line py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="features-title"
          eyebrow="Features"
          title="Built to be checked, not just believed"
        />

        {/* 3 cards: stacked on mobile, one row from md. */}
        <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.key} className="bg-bg">
              <Reveal
                delay={i * 0.06}
                className="group flex h-full flex-col p-6 transition-colors hover:bg-surface sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="text-ink">
                    <FeatureIcon name={f.key} />
                  </span>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-bold leading-tight">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
