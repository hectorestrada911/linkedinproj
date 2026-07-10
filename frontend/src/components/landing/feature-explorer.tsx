"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LANDING_IMAGES } from "@/lib/landing-images";

const FEATURES = [
  {
    id: "sources",
    label: "Sources",
    headline: "Three input modes",
    body: "Paste Source, Search AI News, or Auto-Find Angle. Pick what fits the moment.",
    image: LANDING_IMAGES.pasteSource,
  },
  {
    id: "analysis",
    label: "Analysis",
    headline: "Extract what matters",
    body: "Key facts, pain points, and a combined content angle from your inputs.",
    image: LANDING_IMAGES.searchNews,
  },
  {
    id: "voice",
    label: "Voice",
    headline: "Seven tone modes",
    body: "Founder, technical, contrarian. Each with distinct rhythm and credibility.",
    image: LANDING_IMAGES.findAngle,
  },
  {
    id: "output",
    label: "Output",
    headline: "Full publish package",
    body: "Post, hooks, CTA, hashtags, strategy notes, and post score.",
    image: LANDING_IMAGES.output,
  },
];

export function FeatureExplorer() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section className="border-t border-[#2a2a2e] bg-[#161618] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
          Inside the studio
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 border-b border-[#2a2a2e] pb-6 lg:flex-col lg:border-b-0 lg:pb-0">
              {FEATURES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveId(f.id)}
                  className={cn(
                    "text-left text-[14px] transition-colors",
                    activeId === f.id
                      ? "font-medium text-[#F4F4F5]"
                      : "text-[#71717a] hover:text-[#a1a1aa]"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 lg:mt-10">
              <h3 className="text-xl font-semibold text-[#F4F4F5] sm:text-2xl">{active.headline}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#a1a1aa]">{active.body}</p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#2a2a2e]">
            <Image
              key={active.id}
              src={active.image.src}
              alt={active.image.alt}
              fill
              className="object-cover animate-fade-in"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatSection() {
  return (
    <section className="border-t border-[#2a2a2e] bg-[#121214] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#F4F4F5] sm:text-4xl">
              Built for operators who ship
            </h2>
            <ul className="mt-8 space-y-4 text-[15px] text-[#d4d4d8]">
              <li className="border-l-2 border-[#3f3f46] pl-4">7 tone modes tuned for different voices</li>
              <li className="border-l-2 border-[#3f3f46] pl-4">12+ deliverables per generation</li>
              <li className="border-l-2 border-[#3f3f46] pl-4">Works without an API key in demo mode</li>
            </ul>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#2a2a2e]">
            <Image
              src={LANDING_IMAGES.cta.src}
              alt={LANDING_IMAGES.cta.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
