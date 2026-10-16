import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SourceIcon } from "@/components/ui/SourceIcon";
import { ArticleView } from "@/components/ui/SourceViews";
import type { Source } from "@/lib/demo-data";
import { Browser, type Tab } from "../components/Browser";
import { panelRect, useLayout } from "../components/layout";
import { camera, mix, pop } from "../components/motion";
import { Cursor } from "../components/Overlays";
import { Panel } from "../components/Panel";
import { Stage } from "../components/Stage";
import { addedSources, instantAnswer, pageSource } from "../data";
import { TYPED } from "../timeline";

const APPEAR = [10, 30, 50];
const FLY_DELAY = 14;
const LAND = 12;
export const ADD = { badgeFlip: 90, push: 100 };

function SourceCard({ source, grabbed }: { source: Source; grabbed: boolean }) {
  return (
    <div
      className={`flex w-[230px] items-center gap-3 border bg-surface px-3 py-2.5 shadow-panel ${
        grabbed ? "border-accent" : "border-line-strong/70"
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-raised text-ink">
        <SourceIcon kind={source.kind} className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold">{source.title}</span>
        <span className="block font-mono text-[10px] text-muted">{source.meta}</span>
      </span>
    </div>
  );
}

export function AddSourcesScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const panel = panelRect(L, L.panelSize);

  const start = (i: number) =>
    L.vertical
      ? { x: 40 + i * 24, y: L.chrome + 40 + i * 84 }
      : { x: 70 + i * 30, y: L.chrome + 70 + i * 96 };
  // Target: the matching row in the panel's source list.
  const slot = (i: number) => ({ x: panel.x + 14, y: panel.y + 46 + 30 + (i + 1) * 38 });

  const cards = addedSources.map((source, i) => {
    const a = APPEAR[i];
    const enter = pop(frame, a, fps);
    const fly = pop(frame, a + FLY_DELAY, fps, { damping: 18, stiffness: 170, mass: 0.7 });
    const s0 = start(i);
    const s1 = slot(i);
    const x = mix(mix(-300, s0.x, enter), s1.x, fly);
    const y = mix(s0.y, s1.y, fly);
    const landed = frame >= a + FLY_DELAY + LAND;
    const row = pop(frame, a + FLY_DELAY + LAND - 2, fps);
    return { source, x, y, fly, landed, row, grabbed: frame >= a + FLY_DELAY - 4 && !landed };
  });

  const landedCount = cards.filter((c) => c.landed).length;
  const deep = frame >= ADD.badgeFlip;
  const badge = deep
    ? 0.8 +
      0.2 * pop(frame, ADD.badgeFlip, fps) +
      0.15 * Math.max(0, 1 - (frame - ADD.badgeFlip) / 8)
    : 1;

  // Cursor rides along with whichever card is being dragged.
  const dragged = cards.find((c) => c.grabbed) ?? cards[Math.min(2, landedCount)] ?? cards[2];
  const cursor = { x: dragged.x + 170, y: dragged.y + 30 };

  const tabs: Tab[] = [
    { id: pageSource.id, title: pageSource.title, kind: pageSource.kind },
    ...cards
      .filter((c) => c.landed)
      .map((c) => ({ id: c.source.id, title: c.source.title, kind: c.source.kind })),
  ];

  const cam = camera(frame, fps, [
    [0, 1, L.W / 2, L.H / 2],
    [ADD.push, 1.1, panel.x + panel.w - 90, 70],
  ]);

  return (
    <AbsoluteFill>
      <Stage zoom={cam.zoom} focus={cam.focus}>
        <Browser
          tabs={tabs}
          activeTab={pageSource.id}
          address={pageSource.address}
          crowbarActive
          panelSize={L.panelSize}
          page={
            <div className="p-6">
              <ArticleView source={pageSource} loc={null} />
            </div>
          }
          panel={
            <Panel
              mode={deep ? "deep" : "instant"}
              badgeScale={badge}
              sources={[
                { source: pageSource, appear: 1 },
                ...cards.map((c) => ({ source: c.source, appear: c.landed ? c.row : 0 })),
              ]}
              question={TYPED.instant}
              answer={{ segments: instantAnswer, shown: 10_000 }}
              dimConversation
              placeholder={deep ? "Ask across 4 sources…" : "Ask about this page…"}
              compact
            />
          }
        />
        {cards.map((c) =>
          c.landed ? null : (
            <div
              key={c.source.id}
              className="absolute"
              style={{
                left: c.x,
                top: c.y,
                transform: `scale(${1 - 0.25 * c.fly}) rotate(${(1 - c.fly) * -2}deg)`,
                transformOrigin: "0 0",
                opacity: 1 - Math.max(0, c.fly - 0.85) * 6,
              }}
            >
              <SourceCard source={c.source} grabbed={c.grabbed} />
            </div>
          ),
        )}
        <Cursor
          x={cursor.x}
          y={cursor.y}
          press={dragged.grabbed ? 1 : 0}
          opacity={landedCount === 3 ? 0 : 1}
        />
      </Stage>
    </AbsoluteFill>
  );
}
