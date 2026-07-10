"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Loader2 } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { formatNewsForInput } from "@/lib/news-utils";
import type { ArticlePreview, NewsItem } from "@/types";

type NewsFeedSource = "newsapi" | "google-rss" | "curated";

interface NewsSearcherProps {
  value: string;
  selectedItem: NewsItem | null;
  useArticleImage: boolean;
  onSelect: (item: NewsItem, text: string) => void;
  onUseArticleImageChange: (use: boolean) => void;
}

const SOURCE_LABELS: Record<NewsFeedSource, string> = {
  newsapi: "Live · NewsAPI",
  "google-rss": "Live · Google News",
  curated: "Demo · sample stories",
};

export function NewsSearcher({
  value,
  selectedItem,
  useArticleImage,
  onSelect,
  onUseArticleImageChange,
}: NewsSearcherProps) {
  const [query, setQuery] = useState("artificial intelligence AI");
  const [urlInput, setUrlInput] = useState("");
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [source, setSource] = useState<NewsFeedSource | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [preview, setPreview] = useState<ArticlePreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  async function search() {
    setLoading(true);
    setPreview(null);
    setPreviewError(null);
    try {
      const res = await fetch(
        apiUrl(`/api/news?q=${encodeURIComponent(query)}&limit=20`)
      );
      const data = await res.json();
      setItems(data.items ?? []);
      setSource(data.source ?? "curated");
      setHint(data.hint ?? null);
      setSearched(true);
    } catch {
      setItems([]);
      setSource("curated");
    } finally {
      setLoading(false);
    }
  }

  async function loadPreview(url: string) {
    setPreviewLoading(true);
    setPreviewError(null);
    try {
      const res = await fetch(apiUrl("/api/article/preview"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Preview failed");
      setPreview(data.preview);
      return data.preview as ArticlePreview;
    } catch (e) {
      setPreviewError(e instanceof Error ? e.message : "Could not preview article");
      return null;
    } finally {
      setPreviewLoading(false);
    }
  }

  async function handleSelectItem(item: NewsItem) {
    onSelect(item, formatNewsForInput(item));

    if (item.url) {
      const loaded = await loadPreview(item.url);
      if (loaded?.imageUrl && !item.imageUrl) {
        onSelect({ ...item, imageUrl: loaded.imageUrl }, formatNewsForInput(item));
      }
    }
  }

  async function handlePreviewUrl() {
    if (!urlInput.trim()) return;
    const loaded = await loadPreview(urlInput.trim());
    if (!loaded) return;

    const item: NewsItem = {
      id: `url-${Date.now()}`,
      title: loaded.title,
      summary: loaded.description,
      source: loaded.source ?? "Web",
      publishedAt: loaded.publishedAt ?? new Date().toISOString(),
      category: "Article",
      url: loaded.url,
      imageUrl: loaded.imageUrl,
    };
    onSelect(item, formatNewsForInput(item));
  }

  const displayImage = preview?.imageUrl ?? selectedItem?.imageUrl;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search AI headlines…"
          className="flex-1 rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-[14px] text-[#fafafa] placeholder:text-[#52525b] focus:border-[#38bdf8]/40 focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/20"
        />
        <button
          type="button"
          onClick={search}
          disabled={loading || !query.trim()}
          className="shrink-0 rounded-lg border border-[#27272a] px-4 py-2.5 text-[13px] text-[#fafafa] hover:bg-[#18181b] disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePreviewUrl()}
          placeholder="Or paste article URL…"
          className="flex-1 rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-[13px] text-[#fafafa] placeholder:text-[#52525b] focus:border-[#38bdf8]/40 focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/20"
        />
        <button
          type="button"
          onClick={handlePreviewUrl}
          disabled={previewLoading || !urlInput.trim()}
          className="shrink-0 rounded-lg border border-[#27272a] px-3 py-2.5 text-[13px] text-[#fafafa] hover:bg-[#18181b] disabled:opacity-40"
        >
          {previewLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Preview"}
        </button>
      </div>

      {searched && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] text-[#52525b]">
              {source ? SOURCE_LABELS[source] : "Results"} · {items.length} stories
            </p>
          </div>
          {hint && source !== "newsapi" && (
            <p className="text-[11px] leading-relaxed text-[#52525b]">{hint}</p>
          )}

          <div className="scrollbar-thin max-h-64 space-y-1 overflow-y-auto">
            {items.length === 0 ? (
              <p className="py-6 text-center text-[13px] text-[#52525b]">No results</p>
            ) : (
              items.map((item) => {
                const selected = selectedItem?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    className={cn(
                      "flex w-full gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                      selected
                        ? "border-[#38bdf8]/40 bg-[#38bdf8]/[0.06]"
                        : "border-transparent hover:border-[#27272a] hover:bg-[#18181b]"
                    )}
                  >
                    {item.imageUrl ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#18181b]">
                        <Image
                          src={item.imageUrl}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#27272a] bg-[#18181b] text-[10px] text-[#52525b]">
                        News
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-[#52525b]">
                        {item.source} · {item.category}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#fafafa]">
                        {item.title}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {(previewLoading || preview || previewError || selectedItem) && (
        <div className="overflow-hidden rounded-lg border border-[#27272a] bg-[#09090b]">
          {previewLoading && (
            <div className="flex items-center gap-2 px-4 py-6 text-[13px] text-[#71717a]">
              <Loader2 className="h-4 w-4 animate-spin text-[#38bdf8]" />
              Loading article preview…
            </div>
          )}

          {previewError && !previewLoading && (
            <p className="px-4 py-3 text-[12px] text-[#fca5a5]">{previewError}</p>
          )}

          {(preview || selectedItem) && !previewLoading && (
            <>
              {displayImage && (
                <div className="relative aspect-[16/9] w-full bg-[#18181b]">
                  <Image
                    src={displayImage}
                    alt={preview?.title ?? selectedItem?.title ?? "Article"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-[11px] text-[#52525b]">
                    {preview?.source ?? selectedItem?.source}
                  </p>
                  <h4 className="mt-1 text-[14px] font-medium leading-snug text-[#fafafa]">
                    {preview?.title ?? selectedItem?.title}
                  </h4>
                  <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-[#71717a]">
                    {preview?.description ?? selectedItem?.summary}
                  </p>
                </div>

                {(preview?.url ?? selectedItem?.url) && (
                  <a
                    href={preview?.url ?? selectedItem?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] text-[#7dd3fc] hover:text-[#bae6fd]"
                  >
                    Read original
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {displayImage && (
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#27272a] bg-[#0c0c0e] px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={useArticleImage}
                      onChange={(e) => onUseArticleImageChange(e.target.checked)}
                      className="rounded border-[#27272a] bg-[#09090b] text-[#38bdf8] focus:ring-[#38bdf8]/30"
                    />
                    <span className="text-[12px] text-[#a1a1aa]">
                      Attach article image to post (free, no AI generation)
                    </span>
                  </label>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {value && !selectedItem && (
        <div className="rounded-lg border border-[#27272a] px-3 py-3">
          <p className="text-[11px] text-[#52525b]">Selected</p>
          <p className="mt-1.5 line-clamp-4 text-[13px] leading-relaxed text-[#d4d4d8]">{value}</p>
        </div>
      )}
    </div>
  );
}
