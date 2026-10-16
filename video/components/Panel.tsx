import { CitationChip } from "@/components/ui/CitationChip";
import { LogoMark } from "@/components/ui/Logo";
import { SourceIcon } from "@/components/ui/SourceIcon";
import { PAGE_SOURCE_ID, type Segment, type Source } from "@/lib/demo-data";
import { chipLabel } from "../data";

export type PanelSource = { source: Source; appear: number };

type Props = {
  mode: "instant" | "deep";
  /** Scale for the mode badge "pop" when switching modes. */
  badgeScale?: number;
  sources: PanelSource[];
  /** Source row to highlight (the active citation's source). */
  activeSourceId?: string | null;
  activeLabel?: string | null;
  question?: string | null;
  answer?: { segments: Segment[]; shown: number } | null;
  activeCite?: string | null;
  /** Per-chip pop scale keyed by locator id. */
  chipScale?: Record<string, number>;
  /** Text in the input box (typing) and whether the caret shows. */
  input?: string;
  caret?: boolean;
  /** Fade the conversation (e.g. while sources are being added). */
  dimConversation?: boolean;
  placeholder?: string;
  /** Single-line source rows, for when the conversation needs the room. */
  compact?: boolean;
};

/** The Crowbar side panel, as it appears in the video. */
export function Panel({
  mode,
  badgeScale = 1,
  sources,
  activeSourceId,
  activeLabel,
  question,
  answer,
  activeCite,
  chipScale = {},
  input = "",
  caret = false,
  dimConversation = false,
  placeholder = "Ask about this page…",
  compact = false,
}: Props) {
  const deep = mode === "deep";
  let offset = 0;
  const total = answer ? answer.segments.reduce((n, s) => n + s.text.length, 0) : 0;

  return (
    <div className="flex h-full flex-col bg-surface text-ink">
      <div className="flex h-[46px] shrink-0 items-center justify-between border-b border-line px-4">
        <div className="flex items-center gap-2">
          <LogoMark className="h-5 w-5" />
          <span className="font-display text-[15px] font-bold">Crowbar</span>
        </div>
        <span
          className={`border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
            deep ? "border-accent bg-accent text-accent-ink" : "border-line text-muted"
          }`}
          style={{ transform: `scale(${badgeScale})`, transformOrigin: "right center" }}
        >
          {deep
            ? `Deep mode · ${sources.filter((s) => s.appear > 0.5).length} sources`
            : "Instant mode"}
        </span>
      </div>

      <div className="shrink-0 border-b border-line px-3 py-2.5">
        <p className="mb-1.5 px-1 font-mono text-[10px] uppercase tracking-wider text-muted">
          {deep ? "Searching" : "Reading"}
        </p>
        <ul className="space-y-1">
          {sources.map(({ source, appear }) => {
            if (appear <= 0) return null;
            const on = activeSourceId === source.id;
            const isPage = source.id === PAGE_SOURCE_ID;
            return (
              <li
                key={source.id}
                className={`flex items-center gap-2.5 border px-2 text-[12px] ${compact ? "py-0.5" : "py-1"} ${
                  on ? "border-accent bg-accent/10" : "border-transparent"
                }`}
                style={{
                  opacity: Math.min(1, appear * 1.5),
                  transform: `translateX(${(1 - appear) * 24}px) scale(${0.92 + 0.08 * appear})`,
                  transformOrigin: "left center",
                }}
              >
                <SourceIcon
                  kind={source.kind}
                  className={`h-4 w-4 shrink-0 ${on ? "text-accent-text" : "text-muted"}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{source.title}</span>
                  {compact ? null : (
                    <span className="block font-mono text-[10px] text-muted">
                      {isPage ? "This page" : `Added · ${source.meta}`}
                    </span>
                  )}
                </span>
                {on && activeLabel ? (
                  <span className="shrink-0 font-mono text-[11px] text-accent-text">
                    {activeLabel}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="min-h-0 flex-1 space-y-3 overflow-hidden px-4 py-3"
        style={{ opacity: dimConversation ? 0.35 : 1 }}
      >
        {question ? (
          <p className="ml-auto w-fit max-w-[90%] border border-line bg-raised px-3 py-1.5 text-[13px]">
            {question}
          </p>
        ) : null}
        {answer ? (
          <p className="text-[13.5px] leading-[1.55]">
            {answer.segments.map((seg, i) => {
              const start = offset;
              offset += seg.text.length;
              const visible = seg.text.slice(0, Math.max(0, answer.shown - start));
              if (!visible) return null;
              const done = answer.shown >= start + seg.text.length;
              return (
                <span key={i}>
                  {visible}
                  {done && seg.cite ? (
                    <span
                      className="inline-block"
                      style={{ transform: `scale(${chipScale[seg.cite] ?? 1})` }}
                    >
                      <CitationChip label={chipLabel(seg.cite)} active={activeCite === seg.cite} />
                    </span>
                  ) : null}
                </span>
              );
            })}
            {answer.shown < total ? (
              <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[2px] bg-accent" />
            ) : null}
          </p>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-line p-3">
        <div className="flex items-center gap-2 border border-line-strong/70 bg-bg px-3 py-2 text-[13px]">
          <span className={`min-w-0 flex-1 truncate ${input ? "text-ink" : "text-muted"}`}>
            {input || placeholder}
            {caret ? (
              <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-accent" />
            ) : null}
          </span>
          <span
            className={`flex h-6 w-6 items-center justify-center font-mono text-[12px] ${
              input ? "bg-accent text-accent-ink" : "border border-line text-muted"
            }`}
          >
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}
