"use client";

import Link from "next/link";

interface StudioHeaderProps {
  mode?: "live" | "mock" | null;
  score?: number | null;
}

export function StudioHeader({ mode, score }: StudioHeaderProps) {
  return (
    <header className="shrink-0 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-[1320px] items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[13px] font-medium text-[#fafafa]">SignalPost</span>
          </Link>
          <span className="text-[#3f3f46]">/</span>
          <span className="text-[13px] text-[#a1a1aa]">Studio</span>
        </div>
        <div className="flex items-center gap-3 text-[12px]">
          {score != null && (
            <span className="rounded-full border border-[#27272a] px-2.5 py-0.5 tabular-nums text-[#a1a1aa]">
              Score {score}/10
            </span>
          )}
          {mode && (
            <span className="inline-flex items-center gap-1.5 text-[#71717a]">
              <span
                className={
                  mode === "live"
                    ? "h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]"
                    : "h-1.5 w-1.5 rounded-full bg-[#52525b]"
                }
              />
              {mode === "live" ? "Live" : "Demo"}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
