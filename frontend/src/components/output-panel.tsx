"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  FileText,
  Hash,
  ImageIcon,
  Layers,
  Lightbulb,
  MessageSquare,
  RefreshCw,
  Zap,
} from "lucide-react";
import { LinkedInPreview } from "@/components/linkedin-preview";
import { SourceAnalysisPanel, StrategyPanel } from "@/components/strategy-panel";
import { CopyButton } from "@/components/ui/copy-button";
import { OutputList, OutputSection } from "@/components/ui/output-section";
import { PostScoreCard } from "@/components/ui/score-card";
import { cn, downloadTextFile, formatPackageAsMarkdown } from "@/lib/utils";
import { REWRITE_ACTIONS, type ContentPackage, type RewriteAction } from "@/types";

interface OutputPanelProps {
  pkg: ContentPackage | null;
  mode: "live" | "mock" | null;
  loading: boolean;
  onRegenerate: () => void;
  onRewrite: (action: RewriteAction) => void;
}

type Tab = "post" | "extras" | "strategy";

export function OutputPanel({
  pkg,
  loading,
  onRegenerate,
  onRewrite,
}: OutputPanelProps) {
  const [tab, setTab] = useState<Tab>("post");

  if (loading) {
    return (
      <div className="relative z-10 flex h-full flex-col">
        <LoadingState />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="relative z-10 flex h-full flex-col">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-[#2a2a2e] px-5 py-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[#FAFAF9]">Content package</h2>
          <p className="mt-0.5 text-[12px] text-[#8A8A8E]">
            {pkg.hashtags.length} hashtags · {pkg.hookOptions.length} hooks · score {pkg.postScore.overall}/10
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onRegenerate} className="btn-ghost rounded-lg px-2.5 py-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
          <button
            type="button"
            onClick={() => downloadTextFile(formatPackageAsMarkdown(pkg), "linkedin-content-package.md")}
            className="btn-secondary rounded-lg px-2.5 py-1.5 text-[12px]"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <CopyButton text={formatPackageAsMarkdown(pkg)} label="Copy all" className="rounded-lg" />
        </div>
      </div>

      {/* Pill tabs */}
      <div className="flex shrink-0 gap-1 border-b border-[#2a2a2e] px-5 py-3">
        {(
          [
            { id: "post" as Tab, label: "Post", icon: FileText },
            { id: "extras" as Tab, label: "Extras", icon: Layers },
            { id: "strategy" as Tab, label: "Strategy", icon: Zap },
          ] as const
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all",
              tab === id
                ? "bg-[#242428] text-[#F4F4F5]"
                : "text-[#71717a] hover:bg-[#242428]/50 hover:text-[#d4d4d8]"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
        {tab === "post" && (
          <div className="mx-auto max-w-2xl space-y-5 animate-fade-in">
            <LinkedInPreview post={pkg.finalPost} imageUrl={pkg.imageUrl} />

            <OutputList title="Hook options" items={pkg.hookOptions} numbered />

            <div className="grid gap-4 sm:grid-cols-2">
              <InsightCard icon={Lightbulb} title="Extracted insight" content={pkg.extractedInsight} accent="#D4A853" />
              <InsightCard icon={MessageSquare} title="AI news angle" content={pkg.aiNewsAngle} accent="#4ECDC4" />
            </div>

            <OutputSection title="CTA / Question" content={pkg.cta} />

            <div className="panel overflow-hidden">
              <div className="panel-header">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-[#8A8A8E]" />
                  <h3 className="text-sm font-semibold text-[#FAFAF9]">Hashtags</h3>
                </div>
                <CopyButton text={pkg.hashtags.join(" ")} />
              </div>
              <div className="panel-body">
                <div className="flex flex-wrap gap-2">
                  {pkg.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D4A853]/20 bg-[#D4A853]/10 px-3 py-1 text-xs font-medium text-[#D4A853]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel overflow-hidden">
              <div className="panel-header">
                <p className="text-sm font-semibold text-[#FAFAF9]">Quick rewrite</p>
              </div>
              <div className="panel-body flex flex-wrap gap-2">
                {REWRITE_ACTIONS.map((action) => (
                  <button
                    key={action.value}
                    type="button"
                    onClick={() => onRewrite(action.value)}
                    className="btn-secondary rounded-full px-4 py-1.5 text-[12px]"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {pkg.alternateVersions && pkg.alternateVersions.length > 0 && (
              <OutputList title="Alternate versions" items={pkg.alternateVersions} numbered />
            )}
          </div>
        )}

        {tab === "extras" && (
          <div className="mx-auto max-w-2xl space-y-5 animate-fade-in">
            <OutputSection title="Image prompt" content={pkg.imagePrompt} variant="code" />
            {pkg.imageUrl ? (
              <div className="panel overflow-hidden">
                <div className="panel-header">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-[#8A8A8E]" />
                    <h3 className="text-sm font-semibold text-[#FAFAF9]">Generated visual</h3>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image src={pkg.imageUrl} alt="Generated visual" fill className="object-cover" unoptimized />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/[0.08] p-10 text-center">
                <ImageIcon className="mx-auto h-8 w-8 text-[#8A8A8E]/40" />
                <p className="mt-3 text-[13px] text-[#8A8A8E]">
                  Enable visual generation in Advanced options
                </p>
              </div>
            )}
            {pkg.videoScript && (
              <OutputSection title="Video script" content={pkg.videoScript} variant="code" />
            )}
            {pkg.carouselOutline && pkg.carouselOutline.length > 0 && (
              <div className="panel overflow-hidden">
                <div className="panel-header">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#8A8A8E]" />
                    <h3 className="text-sm font-semibold text-[#FAFAF9]">Carousel outline</h3>
                  </div>
                  <CopyButton
                    text={pkg.carouselOutline.map((s, i) => `Slide ${i + 1}: ${s.title}\n${s.body}`).join("\n\n")}
                  />
                </div>
                <div className="panel-body space-y-3">
                  {pkg.carouselOutline.map((slide, i) => (
                    <div key={i} className="rounded-xl border border-white/[0.06] bg-[#0a0a0b] p-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4A853]">
                        Slide {i + 1}
                      </span>
                      <p className="mt-1 font-medium text-sm text-[#FAFAF9]">{slide.title}</p>
                      <p className="mt-1 text-sm text-[#8A8A8E]">{slide.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "strategy" && (
          <div className="mx-auto max-w-2xl space-y-5 animate-fade-in">
            <div className="panel overflow-hidden">
              <div className="panel-body">
                <PostScoreCard scores={pkg.postScore} />
              </div>
            </div>
            <StrategyPanel strategy={pkg.contentStrategy} />
            <SourceAnalysisPanel analysis={pkg.sourceAnalysis} />
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  const outputs = ["Post", "Hooks", "Strategy", "Score", "Hashtags", "Export"];

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8]/[0.05] blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Ghost LinkedIn preview */}
        <div className="overflow-hidden rounded-xl border border-[#27272a] bg-[#0c0c0e]/80 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          <div className="border-b border-[#27272a] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#38bdf8]/30 to-[#0ea5e9]/20" />
              <div className="space-y-1.5">
                <div className="h-2.5 w-24 rounded bg-[#27272a]" />
                <div className="h-2 w-16 rounded bg-[#1f1f23]" />
              </div>
            </div>
          </div>
          <div className="space-y-2.5 p-4">
            <div className="h-2.5 w-full rounded bg-[#27272a]" />
            <div className="h-2.5 w-[92%] rounded bg-[#27272a]" />
            <div className="h-2.5 w-[78%] rounded bg-[#1f1f23]" />
            <div className="h-2.5 w-[85%] rounded bg-[#1f1f23]" />
            <div className="mt-4 flex gap-2">
              <div className="h-5 w-14 rounded-full bg-[#38bdf8]/10" />
              <div className="h-5 w-16 rounded-full bg-[#38bdf8]/10" />
              <div className="h-5 w-12 rounded-full bg-[#38bdf8]/10" />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[14px] font-medium text-[#d4d4d8]">Your package appears here</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#52525b]">
            Add source material and hit Generate.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {outputs.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#27272a] bg-[#0c0c0e] px-2.5 py-1 text-[11px] text-[#71717a]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8]/[0.06] blur-[100px] animate-pulse" />

      <div className="relative w-full max-w-md space-y-4">
        <div className="overflow-hidden rounded-xl border border-[#27272a] bg-[#0c0c0e]/80 p-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="h-4 w-4 animate-spin text-[#38bdf8]" />
            <span className="text-[14px] font-medium text-[#d4d4d8]">Generating your package…</span>
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="h-2.5 w-full animate-pulse rounded bg-[#27272a]" />
            <div className="h-2.5 w-[90%] animate-pulse rounded bg-[#27272a]" style={{ animationDelay: "150ms" }} />
            <div className="h-2.5 w-[75%] animate-pulse rounded bg-[#1f1f23]" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
        <p className="text-center text-[12px] text-[#52525b]">
          Crafting post, hooks, strategy, and score
        </p>
      </div>
    </div>
  );
}

function InsightCard({
  icon: Icon,
  title,
  content,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  content: string;
  accent: string;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color: accent }} />
          <h3 className="text-sm font-semibold text-[#FAFAF9]">{title}</h3>
        </div>
        <CopyButton text={content} />
      </div>
      <div className="panel-body">
        <p className="text-sm leading-relaxed text-[#8A8A8E]">{content}</p>
      </div>
    </div>
  );
}
