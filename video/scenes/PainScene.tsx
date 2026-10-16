import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { ArticleView, PdfView } from "@/components/ui/SourceViews";
import { Browser, type Tab } from "../components/Browser";
import { useLayout } from "../components/layout";
import { camera, progress } from "../components/motion";
import { Cursor } from "../components/Overlays";
import { Stage } from "../components/Stage";
import { formatStamp, painTabs, pageSource, sourceById } from "../data";

/** Cuts between views every few frames: video scrubbing, PDF pages, article. */
const CUT_EVERY = 9;
const VIEWS = ["video", "pdf", "video", "article", "pdf", "video", "article", "video"] as const;

function ScrubbingVideo({ frame }: { frame: number }) {
  // Playhead jumps around like someone hunting for one sentence.
  const pos = 0.08 + random(`scrub-${Math.floor(frame / 4)}`) * 0.84;
  const seconds = pos * 2892;
  return (
    <div className="mx-auto max-w-[620px] p-5">
      <div className="relative aspect-video overflow-hidden border border-line bg-[#0d0d10]">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-[8%] top-[14%] space-y-2 font-mono text-[13px] text-white/60">
          <p>glycolysis → Krebs → ETC</p>
          <p className="text-white/40">NADH · FADH₂ · H⁺</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-8">
          <div className="relative h-1 bg-white/25">
            <div
              className="absolute inset-y-0 left-0 bg-white/70"
              style={{ width: `${pos * 100}%` }}
            />
            <span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 border-2 border-white bg-white"
              style={{ left: `${pos * 100}%` }}
            />
          </div>
          <p className="mt-1.5 font-mono text-[11px] text-white/80">
            {formatStamp(seconds)} / 48:12 · Lecture 3: Cellular Respiration
          </p>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
        Transcript unavailable · scrubbing…
      </p>
    </div>
  );
}

export function PainScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();

  // Tabs pile up over the first second and a half.
  const tabCount = Math.round(4 + progress(frame, 0, 45) * (painTabs.length - 4));
  const tabs: Tab[] = painTabs.slice(0, tabCount).map((title, i) => ({
    id: `t${i}`,
    title,
    kind: title.endsWith(".pdf") ? "pdf" : title.startsWith("Lecture") ? "video" : "article",
  }));
  const cut = Math.floor(frame / CUT_EVERY);
  const view = VIEWS[cut % VIEWS.length];
  const activeTab = `t${Math.floor(random(`tab-${cut}`) * tabCount)}`;

  const paper = sourceById("paper");
  const lecture = sourceById("lecture");
  const address =
    view === "video"
      ? lecture.address
      : view === "pdf"
        ? `${paper.address}#page=${(cut % 13) + 1}`
        : pageSource.address;

  // Small jolt on each cut, slow push overall.
  const jolt = frame % CUT_EVERY < 2 ? 1.006 : 1;
  const cam = camera(frame, fps, [
    [0, 1, L.W / 2, L.H / 2],
    [0, 1.06, L.W / 2, L.H * 0.4],
  ]);

  const page =
    view === "video" ? (
      <ScrubbingVideo frame={frame} />
    ) : view === "pdf" ? (
      <div className="p-5" style={{ transform: `translateY(${-((cut * 37) % 90)}px)` }}>
        <PdfView source={paper} loc={null} />
        <div className="mt-4">
          <PdfView source={paper} loc={null} />
        </div>
      </div>
    ) : (
      <div className="p-6" style={{ transform: `translateY(${-((cut * 23) % 60)}px)` }}>
        <ArticleView source={pageSource} loc={null} />
      </div>
    );

  const cx = 120 + random(`cx-${Math.floor(frame / 6)}`) * (L.W - 300);
  const cy = L.chrome + 60 + random(`cy-${Math.floor(frame / 6)}`) * (L.H - L.chrome - 140);

  return (
    <AbsoluteFill>
      <Stage zoom={cam.zoom * jolt} focus={cam.focus}>
        <Browser tabs={tabs} activeTab={activeTab} address={address} page={page} crampedTabs />
        <Cursor x={cx} y={cy} />
      </Stage>
    </AbsoluteFill>
  );
}
