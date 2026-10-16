"use client";

type Props = {
  label: string;
  active?: boolean;
  /** Called on hover/focus with true, and on leave/blur with false. */
  onPreview?: (on: boolean) => void;
  onSelect?: () => void;
  describedBy?: string;
};

/** Inline citation chip: "Lecture 3 · 12:45". Keyboard focus mirrors hover. */
export function CitationChip({ label, active = false, onPreview, onSelect, describedBy }: Props) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-describedby={describedBy}
      onMouseEnter={() => onPreview?.(true)}
      onMouseLeave={() => onPreview?.(false)}
      onFocus={() => onPreview?.(true)}
      onBlur={() => onPreview?.(false)}
      onClick={onSelect}
      className={[
        "mx-0.5 inline-flex translate-y-[-1px] items-center whitespace-nowrap rounded-sm border px-1.5 py-px align-baseline font-mono text-[0.72em] leading-snug transition-colors",
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-line-strong/70 bg-raised text-ink hover:border-accent hover:text-accent-text",
      ].join(" ")}
    >
      <span className="sr-only">Citation: </span>
      {label}
    </button>
  );
}
