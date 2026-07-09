import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/hero";
import { SpotlightSection } from "@/components/landing/spotlight-section";
import { WorkflowSection, PhilosophySection } from "@/components/landing/workflow-section";
import { BentoGrid } from "@/components/landing/bento-grid";
import { FeatureExplorer, StatSection } from "@/components/landing/feature-explorer";
import { FinalCTA } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <div className="bg-[#161618] font-[family-name:var(--font-landing)] antialiased selection:bg-[#D4A853]/20 selection:text-[#FAFAF9]">
      <LandingNav />
      {/* Tesla: full-screen cinematic hero */}
      <Hero />
      {/* Apple: spotlight carousel */}
      <SpotlightSection />
      {/* SignalPost: accordion workflow */}
      <WorkflowSection />
      {/* Apple: interactive explorer + SignalPost visuals */}
      <FeatureExplorer />
      {/* SignalPost: bento capabilities */}
      <BentoGrid />
      {/* Apple: big stat typography + SignalPost copy */}
      <StatSection />
      {/* SignalPost: philosophy quote */}
      <PhilosophySection />
      {/* Hybrid CTA */}
      <FinalCTA />
    </div>
  );
}
