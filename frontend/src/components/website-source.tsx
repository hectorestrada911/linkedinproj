"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Loader2 } from "lucide-react";
import { apiUrl } from "@/lib/api";
import type { ArticlePreview } from "@/types";

interface WebsiteSourceProps {
  value: string;
  articleImageUrl?: string;
  useArticleImage: boolean;
  onImport: (text: string, preview: ArticlePreview | null) => void;
  onUseArticleImageChange: (use: boolean) => void;
}

function formatArticleSource(preview: ArticlePreview): string {
  const source = preview.source ?? "Web";
  return `[${source} · Article] ${preview.title}\n\n${preview.description}\n\nSource: ${preview.url}`;
}

export function WebsiteSource({
  value,
  articleImageUrl,
  useArticleImage,
  onImport,
  onUseArticleImageChange,
}: WebsiteSourceProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ArticlePreview | null>(null);

  async function importUrl() {
    const trimmed = url.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("/api/article/preview"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not load website");

      const article = data.preview as ArticlePreview;
      setPreview(article);
      onImport(formatArticleSource(article), article);
      if (article.imageUrl) onUseArticleImageChange(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load website");
    } finally {
      setLoading(false);
    }
  }

  const image = preview?.imageUrl ?? articleImageUrl;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && importUrl()}
          placeholder="https://techcrunch.com/…"
          className="flex-1 rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-[14px] text-[#fafafa] placeholder:text-[#52525b] focus:border-[#38bdf8]/40 focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/20"
        />
        <button
          type="button"
          onClick={importUrl}
          disabled={loading || !url.trim()}
          className="shrink-0 rounded-lg border border-[#27272a] px-4 py-2.5 text-[13px] text-[#fafafa] hover:bg-[#18181b] disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Import"}
        </button>
      </div>

      {error && <p className="text-[12px] text-[#fca5a5]">{error}</p>}

      {(preview || value) && !loading && (
        <div className="overflow-hidden rounded-lg border border-[#27272a] bg-[#09090b]">
          {image && (
            <div className="relative aspect-[16/9] w-full bg-[#18181b]">
              <Image src={image} alt="" fill className="object-cover" unoptimized />
            </div>
          )}
          <div className="space-y-3 p-4">
            <div>
              <p className="text-[11px] text-[#52525b]">{preview?.source ?? "Imported"}</p>
              <h4 className="mt-1 text-[14px] font-medium leading-snug text-[#fafafa]">
                {preview?.title ?? "Website imported"}
              </h4>
              {preview?.description && (
                <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-[#71717a]">
                  {preview.description}
                </p>
              )}
            </div>

            {preview?.url && (
              <a
                href={preview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] text-[#7dd3fc] hover:text-[#bae6fd]"
              >
                Open page
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {image && (
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#27272a] bg-[#0c0c0e] px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={useArticleImage}
                  onChange={(e) => onUseArticleImageChange(e.target.checked)}
                  className="rounded border-[#27272a] bg-[#09090b] text-[#38bdf8]"
                />
                <span className="text-[12px] text-[#a1a1aa]">Use page image in post</span>
              </label>
            )}
          </div>
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-[#52525b]">
        Paste any public article URL. We pull the headline, summary, and hero image.
      </p>
    </div>
  );
}
