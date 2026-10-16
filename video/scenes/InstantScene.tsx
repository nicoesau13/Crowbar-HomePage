import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ArticleView } from "@/components/ui/SourceViews";
import { Browser } from "../components/Browser";
import { useLayout } from "../components/layout";
import { camera, chars, cursorAt, pop, progress } from "../components/motion";
import { Cursor } from "../components/Overlays";
import { Panel } from "../components/Panel";
import { Stage } from "../components/Stage";
import { allLocators, instantAnswer, pageSource } from "../data";
import { TYPED } from "../timeline";

/** Frame marks within the scene (270 frames). */
export const INSTANT = {
  clickToolbar: 22,
  panelOpen: 24,
  typeStart: 44,
  typeRate: 0.9,
  send: 94,
  streamStart: 100,
  streamRate: 4,
  hover: 196,
  push: 200,
};

const HOVER_CITE = "article-p3";

export function InstantScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const T = INSTANT;

  const panelSize = pop(frame, T.panelOpen, fps) * L.panelSize;
  const typed = TYPED.instant.slice(0, chars(frame, T.typeStart, T.typeRate, TYPED.instant.length));
  const sent = frame >= T.send;
  const total = instantAnswer.reduce((n, s) => n + s.text.length, 0);
  const shown = chars(frame, T.streamStart, T.streamRate, total);
  const hovering = frame >= T.hover;

  // Chip pop-in when each citation lands.
  const chipScale: Record<string, number> = {};
  let end = 0;
  for (const seg of instantAnswer) {
    end += seg.text.length;
    if (seg.cite) {
      const at = T.streamStart + end / T.streamRate;
      chipScale[seg.cite] = 0.6 + 0.4 * pop(frame, at, fps);
    }
  }

  // Positions (logical px) for the cursor and camera, per aspect ratio.
  const g = L.vertical
    ? {
        toolbar: { x: 621, y: 52 },
        chip: { x: 449, y: 659 },
        passage: { x: 330, y: 150 },
        rest: { x: 520, y: 380 },
      }
    : {
        toolbar: { x: 1222, y: 58 },
        chip: { x: 1074, y: 322 },
        passage: { x: 420, y: 130 },
        rest: { x: 700, y: 420 },
      };

  const cursor = cursorAt(frame, fps, [
    [0, g.rest.x, g.rest.y],
    [4, g.toolbar.x, g.toolbar.y],
    [T.send + 8, g.rest.x + 60, g.rest.y + 40],
    [T.hover - 14, g.chip.x, g.chip.y],
  ]);
  const press =
    progress(frame, T.clickToolbar - 3, T.clickToolbar) -
    progress(frame, T.clickToolbar, T.clickToolbar + 4);

  const cam = camera(frame, fps, [
    [0, 1, L.W / 2, L.H / 2],
    [T.panelOpen, 1.02, L.W / 2, L.H / 2],
    [T.push, 1.14, g.passage.x, g.passage.y],
  ]);

  const loc = hovering ? allLocators[HOVER_CITE] : null;

  return (
    <AbsoluteFill>
      <Stage zoom={cam.zoom} focus={cam.focus}>
        <Browser
          tabs={[{ id: pageSource.id, title: pageSource.title, kind: pageSource.kind }]}
          activeTab={pageSource.id}
          address={hovering ? `${pageSource.address}#p3` : pageSource.address}
          crowbarActive={frame >= T.clickToolbar}
          panelSize={panelSize}
          page={
            <div className="p-6">
              <ArticleView source={pageSource} loc={loc} />
            </div>
          }
          panel={
            <Panel
              mode="instant"
              sources={[{ source: pageSource, appear: 1 }]}
              activeSourceId={hovering ? pageSource.id : null}
              activeLabel={hovering ? "¶3" : null}
              question={sent ? TYPED.instant : null}
              answer={frame >= T.streamStart ? { segments: instantAnswer, shown } : null}
              activeCite={hovering ? HOVER_CITE : null}
              chipScale={chipScale}
              input={sent ? "" : typed}
              caret={!sent && frame >= T.typeStart && Math.floor(frame / 8) % 2 === 0}
            />
          }
        />
        <Cursor x={cursor.x} y={cursor.y} press={press} />
      </Stage>
    </AbsoluteFill>
  );
}
