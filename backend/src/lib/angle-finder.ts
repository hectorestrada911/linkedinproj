import OpenAI from "openai";
import { fetchAINews } from "./news";

export interface FindAngleInput {
  sourceText?: string;
  topic?: string;
  audience?: string;
}

export interface FindAngleResult {
  angle: string;
  aiNews: string;
  transcript: string;
  rationale: string;
  mode: "live" | "mock";
}

function shouldUseMock(): boolean {
  if (process.env.GENERATION_MODE === "mock") return true;
  return !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith("sk-your");
}

function buildMockAngle(input: FindAngleInput, newsText: string, headline: string): FindAngleResult {
  const topic = input.topic?.trim() || "AI product velocity";
  const source = input.sourceText?.trim();

  const angle = source
    ? `Bridge "${topic}" with what your team already discussed — the gap isn't tooling, it's turning internal context into a timely industry take.`
    : `Use ${headline} as the hook, then pivot to how ${topic} changes the workflow for builders shipping this week.`;

  const transcript = source
    ? source
    : `Person A: Everyone is reacting to the news, but our angle on ${topic} is different.\nPerson B: We should connect what's happening in AI to what we're actually building — not another generic take.`;

  return {
    angle,
    aiNews: newsText,
    transcript,
    rationale:
      "Matched recent AI news to your topic and shaped a contrarian-but-credible LinkedIn angle.",
    mode: "mock",
  };
}

export async function findContentAngle(input: FindAngleInput): Promise<FindAngleResult> {
  const { items } = await fetchAINews(
    input.topic ? `${input.topic} artificial intelligence` : "artificial intelligence AI"
  );
  const top = items[0];
  const newsText = top
    ? `[${top.source} · ${top.category}] ${top.title}\n\n${top.summary}`
    : "";
  const headline = top?.title ?? "Latest AI industry shift";

  if (shouldUseMock()) {
    return buildMockAngle(input, newsText, headline);
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are a LinkedIn content strategist. Given AI news and optional source material, propose a sharp content angle.
Respond ONLY with JSON: { "angle": string, "aiNews": string, "transcript": string, "rationale": string }
- angle: 1-2 sentence hook/positioning for the post
- aiNews: formatted news block to use as source (headline + summary)
- transcript: 3-5 lines of synthetic team conversation capturing the unique internal take
- rationale: one sentence on why this angle works`,
        },
        {
          role: "user",
          content: `Topic: ${input.topic || "general AI"}
Audience: ${input.audience || "founders and product leaders"}
User source material: ${input.sourceText || "(none — infer from news)"}

Recent AI news:
${newsText || headline}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response");

    const parsed = JSON.parse(content) as Omit<FindAngleResult, "mode">;
    return { ...parsed, mode: "live" };
  } catch (error) {
    console.error("Angle finder failed, using mock:", error);
    return buildMockAngle(input, newsText, headline);
  }
}
