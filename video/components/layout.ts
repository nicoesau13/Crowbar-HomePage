import { useVideoConfig } from "remotion";

/**
 * Layout for both aspect ratios. The browser is laid out at a "laptop" logical size and
 * scaled up, so site components keep their real proportions.
 */
export type Layout = {
  vertical: boolean;
  /** Logical browser size (CSS px before scaling). */
  W: number;
  H: number;
  scale: number;
  /** Browser position in output pixels. */
  left: number;
  top: number;
  /** Side panel width (16:9) or height (9:16) in logical px. */
  panelSize: number;
  chrome: number;
  caption: { top: number; height: number; size: number; inset: number };
};

export function useLayout(): Layout {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  if (vertical) {
    return {
      vertical,
      W: 640,
      H: 1060,
      scale: 1.5,
      left: 60,
      top: 296,
      panelSize: 620,
      chrome: 80,
      caption: { top: 100, height: 190, size: 84, inset: 60 },
    };
  }
  return {
    vertical,
    W: 1240,
    H: 600,
    scale: 1.4,
    left: 92,
    top: 214,
    panelSize: 440,
    chrome: 80,
    caption: { top: 52, height: 140, size: 80, inset: 92 },
  };
}

/** Top-left of the page area and its size, in logical px. */
export function pageRect(L: Layout, panel: number) {
  if (L.vertical) {
    return { x: 0, y: L.chrome, w: L.W, h: L.H - L.chrome - panel };
  }
  return { x: 0, y: L.chrome, w: L.W - panel, h: L.H - L.chrome };
}

/** Top-left of the panel and its size, in logical px. */
export function panelRect(L: Layout, panel: number) {
  if (L.vertical) {
    return { x: 0, y: L.H - panel, w: L.W, h: panel };
  }
  return { x: L.W - panel, y: L.chrome, w: panel, h: L.H - L.chrome };
}
