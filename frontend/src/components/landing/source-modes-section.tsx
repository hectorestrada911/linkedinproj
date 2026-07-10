"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SOURCE_MODES } from "@/lib/landing-images";
import {
  AccentLine,
  BlueRadiance,
  PrimaryLink,
  SectionEyebrow,
  SectionLead,
  SectionTitle,
} from "@/components/landing/landing-ui";

export function SourceModesSection() {
  const [active, setActive] = useState(0);
  const mode = SOURCE_MODES[active];

  return (
    <section id="sources" className="relative bg-[#050505] py-28 sm:py-36">
      <BlueRadiance className="opacity-60" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <SectionEyebrow>Input</SectionEyebrow>
          <SectionTitle className="mt-4">Three ways in. One pipeline out.</SectionTitle>
          <SectionLead className="mt-5">
            Pick the source that matches how you work: paste, search, or let the system
            find the angle.
          </SectionLead>
        </div>

        <div className="mt-14 flex flex-wrap gap-2 border-b border-[#38bdf8]/10 pb-px">
          {SOURCE_MODES.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative px-4 py-3 text-[14px] font-medium transition-colors",
                active === i ? "text-[#bae6fd]" : "text-[#52525b] hover:text-[#a1a1aa]"
              )}
            >
              {m.title}
              {active === i && (
                <span className="absolute inset-x-0 -bottom-px h-px bg-[#38bdf8]" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#38bdf8]/15 bg-[#0a0a0b] shadow-[0_0_48px_rgba(56,189,248,0.05)]">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <AccentLine className="mb-4" />
              <p className="text-[13px] font-medium text-[#38bdf8]">{mode.title}</p>
              <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[#fafafa] sm:text-[32px]">
                {mode.description.split(". ")[0].trim()}
                {mode.description.includes(". ") ? "." : ""}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[#71717a]">
                {mode.description}
              </p>
              <PrimaryLink href="/studio" className="mt-8 w-fit">
                Try in Studio
              </PrimaryLink>
            </div>

            <div className="relative min-h-[320px] border-t border-[#38bdf8]/10 lg:min-h-[440px] lg:border-l lg:border-t-0">
              <Image
                key={mode.id}
                src={mode.image.src}
                alt={mode.image.alt}
                fill
                className="object-cover animate-fade-in"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/30 to-[#38bdf8]/10 lg:bg-gradient-to-l lg:from-[#0a0a0b]/70 lg:via-transparent lg:to-[#38bdf8]/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
