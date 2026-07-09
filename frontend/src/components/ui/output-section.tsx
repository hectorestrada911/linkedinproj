import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

interface OutputSectionProps {
  title: string;
  content: string;
  className?: string;
  variant?: "default" | "code" | "post";
}

export function OutputSection({ title, content, className, variant = "default" }: OutputSectionProps) {
  return (
    <div className={cn("panel overflow-hidden", className)}>
      <div className="panel-header">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <CopyButton text={content} />
      </div>
      <div className="panel-body">
        <div
          className={cn(
            "text-sm leading-relaxed text-ink",
            variant === "code" && "font-mono text-xs text-ink-muted",
            variant === "post" && "whitespace-pre-wrap font-[family-name:var(--font-body)]"
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

interface OutputListProps {
  title: string;
  items: string[];
  numbered?: boolean;
}

export function OutputList({ title, items, numbered = false }: OutputListProps) {
  const text = items.map((item, i) => (numbered ? `${i + 1}. ${item}` : item)).join("\n\n");

  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <CopyButton text={text} />
      </div>
      <div className="panel-body space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/50"
          >
            {numbered && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linkedin/10 text-xs font-semibold text-linkedin">
                {i + 1}
              </span>
            )}
            <p className="flex-1 text-sm leading-relaxed text-ink">{item}</p>
            <CopyButton text={item} label="" className="opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
