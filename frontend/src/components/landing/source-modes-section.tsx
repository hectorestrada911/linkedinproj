import Image from "next/image";
import Link from "next/link";
import { LANDING_IMAGES, SOURCE_MODES } from "@/lib/landing-images";

export function SourceModesSection() {
  return (
    <section id="sources" className="border-t border-[#2a2a2e] bg-[#161618] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Single editorial image — not three card crops */}
          <div className="relative aspect-[5/6] overflow-hidden rounded-2xl border border-[#2a2a2e] lg:sticky lg:top-24">
            <Image
              src={LANDING_IMAGES.findAngle.src}
              alt={LANDING_IMAGES.findAngle.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Three ways to start
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a1a1aa]">
              Same pipeline out — pick the input that matches how you work.
            </p>

            <ol className="mt-10 divide-y divide-[#2a2a2e] border-y border-[#2a2a2e]">
              {SOURCE_MODES.map((mode, i) => (
                <li key={mode.id} className="py-6">
                  <div className="flex gap-5">
                    <span className="mt-0.5 font-mono text-[12px] tabular-nums text-[#71717a]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-medium text-[#F4F4F5]">{mode.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-[#a1a1aa]">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/studio"
              className="mt-8 inline-block text-[14px] font-medium text-[#F4F4F5] underline decoration-[#3f3f46] underline-offset-4 transition-colors hover:decoration-[#71717a]"
            >
              Open Studio →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
