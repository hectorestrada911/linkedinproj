import type { NewsItem } from "../types";

const CURATED_AI_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI launches GPT-5 with native agent orchestration",
    summary:
      "The new model introduces persistent task memory and multi-step tool use, positioning it as a direct competitor to enterprise agent platforms. Early benchmarks show 40% improvement on long-horizon coding tasks.",
    source: "TechCrunch",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: "Model Release",
  },
  {
    id: "2",
    title: "EU AI Act enforcement begins for high-risk systems",
    summary:
      "Companies deploying AI in hiring, credit scoring, and healthcare must now document training data provenance and maintain human oversight logs. Fines reach up to 7% of global revenue.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: "Regulation",
  },
  {
    id: "3",
    title: "Anthropic raises $4B at $60B valuation for enterprise push",
    summary:
      "The funding will accelerate Claude for Work deployments and expand the MCP ecosystem. CEO emphasized 'context preservation' as the key differentiator for knowledge-heavy teams.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: "Funding",
  },
  {
    id: "4",
    title: "Google DeepMind open-sources Gemma 3 coding variant",
    summary:
      "The 27B parameter model matches GPT-4o on HumanEval while running on a single A100. Designed for on-premise deployment in regulated industries.",
    source: "The Verge",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: "Open Source",
  },
  {
    id: "5",
    title: "Microsoft Copilot Studio hits 100K enterprise workflows",
    summary:
      "Low-code agent builders are replacing custom RAG pipelines at mid-market companies. Average deployment time dropped from 6 weeks to 3 days.",
    source: "VentureBeat",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: "Enterprise AI",
  },
  {
    id: "6",
    title: "Cursor raises Series B to build the AI-native IDE",
    summary:
      "The company reports 2M+ developers using agentic coding workflows daily. New features include multi-file refactoring and codebase-wide context windows.",
    source: "Forbes",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: "Developer Tools",
  },
];

async function fetchFromNewsAPI(query: string): Promise<NewsItem[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  try {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", query);
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", "8");
    url.searchParams.set("language", "en");
    url.searchParams.set("apiKey", apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) return [];

    const data = (await res.json()) as {
      articles?: Array<{
        title?: string;
        description?: string;
        source?: { name?: string };
        publishedAt?: string;
      }>;
    };

    return (data.articles ?? []).slice(0, 8).map((article, i) => ({
      id: `newsapi-${i}`,
      title: article.title ?? "Untitled",
      summary: article.description ?? "",
      source: article.source?.name ?? "News",
      publishedAt: article.publishedAt ?? new Date().toISOString(),
      category: "AI News",
    }));
  } catch {
    return [];
  }
}

export async function fetchAINews(query = "artificial intelligence"): Promise<{
  items: NewsItem[];
  source: "live" | "curated";
}> {
  const liveItems = await fetchFromNewsAPI(query);
  if (liveItems.length > 0) {
    return { items: liveItems, source: "live" };
  }
  return { items: CURATED_AI_NEWS, source: "curated" };
}

export function formatNewsForInput(item: NewsItem): string {
  return `[${item.source} · ${item.category}] ${item.title}\n\n${item.summary}`;
}
