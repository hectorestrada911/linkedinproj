"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "sources",
    label: "Sources",
    headline: "AI news meets internal context",
    body: "Paste headlines or fetch live news. Add a team transcript. SignalPost finds the angle only you can tell.",
  },
  {
    id: "analysis",
    label: "Analysis",
    headline: "Extract what matters",
    body: "Key facts, pain points, and a combined content angle connecting industry momentum to your workflow.",
  },
  {
    id: "tone",
    label: "Voice",
    headline: "Seven tone modes",
    body: "Founder, technical, contrarian, concise — each with distinct rhythm and credibility.",
  },
  {
    id: "package",
    label: "Output",
    headline: "Full publish package",
    body: "Post, hooks, CTA, hashtags, image prompt, carousel, video script, strategy notes, and post score.",
  },
];

export function FeatureExplorer() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section className="border-t border-[#2a2a2e] bg-[#161618] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
          How it works
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {FEATURES.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveId(f.id)}
                className={cn(
                  "shrink-0 px-3 py-2 text-left text-[14px] transition-colors lg:px-0",
                  activeId === f.id
                    ? "font-medium text-[#F4F4F5]"
                    : "text-[#71717a] hover:text-[#a1a1aa]"
                )}
              >
                {f.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-[#2a2a2e] pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <h3 className="text-xl font-semibold text-[#F4F4F5] sm:text-2xl">{active.headline}</h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#a1a1aa]">{active.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatSection() {
  return (
    <section className="border-t border-[#2a2a2e] bg-[#161618] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#F4F4F5] sm:text-4xl">
            Context preservation, not content spam
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#a1a1aa]">
            Most AI writing tools optimize for speed. SignalPost connects what your team
            knows internally to what&apos;s happening in the industry — then packages the
            result for LinkedIn.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-[#d4d4d8]">
            <li className="flex gap-3">
              <span className="text-[#71717a]">—</span>
              7 tone modes tuned for different voices
            </li>
            <li className="flex gap-3">
              <span className="text-[#71717a]">—</span>
              12+ deliverables per generation
            </li>
            <li className="flex gap-3">
              <span className="text-[#71717a]">—</span>
              Works with or without an API key (demo mode)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
