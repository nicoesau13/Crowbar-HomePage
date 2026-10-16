"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { CitationChip } from "@/components/ui/CitationChip";
import { LogoMark } from "@/components/ui/Logo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceIcon } from "@/components/ui/SourceIcon";
import {
  citationLabel,
  getSource,
  locators,
  questions,
  sources,
  type Locator,
  type Source,
} from "@/lib/demo-data";

const CHARS_PER_TICK = 3;
const TICK_MS = 22;

function toSeconds(stamp: string): number {
  const [mm, ss] = stamp.split(":").map(Number);
  return mm * 60 + ss;
}

function addressFor(source: Source, loc: Locator | null): string {
  if (!loc) return source.address;
  if (source.kind === "video") return `${source.address}&t=${toSeconds(loc.label)}s`;
  if (source.kind === "pdf") return `${source.address}#page=${loc.position}`;
  return `${source.address}#p${loc.label.replace("¶", "")}`;
}

export function Demo() {
  const reduceMotion = useReducedMotion();
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [shown, setShown] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [tabSource, setTabSource] = useState<string>(sources[0].id);

  const question = questions.find((q) => q.id === questionId) ?? null;
  const total = question ? question.segments.reduce((n, s) => n + s.text.length, 0) : 0;
  const streaming = question !== null && shown < total;

  // Stream the answer a few characters at a time (instantly under reduced motion).
  useEffect(() => {
    if (!question || shown >= total) return;
    if (reduceMotion) {
      setShown(total);
      return;
    }
    const t = window.setTimeout(
      () => setShown((n) => Math.min(total, n + CHARS_PER_TICK)),
      TICK_MS,
    );
    return () => window.clearTimeout(t);
  }, [question, shown, total, reduceMotion]);

  // Citations whose sentence has fully streamed in.
  const revealedCites = useMemo(() => {
    if (!question) return [];
    let offset = 0;
    const out: string[] = [];
    for (const seg of question.segments) {
      offset += seg.text.length;
      if (seg.cite && shown >= offset) out.push(seg.cite);
    }
    return out;
  }, [question, shown]);

  // While streaming, the page view follows the newest citation.
  const latestCite = revealedCites[revealedCites.length - 1];
  useEffect(() => {
    if (!latestCite) return;
    setPinned(latestCite);
    setTabSource(locators[latestCite].sourceId);
  }, [latestCite]);

  const activeLocId = preview ?? pinned;
  const activeLoc = activeLocId ? locators[activeLocId] : null;
  const viewSource = getSource(activeLoc?.sourceId ?? tabSource);
  const viewLoc = activeLoc && activeLoc.sourceId === viewSource.id ? activeLoc : null;

  function ask(id: string) {
    setQuestionId(id);
    setShown(0);
    setPinned(null);
    setPreview(null);
  }

  function openTab(id: string) {
    setPinned(null);
    setTabSource(id);
  }

  function selectCite(id: string) {
    setPinned(id);
    setTabSource(locators[id].sourceId);
  }

  let offset = 0;

  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="border-b border-line bg-surface/40 py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="demo-title"
          eyebrow="Interactive demo"
          title="Try it on a biology assignment"
          intro="Three sources on cellular respiration are already loaded. Pick a question, then hover or tab to a citation to see exactly where it came from."
        />

        <div className="mt-12 border border-line-strong/60 bg-bg shadow-panel">
          {/* Browser chrome */}
          <div className="border-b border-line bg-surface">
            <div
              className="flex gap-px overflow-x-auto border-b border-line px-2 pt-2"
              role="group"
              aria-label="Open tabs"
            >
              {sources.map((s) => {
                const on = s.id === viewSource.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => openTab(s.id)}
                    className={`flex min-w-0 max-w-[14rem] shrink-0 items-center gap-2 border border-b-0 px-3 py-2 text-left text-xs transition-colors ${
                      on
                        ? "border-line bg-bg text-ink"
                        : "border-transparent text-muted hover:text-ink"
                    }`}
                  >
                    <SourceIcon kind={s.kind} className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <span aria-hidden className="hidden font-mono text-xs text-muted sm:inline">
                ←&nbsp;→&nbsp;↻
              </span>
              <div className="min-w-0 flex-1 truncate border border-line bg-bg px-3 py-1.5 font-mono text-xs text-muted">
                <span className="sr-only">Address: </span>
                {addressFor(viewSource, viewLoc)}
              </div>
              <span aria-hidden className="border border-accent p-1">
                <LogoMark className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_23rem]">
            {/* The page the student is "browsing" */}
            <div className="min-w-0 border-b border-line p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={viewSource.id + (viewLoc?.id ?? "")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {viewSource.kind === "video" && <VideoView source={viewSource} loc={viewLoc} />}
                  {viewSource.kind === "pdf" && <PdfView source={viewSource} loc={viewLoc} />}
                  {viewSource.kind === "article" && (
                    <ArticleView source={viewSource} loc={viewLoc} />
                  )}
                </m.div>
              </AnimatePresence>
            </div>

            {/* Crowbar side panel */}
            <aside
              aria-label="Crowbar side panel (demo)"
              className="flex min-w-0 flex-col bg-surface"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="flex items-center gap-2">
                  <LogoMark className="h-5 w-5" />
                  <span className="font-display text-sm font-bold">Crowbar</span>
                </div>
                <span className="font-mono text-[0.7rem] text-muted">{sources.length} sources</span>
              </div>

              <ul
                className="space-y-1 border-b border-line px-3 py-3"
                aria-label="Sources in this session"
              >
                {sources.map((s) => {
                  const on = activeLoc?.sourceId === s.id;
                  return (
                    <li
                      key={s.id}
                      className={`flex items-center gap-2.5 border px-2.5 py-1.5 text-xs transition-colors ${
                        on ? "border-accent bg-accent/10" : "border-transparent"
                      }`}
                    >
                      <SourceIcon
                        kind={s.kind}
                        className={`h-4 w-4 shrink-0 ${on ? "text-accent-text" : "text-muted"}`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-ink">{s.title}</span>
                        <span className="block font-mono text-[0.68rem] text-muted">{s.meta}</span>
                      </span>
                      {on && activeLoc ? (
                        <span className="shrink-0 font-mono text-xs text-accent-text">
                          {activeLoc.label}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>

              <div className="min-h-[15rem] flex-1 space-y-3 px-4 py-4">
                {question ? (
                  <>
                    <p className="ml-auto w-fit max-w-[90%] border border-line bg-raised px-3 py-2 text-sm">
                      <span className="sr-only">You asked: </span>
                      {question.question}
                    </p>
                    <div
                      aria-live="polite"
                      aria-busy={streaming}
                      className="text-sm leading-relaxed"
                    >
                      <span className="sr-only">Crowbar answered: </span>
                      {question.segments.map((seg, i) => {
                        const start = offset;
                        offset += seg.text.length;
                        const visible = seg.text.slice(0, Math.max(0, shown - start));
                        if (!visible) return null;
                        const done = shown >= start + seg.text.length;
                        return (
                          <span key={i}>
                            {visible}
                            {done && seg.cite ? (
                              <CitationChip
                                label={citationLabel(seg.cite)}
                                active={activeLocId === seg.cite}
                                onPreview={(on) => setPreview(on ? seg.cite! : null)}
                                onSelect={() => selectCite(seg.cite!)}
                              />
                            ) : null}
                          </span>
                        );
                      })}
                      {streaming ? (
                        <span
                          aria-hidden
                          className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[2px] animate-blink bg-accent"
                        />
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="flex h-full min-h-[13rem] flex-col items-center justify-center gap-2 border border-dashed border-line p-4 text-center">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">
                      No question yet
                    </p>
                    <p className="text-sm text-muted">Pick one of the sample questions below.</p>
                  </div>
                )}
              </div>

              {/* Quote preview for the active citation (works on touch, where there's no hover) */}
              <div className="h-[5.75rem] border-t border-dashed border-line bg-bg/60 px-4 py-3">
                {activeLoc ? (
                  <>
                    <p className="font-mono text-[0.68rem] uppercase tracking-wider text-accent-text">
                      Quote · {citationLabel(activeLoc.id)}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-ink/90">“{activeLoc.excerpt}”</p>
                  </>
                ) : (
                  <p className="flex h-full items-center font-mono text-xs text-muted">
                    ↳ Citations show their exact quote here
                  </p>
                )}
              </div>

              <div className="border-t border-line px-4 py-4">
                <p id="demo-questions-label" className="eyebrow mb-2">
                  Sample questions
                </p>
                <ul className="space-y-2" aria-labelledby="demo-questions-label">
                  {questions.map((q) => (
                    <li key={q.id}>
                      <button
                        type="button"
                        aria-pressed={questionId === q.id}
                        onClick={() => ask(q.id)}
                        className={`group flex w-full items-start gap-2 border px-3 py-2.5 text-left text-sm transition-colors ${
                          questionId === q.id
                            ? "border-accent bg-accent/10"
                            : "border-line hover:border-ink"
                        }`}
                      >
                        <span aria-hidden className="font-mono text-accent-text">
                          ?
                        </span>
                        <span>{q.question}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        <p className="mt-4 font-mono text-xs text-muted">
          Demo uses sample data in your browser. Nothing is sent anywhere.
        </p>
      </div>
    </section>
  );
}

type ViewProps = { source: Source; loc: Locator | null };

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-accent/25 px-0.5 text-ink [-webkit-box-decoration-break:clone] [box-decoration-break:clone] [box-shadow:inset_0_-2px_0_rgb(var(--color-accent))]">
      {children}
    </mark>
  );
}

function VideoView({ source, loc }: ViewProps) {
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
            <span>{loc ? loc.label : "0:00"} / 48:12</span>
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

function PdfView({ source, loc }: ViewProps) {
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

function ArticleView({ source, loc }: ViewProps) {
  const paragraphs = [
    {
      n: "¶1",
      text: "Ask ten students how much ATP one glucose makes and you'll get a handful of different answers.",
    },
    { n: "¶3", text: "" },
    { n: "¶5", text: "" },
  ];
  return (
    <article className="mx-auto max-w-[36rem]">
      <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
        bionotes.example · Biology
      </p>
      <h3 className="mt-2 font-display text-xl font-bold leading-tight">{source.title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
        {paragraphs.map((p) => {
          const isTarget = loc?.label === p.n;
          const fallback = locators[p.n === "¶3" ? "article-p3" : "article-p5"];
          return (
            <p key={p.n} className="flex gap-3">
              <span
                className={`w-6 shrink-0 font-mono text-xs ${isTarget ? "text-accent-text" : "text-muted/70"}`}
              >
                {p.n}
              </span>
              <span>
                {p.text ||
                  (isTarget && loc ? (
                    <>
                      {loc.before} <Highlight>{loc.excerpt}</Highlight> {loc.after}
                    </>
                  ) : (
                    `${fallback.before} ${fallback.excerpt} ${fallback.after}`
                  ))}
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
