/**
 * Render one still from a composition: npm run video:still-at -- <CompositionId> <frame> <out.jpg>
 */
import path from "path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { webpackOverride } from "../webpack-override";

async function main() {
  const [id, frame, out] = process.argv.slice(2);
  const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? null;
  const serveUrl = await bundle({ entryPoint: path.resolve("video/index.ts"), webpackOverride });
  const composition = await selectComposition({ serveUrl, id, browserExecutable });
  await renderStill({
    composition,
    serveUrl,
    output: path.resolve(out),
    frame: Number(frame),
    imageFormat: "jpeg",
    jpegQuality: 80,
    browserExecutable,
  });
  console.log("rendered", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
