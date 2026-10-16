import { EarlyAccessForm } from "@/components/EarlyAccessForm";
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
      <div className="container-page relative">
        <div className="relative mx-auto max-w-3xl border border-line-strong/60 bg-surface p-6 shadow-hard-accent sm:p-10">
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
        </div>
      </div>
    </section>
  );
}
