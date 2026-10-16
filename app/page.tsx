import { DemoGate } from "@/components/DemoGate";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Problem } from "@/components/Problem";
import { VideoSection } from "@/components/VideoSection";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <VideoSection />
        <Problem />
        <HowItWorks />
        <DemoGate />
        <Features />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
