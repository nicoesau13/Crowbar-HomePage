import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { VideoSection } from "@/components/VideoSection";

export const metadata: Metadata = {
  title: "Watch the video",
  description: "A short concept video of Crowbar answering a question about the page you're on.",
};

export default function VideoPage() {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink">
            ← Crowbar
          </Link>
          <Link href="/demo" className="btn-ghost hidden sm:inline-flex">
            Try the demo
          </Link>
        </div>
      </header>
      <main id="main">
        <VideoSection />
      </main>
      <Footer />
    </>
  );
}
