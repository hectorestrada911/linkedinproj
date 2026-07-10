import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="border-t border-[#2a2a2e] bg-[#121214]">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-2xl border border-[#2a2a2e]">
          <div className="absolute inset-0">
            <Image
              src="/images/landing/cta.jpg"
              alt="Workspace"
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-[#121214]/75" />
          </div>

          <div className="relative px-8 py-16 sm:px-14 sm:py-20">
            <h2 className="max-w-lg font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Try it with sample data in under a minute
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#a1a1aa]">
              Load sample sources, pick a voice, generate your first package. No API key
              required.
            </p>
            <Link
              href="/studio"
              className="mt-8 inline-block rounded-lg bg-[#F4F4F5] px-6 py-3 text-[14px] font-medium text-[#121214] transition-colors hover:bg-white"
            >
              Open Studio
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-[12px] text-[#71717a]">
          SignalPost · Engineering demo
        </p>
      </div>
    </section>
  );
}
