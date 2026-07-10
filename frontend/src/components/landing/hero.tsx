"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/landing/hero-background";
import { HeroDemoAnimation } from "@/components/landing/hero-demo-animation";
import { GhostLink, PrimaryLink } from "@/components/landing/landing-ui";

const rise = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#050505]">
      <HeroBackground />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1280px] items-center px-6 pb-16 pt-24 lg:pt-28">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left - copy */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            className="text-left"
          >
            <motion.div
              variants={rise}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/25 bg-[#050505]/50 px-4 py-1.5 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
              <span className="text-[12px] font-medium text-[#7dd3fc]">
                From article to LinkedIn post in minutes
              </span>
            </motion.div>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[640px] text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#fafafa]"
            >
              <span className="bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#0ea5e9] bg-clip-text text-transparent">
                LinkedIn posts instantly:
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[480px] text-[17px] leading-[1.65] text-[#a1a1aa]"
            >
              SignalPost turns a URL, headline, or doc into a LinkedIn post that builds
              reach and credibility, in your voice, while the story is still relevant.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryLink href="/studio" className="gap-2">
                Open Studio
                <ArrowRight className="h-4 w-4" />
              </PrimaryLink>
              <GhostLink href="#sources">See how it works</GhostLink>
            </motion.div>
          </motion.div>

          {/* Right - live demo animation */}
          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <HeroDemoAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
