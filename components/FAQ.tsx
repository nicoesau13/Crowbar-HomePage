"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/lib/content";

/**
 * Accordion following the WAI-ARIA pattern: buttons inside headings,
 * aria-expanded/aria-controls, and Up/Down/Home/End between headers.
 */
export function FAQ() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = faqs.length - 1;
    const target =
      e.key === "ArrowDown"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowUp"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b border-line py-section">
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          id="faq-title"
          eyebrow="FAQ"
          title="Straight answers"
          intro="Crowbar is still being built. Where something isn't ready yet, we say so."
        />

        <div className="border-t border-line">
          {faqs.map((item, i) => {
            const isOpen = open.has(i);
            const btnId = `faq-btn-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={item.q} className="border-b border-line">
                <h3>
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold sm:text-xl"
                  >
                    <span className="transition-colors group-hover:text-accent-text">{item.q}</span>
                    <span
                      aria-hidden
                      className={`relative h-6 w-6 shrink-0 border border-line-strong/70 transition-colors ${isOpen ? "border-accent bg-accent" : ""}`}
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 ${isOpen ? "bg-accent-ink" : "bg-ink"}`}
                      />
                      <span
                        className={`absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform ${isOpen ? "scale-y-0" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-prose pb-6 pr-10 leading-relaxed text-muted">{item.a}</p>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
