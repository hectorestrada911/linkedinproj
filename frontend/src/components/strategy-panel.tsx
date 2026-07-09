"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentStrategy } from "@/types";

interface StrategyPanelProps {
  strategy: ContentStrategy;
}

const FIELDS: { key: keyof ContentStrategy; label: string }[] = [
  { key: "whyThisAngle", label: "Why this angle works" },
  { key: "targetAudience", label: "Target audience" },
  { key: "emotionalAngle", label: "Emotional angle" },
  { key: "credibilityAngle", label: "Credibility angle" },
  { key: "suggestedPostingStyle", label: "Suggested posting style" },
];

export function StrategyPanel({ strategy }: StrategyPanelProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="panel-header w-full cursor-pointer transition-colors hover:bg-[hsl(var(--muted))]/30"
      >
        <h3 className="text-sm font-semibold text-ink">Content Strategy</h3>
        {open ? (
          <ChevronUp className="h-4 w-4 text-ink-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-ink-muted" />
        )}
      </button>
      {open && (
        <div className="panel-body space-y-4">
          {FIELDS.map(({ key, label }) => (
            <div key={key}>
              <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-subtle">
                {label}
              </dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{strategy[key]}</dd>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SourceAnalysisPanelProps {
  analysis: {
    keyFacts: string[];
    painPoints: string[];
    insights: string[];
    contentAngle: string;
  };
}

export function SourceAnalysisPanel({ analysis }: SourceAnalysisPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="panel-header w-full cursor-pointer transition-colors hover:bg-[hsl(var(--muted))]/30"
      >
        <h3 className="text-sm font-semibold text-ink">Source Analysis</h3>
        {open ? (
          <ChevronUp className="h-4 w-4 text-ink-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-ink-muted" />
        )}
      </button>
      {open && (
        <div className="panel-body space-y-5">
          <AnalysisGroup title="Key facts from AI news" items={analysis.keyFacts} color="blue" />
          <AnalysisGroup title="Pain points from transcript" items={analysis.painPoints} color="amber" />
          <AnalysisGroup title="Extracted insights" items={analysis.insights} color="emerald" />
          <div className="rounded-lg border border-linkedin/20 bg-linkedin/5 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-linkedin">
              Combined content angle
            </p>
            <p className="text-sm leading-relaxed text-ink">{analysis.contentAngle}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisGroup({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "blue" | "amber" | "emerald";
}) {
  const dotColor = {
    blue: "bg-linkedin",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  }[color];

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-subtle">{title}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", dotColor)} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
