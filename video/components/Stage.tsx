import type { ReactNode } from "react";
import { useLayout } from "./layout";

type Props = {
  children: ReactNode;
  /** Camera push-in; 1 = no zoom. */
  zoom?: number;
  /** Point to zoom toward, in logical browser px. */
  focus?: { x: number; y: number };
};

/** Positions the logical browser space in the frame and applies the camera. */
export function Stage({ children, zoom = 1, focus }: Props) {
  const L = useLayout();
  const fx = focus?.x ?? L.W / 2;
  const fy = focus?.y ?? L.H / 2;
  return (
    <div
      style={{
        position: "absolute",
        left: L.left,
        top: L.top,
        width: L.W,
        height: L.H,
        transformOrigin: "0 0",
        transform: `scale(${L.scale})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformOrigin: `${fx}px ${fy}px`,
          transform: `scale(${zoom})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
