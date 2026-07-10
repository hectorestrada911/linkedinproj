"use client";

import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";
import { InputPanel, type InputFormState } from "@/components/input-panel";
import { OutputPanel } from "@/components/output-panel";
import { StudioHeader } from "@/components/studio/studio-header";
import type { ContentPackage, GenerateResponse, RewriteAction } from "@/types";

const DEFAULT_FORM: InputFormState = {
  sourceMode: "paste",
  pasteSource: "",
  aiNews: "",
  transcript: "",
  suggestedAngle: "",
  angleRationale: "",
  angleMode: null,
  topic: "",
  audience: "",
  tone: "founder",
  generateImage: false,
  selectedNews: null,
  useArticleImage: false,
  articleImageUrl: undefined,
  uploadedFileName: null,
};

function buildGeneratePayload(form: InputFormState) {
  let aiNews = form.aiNews;
  let transcript = form.transcript;

  if (
    (form.sourceMode === "paste" ||
      form.sourceMode === "url" ||
      form.sourceMode === "upload") &&
    form.pasteSource.trim()
  ) {
    const parts = form.pasteSource.split(/\n\n+/);
    const newsPart = parts.find(
      (p) => p.trim().startsWith("[") || /^(TechCrunch|Reuters|Bloomberg|The Verge)/i.test(p.trim())
    );
    const convParts = parts.filter((p) => p !== newsPart);
    aiNews = newsPart?.trim() || aiNews;
    transcript = convParts.join("\n\n").trim() || form.pasteSource;
  }

  return {
    aiNews,
    transcript,
    topic: form.topic || undefined,
    audience: form.audience || undefined,
    tone: form.tone,
    generateImage: form.generateImage,
    sourceImageUrl:
      form.useArticleImage && (form.selectedNews?.imageUrl || form.articleImageUrl)
        ? form.selectedNews?.imageUrl ?? form.articleImageUrl
        : undefined,
  };
}

function hasSourceMaterial(form: InputFormState): boolean {
  return (
    form.pasteSource.trim().length > 0 ||
    form.aiNews.trim().length > 0 ||
    form.transcript.trim().length > 0
  );
}

export default function StudioPage() {
  const [form, setForm] = useState<InputFormState>(DEFAULT_FORM);
  const [pkg, setPkg] = useState<ContentPackage | null>(null);
  const [mode, setMode] = useState<"live" | "mock" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (overrides?: { rewriteAction?: RewriteAction; previousPackage?: ContentPackage }) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(apiUrl("/api/generate"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...buildGeneratePayload(form),
            ...overrides,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error ?? "Generation failed");
        }

        const data: GenerateResponse = await res.json();
        setPkg(data.package);
        setMode(data.mode);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!loading && hasSourceMaterial(form)) generate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [form, loading, generate]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#09090b] font-[family-name:var(--font-landing)] text-[#fafafa]">
      <StudioHeader mode={mode} score={pkg?.postScore.overall ?? null} />

      {error && (
        <div className="shrink-0 border-b border-[#ef4444]/30 bg-[#ef4444]/5 px-6 py-2 text-[13px] text-[#fca5a5]">
          {error}
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col overflow-hidden lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-[#27272a] bg-[#0b0b0d] lg:w-[420px] lg:border-r">
          <InputPanel
            form={form}
            onChange={(updates) => setForm((prev) => ({ ...prev, ...updates }))}
            onGenerate={() => generate()}
            loading={loading}
          />
        </aside>

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #27272a 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#38bdf8]/[0.03] via-transparent to-transparent" />
          <OutputPanel
            pkg={pkg}
            mode={mode}
            loading={loading}
            onRegenerate={() => generate()}
            onRewrite={(action) =>
              generate({ rewriteAction: action, previousPackage: pkg ?? undefined })
            }
          />
        </main>
      </div>
    </div>
  );
}
