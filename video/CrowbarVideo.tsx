import type { ComponentType, ReactNode } from "react";
import { AbsoluteFill, Series } from "remotion";
import "../app/globals.css";
import { CaptionTrack, ConceptLabel } from "./components/Overlays";
import { fontVars } from "./fonts";
import { AddSourcesScene } from "./scenes/AddSourcesScene";
import { CloseScene } from "./scenes/CloseScene";
import { ContrastScene } from "./scenes/ContrastScene";
import { DeepScene } from "./scenes/DeepScene";
import { InstantScene } from "./scenes/InstantScene";
import { PainScene } from "./scenes/PainScene";
import { SCENES, type SceneId } from "./timeline";

export const SCENE_COMPONENTS: Record<SceneId, ComponentType> = {
  pain: PainScene,
  instant: InstantScene,
  addSources: AddSourcesScene,
  deep: DeepScene,
  contrast: ContrastScene,
  close: CloseScene,
};

/** Dark theme + site fonts + grid backdrop, shared by every composition. */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <AbsoluteFill className="dark" style={fontVars}>
      <AbsoluteFill className="bg-bg font-sans text-ink antialiased">
        <AbsoluteFill className="bg-grid opacity-50" />
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/** The full product video. Used by both the 16:9 and 9:16 compositions. */
export function CrowbarVideo() {
  return (
    <Frame>
      <Series>
        {SCENES.map(({ id, frames }) => {
          const Scene = SCENE_COMPONENTS[id];
          return (
            <Series.Sequence key={id} durationInFrames={frames} name={id}>
              <Scene />
            </Series.Sequence>
          );
        })}
      </Series>
      <CaptionTrack />
      <ConceptLabel />
    </Frame>
  );
}

/** A single scene in the frame, for previewing in Remotion Studio. */
export function ScenePreview({ id }: { id: SceneId }) {
  const Scene = SCENE_COMPONENTS[id];
  return (
    <Frame>
      <Scene />
    </Frame>
  );
}
