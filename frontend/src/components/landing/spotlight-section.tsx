"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const SPOTLIGHT = [
  {
    id: "sources",
    tag: "Dual sources",
    title: "Connect AI news to what your team actually talks about.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    alt: "Abstract AI visualization",
  },
  {
    id: "voice",
    tag: "Tone engine",
    title: "Seven voices. Zero generic AI spam.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1600&q=80",
    alt: "Creative professional at work",
  },
  {
    id: "package",
    tag: "Full package",
    title: "Post, hooks, strategy, visuals. Everything to hit publish.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    alt: "Content analytics dashboard",
  },
];

export function SpotlightSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + SPOTLIGHT.length) % SPOTLIGHT.length);
  }, []);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SPOTLIGHT.length);
    }, 5500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  const slide = SPOTLIGHT[active];

  return (
    <section id="spotlight" className="border-t border-white/[0.06] bg-[#0a0a0b] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple-bold headline + SignalPost label */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A853]">
          Spotlight
        </p>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-[#FAFAF9] sm:text-4xl md:text-5xl">
            Built for operators who actually post.
          </h2>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-[#D4A853] transition-opacity hover:opacity-80"
          >
            <Play className="h-4 w-4 fill-current" />
            See the workflow
          </button>
        </div>
      </div>

      {/* Apple-style rounded card carousel */}
      <div className="relative mx-auto mt-12 max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#141416]">
          <div className="relative aspect-[16/10] sm:aspect-[16/9]">
            {SPOTLIGHT.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/90 via-[#0a0a0b]/30 to-transparent" />
              </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
              <span className="rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#D4A853]">
                {slide.tag}
              </span>
              <p className="mt-4 max-w-lg text-xl font-semibold leading-snug text-[#FAFAF9] sm:text-2xl">
                {slide.title}
              </p>
            </div>
          </div>

          {/* Pill controls - Apple shape, SignalPost colors */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/[0.08] bg-[#0a0a0b]/60 px-4 py-2 backdrop-blur-md">
            {SPOTLIGHT.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all",
                  i === active ? "w-6 bg-[#D4A853]" : "w-2 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
            <div className="mx-1 h-4 w-px bg-white/15" />
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying(!playing)}
              className="cursor-pointer text-white/70 transition-colors hover:text-white"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => goTo(active - 1)}
          className="absolute -left-1 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full border border-white/[0.08] bg-[#141416]/80 p-3 text-white backdrop-blur-sm transition-colors hover:bg-[#141416] sm:-left-4 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => goTo(active + 1)}
          className="absolute -right-1 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full border border-white/[0.08] bg-[#141416]/80 p-3 text-white backdrop-blur-sm transition-colors hover:bg-[#141416] sm:-right-4 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
