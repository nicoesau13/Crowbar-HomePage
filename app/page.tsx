import { Demo } from "@/components/Demo";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Problem } from "@/components/Problem";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Demo />
        <Features />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
