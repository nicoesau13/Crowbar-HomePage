/**
 * Renders review stills at key moments of each scene, for both aspect ratios.
 * Run: npm run video:stills  (output: video/out/stills, git-ignored)
 */
import { mkdirSync } from "fs";
import path from "path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { webpackOverride } from "../webpack-override";
import { sceneStart, type SceneId } from "../timeline";

/** [scene, frame within scene, label] */
const MOMENTS: [SceneId, number, string][] = [
  ["pain", 40, "tabs-pile-up"],
  ["pain", 120, "caption"],
  ["instant", 30, "panel-opens"],
  ["instant", 80, "typing"],
  ["instant", 160, "streaming"],
  ["instant", 196, "hover-chip"],
  ["instant", 260, "push-in"],
  ["addSources", 30, "card-drag"],
  ["addSources", 70, "snapping"],
  ["addSources", 150, "deep-mode"],
  ["deep", 30, "typing"],
  ["deep", 145, "answer"],
  ["deep", 175, "hover-lecture"],
  ["deep", 255, "hover-pdf"],
  ["deep", 335, "hover-lecture4"],
  ["deep", 410, "settle"],
  ["contrast", 30, "timers"],
  ["contrast", 200, "end"],
  ["close", 20, "logo"],
  ["close", 120, "final"],
];

const only = process.argv[2]; // optional scene filter
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? null;

async function main() {
  const serveUrl = await bundle({
    entryPoint: path.resolve("video/index.ts"),
    webpackOverride,
  });
  const outDir = path.resolve("video/out/stills");
  mkdirSync(outDir, { recursive: true });
  for (const id of ["CrowbarMaster", "CrowbarVertical"]) {
    const composition = await selectComposition({ serveUrl, id, browserExecutable });
    for (const [scene, f, label] of MOMENTS) {
      if (only && scene !== only) continue;
      const frame = sceneStart(scene) + f;
      const output = path.join(
        outDir,
        `${id === "CrowbarMaster" ? "h" : "v"}-${scene}-${f}-${label}.jpg`,
      );
      await renderStill({
        composition,
        serveUrl,
        output,
        frame,
        imageFormat: "jpeg",
        jpegQuality: 70,
        browserExecutable,
      });
      console.log("rendered", path.basename(output));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
