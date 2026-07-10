import { Router } from "express";
import { fetchAINews } from "../lib/news";

export const newsRouter = Router();

newsRouter.get("/", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "artificial intelligence";
  const limitRaw = typeof req.query.limit === "string" ? Number(req.query.limit) : 20;
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 50) : 20;

  const { items, source, hint } = await fetchAINews(query, limit);

  res.json({
    items,
    source,
    hint,
    count: items.length,
    fetchedAt: new Date().toISOString(),
  });
});
