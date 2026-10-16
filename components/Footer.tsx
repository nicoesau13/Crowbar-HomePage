import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">
            Cited answers across all your sources, right next to the page.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#top"
                className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink"
              >
                Back to top ↑
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-4 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. In development.
        </p>
      </div>
    </footer>
  );
}
