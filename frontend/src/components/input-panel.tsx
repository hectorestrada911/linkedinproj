"use client";

import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AngleFinder, type AngleResult } from "@/components/angle-finder";
import { NewsSearcher } from "@/components/news-searcher";
import { TONE_OPTIONS, type ToneStyle } from "@/types";

export type SourceMode = "paste" | "search" | "angle";

export interface InputFormState {
  sourceMode: SourceMode;
  pasteSource: string;
  aiNews: string;
  transcript: string;
  suggestedAngle: string;
  angleRationale: string;
  angleMode: "live" | "mock" | null;
  topic: string;
  audience: string;
  tone: ToneStyle;
  generateImage: boolean;
}

interface InputPanelProps {
  form: InputFormState;
  onChange: (updates: Partial<InputFormState>) => void;
  onGenerate: () => void;
  loading: boolean;
}

const SAMPLE_PASTE = `Person A: Our team spends too much time turning meeting notes into content.
Person B: The issue is not generating text, it is preserving context and tone.
Person A: If we could bridge internal conversations with industry news, that would be our edge.

[TechCrunch · Model Release] OpenAI launches GPT-5 with native agent orchestration
The new model introduces persistent task memory and multi-step tool use.`;

const SOURCE_MODES: { id: SourceMode; label: string }[] = [
  { id: "paste", label: "Paste Source" },
  { id: "search", label: "Search AI News" },
  { id: "angle", label: "Auto-Find Angle" },
];

export function InputPanel({ form, onChange, onGenerate, loading }: InputPanelProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const hasSource =
    form.pasteSource.trim().length > 0 ||
    form.aiNews.trim().length > 0 ||
    form.transcript.trim().length > 0;

  function handleAngleResult(result: AngleResult) {
    onChange({
      suggestedAngle: result.angle,
      angleRationale: result.rationale,
      angleMode: result.mode,
      aiNews: result.aiNews,
      transcript: result.transcript,
      topic: form.topic || result.angle.slice(0, 80),
    });
  }

  return (
    <div className="flex h-full flex-col">
      <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] leading-relaxed text-[#a1a1aa]">Choose how to add source material.</p>
          <button
            type="button"
            onClick={() =>
              onChange({
                sourceMode: "paste",
                pasteSource: SAMPLE_PASTE,
                aiNews: "",
                transcript: "",
                suggestedAngle: "",
                angleRationale: "",
                angleMode: null,
              })
            }
            className="shrink-0 rounded-md border border-[#2a2a2e] bg-[#242428] px-2.5 py-1 text-[12px] text-[#d4d4d8] transition-colors hover:border-[#3f3f46] hover:text-[#F4F4F5]"
          >
            Load sample
          </button>
        </div>

        {/* Source mode selector */}
        <div className="flex rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] p-1">
          {SOURCE_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange({ sourceMode: mode.id })}
              className={cn(
                "flex-1 rounded-md px-2 py-2 text-[11px] font-medium transition-all sm:text-[12px]",
                form.sourceMode === mode.id
                  ? "bg-[#242428] text-[#F4F4F5] shadow-sm"
                  : "text-[#71717a] hover:text-[#a1a1aa]"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1e1e22] p-4 shadow-sm shadow-black/10">
          {form.sourceMode === "paste" && (
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[#F4F4F5]">Paste source</label>
              <p className="text-[12px] text-[#71717a]">
                News, meeting notes, Slack thread, or any raw material.
              </p>
              <textarea
                id="paste-source"
                rows={10}
                value={form.pasteSource}
                onChange={(e) => onChange({ pasteSource: e.target.value })}
                placeholder="Paste headlines, transcripts, notes…"
                className="input-field min-h-[200px] font-mono text-[12px]"
              />
            </div>
          )}

          {form.sourceMode === "search" && (
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[#F4F4F5]">Search AI news</label>
              <p className="text-[12px] text-[#71717a]">Find a story, then select it as your source.</p>
              <NewsSearcher value={form.aiNews} onSelect={(text) => onChange({ aiNews: text })} />
            </div>
          )}

          {form.sourceMode === "angle" && (
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[#F4F4F5]">Auto-find angle</label>
              <p className="text-[12px] text-[#71717a]">
                We match recent AI news to your topic and draft the angle for you.
              </p>
              <AngleFinder
                topic={form.topic}
                audience={form.audience}
                sourceText={form.pasteSource}
                result={
                  form.suggestedAngle
                    ? {
                        angle: form.suggestedAngle,
                        aiNews: form.aiNews,
                        transcript: form.transcript,
                        rationale: form.angleRationale,
                        mode: form.angleMode ?? "mock",
                      }
                    : null
                }
                onTopicChange={(topic) => onChange({ topic })}
                onAudienceChange={(audience) => onChange({ audience })}
                onSourceTextChange={(pasteSource) => onChange({ pasteSource })}
                onResult={handleAngleResult}
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-[#F4F4F5]">Voice</label>
          <div className="flex flex-wrap gap-2">
            {TONE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ tone: opt.value })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all",
                  form.tone === opt.value
                    ? "border-[#D4A853]/50 bg-[#D4A853]/15 text-[#E8C876]"
                    : "border-[#2a2a2e] bg-[#242428] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#F4F4F5]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {form.sourceMode !== "angle" && (
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1e1e22]">
            <button
              type="button"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-[13px] text-[#a1a1aa] hover:text-[#F4F4F5]"
            >
              <span>Advanced options</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", advancedOpen && "rotate-180")} />
            </button>
            {advancedOpen && (
              <div className="space-y-3 border-t border-[#2a2a2e] px-4 pb-4 pt-3">
                <input
                  type="text"
                  value={form.topic}
                  onChange={(e) => onChange({ topic: e.target.value })}
                  placeholder="Topic"
                  className="input-field py-2 text-[13px]"
                />
                <input
                  type="text"
                  value={form.audience}
                  onChange={(e) => onChange({ audience: e.target.value })}
                  placeholder="Audience"
                  className="input-field py-2 text-[13px]"
                />
                <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#a1a1aa]">
                  <input
                    type="checkbox"
                    checked={form.generateImage}
                    onChange={(e) => onChange({ generateImage: e.target.checked })}
                    className="rounded border-[#3f3f46]"
                  />
                  Generate image (DALL-E)
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-[#2a2a2e] bg-[#1a1a1d]/90 px-5 py-4 backdrop-blur-sm">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!hasSource || loading}
          className={cn(
            "w-full rounded-xl py-2.5 text-[14px] font-semibold transition-all",
            hasSource ? "btn-primary shadow-md shadow-[#D4A853]/15" : "cursor-not-allowed bg-[#242428] text-[#71717a]"
          )}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </span>
          ) : (
            "Generate"
          )}
        </button>
        {hasSource && <p className="mt-2 text-center text-[11px] text-[#71717a]">⌘ + Enter</p>}
      </div>
    </div>
  );
}
