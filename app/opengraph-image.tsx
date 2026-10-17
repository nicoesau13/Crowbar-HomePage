import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated Open Graph card; matches the site's dark theme and grid. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0a0a0b",
        backgroundImage:
          "linear-gradient(to right, #1f1f23 1px, transparent 1px), linear-gradient(to bottom, #1f1f23 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        color: "#ededea",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="64" height="64" viewBox="0 0 32 32">
          <rect width="32" height="32" fill="#ff5a1f" />
          <path
            d="M10 26.5V12.5a5.5 5.5 0 0 1 11 0V14"
            fill="none"
            stroke="#0a0a0b"
            strokeWidth="3.25"
          />
          <path
            d="M21 15.5l-2.25 3.5M21 15.5l2.25 3.5"
            fill="none"
            stroke="#0a0a0b"
            strokeWidth="2.5"
          />
          <path d="M10 26.5l3.5 1.5" fill="none" stroke="#0a0a0b" strokeWidth="2.5" />
        </svg>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>Crowbar</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
          One question.
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
          Any page.
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1,
            color: "#ff7a45",
          }}
        >
          Proof attached.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 24,
          color: "#a1a19e",
          fontFamily: "monospace",
        }}
      >
        <span style={{ border: "2px solid #ff5a1f", color: "#ededea", padding: "4px 12px" }}>
          This page · ¶3
        </span>
        <span style={{ border: "2px solid #46464c", padding: "4px 12px" }}>Lecture 3 · 12:45</span>
        <span style={{ padding: "4px 0" }}>{"Works on whatever you're reading"}</span>
      </div>
    </div>,
    size,
  );
}
