import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="border-b border-line py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title="Open a page. Ask. Check the proof."
          intro="No setup: Crowbar answers from the page you're on."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.n}>
              <Reveal
                delay={i * 0.08}
                className={`flex h-full flex-col rounded-sm border p-6 ${
                  step.optional
                    ? "border-dashed border-line-strong/70 bg-bg"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
                  <span className="font-mono text-sm text-accent-text">{step.n}</span>
                  {step.optional ? (
                    <span className="border border-accent px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-accent-text">
                      Optional, for advanced work
                    </span>
                  ) : (
                    <span aria-hidden className="font-mono text-xs text-muted">
                      →
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-display-md font-bold">{step.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{step.body}</p>
                <p className="mt-6 overflow-hidden text-ellipsis whitespace-nowrap border border-dashed border-line bg-bg px-3 py-2 font-mono text-xs text-ink/80">
                  {step.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
