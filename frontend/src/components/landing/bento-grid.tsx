import Image from "next/image";
import { LANDING_IMAGES } from "@/lib/landing-images";

const CAPABILITIES = [
  {
    label: "Input",
    title: "Dual-source input",
    description: "Paste AI news or fetch headlines. Add a team conversation when you have one.",
    image: LANDING_IMAGES.pasteSource,
  },
  {
    label: "Output",
    title: "Full content package",
    description: "Post, hooks, CTA, hashtags, image prompt, carousel, and video script.",
    image: LANDING_IMAGES.output,
  },
  {
    label: "Voice",
    title: "Seven tone modes",
    description: "Founder, technical, contrarian. Each with distinct rhythm and credibility.",
    image: LANDING_IMAGES.findAngle,
  },
  {
    label: "Score",
    title: "Post scoring",
    description: "Hook strength, clarity, originality, and readability on every run.",
    image: LANDING_IMAGES.workflow,
  },
  {
    label: "Strategy",
    title: "Strategy notes",
    description: "Why the angle works, who it's for, and what makes it credible.",
    image: LANDING_IMAGES.searchNews,
  },
  {
    label: "Ship",
    title: "Rewrite & export",
    description: "Shift tone in one click. Copy any block or export as Markdown.",
    image: LANDING_IMAGES.cta,
  },
];

export function BentoGrid() {
  return (
    <section id="product" className="border-t border-[#27272a] bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] text-[#fafafa]">
            Everything in one generation
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#71717a]">
            Post, hooks, strategy, scoring, and export, from a single source input.
          </p>
        </div>

        <div className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <article key={cap.title} className="flex flex-col">
              <div className="group relative aspect-square overflow-hidden">
                <Image
                  src={cap.image.src}
                  alt={cap.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/20 to-transparent" />
              </div>

              <div className="mt-5">
                <p className="text-[12px] font-medium uppercase tracking-wider text-[#52525b]">
                  {cap.label}
                </p>
                <h3 className="mt-1.5 text-[16px] font-semibold text-[#fafafa]">{cap.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#71717a]">
                  {cap.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
