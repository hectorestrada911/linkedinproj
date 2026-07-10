import Link from "next/link";
import { BlueRadiance, PrimaryLink } from "@/components/landing/landing-ui";

export function FinalCTA() {
  return (
    <section className="relative bg-[#050505] pb-20 pt-28 sm:pb-28 sm:pt-36">
      <BlueRadiance />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#38bdf8]/20 bg-[#0a0a0b] px-8 py-20 sm:px-16 sm:py-28 shadow-[0_0_80px_rgba(56,189,248,0.08)]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#38bdf8]/15 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#0ea5e9]/10 blur-[80px]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#fafafa]">
              Ready to ship your first post?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-[#71717a]">
              Load sample data, pick a voice, generate a full package. No API key required.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <PrimaryLink href="/studio">Open Studio</PrimaryLink>
              <Link
                href="https://github.com/hectorestrada911/linkedinproj"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 text-[14px] font-medium text-[#38bdf8]/80 transition-colors hover:text-[#7dd3fc]"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#38bdf8]/10 pt-8 sm:flex-row">
          <span className="text-[13px] font-semibold tracking-[-0.02em] text-[#fafafa]">
            SignalPost
          </span>
          <p className="text-[12px] text-[#52525b]">
            LinkedIn content studio · Engineering demo
          </p>
        </footer>
      </div>
    </section>
  );
}
