import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { PdfView, VideoView } from "@/components/ui/SourceViews";
import type { Locator } from "@/lib/demo-data";
import { Browser, type Tab } from "../components/Browser";
import { pageRect, useLayout } from "../components/layout";
import { camera, chars, cursorAt, pop, type CameraKey, type CursorKey } from "../components/motion";
import { Cursor } from "../components/Overlays";
import { Panel } from "../components/Panel";
import { Stage } from "../components/Stage";
import {
  addedSources,
  allLocators,
  deepHoverOrder,
  deepQuestion,
  durationSeconds,
  formatStamp,
  pageSource,
  sourceById,
} from "../data";

export const DEEP = {
  typeStart: 2,
  typeRate: 1.8,
  send: 38,
  streamStart: 44,
  streamRate: 3.4,
  /** Frame each chip in deepHoverOrder is hovered. */
  hovers: [158, 236, 314] as const,
  release: 392,
};

/**
 * Cursor targets for each hovered chip (logical px), per aspect ratio.
 * Tuned from rendered stills; update if the answer copy changes.
 */
const CHIP_POS = {
  landscape: {
    "lecture-1245": [872, 386],
    "paper-p4": [1151, 406],
    "lecture4-0810": [902, 449],
  },
  portrait: {
    "lecture-1245": [410, 704],
    "paper-p4": [471, 725],
    "lecture4-0810": [431, 745],
  },
} as const;

export function DeepScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const T = DEEP;
  const page = pageRect(L, L.panelSize);
  const chipPos = L.vertical ? CHIP_POS.portrait : CHIP_POS.landscape;

  const q = deepQuestion.question;
  const typed = q.slice(0, chars(frame, T.typeStart, T.typeRate, q.length));
  const sent = frame >= T.send;
  const total = deepQuestion.segments.reduce((n, s) => n + s.text.length, 0);
  const shown = chars(frame, T.streamStart, T.streamRate, total);

  // Which chip is hovered right now.
  let hoverIndex = -1;
  T.hovers.forEach((h, i) => {
    if (frame >= h && frame < T.release) hoverIndex = i;
  });
  const activeCite = hoverIndex >= 0 ? deepHoverOrder[hoverIndex] : null;
  const hoverStart = hoverIndex >= 0 ? T.hovers[hoverIndex] : 0;
  const baseLoc = activeCite ? allLocators[activeCite] : null;
  const viewSource = baseLoc ? sourceById(baseLoc.sourceId) : sourceById("lecture");

  // Video citations: the playhead jumps to the timestamp.
  let loc: Locator | null = baseLoc;
  if (baseLoc && viewSource.kind === "video") {
    const t = pop(frame, hoverStart + 3, fps, { damping: 20, stiffness: 200, mass: 0.6 });
    const target = baseLoc.position ?? 0;
    const pos = target * t;
    loc = {
      ...baseLoc,
      position: pos,
      label: t > 0.98 ? baseLoc.label : formatStamp(pos * durationSeconds(viewSource)),
    };
  }

  const chipScale: Record<string, number> = {};
  let end = 0;
  for (const seg of deepQuestion.segments) {
    end += seg.text.length;
    if (seg.cite)
      chipScale[seg.cite] = 0.6 + 0.4 * pop(frame, T.streamStart + end / T.streamRate, fps);
  }

  const rest: [number, number] = L.vertical ? [470, 560] : [700, 470];
  const cursorKeys: CursorKey[] = [
    [0, rest[0], rest[1]],
    ...T.hovers.map((h, i): CursorKey => {
      const [x, y] = chipPos[deepHoverOrder[i]];
      return [h - 12, x, y];
    }),
    [T.release, rest[0], rest[1] - 40],
  ];
  const cursor = cursorAt(frame, fps, cursorKeys);

  // Push toward the page on each hover, pull back before moving to the next chip.
  // Focus stays near the top edge so the browser never grows into the caption.
  const pageCenter = { x: L.W / 2, y: page.y + 30 };
  const camKeys: CameraKey[] = [[0, 1, L.W / 2, page.y + 30]];
  T.hovers.forEach((h, i) => {
    if (i > 0) camKeys.push([h - 16, 1.02, L.W / 2, page.y + 30]);
    camKeys.push([h + 2, 1.06, pageCenter.x, pageCenter.y]);
  });
  camKeys.push([T.release, 1, L.W / 2, page.y + 30]);
  const cam = camera(frame, fps, camKeys);

  // Quick "cut" feel when the tab switches.
  const cutPop = hoverIndex >= 0 ? 0.97 + 0.03 * pop(frame, hoverStart, fps) : 1;

  const tabs: Tab[] = [pageSource, ...addedSources].map((s) => ({
    id: s.id,
    title: s.title,
    kind: s.kind,
  }));
  const address =
    viewSource.kind === "video"
      ? `${viewSource.address}${baseLoc ? `&t=${Math.round((baseLoc.position ?? 0) * durationSeconds(viewSource))}s` : ""}`
      : `${viewSource.address}${baseLoc ? `#page=${baseLoc.position}` : ""}`;

  return (
    <AbsoluteFill>
      <Stage zoom={cam.zoom} focus={cam.focus}>
        <Browser
          tabs={tabs}
          activeTab={viewSource.id}
          address={address}
          crowbarActive
          panelSize={L.panelSize}
          page={
            <div
              className={L.vertical ? "p-4" : "p-6"}
              style={{ transform: `scale(${cutPop})`, transformOrigin: "50% 30%" }}
            >
              {viewSource.kind === "video" ? (
                <VideoView source={viewSource} loc={loc} />
              ) : (
                <PdfView source={viewSource} loc={loc} />
              )}
            </div>
          }
          panel={
            <Panel
              mode="deep"
              sources={[pageSource, ...addedSources].map((source) => ({ source, appear: 1 }))}
              activeSourceId={baseLoc?.sourceId ?? null}
              activeLabel={baseLoc?.label ?? null}
              question={sent ? q : null}
              answer={frame >= T.streamStart ? { segments: deepQuestion.segments, shown } : null}
              activeCite={activeCite}
              chipScale={chipScale}
              input={sent ? "" : typed}
              caret={!sent}
              placeholder="Ask across 4 sources…"
              compact
            />
          }
        />
        <Cursor x={cursor.x} y={cursor.y} />
      </Stage>
    </AbsoluteFill>
  );
}
