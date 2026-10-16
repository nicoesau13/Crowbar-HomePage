import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="border-b border-line py-section">
      <div className="container-page">
        <SectionHeader
          id="problem-title"
          eyebrow={problem.eyebrow}
          title={problem.title}
          intro={problem.intro}
        />

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          <Reveal className="bg-bg p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-mono text-sm uppercase tracking-wider text-muted">
                {problem.before.label}
              </h3>
              {/* A tab strip that's clearly too full */}
              <div aria-hidden className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="h-3 w-3 border border-line-strong/60 sm:w-4" />
                ))}
              </div>
            </div>
            <ul className="mt-6 space-y-4">
              {problem.before.items.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span aria-hidden className="mt-0.5 font-mono text-sm">
                    ✕
                  </span>
                  <span className="line-through decoration-line-strong/70 decoration-1">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="bg-surface p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-mono text-sm uppercase tracking-wider text-accent-text">
                {problem.after.label}
              </h3>
              <div aria-hidden className="flex h-3 w-16 border border-accent">
                <span className="w-2/3 border-r border-accent" />
                <span className="w-1/3 bg-accent" />
              </div>
            </div>
            <ul className="mt-6 space-y-4">
              {problem.after.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 font-mono text-sm text-accent-text">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
