import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./video/webpack-override";

/** Remotion config for the product video in /video. */
Config.setEntryPoint("video/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setCrf(26);
Config.setPixelFormat("yuv420p");
Config.overrideWebpackConfig(webpackOverride);
// Optional: use a locally installed Chrome instead of the downloaded headless shell.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
