import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { CONCEPT_LABEL, cues, type Cue } from "../timeline";
import { useLayout } from "./layout";
import { pop } from "./motion";

/** Pointer cursor in logical browser space. `press` 0–1 squashes it for a click. */
export function Cursor({
  x,
  y,
  press = 0,
  opacity = 1,
}: {
  x: number;
  y: number;
  press?: number;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${1 - press * 0.18})`,
        transformOrigin: "2px 2px",
        filter: "drop-shadow(0 2px 3px rgb(0 0 0 / 0.5))",
        zIndex: 50,
      }}
    >
      <path
        d="M2 2l7.5 19 2.6-7.9L20 10.6z"
        fill="#fff"
        stroke="#0a0a0b"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CaptionText({ cue, frame }: { cue: Cue; frame: number }) {
  const { fps } = useVideoConfig();
  const L = useLayout();
  const t = pop(frame, cue.from, fps);
  // Hard cut out: captions leave on the scene cut, no slow fade.
  const accentAt = cue.accent ? cue.text.lastIndexOf(cue.accent) : -1;
  const before = accentAt >= 0 ? cue.text.slice(0, accentAt) : cue.text;
  const accent = accentAt >= 0 ? cue.text.slice(accentAt) : "";
  return (
    <div
      className="absolute flex items-center font-display font-extrabold text-ink"
      style={{
        left: L.caption.inset,
        right: L.caption.inset,
        top: L.caption.top,
        height: L.caption.height,
        fontSize: L.caption.size,
        lineHeight: 1,
        letterSpacing: "-0.035em",
        justifyContent: L.vertical ? "flex-start" : "flex-start",
        opacity: Math.min(1, t * 1.4),
        transform: `translateY(${(1 - t) * 28}px)`,
        textShadow: "0 2px 24px rgb(10 10 11 / 0.8)",
      }}
    >
      <span style={{ maxWidth: L.vertical ? "100%" : "92%" }}>
        {before}
        {accent ? <span className="text-accent-text">{accent}</span> : null}
      </span>
    </div>
  );
}

/** Big one-idea-per-beat captions, driven by timeline.cues (absolute frames). */
export function CaptionTrack() {
  const frame = useCurrentFrame();
  const active = cues.filter((c) => c.overlay && frame >= c.from && frame < c.to);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {active.map((cue) => (
        <CaptionText key={cue.text} cue={cue} frame={frame} />
      ))}
    </AbsoluteFill>
  );
}

/** Small honesty label for the opening seconds. */
export function ConceptLabel() {
  const frame = useCurrentFrame();
  const L = useLayout();
  if (frame < CONCEPT_LABEL.from || frame >= CONCEPT_LABEL.to) return null;
  return (
    <div
      className="absolute flex items-center gap-2 border border-line-strong/80 bg-bg/80 font-mono uppercase tracking-wider text-muted"
      style={{
        right: L.vertical ? 60 : 92,
        top: L.vertical ? 28 : 24,
        fontSize: L.vertical ? 20 : 18,
        padding: L.vertical ? "6px 14px" : "6px 12px",
      }}
    >
      <span className="inline-block h-2 w-2 bg-accent" />
      {CONCEPT_LABEL.text}
    </div>
  );
}
