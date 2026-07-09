import type { NewsItem } from "@/types";

export function formatNewsForInput(item: NewsItem): string {
  return `[${item.source} · ${item.category}] ${item.title}\n\n${item.summary}`;
}
