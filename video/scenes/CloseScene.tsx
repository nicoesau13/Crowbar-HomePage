import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { LogoMark } from "@/components/ui/Logo";
import { useLayout } from "../components/layout";
import { pop, progress } from "../components/motion";
import { CLOSE } from "../timeline";

export function CloseScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();

  const mark = pop(frame, 0, fps);
  const word = pop(frame, 6, fps);
  const line1 = pop(frame, 22, fps);
  const line2 = pop(frame, 34, fps);
  const cta = pop(frame, 56, fps);
  const push = 1 + progress(frame, 0, 210) * 0.04;

  const scale = L.vertical ? 1 : 1;
  const tagSize = L.vertical ? 132 : 150;

  return (
    <AbsoluteFill className="items-center justify-center bg-bg">
      <AbsoluteFill className="bg-grid opacity-70 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)]" />
      <div
        className="flex flex-col items-center text-center"
        style={{ transform: `scale(${push * scale})` }}
      >
        <div className="flex items-center gap-6">
          <div
            style={{
              transform: `scale(${0.4 + 0.6 * mark}) rotate(${(1 - mark) * -12}deg)`,
              opacity: Math.min(1, mark * 2),
            }}
          >
            <LogoMark className="h-[104px] w-[104px]" />
          </div>
          <span
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: 96,
              opacity: Math.min(1, word * 2),
              transform: `translateX(${(1 - word) * -30}px)`,
            }}
          >
            Crowbar
          </span>
        </div>

        <h1
          className="mt-14 font-display font-extrabold"
          style={{ fontSize: tagSize, lineHeight: 0.95, letterSpacing: "-0.04em" }}
        >
          <span
            className="block"
            style={{
              opacity: Math.min(1, line1 * 2),
              transform: `translateY(${(1 - line1) * 40}px)`,
            }}
          >
            {CLOSE.tagline[0]}
          </span>
          <span
            className="block text-accent-text"
            style={{
              opacity: Math.min(1, line2 * 2),
              transform: `translateY(${(1 - line2) * 40}px)`,
            }}
          >
            {CLOSE.tagline[1]}
          </span>
        </h1>

        <div
          className="mt-16 flex items-center gap-4 border border-accent bg-accent px-12 font-semibold text-accent-ink shadow-hard"
          style={{
            height: 96,
            fontSize: 40,
            opacity: Math.min(1, cta * 2),
            transform: `translateY(${(1 - cta) * 30}px) scale(${0.9 + 0.1 * cta})`,
          }}
        >
          {CLOSE.cta} <span>→</span>
        </div>
      </div>
      <p
        className="absolute font-mono uppercase tracking-wider text-muted"
        style={{
          bottom: L.vertical ? 120 : 60,
          fontSize: L.vertical ? 26 : 22,
          opacity: progress(frame, 60, 72),
        }}
      >
        {CLOSE.footnote}
      </p>
    </AbsoluteFill>
  );
}
