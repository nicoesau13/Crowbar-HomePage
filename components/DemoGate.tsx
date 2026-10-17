import Link from "next/link";

/** Replaces the inline demo on the home page: the demo lives at /demo. */
export function DemoGate() {
  return (
    <section id="demo" aria-label="Interactive demo" className="border-b border-line py-16">
      <div className="container-page flex flex-col items-center gap-3 text-center">
        <Link
          href="/demo"
          className="inline-flex min-h-11 items-center gap-2 border border-ink px-5 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
        >
          Try the interactive demo <span aria-hidden>→</span>
        </Link>
        <p className="font-mono text-xs text-muted">Opens a separate page. Sample data only.</p>
      </div>
    </section>
  );
}
