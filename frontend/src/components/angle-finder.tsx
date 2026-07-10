"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
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

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        placeholder="What are you building or writing about?"
        className="input-field py-2 text-[13px]"
      />
      <input
        type="text"
        value={audience}
        onChange={(e) => onAudienceChange(e.target.value)}
        placeholder="Target audience (optional)"
        className="input-field py-2 text-[13px]"
      />
      <textarea
        rows={3}
        value={sourceText}
        onChange={(e) => onSourceTextChange(e.target.value)}
        placeholder="Optional — paste notes or context to sharpen the angle"
        className="input-field min-h-[80px] text-[12px]"
      />

      <button
        type="button"
        onClick={findAngle}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#D4A853]/40 bg-[#D4A853]/10 py-2.5 text-[13px] font-medium text-[#E8C876] transition-colors hover:bg-[#D4A853]/15 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Finding angle…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Auto-find angle
          </>
        )}
      </button>

      {error && <p className="text-[12px] text-[#E85D4C]">{error}</p>}

      {result && (
        <div className="space-y-3 rounded-lg border border-[#2a2a2e] bg-[#242428] p-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#71717a]">Suggested angle</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#F4F4F5]">{result.angle}</p>
          </div>
          <p className="text-[11px] text-[#71717a]">{result.rationale}</p>
          <p className="text-[10px] text-[#71717a]">
            News + transcript populated — hit Generate when ready
            {result.mode === "mock" && " · demo mode"}
          </p>
        </div>
      )}
    </div>
  );
}
