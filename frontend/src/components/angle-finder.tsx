"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { apiUrl } from "@/lib/api";

export interface AngleResult {
  angle: string;
  aiNews: string;
  transcript: string;
  rationale: string;
  mode: "live" | "mock";
}

interface AngleFinderProps {
  topic: string;
  audience: string;
  sourceText: string;
  result: AngleResult | null;
  onTopicChange: (topic: string) => void;
  onAudienceChange: (audience: string) => void;
  onSourceTextChange: (text: string) => void;
  onResult: (result: AngleResult) => void;
}

export function AngleFinder({
  topic,
  audience,
  sourceText,
  result,
  onTopicChange,
  onAudienceChange,
  onSourceTextChange,
  onResult,
}: AngleFinderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function findAngle() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("/api/angle"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic || undefined,
          audience: audience || undefined,
          sourceText: sourceText || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to find angle");
      }
      const data = (await res.json()) as AngleResult;
      onResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-md border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-[14px] text-[#fafafa] placeholder:text-[#52525b] focus:border-[#52525b] focus:outline-none";

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        placeholder="What are you building or writing about?"
        className={fieldClass}
      />
      <input
        type="text"
        value={audience}
        onChange={(e) => onAudienceChange(e.target.value)}
        placeholder="Target audience (optional)"
        className={fieldClass}
      />
      <textarea
        rows={3}
        value={sourceText}
        onChange={(e) => onSourceTextChange(e.target.value)}
        placeholder="Optional context: notes, transcript, or background"
        className={`${fieldClass} min-h-[80px] resize-none`}
      />

      <button
        type="button"
        onClick={findAngle}
        disabled={loading || !topic.trim()}
        className="w-full rounded-md border border-[#27272a] py-2.5 text-[13px] text-[#fafafa] hover:bg-[#18181b] disabled:opacity-40"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Finding angle…
          </span>
        ) : (
          "Find angle"
        )}
      </button>

      {error && <p className="text-[12px] text-[#ef4444]">{error}</p>}

      {result && (
        <div className="rounded-md border border-[#27272a] p-4">
          <p className="text-[13px] leading-relaxed text-[#fafafa]">{result.angle}</p>
          <p className="mt-2 text-[12px] leading-relaxed text-[#52525b]">{result.rationale}</p>
          <p className="mt-3 text-[11px] text-[#52525b]">
            Source populated. Hit Generate when ready
            {result.mode === "mock" && " · demo mode"}
          </p>
        </div>
      )}
    </div>
  );
}
