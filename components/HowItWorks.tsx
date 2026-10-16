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
          title="Three steps, and the last one is the point"
          intro="Speed is nice. Being able to check every sentence is what makes an answer usable for coursework."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.n}>
              <Reveal delay={i * 0.08} className="card flex h-full flex-col p-6">
                <div className="flex items-baseline justify-between border-b border-line pb-4">
                  <span className="font-mono text-sm text-accent-text">{step.n}</span>
                  <span aria-hidden className="font-mono text-xs text-muted">
                    {i < steps.length - 1 ? "→" : "■"}
                  </span>
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
