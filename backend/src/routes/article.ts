import { Router } from "express";
import { z } from "zod";
import { previewArticle } from "../lib/article-preview";

export const articleRouter = Router();

const previewSchema = z.object({
  url: z.string().url(),
});

articleRouter.post("/preview", async (req, res) => {
  try {
    const parsed = previewSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid URL" });
      return;
    }

    const preview = await previewArticle(parsed.data.url);
    res.json({ preview });
  } catch (error) {
    console.error("Article preview error:", error);
    res.status(422).json({
      error: error instanceof Error ? error.message : "Could not preview this article",
    });
  }
});
