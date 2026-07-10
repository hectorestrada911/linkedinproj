import Image from "next/image";
import Link from "next/link";
import { LANDING_IMAGES } from "@/lib/landing-images";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#121214]">
      <div className="absolute inset-0">
        <Image
          src={LANDING_IMAGES.hero.src}
          alt={LANDING_IMAGES.hero.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-[#121214]/85 to-[#121214]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/40" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32">
        <p className="max-w-xl text-[13px] font-medium uppercase tracking-[0.18em] text-[#a1a1aa]">
          LinkedIn content studio
        </p>
        <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-[#F4F4F5] sm:text-5xl md:text-6xl">
          Turn team context and AI news into posts worth publishing.
        </h1>
        <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#a1a1aa]">
          Paste a source, search headlines, or auto-find an angle — then generate a full
          LinkedIn package in one pass.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/studio"
            className="rounded-lg bg-[#F4F4F5] px-6 py-3 text-[14px] font-medium text-[#121214] transition-colors hover:bg-white"
          >
            Open Studio
          </Link>
          <Link
            href="#sources"
            className="rounded-lg border border-[#3f3f46] bg-[#121214]/50 px-6 py-3 text-[14px] font-medium text-[#d4d4d8] backdrop-blur-sm transition-colors hover:border-[#52525b] hover:text-[#F4F4F5]"
          >
            See source modes
          </Link>
        </div>
      </div>
    </section>
  );
}
