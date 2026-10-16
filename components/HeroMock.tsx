"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { CitationChip } from "@/components/ui/CitationChip";
import { LogoMark } from "@/components/ui/Logo";
import { SourceIcon } from "@/components/ui/SourceIcon";
import { citationLabel, getSource, locators, questions, sources } from "@/lib/demo-data";

const sample = questions[0];

/**
 * Compact, static-answer version of the side panel. Hovering or focusing a citation
 * highlights its source and previews the quoted span.
 */
export function HeroMock() {
  const [active, setActive] = useState<string | null>(null);
  const activeLoc = active ? locators[active] : null;

  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:mx-0 lg:justify-self-end">
      {/* Offset frame for the hard-edge look */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 border border-line-strong/60"
      />

      <figure
        aria-label="Example of the Crowbar side panel answering a question with citations"
        className="relative border border-line-strong/60 bg-surface shadow-panel"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <LogoMark className="h-5 w-5" />
            <span className="font-display text-sm font-bold">Crowbar</span>
          </div>
          <span className="font-mono text-[0.7rem] text-muted">side panel</span>
        </div>

        <div className="border-b border-line px-4 py-3">
          <p className="eyebrow mb-2">Sources · {sources.length}</p>
          <ul className="space-y-1.5">
            {sources.map((s) => {
              const on = activeLoc?.sourceId === s.id;
              return (
                <li
                  key={s.id}
                  className={`flex items-center gap-2.5 border px-2.5 py-1.5 text-sm transition-colors ${
                    on ? "border-accent bg-accent/10" : "border-transparent"
                  }`}
                >
                  <SourceIcon
                    kind={s.kind}
                    className={`h-4 w-4 shrink-0 ${on ? "text-accent-text" : "text-muted"}`}
                  />
                  <span className="truncate">{s.title}</span>
                  {on && activeLoc ? (
                    <span className="ml-auto shrink-0 font-mono text-xs text-accent-text">
                      {activeLoc.label}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-4 px-4 py-4">
          <p className="ml-auto w-fit max-w-[85%] border border-line bg-raised px-3 py-2 text-sm">
            {sample.question}
          </p>
          <p className="text-[0.95rem] leading-relaxed">
            {sample.segments.map((seg, i) => (
              <span key={i}>
                {seg.text}
                {seg.cite ? (
                  <CitationChip
                    label={citationLabel(seg.cite)}
                    active={active === seg.cite}
                    onPreview={(on) => setActive(on ? seg.cite! : null)}
                  />
                ) : null}
              </span>
            ))}
          </p>
        </div>

        {/* Fixed-height preview area so hovering never shifts layout */}
        <div
          className="h-[6.5rem] border-t border-dashed border-line bg-bg/60 px-4 py-3"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeLoc ? (
              <m.div
                key={activeLoc.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-accent-text">
                  {getSource(activeLoc.sourceId).short} · {activeLoc.label}
                </p>
                <p className="mt-1 line-clamp-3 text-sm text-ink/90">“{activeLoc.excerpt}”</p>
              </m.div>
            ) : (
              <m.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center font-mono text-xs text-muted"
              >
                ↳ Hover or focus a citation to see the exact quote
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </figure>
    </div>
  );
}
