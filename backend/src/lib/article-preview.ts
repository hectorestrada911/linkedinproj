export interface ArticlePreview {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
  source?: string;
  publishedAt?: string;
}

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function extractMeta(html: string, keys: string[]): string | undefined {
  for (const key of keys) {
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
        "i"
      ),
    ];
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) return decodeHtml(match[1]);
    }
  }
  return undefined;
}

function extractTitle(html: string): string | undefined {
  const og = extractMeta(html, ["og:title", "twitter:title"]);
  if (og) return og;
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1] ? decodeHtml(match[1]) : undefined;
}

function resolveUrl(base: string, maybeRelative?: string): string | undefined {
  if (!maybeRelative) return undefined;
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

export async function previewArticle(url: string): Promise<ArticlePreview> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; SignalPost/1.0; +https://signalpost.app/article-preview)",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) {
    throw new Error(`Could not fetch article (${res.status})`);
  }

  const finalUrl = res.url || url;
  const raw = await res.text();
  const html = raw.slice(0, 500_000);

  const title =
    extractTitle(html) ??
    extractMeta(html, ["og:site_name"]) ??
    "Article preview";

  const description =
    extractMeta(html, ["og:description", "twitter:description", "description"]) ?? "";

  const imageUrl = resolveUrl(
    finalUrl,
    extractMeta(html, ["og:image", "twitter:image", "twitter:image:src"])
  );

  const source =
    extractMeta(html, ["og:site_name", "application-name"]) ??
    new URL(finalUrl).hostname.replace(/^www\./, "");

  return {
    url: finalUrl,
    title,
    description,
    imageUrl,
    source,
  };
}
