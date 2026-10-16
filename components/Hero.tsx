import { HeroMock } from "@/components/HeroMock";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line"
    >
      {/* Grid backdrop, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_70%_at_30%_40%,#000_40%,transparent_100%)]"
      />

      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-6 font-display text-display-xl font-extrabold">
            {hero.headline.map((line, i) => (
              <span key={line} className="block">
                {i === hero.headline.length - 1 ? (
                  <span className="relative inline-block text-accent-text">
                    {line}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-[0.08em] w-full bg-accent"
                    />
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-[34rem] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            {hero.subhead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={site.ctaHref} className="btn-primary h-12 px-6 text-base">
              {site.ctaLabel}
              <span aria-hidden>→</span>
            </a>
            <a href={hero.secondaryCta.href} className="btn-ghost h-12 px-6 text-base">
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="mt-5 font-mono text-xs text-muted">{hero.note}</p>
        </div>

        <HeroMock />
      </div>
    </section>
  );
}
