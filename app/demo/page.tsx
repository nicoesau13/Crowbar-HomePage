import type { Metadata } from "next";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Interactive demo",
  description: "Try Crowbar on a sample biology assignment. Sample data, runs in your browser.",
};

export default function DemoPage() {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-page flex h-14 items-center justify-between">
          <a href="/" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink">
            ← Crowbar
          </a>
          <a href="/#early-access" className="btn-primary hidden sm:inline-flex">
            Get early access
          </a>
        </div>
      </header>
      <main id="main">
        <Demo />
      </main>
      <Footer />
    </>
  );
}
