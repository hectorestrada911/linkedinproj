"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LANDING_IMAGES, WORKFLOW_STEPS } from "@/lib/landing-images";

export function WorkflowSection() {
  const [active, setActive] = useState(0);
  const step = WORKFLOW_STEPS[active];

  return (
    <section id="workflow" className="border-t border-[#2a2a2e] bg-[#121214] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#2a2a2e] sm:aspect-[5/6]">
            <Image
              src={LANDING_IMAGES.workflow.src}
              alt={LANDING_IMAGES.workflow.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-6 sm:p-8">
              <p className="text-[12px] uppercase tracking-wider text-[#71717a]">Step {active + 1}</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[#F4F4F5]">
                {step.title}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Sources in, package out
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a1a1aa]">
              No prompt templates. No blank-page paralysis.
            </p>

            <div className="mt-10 divide-y divide-[#2a2a2e] border-y border-[#2a2a2e]">
              {WORKFLOW_STEPS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full py-5 text-left transition-colors",
                    active === i ? "text-[#F4F4F5]" : "text-[#71717a] hover:text-[#a1a1aa]"
                  )}
                >
                  <div className="flex gap-4">
                    <span className="font-mono text-[12px] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium">{s.title}</h3>
                      {active === i && (
                        <p className="mt-2 text-[14px] leading-relaxed text-[#a1a1aa]">{s.body}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section className="border-t border-[#2a2a2e] bg-[#161618]">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[480px]">
          <Image
            src={LANDING_IMAGES.output.src}
            alt={LANDING_IMAGES.output.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-20">
          <blockquote>
            <p className="font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-[#F4F4F5] sm:text-3xl">
              &ldquo;The gap isn&apos;t intelligence — it&apos;s context transfer.&rdquo;
            </p>
            <footer className="mt-4 text-[13px] text-[#71717a]">From a founder-tone generation</footer>
          </blockquote>
          <p className="mt-8 text-[15px] leading-relaxed text-[#a1a1aa]">
            Most AI writing tools optimize for speed. SignalPost connects what your team knows
            internally to what&apos;s happening in the industry — then packages the result for
            LinkedIn.
          </p>
        </div>
      </div>
    </section>
  );
}
