import { interpolate, spring } from "remotion";

/** Snappy default spring: quick, slight overshoot, settles in ~12 frames. */
export const SNAPPY = { damping: 16, stiffness: 220, mass: 0.6 } as const;
/** Softer spring for camera moves. */
export const CAMERA = { damping: 22, stiffness: 120, mass: 0.9 } as const;

type SpringCfg = { damping: number; stiffness: number; mass: number };

export function pop(frame: number, start: number, fps: number, config: SpringCfg = SNAPPY): number {
  return spring({ frame: frame - start, fps, config });
}

/** Linear 0→1 between two frames, clamped. */
export function progress(frame: number, from: number, to: number): number {
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Characters revealed for a typing/streaming effect. */
export function chars(frame: number, start: number, perFrame: number, total: number): number {
  return Math.max(0, Math.min(total, Math.floor((frame - start) * perFrame)));
}

export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Camera keyframes: [frame, zoom, focusX, focusY]. Each move springs from the previous
 * keyframe's values, so pushes feel physical rather than eased.
 */
export type CameraKey = [frame: number, zoom: number, fx: number, fy: number];

export function camera(frame: number, fps: number, keys: CameraKey[]) {
  let [, zoom, fx, fy] = keys[0];
  for (let i = 1; i < keys.length; i++) {
    const [start, z, x, y] = keys[i];
    const t = spring({ frame: frame - start, fps, config: CAMERA });
    zoom = mix(zoom, z, t);
    fx = mix(fx, x, t);
    fy = mix(fy, y, t);
  }
  return { zoom, focus: { x: fx, y: fy } };
}

/** Cursor path: [frame, x, y]; springs between waypoints. */
export type CursorKey = [frame: number, x: number, y: number];

export function cursorAt(frame: number, fps: number, keys: CursorKey[]) {
  let [, x, y] = keys[0];
  for (let i = 1; i < keys.length; i++) {
    const [start, nx, ny] = keys[i];
    const t = spring({
      frame: frame - start,
      fps,
      config: { damping: 20, stiffness: 160, mass: 0.7 },
    });
    x = mix(x, nx, t);
    y = mix(y, ny, t);
  }
  return { x, y };
}
