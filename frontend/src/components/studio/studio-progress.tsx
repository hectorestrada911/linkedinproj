"use client";

interface StudioProgressProps {
  hasNews: boolean;
  hasTranscript: boolean;
  hasOutput: boolean;
}

export function StudioProgress({ hasNews, hasTranscript, hasOutput }: StudioProgressProps) {
  if (hasOutput) return null;

  const ready = hasNews || hasTranscript;

  return (
    <div className="px-5 pb-1 pt-0.5">
      <p className="text-[12px] text-[#71717a]">
        {ready ? (
          <>
            <span className="text-[#4ECDC4]">●</span> Ready to generate
          </>
        ) : (
          "Add source material to get started"
        )}
      </p>
    </div>
  );
}
