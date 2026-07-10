"use client";

import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";
import { InputPanel, type InputFormState } from "@/components/input-panel";
import { OutputPanel } from "@/components/output-panel";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioProgress } from "@/components/studio/studio-progress";
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
};

function buildGeneratePayload(form: InputFormState) {
  let aiNews = form.aiNews;
  let transcript = form.transcript;

  if (form.sourceMode === "paste" && form.pasteSource.trim()) {
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
    <div className="studio-theme flex h-screen flex-col overflow-hidden font-[family-name:var(--font-landing)]">
      <StudioHeader mode={mode} score={pkg?.postScore.overall ?? null} />

      <StudioProgress
        sourceMode={form.sourceMode}
        hasSource={hasSourceMaterial(form)}
        hasOutput={!!pkg}
      />

      {error && (
        <div className="mx-4 mt-3 shrink-0 rounded-xl border border-[#E85D4C]/30 bg-[#E85D4C]/10 px-4 py-2.5 text-sm text-[#FAFAF9] sm:mx-6">
          {error}
        </div>
      )}

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 overflow-hidden px-4 pb-4 pt-3 lg:grid-cols-[400px_1fr] lg:gap-4">
        <aside className="studio-sidebar flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#2a2a2e] shadow-lg shadow-black/20">
          <InputPanel
            form={form}
            onChange={(updates) => setForm((prev) => ({ ...prev, ...updates }))}
            onGenerate={() => generate()}
            loading={loading}
          />
        </aside>

        <main className="studio-canvas flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-[#2a2a2e] shadow-lg shadow-black/20">
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
