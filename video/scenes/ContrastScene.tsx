import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CitationChip } from "@/components/ui/CitationChip";
import { useLayout } from "../components/layout";
import { pop, progress } from "../components/motion";
import { chipLabel } from "../data";
import { CONTRAST } from "../timeline";

function clock(totalSeconds: number, withHours: boolean): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return withHours ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Illustrative split screen. Timers are animation, not measurements (see CONTRAST.note). */
export function ContrastScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();

  const inLeft = pop(frame, 0, fps);
  const inRight = pop(frame, 8, fps);

  // Left: 4 hours ticking by (accelerating). Right: 12 seconds, then done.
  const leftSeconds = interpolate(progress(frame, 12, 200) ** 1.6, [0, 1], [0, 4 * 3600]);
  const rightSeconds = Math.min(12, progress(frame, 16, 58) * 12);
  const rightDone = frame >= 58;
  const check = pop(frame, 60, fps);

  const titleSize = L.vertical ? 84 : 72;
  const timerSize = L.vertical ? 120 : 132;

  const half = (side: "left" | "right") => {
    const isLeft = side === "left";
    const t = isLeft ? inLeft : inRight;
    const offset = (1 - t) * (L.vertical ? 0 : isLeft ? -120 : 120);
    const offsetY = (1 - t) * (L.vertical ? (isLeft ? -120 : 120) : 0);
    return { transform: `translate(${offset}px, ${offsetY}px)`, opacity: Math.min(1, t * 1.3) };
  };

  return (
    <AbsoluteFill className="bg-bg">
      <AbsoluteFill className="bg-grid opacity-60" />
      <div
        className="absolute inset-0 grid gap-px bg-line"
        style={{
          gridTemplateColumns: L.vertical ? "1fr" : "1fr 1fr",
          gridTemplateRows: L.vertical ? "1fr 1fr" : "1fr",
          margin: L.vertical ? "120px 60px 200px" : "110px 92px 150px",
        }}
      >
        <div className="flex flex-col justify-between bg-bg p-12" style={half("left")}>
          <p className="font-mono text-[22px] uppercase tracking-wider text-muted">
            {CONTRAST.left.label}
          </p>
          <div>
            {/* Ten "videos", each with a slowly filling progress bar */}
            <div className="mb-10 grid grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => {
                const fill = Math.min(
                  1,
                  Math.max(0, progress(frame, 12 + i * 6, 210) * (1.4 - i * 0.07)),
                );
                return (
                  <div key={i} className="aspect-video border border-line bg-surface p-2">
                    <div className="mt-auto h-1 w-full bg-line">
                      <div className="h-1 bg-muted" style={{ width: `${fill * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p
              className="font-mono tabular-nums text-muted"
              style={{ fontSize: timerSize, lineHeight: 1 }}
            >
              {clock(leftSeconds, true)}
            </p>
            <p
              className="mt-6 font-display font-extrabold text-ink/80"
              style={{ fontSize: titleSize, lineHeight: 1, letterSpacing: "-0.03em" }}
            >
              {CONTRAST.left.title}
            </p>
          </div>
        </div>

        <div
          className="flex flex-col justify-between border-2 border-accent bg-surface p-12"
          style={half("right")}
        >
          <p className="font-mono text-[22px] uppercase tracking-wider text-accent-text">
            {CONTRAST.right.label}
          </p>
          <div>
            <div
              className="mb-10 flex items-center gap-4"
              style={{
                fontSize: 30,
                opacity: check,
                transform: `scale(${0.8 + 0.2 * check})`,
                transformOrigin: "left center",
              }}
            >
              <span className="flex h-14 w-14 items-center justify-center bg-accent font-mono text-[30px] text-accent-ink">
                ✓
              </span>
              <span className="text-ink">
                <CitationChip label={chipLabel("lecture-1245")} active />
                <CitationChip label={chipLabel("paper-p4")} />
              </span>
            </div>
            <p
              className="font-mono tabular-nums"
              style={{
                fontSize: timerSize,
                lineHeight: 1,
                color: rightDone ? "rgb(var(--color-accent-text))" : undefined,
              }}
            >
              {clock(rightSeconds, false)}
            </p>
            <p
              className="mt-6 font-display font-extrabold text-ink"
              style={{ fontSize: titleSize, lineHeight: 1, letterSpacing: "-0.03em" }}
            >
              {CONTRAST.right.title}
            </p>
          </div>
        </div>
      </div>
      <p
        className="absolute font-mono uppercase tracking-wider text-muted"
        style={{
          left: L.vertical ? 60 : 92,
          bottom: L.vertical ? 120 : 80,
          fontSize: L.vertical ? 26 : 22,
          opacity: progress(frame, 20, 30),
        }}
      >
        {CONTRAST.note}
      </p>
    </AbsoluteFill>
  );
}
