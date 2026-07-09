"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    title: "Add your sources",
    body: "Paste AI news, fetch recent headlines, or drop in a team conversation transcript. Both inputs optional — but together they unlock the best angles.",
  },
  {
    num: "02",
    title: "Pick your voice",
    body: "Choose from seven tone modes: founder, technical, contrarian, concise, storytelling, thought-leader, or professional. Each reshapes rhythm and credibility.",
  },
  {
    num: "03",
    title: "Generate the package",
    body: "One click produces the full content package — post, hooks, strategy, scoring, visuals, carousel outline, and more.",
  },
  {
    num: "04",
    title: "Refine and ship",
    body: "Rewrite tone, regenerate sections, copy individual blocks, or export everything as Markdown. Ready to paste into LinkedIn.",
  },
];

export function WorkflowSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="workflow" className="border-t border-[#2a2a2e] bg-[#161618] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Sources in, package out
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a1a1aa]">
              No prompt engineering. No template picking.
            </p>
          </div>

          <div className="divide-y divide-[#2a2a2e] border-y border-[#2a2a2e]">
            {STEPS.map((step, i) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "w-full cursor-pointer py-5 text-left transition-colors",
                  active === i ? "text-[#F4F4F5]" : "text-[#71717a] hover:text-[#a1a1aa]"
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[12px] tabular-nums">{step.num}</span>
                  <div>
                    <h3 className="text-[15px] font-medium">{step.title}</h3>
                    {active === i && (
                      <p className="mt-2 text-[14px] leading-relaxed text-[#a1a1aa] animate-fade-in">
                        {step.body}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section className="border-t border-[#2a2a2e] bg-[#161618] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <blockquote>
            <p className="font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-[#F4F4F5] sm:text-3xl">
              &ldquo;The gap isn&apos;t intelligence — it&apos;s context transfer.&rdquo;
            </p>
            <footer className="mt-4 text-[13px] text-[#71717a]">
              From a founder-tone generation
            </footer>
          </blockquote>

          <div className="space-y-8 text-[15px] leading-relaxed text-[#a1a1aa]">
            <div>
              <p className="mb-2 text-[14px] font-medium text-[#F4F4F5]">The problem</p>
              <p>
                AI writing tools generate text fast but lose the nuance, tone, and strategic
                context from internal conversations. The output sounds like everyone else.
              </p>
            </div>
            <div>
              <p className="mb-2 text-[14px] font-medium text-[#F4F4F5]">The approach</p>
              <p>
                Connect what your team is discussing to what&apos;s happening in AI right
                now. Extract the intersection. Write like someone who actually builds things.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
