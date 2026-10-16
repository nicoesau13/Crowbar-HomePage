"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        <a href="#top" className="-m-1 p-1" aria-label="Crowbar, back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-sm px-3 py-2 font-mono text-[0.8rem] uppercase tracking-wider text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={site.ctaHref} className="btn-primary hidden sm:inline-flex">
            {site.ctaLabel}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5"
              aria-hidden
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line md:hidden">
        <ul className="container-page flex flex-col py-2">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line/60 py-3 font-mono text-sm uppercase tracking-wider text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="py-3 sm:hidden">
            <a href={site.ctaHref} onClick={() => setOpen(false)} className="btn-primary w-full">
              {site.ctaLabel}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
