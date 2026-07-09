"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudioHeaderProps {
  mode?: "live" | "mock" | null;
  score?: number | null;
}

export function StudioHeader({ mode, score }: StudioHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a2e]/80 bg-[#161618]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#8A8A8E] transition-colors hover:text-[#FAFAF9]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Home
          </Link>
          <div className="hidden h-4 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-md bg-[#D4A853]/20" />
              <span className="relative h-2 w-2 rounded-full bg-[#D4A853]" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Signal<span className="text-[#D4A853]">Post</span>
              <span className="ml-1.5 font-normal text-[#8A8A8E]">Studio</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {score != null && (
            <div className="hidden items-center gap-2 rounded-full border border-[#D4A853]/25 bg-[#D4A853]/10 px-3 py-1 sm:flex">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#D4A853]">
                Score
              </span>
              <span className="text-sm font-bold tabular-nums text-[#FAFAF9]">{score}/10</span>
            </div>
          )}
          {mode && (
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                mode === "live"
                  ? "bg-[#4ECDC4]/15 text-[#4ECDC4]"
                  : "bg-[#D4A853]/15 text-[#D4A853]"
              )}
            >
              {mode === "live" ? "Live AI" : "Demo"}
            </span>
          )}
          <Link
            href="/"
            className="hidden items-center gap-1 text-[12px] text-[#8A8A8E] transition-colors hover:text-[#FAFAF9] sm:inline-flex"
          >
            Landing
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
