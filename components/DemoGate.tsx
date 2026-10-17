import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/** Replaces the inline demo on the home page: the demo lives at /demo. */
export function DemoGate() {
  return (
    <section id="demo" aria-label="Interactive demo" className="border-b border-line py-16">
      <Reveal className="container-page flex flex-col items-center gap-3 text-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/demo"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink px-5 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            Try the interactive demo <span aria-hidden>→</span>
          </Link>
          <Link
            href="/video"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-line-strong/70 px-5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent-text"
          >
            Watch the video <span aria-hidden>→</span>
          </Link>
        </div>
        <p className="font-mono text-xs text-muted">Each opens on its own page. Demo uses sample data.</p>
      </Reveal>
    </section>
  );
}
