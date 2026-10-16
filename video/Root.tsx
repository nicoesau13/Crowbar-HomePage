import { Composition, Folder } from "remotion";
import { CrowbarVideo, ScenePreview } from "./CrowbarVideo";
import { FPS, SCENES, TOTAL_FRAMES } from "./timeline";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="CrowbarMaster"
        component={CrowbarVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="CrowbarVertical"
        component={CrowbarVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      {/* Each scene on its own, for previewing (16:9). Overlay captions are master-only. */}
      <Folder name="Scenes">
        {SCENES.map(({ id, frames }) => (
          <Composition
            key={id}
            id={`Scene-${id}`}
            component={ScenePreview}
            defaultProps={{ id }}
            durationInFrames={frames}
            fps={FPS}
            width={1920}
            height={1080}
          />
        ))}
      </Folder>
    </>
  );
}
