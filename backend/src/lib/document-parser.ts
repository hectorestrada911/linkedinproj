import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

const MAX_BYTES = 5 * 1024 * 1024;

async function parsePdf(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return result.text?.trim() ?? "";
  } finally {
    await parser.destroy();
  }
}

export async function parseDocument(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<{ text: string; filename: string }> {
  if (buffer.length > MAX_BYTES) {
    throw new Error("File too large (max 5 MB)");
  }

  const extension = filename.includes(".") ? filename.split(".").pop()?.toLowerCase() : "";

  if (
    mimeType === "text/plain" ||
    mimeType === "text/markdown" ||
    extension === "txt" ||
    extension === "md"
  ) {
    return { text: buffer.toString("utf-8").trim(), filename };
  }

  if (mimeType === "application/pdf" || extension === "pdf") {
    const text = await parsePdf(buffer);
    if (!text) throw new Error("Could not extract text from PDF");
    return { text, filename };
  }

  if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extension === "docx"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim() ?? "";
    if (!text) throw new Error("Could not extract text from Word document");
    return { text, filename };
  }

  throw new Error("Unsupported file type. Use .txt, .md, .pdf, or .docx");
}
