import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/hero";
import { PlatformSection } from "@/components/landing/platform-section";
import { SourceModesSection } from "@/components/landing/source-modes-section";
import { WorkflowSection, PhilosophySection } from "@/components/landing/workflow-section";
import { BentoGrid } from "@/components/landing/bento-grid";
import { FinalCTA } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <div className="bg-[#050505] font-[family-name:var(--font-landing)] antialiased selection:bg-[#38bdf8]/25 selection:text-[#fafafa]">
      <LandingNav />
      <Hero />
      <PlatformSection />
      <SourceModesSection />
      <WorkflowSection />
      <BentoGrid />
      <PhilosophySection />
      <FinalCTA />
    </div>
  );
}
