/**
 * Writes public/video/crowbar-demo.vtt from the on-screen copy in video/timeline.ts.
 * Run: npm run video:captions
 */
import { writeFileSync } from "fs";
import path from "path";
import { FPS, cues, vttOnly } from "../timeline";

function stamp(frame: number): string {
  const ms = Math.round((frame / FPS) * 1000);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const rest = ms % 1000;
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(rest, 3)}`;
}

const all = [...cues, ...vttOnly].sort((a, b) => a.from - b.from);
const body = all
  .map((c, i) => `${i + 1}\n${stamp(c.from)} --> ${stamp(c.to)}\n${c.text}`)
  .join("\n\n");
const out = path.resolve(process.cwd(), "public/video/crowbar-demo.vtt");
writeFileSync(out, `WEBVTT\n\n${body}\n`);
console.log(`Wrote ${all.length} cues to ${path.relative(process.cwd(), out)}`);
