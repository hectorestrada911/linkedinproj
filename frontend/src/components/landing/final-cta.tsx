import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0b] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#D4A853]/20 bg-gradient-to-br from-[#141416] via-[#141416] to-[#1a1814] px-8 py-16 sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A853]/10 blur-[80px]" />

          <div className="relative max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#FAFAF9] sm:text-4xl">
              Your next post is one conversation away
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#8A8A8E]">
              Load the sample data, pick a tone, and generate your first content package in
              under a minute. No API key required.
            </p>
            <Link
              href="/studio"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-[#D4A853] px-7 py-3.5 text-[14px] font-semibold text-[#0a0a0b] transition-all hover:bg-[#E8C876] hover:shadow-lg hover:shadow-[#D4A853]/20"
            >
              Launch Studio
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-[12px] text-[#8A8A8E]/60">
          SignalPost · Engineering demo · Built for LinkedIn creators
        </p>
      </div>
    </section>
  );
}
