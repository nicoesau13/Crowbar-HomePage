import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { finalCta } from "@/lib/content";

export function FinalCTA() {
  return (
    <section
      id="early-access"
      aria-labelledby="cta-title"
      className="relative overflow-hidden py-section"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]"
      />
      <div className="container-page relative">
        <Reveal className="relative mx-auto max-w-3xl border border-line-strong/60 bg-surface p-6 shadow-hard-accent sm:p-10">
          <LogoMark className="h-10 w-10" />
          <h2
            id="cta-title"
            className="mt-6 text-balance font-display text-display-lg font-extrabold"
          >
            {finalCta.title}
          </h2>
          <p className="mt-4 max-w-prose text-pretty text-lg leading-relaxed text-muted">
            {finalCta.body}
          </p>
          <div className="mt-8">
            <EarlyAccessForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
