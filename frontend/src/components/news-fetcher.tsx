"use client";

import { useState } from "react";
import { Newspaper, RefreshCw } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { formatNewsForInput } from "@/lib/news-utils";
import type { NewsItem } from "@/types";

interface NewsFetcherProps {
  onSelect: (text: string) => void;
}

export function NewsFetcher({ onSelect }: NewsFetcherProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"live" | "curated" | null>(null);
  const [expanded, setExpanded] = useState(false);

  async function fetchNews() {
    setLoading(true);
    try {
      const res = await fetch(apiUrl("/api/news?q=artificial+intelligence+AI"));
      const data = await res.json();
      setItems(data.items ?? []);
      setSource(data.source);
      setExpanded(true);
    } catch {
      /* fetch failed */
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={fetchNews}
        disabled={loading}
        className="w-full rounded-lg border border-[#2a2a2e] bg-[#242428] py-2 text-[12px] text-[#a1a1aa] transition-colors hover:border-[#3f3f46] hover:bg-[#28282c] hover:text-[#F4F4F5] disabled:opacity-50"
      >
        {loading ? (
          <>
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            Fetching…
          </>
        ) : (
          <>
            <Newspaper className="h-3.5 w-3.5" />
            Fetch recent AI news
          </>
        )}
      </button>

      {source && expanded && (
        <div className="space-y-2">
          <p className="text-[11px] text-[#8A8A8E]">
            {source === "live" ? "Live feed" : "Curated headlines"} · {items.length} items
          </p>
          <div className="scrollbar-thin max-h-40 space-y-1.5 overflow-y-auto">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(formatNewsForInput(item))}
                className={cn(
                  "w-full cursor-pointer rounded-lg border border-white/[0.06] p-2.5 text-left",
                  "transition-all hover:border-[#4ECDC4]/30 hover:bg-[#4ECDC4]/5"
                )}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8A8A8E]">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-[#8A8A8E]/60">{item.source}</span>
                </div>
                <p className="text-[11px] font-medium leading-snug text-[#FAFAF9]">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
