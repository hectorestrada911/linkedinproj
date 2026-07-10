"use client";

import { useState } from "react";
import { ChevronDown, ClipboardPaste, Compass, Globe, Loader2, Newspaper, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { AngleFinder, type AngleResult } from "@/components/angle-finder";
import { DocumentUpload } from "@/components/document-upload";
import { NewsSearcher } from "@/components/news-searcher";
import { WebsiteSource } from "@/components/website-source";
import { TONE_OPTIONS, type ArticlePreview, type NewsItem, type ToneStyle } from "@/types";

export type SourceMode = "paste" | "search" | "angle" | "url" | "upload";

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
  selectedNews: NewsItem | null;
  useArticleImage: boolean;
  articleImageUrl?: string;
  uploadedFileName: string | null;
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

const SOURCE_MODES: {
  id: SourceMode;
  label: string;
  hint: string;
  icon: typeof ClipboardPaste;
}[] = [
  { id: "paste", label: "Paste", hint: "Notes & headlines", icon: ClipboardPaste },
  { id: "search", label: "Search", hint: "AI news feed", icon: Newspaper },
  { id: "angle", label: "Angle", hint: "Auto-find hook", icon: Compass },
  { id: "url", label: "Website", hint: "Paste a URL", icon: Globe },
  { id: "upload", label: "Upload", hint: "PDF or doc", icon: Upload },
];

const fieldClass =
  "w-full rounded-lg border border-[#27272a] bg-[#0c0c0e] px-3 py-2.5 text-[14px] text-[#fafafa] placeholder:text-[#52525b] transition-colors focus:border-[#38bdf8]/40 focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/20";

export function InputPanel({ form, onChange, onGenerate, loading }: InputPanelProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const hasSource =
    form.pasteSource.trim().length > 0 ||
    form.aiNews.trim().length > 0 ||
    form.transcript.trim().length > 0;

  const activeTone = TONE_OPTIONS.find((t) => t.value === form.tone);

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
      <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-6">
        {/* Source */}
        <section className="rounded-xl border border-[#27272a] bg-[#0c0c0e]/50 p-4">
          <div className="flex items-baseline justify-between gap-4">
            <label className="flex items-center gap-2 text-[13px] font-medium text-[#fafafa]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]" />
              Source
            </label>
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
              className="text-[12px] text-[#71717a] transition-colors hover:text-[#7dd3fc]"
            >
              Load sample
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SOURCE_MODES.map((mode) => {
              const Icon = mode.icon;
              const active = form.sourceMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onChange({ sourceMode: mode.id })}
                  className={cn(
                    "flex flex-col items-start rounded-lg border px-3 py-2.5 text-left transition-all",
                    active
                      ? "border-[#38bdf8]/40 bg-[#38bdf8]/[0.08] shadow-[0_0_20px_rgba(56,189,248,0.12)]"
                      : "border-[#27272a] bg-[#09090b] hover:border-[#3f3f46] hover:bg-[#0c0c0e]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      active ? "text-[#7dd3fc]" : "text-[#52525b]"
                    )}
                  />
                  <span
                    className={cn(
                      "mt-2 text-[12px] font-medium",
                      active ? "text-[#fafafa]" : "text-[#a1a1aa]"
                    )}
                  >
                    {mode.label}
                  </span>
                  <span className="mt-0.5 text-[10px] text-[#52525b]">{mode.hint}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            {form.sourceMode === "paste" && (
              <div>
                <textarea
                  id="paste-source"
                  value={form.pasteSource}
                  onChange={(e) => onChange({ pasteSource: e.target.value })}
                  placeholder="Headlines, meeting notes, transcript…"
                  className={cn(fieldClass, "min-h-[200px] resize-none leading-relaxed bg-[#09090b]")}
                />
                {form.pasteSource.trim().length > 0 && (
                  <p className="mt-1.5 text-right text-[11px] tabular-nums text-[#52525b]">
                    {form.pasteSource.trim().length} chars
                  </p>
                )}
              </div>
            )}

            {form.sourceMode === "search" && (
              <NewsSearcher
                value={form.aiNews}
                selectedItem={form.selectedNews}
                useArticleImage={form.useArticleImage}
                onSelect={(item, text) =>
                  onChange({
                    aiNews: text,
                    selectedNews: item,
                    useArticleImage: !!item.imageUrl,
                    articleImageUrl: item.imageUrl,
                  })
                }
                onUseArticleImageChange={(useArticleImage) => onChange({ useArticleImage })}
              />
            )}

            {form.sourceMode === "url" && (
              <WebsiteSource
                value={form.pasteSource}
                articleImageUrl={form.articleImageUrl}
                useArticleImage={form.useArticleImage}
                onImport={(text, preview: ArticlePreview | null) =>
                  onChange({
                    pasteSource: text,
                    aiNews: text,
                    articleImageUrl: preview?.imageUrl,
                    useArticleImage: !!preview?.imageUrl,
                    selectedNews: null,
                  })
                }
                onUseArticleImageChange={(useArticleImage) => onChange({ useArticleImage })}
              />
            )}

            {form.sourceMode === "upload" && (
              <DocumentUpload
                fileName={form.uploadedFileName}
                onImport={(text, filename) =>
                  onChange({
                    pasteSource: text,
                    transcript: text,
                    uploadedFileName: filename,
                    selectedNews: null,
                    articleImageUrl: undefined,
                    useArticleImage: false,
                  })
                }
              />
            )}

            {form.sourceMode === "angle" && (
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
            )}
          </div>
        </section>

        {/* Voice */}
        <section className="mt-5 rounded-xl border border-[#27272a] bg-[#0c0c0e]/50 p-4">
          <label className="flex items-center gap-2 text-[13px] font-medium text-[#fafafa]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]" />
            Voice
          </label>

          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {TONE_OPTIONS.map((opt) => {
              const active = form.tone === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ tone: opt.value })}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-left transition-all",
                    active
                      ? "border-[#38bdf8]/40 bg-[#38bdf8]/[0.08] text-[#fafafa] shadow-[0_0_16px_rgba(56,189,248,0.1)]"
                      : "border-transparent bg-[#09090b] text-[#71717a] hover:border-[#27272a] hover:text-[#a1a1aa]"
                  )}
                >
                  <span className="text-[12px] font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {activeTone?.description && (
            <p className="mt-3 rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2 text-[12px] text-[#71717a]">
              {activeTone.description}
            </p>
          )}
        </section>

        {form.sourceMode !== "angle" && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="flex items-center gap-1 text-[13px] text-[#71717a] transition-colors hover:text-[#a1a1aa]"
            >
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", advancedOpen && "rotate-180")} />
              More options
            </button>
            {advancedOpen && (
              <div className="mt-3 space-y-2 rounded-xl border border-[#27272a] bg-[#0c0c0e]/50 p-4">
                <input
                  type="text"
                  value={form.topic}
                  onChange={(e) => onChange({ topic: e.target.value })}
                  placeholder="Topic"
                  className={fieldClass}
                />
                <input
                  type="text"
                  value={form.audience}
                  onChange={(e) => onChange({ audience: e.target.value })}
                  placeholder="Audience"
                  className={fieldClass}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-[#27272a] bg-[#0b0b0d] px-6 py-4">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!hasSource || loading}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg py-3 text-[14px] font-semibold transition-all",
            hasSource && !loading
              ? "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-[#04121c] shadow-[0_0_24px_rgba(56,189,248,0.25)] hover:shadow-[0_0_32px_rgba(56,189,248,0.4)]"
              : "cursor-not-allowed bg-[#18181b] text-[#52525b]"
          )}
        >
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-2">
              Generate
              {hasSource && (
                <kbd className="rounded border border-black/20 bg-black/10 px-1.5 py-0.5 text-[10px] font-medium">
                  ⌘↵
                </kbd>
              )}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
