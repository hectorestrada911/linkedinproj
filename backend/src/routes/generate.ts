import { Router } from "express";
import { z } from "zod";
import { generateContentPackage, generateImage } from "../lib/generator";

export const generateRouter = Router();

const requestSchema = z.object({
  aiNews: z.string().default(""),
  transcript: z.string().default(""),
  topic: z.string().optional(),
  audience: z.string().optional(),
  tone: z.enum([
    "founder",
    "professional",
    "technical",
    "contrarian",
    "concise",
    "storytelling",
    "thought-leader",
  ]),
  rewriteAction: z
    .enum(["founder-like", "technical", "shorter", "controversial", "polished"])
    .optional(),
  previousPackage: z.any().optional(),
  generateImage: z.boolean().default(false),
  sourceImageUrl: z.string().url().optional(),
});

generateRouter.post("/", async (req, res) => {
  try {
    const parsed = requestSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
      return;
    }

    if (!parsed.data.aiNews.trim() && !parsed.data.transcript.trim()) {
      res.status(400).json({ error: "Provide at least AI news or a conversation transcript." });
      return;
    }

    const { package: contentPackage, mode } = await generateContentPackage(parsed.data);

    if (parsed.data.generateImage && contentPackage.imagePrompt) {
      const imageUrl = await generateImage(contentPackage.imagePrompt);
      if (imageUrl) contentPackage.imageUrl = imageUrl;
    } else if (parsed.data.sourceImageUrl) {
      contentPackage.imageUrl = parsed.data.sourceImageUrl;
    }

    res.json({
      package: contentPackage,
      mode,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Generate API error:", error);
    res.status(500).json({ error: "Generation failed. Please try again." });
  }
});
