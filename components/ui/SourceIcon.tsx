import type { SourceKind } from "@/lib/demo-data";

export function SourceIcon({
  kind,
  className = "h-4 w-4",
}: {
  kind: SourceKind;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 16 16",
    className,
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  } as const;
  if (kind === "video") {
    return (
      <svg {...common}>
        <rect x="1.5" y="3" width="13" height="10" />
        <path d="M6.5 6v4l3.5-2z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "pdf") {
    return (
      <svg {...common}>
        <path d="M3 1.5h7l3 3v10H3z" />
        <path d="M10 1.5v3h3M5.5 8.5h5M5.5 11h5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M2 3h12M2 6.5h12M2 10h8M2 13.5h10" />
    </svg>
  );
}
