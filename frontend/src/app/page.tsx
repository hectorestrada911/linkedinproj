import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/hero";
import { SourceModesSection } from "@/components/landing/source-modes-section";
import { WorkflowSection, PhilosophySection } from "@/components/landing/workflow-section";
import { BentoGrid } from "@/components/landing/bento-grid";
import { FeatureExplorer, StatSection } from "@/components/landing/feature-explorer";
import { FinalCTA } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <div className="bg-[#121214] font-[family-name:var(--font-landing)] antialiased selection:bg-[#D4A853]/20 selection:text-[#FAFAF9]">
      <LandingNav />
      <Hero />
      <SourceModesSection />
      <WorkflowSection />
      <FeatureExplorer />
      <BentoGrid />
      <StatSection />
      <PhilosophySection />
      <FinalCTA />
    </div>
  );
}
