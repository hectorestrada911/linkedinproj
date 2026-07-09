import OpenAI from "openai";
import type { ContentPackage, GenerateRequest } from "../types";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";
import { generateMockPackage } from "./mock-generator";

function shouldUseMock(): boolean {
  if (process.env.GENERATION_MODE === "mock") return true;
  return !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith("sk-your");
}

function parseJSON<T>(text: string): T {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
  return JSON.parse(cleaned) as T;
}

export async function generateContentPackage(
  req: GenerateRequest
): Promise<{ package: ContentPackage; mode: "live" | "mock" }> {
  if (shouldUseMock()) {
    return { package: generateMockPackage(req), mode: "mock" };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(req) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 4096,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty LLM response");

    const pkg = parseJSON<ContentPackage>(content);
    return { package: pkg, mode: "live" };
  } catch (error) {
    console.error("LLM generation failed, falling back to mock:", error);
    return { package: generateMockPackage(req), mode: "mock" };
  }
}

export async function generateImage(prompt: string): Promise<string | undefined> {
  if (process.env.ENABLE_IMAGE_GENERATION !== "true") return undefined;
  if (shouldUseMock()) return undefined;
  if (!process.env.OPENAI_API_KEY) return undefined;

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.images.generate({
      model: "dall-e-3",
      prompt: `Professional editorial illustration for LinkedIn. ${prompt}. No text or watermarks in the image.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    return result.data?.[0]?.url;
  } catch (error) {
    console.error("Image generation failed:", error);
    return undefined;
  }
}
