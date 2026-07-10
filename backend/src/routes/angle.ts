import { Router } from "express";
import { z } from "zod";
import { findContentAngle } from "../lib/angle-finder";

export const angleRouter = Router();

const requestSchema = z.object({
  sourceText: z.string().optional(),
  topic: z.string().optional(),
  audience: z.string().optional(),
});

angleRouter.post("/", async (req, res) => {
  try {
    const parsed = requestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
      return;
    }

    const result = await findContentAngle(parsed.data);
    res.json({ ...result, foundAt: new Date().toISOString() });
  } catch (error) {
    console.error("Angle API error:", error);
    res.status(500).json({ error: "Could not find an angle. Try again." });
  }
});
