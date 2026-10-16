import type { ReactNode } from "react";
import { articleParagraphIds, locators, type Locator, type Source } from "@/lib/demo-data";

/**
 * Fake "page" renderers for a source at a cited location. Shared by the site demo
 * (components/Demo.tsx) and the Remotion product video (video/).
 */
export type ViewProps = { source: Source; loc: Locator | null };

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark className="bg-accent/25 px-0.5 text-ink [-webkit-box-decoration-break:clone] [box-decoration-break:clone] [box-shadow:inset_0_-2px_0_rgb(var(--color-accent))]">
      {children}
    </mark>
  );
}

export function VideoView({ source, loc }: ViewProps) {
  const progress = loc?.position ?? 0;
  return (
    <div>
      <div className="relative aspect-video overflow-hidden border border-line bg-[#0d0d10]">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
        {/* Chalkboard-ish frame contents */}
        <div
          aria-hidden
          className="absolute left-[8%] top-[14%] space-y-2 font-mono text-[clamp(0.55rem,1.4vw,0.85rem)] text-white/75"
        >
          <p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</p>
          <p className="text-white/50">glycolysis → Krebs → ETC</p>
          <p className="text-[#ff7a45]">ATP / glucose = ?</p>
        </div>
        <div aria-hidden className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center border border-white/30 bg-black/50">
            <svg viewBox="0 0 16 16" className="h-5 w-5 fill-white">
              <path d="M5 3l8 5-8 5z" />
            </svg>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-8">
          <div aria-hidden className="relative h-1 bg-white/25">
            <div
              className="absolute inset-y-0 left-0 bg-[#ff5a1f]"
              style={{ width: `${progress * 100}%` }}
            />
            {loc ? (
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 border-2 border-white bg-[#ff5a1f]"
                style={{ left: `${progress * 100}%` }}
              />
            ) : null}
          </div>
          <p className="mt-1.5 flex justify-between font-mono text-[0.68rem] text-white/80">
            <span>
              {loc ? loc.label : "0:00"} / {source.duration ?? "0:00"}
            </span>
            <span className="truncate pl-2">{source.title}</span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="eyebrow">Transcript{loc ? ` · ${loc.label}` : ""}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {loc ? (
            <Highlight>{loc.excerpt}</Highlight>
          ) : (
            "Select a citation to jump to the exact moment it supports."
          )}
        </p>
      </div>
    </div>
  );
}

export function PdfView({ source, loc }: ViewProps) {
  return (
    <div className="mx-auto max-w-[34rem] border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.68rem] text-muted">
        <span>{source.short}</span>
        <span>p.{loc?.position ?? 1} / 14</span>
      </div>
      <p className="mt-4 font-display text-base font-bold leading-snug">{source.title}</p>
      <Bars count={3} />
      <p className="mt-3 font-serif text-sm leading-relaxed text-muted">
        {loc ? (
          <>
            {loc.before} <Highlight>{loc.excerpt}</Highlight> {loc.after}
          </>
        ) : (
          "Abstract. We re-examine the stoichiometry of oxidative phosphorylation using recent measurements of proton leak and metabolite transport."
        )}
      </p>
      <Bars count={4} />
    </div>
  );
}

export function ArticleView({ source, loc }: ViewProps) {
  return (
    <article className="mx-auto max-w-[36rem]">
      <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
        bionotes.example · Biology
      </p>
      <h3 className="mt-2 font-display text-xl font-bold leading-tight">{source.title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
        <p className="flex gap-3">
          <span className="w-6 shrink-0 font-mono text-xs text-muted">¶1</span>
          <span>
            Ask ten students how much ATP one glucose makes and you&apos;ll get a handful of
            different answers.
          </span>
        </p>
        {articleParagraphIds.map((id) => {
          const p = locators[id];
          const isTarget = loc?.id === id;
          return (
            <p key={id} className="flex gap-3">
              <span
                className={`w-6 shrink-0 font-mono text-xs ${isTarget ? "text-accent-text" : "text-muted"}`}
              >
                {p.label}
              </span>
              <span>
                {p.before} {isTarget ? <Highlight>{p.excerpt}</Highlight> : p.excerpt} {p.after}
              </span>
            </p>
          );
        })}
      </div>
    </article>
  );
}

function Bars({ count }: { count: number }) {
  const widths = ["w-full", "w-11/12", "w-full", "w-4/5", "w-10/12", "w-2/3"];
  return (
    <div aria-hidden className="mt-3 space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`h-1.5 bg-line ${widths[i % widths.length]}`} />
      ))}
    </div>
  );
}
