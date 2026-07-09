"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "signal",
    title: "Turn context into signal.",
    subtitle: "AI news × team conversations → LinkedIn posts that sound human.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2400&q=80",
    alt: "Team collaborating in a modern workspace",
  },
  {
    id: "context",
    title: "Your insight. Their feed.",
    subtitle: "Bridge internal conversations with breaking AI industry news.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2400&q=80",
    alt: "Creative professional planning content",
  },
  {
    id: "publish",
    title: "Ready to post.",
    subtitle: "Hooks, strategy, visuals, carousel — the full content package.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=80",
    alt: "Analytics dashboard on laptop",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0a0a0b]">
      {/* Cinematic backgrounds — Tesla */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/50 via-[#0a0a0b]/10 to-[#0a0a0b]/70" />
          <div className="absolute inset-0 bg-[#D4A853]/[0.03]" />
        </div>
      ))}

      {/* Grain — SignalPost texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.25]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Side arrows — Tesla */}
      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* Bottom content — Tesla layout + SignalPost typography */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-28 pt-20 text-center sm:pb-32">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A853]">
          LinkedIn Content Generator
        </p>
        <h1 className="max-w-3xl px-6 font-[family-name:var(--font-display)] text-[36px] font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-[56px]">
          {slide.title}
        </h1>
        <Link
          href="#spotlight"
          className="mt-2 max-w-md px-6 text-[14px] text-white/80 underline decoration-[#D4A853]/50 underline-offset-4 transition-colors hover:text-white hover:decoration-[#D4A853] sm:text-[15px]"
        >
          {slide.subtitle}
        </Link>

        {/* Dual CTAs — Tesla shape, SignalPost colors */}
        <div className="mt-8 flex w-full max-w-[360px] flex-col gap-3 px-6 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href="/studio"
            className="flex-1 rounded-md bg-[#D4A853] py-3 text-[14px] font-semibold text-[#0a0a0b] transition-colors hover:bg-[#E8C876] sm:min-w-[240px] sm:flex-none sm:px-10"
          >
            Launch Studio
          </Link>
          <Link
            href="#workflow"
            className="flex-1 rounded-md bg-white py-3 text-[14px] font-semibold text-[#0a0a0b] transition-colors hover:bg-white/90 sm:min-w-[240px] sm:flex-none sm:px-10"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Dots — Tesla */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={cn(
              "h-2.5 w-2.5 cursor-pointer rounded-full transition-all",
              i === active ? "scale-110 bg-[#D4A853]" : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </section>
  );
}
