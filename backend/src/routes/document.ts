import { Router } from "express";
import multer from "multer";
import { parseDocument } from "../lib/document-parser";

export const documentRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

documentRouter.post("/parse", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const { text, filename } = await parseDocument(
      file.buffer,
      file.originalname,
      file.mimetype
    );

    res.json({
      text,
      filename,
      charCount: text.length,
    });
  } catch (error) {
    console.error("Document parse error:", error);
    res.status(422).json({
      error: error instanceof Error ? error.message : "Could not parse document",
    });
  }
});
