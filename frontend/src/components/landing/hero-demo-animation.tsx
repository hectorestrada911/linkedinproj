"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Globe, Heart, Loader2, MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import { LANDING_IMAGES } from "@/lib/landing-images";

type Phase = "typing" | "click" | "fetching" | "post";

const DEMO_URL = "techcrunch.com/2026/03/ai-agents-enterprise";
const ARTICLE = {
  source: "TechCrunch",
  title: "OpenAI expands enterprise agent tools",
  image: LANDING_IMAGES.findAngle.src,
};

const POST = `Most teams don't need another AI tool.

They need better context transfer.

We read this headline this morning and shipped a founder take before lunch.`;

const PHASE_MS: Record<Phase, number> = {
  typing: 2800,
  click: 700,
  fetching: 1400,
  post: 5500,
};

const ORDER: Phase[] = ["typing", "click", "fetching", "post"];

export function HeroDemoAnimation() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedUrl, setTypedUrl] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    setTypedUrl("");
    setShowCursor(false);
    const interval = setInterval(() => {
      i += 1;
      setTypedUrl(DEMO_URL.slice(0, i));
      if (i >= DEMO_URL.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(true), 400);
      }
    }, 42);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
    }, PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const goActive = phase === "click" || phase === "fetching" || phase === "post";
  const urlComplete = typedUrl.length >= DEMO_URL.length;

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[520px]">
      <div className="pointer-events-none absolute -inset-10 rounded-3xl bg-[#38bdf8]/12 blur-[90px]" />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#050505]/75 shadow-[0_32px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]/80" />
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]/80" />
            <span className="h-2 w-2 rounded-full bg-[#22c55e]/80" />
          </div>
          <span className="text-[11px] text-[#52525b]">SignalPost Studio</span>
        </div>

        <div className="relative p-5">
          {/* Step label */}
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span className="text-[12px] font-medium text-[#fafafa]">Paste a website</span>
          </div>

          {/* URL bar + Go */}
          <div className="relative">
            <div className="flex overflow-hidden rounded-xl border border-[#27272a] bg-[#09090b]">
              <span className="flex shrink-0 items-center border-r border-[#27272a] px-3 text-[11px] text-[#52525b]">
                https://
              </span>
              <div className="flex min-h-[44px] flex-1 items-center px-3">
                <span className="truncate font-mono text-[12px] text-[#d4d4d8]">
                  {phase === "typing" ? typedUrl : DEMO_URL}
                  {phase === "typing" && urlComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.7 }}
                      className="ml-px inline-block h-3.5 w-px bg-[#38bdf8]"
                    />
                  )}
                </span>
              </div>
              <motion.div
                animate={
                  phase === "click"
                    ? { scale: 0.94, backgroundColor: "rgba(56,189,248,0.35)" }
                    : goActive
                      ? { backgroundColor: "rgba(56,189,248,0.2)" }
                      : {}
                }
                transition={{ duration: 0.15 }}
                className="flex shrink-0 items-center gap-1.5 border-l border-[#27272a] bg-[#38bdf8]/10 px-4 text-[12px] font-semibold text-[#7dd3fc]"
              >
                Go
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.div>
            </div>

            {/* Animated cursor */}
            <AnimatePresence>
              {showCursor && (phase === "typing" || phase === "click") && (
                <motion.div
                  initial={{ opacity: 0, x: 120, y: 60 }}
                  animate={{
                    opacity: 1,
                    x: phase === "click" ? 200 : 160,
                    y: phase === "click" ? 38 : 48,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: phase === "click" ? 0.2 : 0.6, ease: "easeOut" }}
                  className="pointer-events-none absolute z-20"
                  style={{ right: 0, top: 0 }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                    <path
                      d="M5 3L5 19L9 15L13 21L15 20L11 14L17 14L5 3Z"
                      fill="#fafafa"
                      stroke="#050505"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {phase === "click" && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-1 top-1 h-4 w-4 rounded-full bg-[#38bdf8]"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Output area */}
          <div className="relative mt-5 min-h-[340px]">
            <AnimatePresence mode="wait">
              {(phase === "typing" || phase === "click") && (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#09090b]/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#27272a] bg-[#0c0c0e]">
                    <Send className="h-4 w-4 text-[#52525b]" />
                  </div>
                  <p className="mt-3 text-[13px] text-[#52525b]">LinkedIn post will appear here</p>
                </motion.div>
              )}

              {phase === "fetching" && (
                <motion.div
                  key="fetching"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex h-[280px] flex-col items-center justify-center rounded-xl border border-[#27272a] bg-[#09090b]"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-[#38bdf8]" />
                  <p className="mt-4 text-[13px] font-medium text-[#a1a1aa]">Reading article…</p>
                  <p className="mt-1 text-[11px] text-[#52525b]">Drafting in founder voice</p>
                  <div className="mt-6 w-48 space-y-2">
                    {[100, 85, 70].map((w, i) => (
                      <motion.div
                        key={i}
                        className="h-2 rounded-full bg-[#27272a]"
                        style={{ width: `${w}%` }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === "post" && (
                <motion.div
                  key="post"
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden rounded-xl border border-[#38bdf8]/25 bg-[#0a0a0b] shadow-[0_0_48px_rgba(56,189,248,0.15)]"
                >
                  {/* LinkedIn header strip */}
                  <div className="border-b border-[#27272a] bg-[#0c0c0e] px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#38bdf8]">
                      LinkedIn · Preview
                    </p>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[#38bdf8]/50 to-[#0ea5e9]/20" />
                      <div>
                        <p className="text-[13px] font-semibold text-[#fafafa]">You</p>
                        <p className="text-[11px] text-[#52525b]">Founder · Building with AI</p>
                        <p className="text-[10px] text-[#52525b]">Just now · 🌐</p>
                      </div>
                      <span className="ml-auto rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-2 py-0.5 text-[10px] tabular-nums text-[#7dd3fc]">
                        8.6
                      </span>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      {POST.split("\n\n").map((para, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.18, duration: 0.4 }}
                          className="text-[13px] leading-relaxed text-[#e4e4e7]"
                        >
                          {para}
                        </motion.p>
                      ))}
                    </div>

                    {/* Article image - pulled from URL */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.45 }}
                      className="mt-4 overflow-hidden rounded-lg border border-[#27272a]"
                    >
                      <div className="relative aspect-[1.91/1] w-full bg-[#18181b]">
                        <Image
                          src={ARTICLE.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="400px"
                        />
                      </div>
                      <div className="border-t border-[#27272a] bg-[#0c0c0e] px-3 py-2">
                        <p className="text-[10px] text-[#52525b]">{ARTICLE.source}</p>
                        <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-[#a1a1aa]">
                          {ARTICLE.title}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                      className="mt-3 flex flex-wrap gap-1.5"
                    >
                      {["#AI", "#Startups", "#Founders"].map((tag) => (
                        <span key={tag} className="text-[11px] text-[#38bdf8]">
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="mt-3 flex items-center justify-between border-t border-[#27272a] pt-3 text-[#52525b]"
                    >
                      <span className="flex items-center gap-1 text-[10px]">
                        <ThumbsUp className="h-3 w-3" /> Like
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <MessageCircle className="h-3 w-3" /> Comment
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Repeat2 className="h-3 w-3" /> Repost
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Send className="h-3 w-3" /> Send
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-between border-t border-[#27272a] bg-[#38bdf8]/5 px-4 py-2.5"
                  >
                    <span className="flex items-center gap-1.5 text-[11px] text-[#7dd3fc]">
                      <Heart className="h-3 w-3" />
                      Post + article image ready
                    </span>
                    <span className="rounded-md bg-[#38bdf8] px-2.5 py-1 text-[10px] font-semibold text-[#04121c]">
                      Copy post
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Step pills */}
      <div className="mt-4 flex justify-center gap-2">
        {[
          { id: "typing", label: "Paste URL" },
          { id: "click", label: "Go" },
          { id: "fetching", label: "Generate" },
          { id: "post", label: "Post" },
        ].map(({ id, label }) => (
          <span
            key={id}
            className={`rounded-full px-2.5 py-1 text-[10px] transition-colors ${
              phase === id
                ? "bg-[#38bdf8]/15 text-[#7dd3fc]"
                : "text-[#52525b]"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
