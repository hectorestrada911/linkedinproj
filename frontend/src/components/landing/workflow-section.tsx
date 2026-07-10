import Image from "next/image";
import Link from "next/link";
import { LANDING_IMAGES, WORKFLOW_STEPS } from "@/lib/landing-images";
import {
  BlueRadiance,
  SectionDivider,
} from "@/components/landing/landing-ui";

export function WorkflowSection() {
  return (
    <section id="workflow" className="border-t border-[#27272a] bg-[#0a0a0b] py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-lg text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] text-[#fafafa]">
              Sources in, package out
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#71717a]">
              Paste headlines or meeting notes, choose how you want to sound, and get a
              complete LinkedIn package back: post, hooks, strategy, and score.
            </p>
          </div>
          <Link
            href="/studio"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#fafafa] px-5 py-2.5 text-[14px] font-medium text-[#09090b] hover:bg-white"
          >
            Open Studio
          </Link>
        </div>

        <div className="mt-14 grid gap-px border border-[#27272a] bg-[#27272a] sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((step, index) => (
            <div key={step.title} className="bg-[#0a0a0b] p-6 sm:p-7">
              <span className="text-[12px] tabular-nums text-[#52525b]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[15px] font-medium text-[#fafafa]">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#71717a]">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-14 aspect-[16/9] min-h-[220px] overflow-hidden">
          <Image
            src={LANDING_IMAGES.workflow.src}
            alt={LANDING_IMAGES.workflow.alt}
            fill
            className="object-cover"
            sizes="1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section className="relative border-t border-[#27272a] bg-[#050505] py-24 sm:py-32">
      <BlueRadiance className="opacity-40" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <SectionDivider />
        <div className="mt-28 grid items-center gap-16 lg:grid-cols-2">
          <blockquote>
            <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#fafafa]">
              &ldquo;The gap isn&apos;t intelligence, it&apos;s context transfer.&rdquo;
            </p>
            <footer className="mt-6 text-[14px] text-[#52525b]">
              Generated in founder voice
            </footer>
          </blockquote>

          <div className="space-y-6 text-[16px] leading-[1.7] text-[#71717a]">
            <p>
              Most AI writing tools optimize for speed. SignalPost connects what your team
              knows internally to what&apos;s happening in the industry, then packages the
              result for LinkedIn.
            </p>
            <p>
              Every generation includes hooks, strategy notes, and a post score, not just
              a paragraph you still have to edit.
            </p>
          </div>
        </div>

        <div className="relative mt-16 aspect-[2/1] min-h-[240px] overflow-hidden">
          <Image
            src={LANDING_IMAGES.output.src}
            alt={LANDING_IMAGES.output.alt}
            fill
            className="object-cover"
            sizes="1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
