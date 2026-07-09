import { Router } from "express";
import { fetchAINews } from "../lib/news";

export const newsRouter = Router();

newsRouter.get("/", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "artificial intelligence";
  const { items, source } = await fetchAINews(query);

  res.json({
    items,
    source,
    fetchedAt: new Date().toISOString(),
  });
});
