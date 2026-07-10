import type { NewsItem } from "../types";

export type NewsSource = "newsapi" | "google-rss" | "curated";

const CURATED_AI_NEWS: NewsItem[] = [
  {
    id: "curated-1",
    title: "OpenAI launches GPT-5 with native agent orchestration",
    summary:
      "The new model introduces persistent task memory and multi-step tool use, positioning it as a direct competitor to enterprise agent platforms.",
    source: "TechCrunch",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: "Model Release",
    url: "https://techcrunch.com/category/artificial-intelligence/",
  },
  {
    id: "curated-2",
    title: "EU AI Act enforcement begins for high-risk systems",
    summary:
      "Companies deploying AI in hiring, credit scoring, and healthcare must now document training data provenance and maintain human oversight logs.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: "Regulation",
    url: "https://www.reuters.com/technology/artificial-intelligence/",
  },
  {
    id: "curated-3",
    title: "Anthropic raises $4B at $60B valuation for enterprise push",
    summary:
      "The funding will accelerate Claude for Work deployments and expand the MCP ecosystem. CEO emphasized context preservation as the key differentiator.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: "Funding",
    url: "https://www.bloomberg.com/technology",
  },
  {
    id: "curated-4",
    title: "Google DeepMind open-sources Gemma 3 coding variant",
    summary:
      "The 27B parameter model matches GPT-4o on HumanEval while running on a single A100. Designed for on-premise deployment in regulated industries.",
    source: "The Verge",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: "Open Source",
    url: "https://www.theverge.com/ai-artificial-intelligence",
  },
  {
    id: "curated-5",
    title: "Microsoft Copilot Studio hits 100K enterprise workflows",
    summary:
      "Low-code agent builders are replacing custom RAG pipelines at mid-market companies. Average deployment time dropped from 6 weeks to 3 days.",
    source: "VentureBeat",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: "Enterprise AI",
    url: "https://venturebeat.com/category/ai/",
  },
  {
    id: "curated-6",
    title: "Cursor raises Series B to build the AI-native IDE",
    summary:
      "The company reports 2M+ developers using agentic coding workflows daily. New features include multi-file refactoring and codebase-wide context.",
    source: "Forbes",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: "Developer Tools",
    url: "https://www.forbes.com/innovation/",
  },
  {
    id: "curated-7",
    title: "Meta releases Llama 4 with 10M token context window",
    summary:
      "Open-weight model targets enterprise RAG workloads. Early adopters report 3x reduction in retrieval hallucinations on long documents.",
    source: "Wired",
    publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    category: "Model Release",
    url: "https://www.wired.com/tag/artificial-intelligence/",
  },
  {
    id: "curated-8",
    title: "Salesforce embeds agents across entire CRM stack",
    summary:
      "Einstein Agents now handle lead scoring, email drafts, and pipeline forecasting autonomously. Customers report 25% faster deal cycles.",
    source: "CNBC",
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    category: "Enterprise AI",
    url: "https://www.cnbc.com/technology/",
  },
  {
    id: "curated-9",
    title: "Nvidia unveils Blackwell Ultra for inference at scale",
    summary:
      "New chip architecture delivers 2x tokens per watt for serving frontier models. Hyperscalers already committed to multi-billion unit orders.",
    source: "Ars Technica",
    publishedAt: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
    category: "Hardware",
    url: "https://arstechnica.com/ai/",
  },
  {
    id: "curated-10",
    title: "Open-source RAG framework hits 50K GitHub stars",
    summary:
      "LangChain alternative focuses on production observability and eval pipelines. Maintainers emphasize context window management as core primitive.",
    source: "Hacker News",
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    category: "Developer Tools",
    url: "https://news.ycombinator.com/",
  },
  {
    id: "curated-11",
    title: "AI coding assistants now write 40% of production commits at startups",
    summary:
      "Survey of 500 YC companies shows agentic IDEs are default for greenfield projects. Senior engineers shift to architecture and review roles.",
    source: "MIT Technology Review",
    publishedAt: new Date(Date.now() - 54 * 60 * 60 * 1000).toISOString(),
    category: "Industry",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/",
  },
  {
    id: "curated-12",
    title: "Perplexity launches enterprise search with source citations",
    summary:
      "New API returns grounded answers with inline citations for knowledge bases. Competes directly with Google Vertex AI Search and Glean.",
    source: "The Information",
    publishedAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
    category: "Search",
    url: "https://www.theinformation.com/",
  },
];

