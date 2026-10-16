type MarkProps = { className?: string; title?: string };

/**
 * Crowbar mark: a hooked bar with a split claw, set in a hard-edged tile.
 * Original artwork; colors come from theme tokens.
 */
export function LogoMark({ className = "h-7 w-7", title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" className="fill-accent" />
      <g
        fill="none"
        className="stroke-accent-ink"
        strokeWidth="3.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* shaft + hook */}
        <path d="M10 26.5V12.5a5.5 5.5 0 0 1 11 0V14" />
        {/* split claw */}
        <path d="M21 15.5l-2.25 3.5M21 15.5l2.25 3.5" strokeWidth="2.5" />
        {/* chisel heel */}
        <path d="M10 26.5l3.5 1.5" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-tight">Crowbar</span>
    </span>
  );
}
