"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { formatNewsForInput } from "@/lib/news-utils";
import type { NewsItem } from "@/types";

interface NewsSearcherProps {
  value: string;
  onSelect: (text: string) => void;
}

export function NewsSearcher({ value, onSelect }: NewsSearcherProps) {
  const [query, setQuery] = useState("artificial intelligence AI");
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"live" | "curated" | null>(null);
  const [searched, setSearched] = useState(false);

  async function search() {
    setLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/news?q=${encodeURIComponent(query)}`));
      const data = await res.json();
      setItems(data.items ?? []);
      setSource(data.source);
      setSearched(true);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search AI news…"
          className="input-field flex-1 py-2 text-[13px]"
        />
        <button
          type="button"
          onClick={search}
          disabled={loading || !query.trim()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#2a2a2e] bg-[#242428] px-3 py-2 text-[12px] font-medium text-[#d4d4d8] transition-colors hover:border-[#3f3f46] hover:text-[#F4F4F5] disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
          Search
        </button>
      </div>

      {value && (
        <div className="rounded-lg border border-[#D4A853]/30 bg-[#D4A853]/8 px-3 py-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#D4A853]">Selected</p>
          <p className="mt-1 line-clamp-3 text-[12px] leading-relaxed text-[#d4d4d8]">{value}</p>
        </div>
      )}

      {searched && (
        <div className="space-y-2">
          <p className="text-[11px] text-[#71717a]">
            {source === "live" ? "Live results" : "Curated headlines"} · {items.length} stories
          </p>
          <div className="scrollbar-thin max-h-52 space-y-1.5 overflow-y-auto">
            {items.length === 0 ? (
              <p className="py-4 text-center text-[12px] text-[#71717a]">No results — try a different query</p>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(formatNewsForInput(item))}
                  className={cn(
                    "w-full cursor-pointer rounded-lg border p-2.5 text-left transition-all",
                    value.includes(item.title)
                      ? "border-[#D4A853]/40 bg-[#D4A853]/10"
                      : "border-[#2a2a2e] hover:border-[#3f3f46] hover:bg-[#242428]"
                  )}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded bg-[#242428] px-1.5 py-0.5 text-[9px] font-medium uppercase text-[#71717a]">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-[#71717a]">{item.source}</span>
                  </div>
                  <p className="text-[12px] font-medium leading-snug text-[#F4F4F5]">{item.title}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