function stripCdata(text: string): string {
  return text.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function decodeXml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function parseRssItems(xml: string): Array<{
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
}> {
  const items: Array<{
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source: string;
  }> = [];

  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  for (const block of itemMatches) {
    const title = stripCdata(block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const link = stripCdata(block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] ?? "");
    const description = decodeXml(
      stripCdata(block.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] ?? "")
    );
    const pubDate = stripCdata(block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1] ?? "");
    const source =
      stripCdata(block.match(/<source[^>]*>([\s\S]*?)<\/source>/i)?.[1] ?? "") || "Google News";

    if (title && link) {
      items.push({ title, link, description, pubDate, source });
    }
  }

  return items;
}

async function fetchFromNewsAPI(query: string, limit: number): Promise<NewsItem[]> {
  const apiKey = process.env.NEWS_API_KEY?.trim();
  if (!apiKey) return [];

  try {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", query);
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", String(Math.min(limit, 100)));
    url.searchParams.set("language", "en");
    url.searchParams.set("apiKey", apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) return [];

    const data = (await res.json()) as {
      status?: string;
      articles?: Array<{
        title?: string;
        description?: string;
        url?: string;
        urlToImage?: string;
        source?: { name?: string };
        publishedAt?: string;
      }>;
    };

    if (data.status !== "ok") return [];

    return (data.articles ?? []).slice(0, limit).map((article, i) => ({
      id: `newsapi-${i}-${Date.now()}`,
      title: article.title ?? "Untitled",
      summary: article.description ?? "",
      source: article.source?.name ?? "News",
      publishedAt: article.publishedAt ?? new Date().toISOString(),
      category: "AI News",
      url: article.url,
      imageUrl: article.urlToImage || undefined,
    }));
  } catch {
    return [];
  }
}

async function fetchFromGoogleNewsRSS(query: string, limit: number): Promise<NewsItem[]> {
  try {
    const url = new URL("https://news.google.com/rss/search");
    url.searchParams.set("q", query);
    url.searchParams.set("hl", "en-US");
    url.searchParams.set("gl", "US");
    url.searchParams.set("ceid", "US:en");

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "SignalPost/1.0 (news reader)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const parsed = parseRssItems(xml);

    return parsed.slice(0, limit).map((item, i) => {
      const title = decodeXml(item.title.replace(/ - [^-]+$/, "")); // strip trailing source
      return {
        id: `google-rss-${i}-${Date.now()}`,
        title,
        summary: item.description.slice(0, 400),
        source: item.source,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
        category: "AI News",
        url: item.link,
      };
    });
  } catch {
    return [];
  }
}

export async function fetchAINews(
  query = "artificial intelligence",
  limit = 20
): Promise<{
  items: NewsItem[];
  source: NewsSource;
  hint?: string;
}> {
  const newsApiItems = await fetchFromNewsAPI(query, limit);
  if (newsApiItems.length > 0) {
    return { items: newsApiItems, source: "newsapi" };
  }

  const rssItems = await fetchFromGoogleNewsRSS(query, limit);
  if (rssItems.length > 0) {
    return {
      items: rssItems,
      source: "google-rss",
      hint: "Live via Google News. Add NEWS_API_KEY in backend/.env for NewsAPI (includes thumbnails).",
    };
  }

  return {
    items: CURATED_AI_NEWS.slice(0, limit),
    source: "curated",
    hint: "Demo stories only. Connect to the internet or add NEWS_API_KEY for live headlines.",
  };
}

export function formatNewsForInput(item: NewsItem): string {
  const urlLine = item.url ? `\n\nSource: ${item.url}` : "";
  return `[${item.source} · ${item.category}] ${item.title}\n\n${item.summary}${urlLine}`;
}
