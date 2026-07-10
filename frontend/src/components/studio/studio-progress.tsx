"use client";

import type { SourceMode } from "@/components/input-panel";

interface StudioProgressProps {
  sourceMode: SourceMode;
  hasSource: boolean;
  hasOutput: boolean;
}

const MODE_HINT: Record<SourceMode, string> = {
  paste: "Paste headlines, notes, or a transcript",
  search: "Search and select an AI news story",
  angle: "Describe your topic, then auto-find an angle",
};

export function StudioProgress({ sourceMode, hasSource, hasOutput }: StudioProgressProps) {
  if (hasOutput) return null;

  return (
    <div className="px-5 pb-1 pt-0.5">
      <p className="text-[12px] text-[#71717a]">
        {hasSource ? (
          <>
            <span className="text-[#4ECDC4]">●</span> Ready to generate
          </>
        ) : (
          MODE_HINT[sourceMode]
        )}
      </p>
    </div>
  );
}
