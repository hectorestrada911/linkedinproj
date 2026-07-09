"use client";

import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewsFetcher } from "@/components/news-fetcher";
import { TONE_OPTIONS, type ToneStyle } from "@/types";

export interface InputFormState {
  aiNews: string;
  transcript: string;
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

const SAMPLE_NEWS = `[TechCrunch · Model Release] OpenAI launches GPT-5 with native agent orchestration

The new model introduces persistent task memory and multi-step tool use, positioning it as a direct competitor to enterprise agent platforms. Early benchmarks show 40% improvement on long-horizon coding tasks.`;

const SAMPLE_TRANSCRIPT = `Person A: Our team spends too much time turning meeting notes into content.
Person B: The issue is not generating text, it is preserving context and tone.
Person A: Exactly. We need something that turns messy discussion into something publishable.
Person B: And it has to connect to what's actually happening in AI right now, not generic takes.
Person A: If we could bridge internal conversations with industry news, that would be our edge.`;

export { SAMPLE_NEWS, SAMPLE_TRANSCRIPT };

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div>
        <label className="text-[13px] font-medium text-[#F4F4F5]">{label}</label>
        {hint && <p className="mt-0.5 text-[12px] text-[#a1a1aa]">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

export function InputPanel({ form, onChange, onGenerate, loading }: InputPanelProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const canGenerate = form.aiNews.trim().length > 0 || form.transcript.trim().length > 0;

  return (
    <div className="flex h-full flex-col">
      <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] leading-relaxed text-[#a1a1aa]">
            Add news and/or a transcript, then generate.
          </p>
          <button
            type="button"
            onClick={() => onChange({ aiNews: SAMPLE_NEWS, transcript: SAMPLE_TRANSCRIPT })}
            className="shrink-0 rounded-md border border-[#2a2a2e] bg-[#242428] px-2.5 py-1 text-[12px] text-[#d4d4d8] transition-colors hover:border-[#3f3f46] hover:text-[#F4F4F5]"
          >
            Load sample
          </button>
        </div>

        <div className="space-y-5 rounded-xl border border-[#2a2a2e] bg-[#1e1e22] p-4 shadow-sm shadow-black/10">
          <Field label="AI news" hint="Headlines, launches, funding">
            <textarea
              id="ai-news"
              rows={5}
              value={form.aiNews}
              onChange={(e) => onChange({ aiNews: e.target.value })}
              placeholder="Paste a story or headline…"
              className="input-field min-h-[120px]"
            />
            <div className="mt-2">
              <NewsFetcher onSelect={(text) => onChange({ aiNews: text })} />
            </div>
          </Field>

          <Field label="Conversation transcript" hint="Meeting notes, Slack thread, internal discussion">
            <textarea
              id="transcript"
              rows={6}
              value={form.transcript}
              onChange={(e) => onChange({ transcript: e.target.value })}
              placeholder={"Person A: …\nPerson B: …"}
              className="input-field min-h-[140px] font-mono text-[12px]"
            />
          </Field>
        </div>

        <Field label="Voice">
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
        </Field>

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
      </div>

      <div className="shrink-0 border-t border-[#2a2a2e] bg-[#1a1a1d]/90 px-5 py-4 backdrop-blur-sm">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!canGenerate || loading}
          className={cn(
            "w-full rounded-xl py-2.5 text-[14px] font-semibold transition-all",
            canGenerate
              ? "btn-primary shadow-md shadow-[#D4A853]/15"
              : "cursor-not-allowed bg-[#242428] text-[#71717a]"
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
        {canGenerate && (
          <p className="mt-2 text-center text-[11px] text-[#71717a]">⌘ + Enter</p>
        )}
      </div>
    </div>
  );
}
