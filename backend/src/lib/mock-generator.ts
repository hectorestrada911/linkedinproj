import type { ContentPackage, GenerateRequest, ToneStyle } from "../types";

function extractPainPoints(transcript: string): string[] {
  const lines = transcript.split("\n").filter(Boolean);
  const painKeywords = ["problem", "issue", "spend", "waste", "hard", "difficult", "need", "struggle", "too much"];
  return lines
    .filter((line) => painKeywords.some((k) => line.toLowerCase().includes(k)))
    .slice(0, 3)
    .map((l) => l.replace(/^[^:]+:\s*/, "").trim())
    .filter(Boolean);
}

function extractNewsHeadline(news: string): string {
  const firstLine = news.split("\n")[0]?.trim() ?? "";
  return firstLine.replace(/^\[.*?\]\s*/, "").slice(0, 120);
}

function buildHook(insight: string, tone: ToneStyle): string {
  const hooks: Record<ToneStyle, string> = {
    founder: `We almost solved the wrong problem.\n\n${insight}`,
    professional: `Most teams are optimizing for speed when they should be optimizing for context.`,
    technical: `The bottleneck isn't generation. It's context preservation at scale.`,
    contrarian: `Hot take: the AI news cycle is distracting us from the real problem.`,
    concise: insight,
    storytelling: `Last week, our team had a conversation that changed how I think about AI content.`,
    "thought-leader": `The next wave of AI adoption won't be about models. It'll be about workflows.`,
  };
  return hooks[tone];
}

export function generateMockPackage(req: GenerateRequest): ContentPackage {
  const newsHeadline = extractNewsHeadline(req.aiNews) || "Latest AI model release reshapes enterprise workflows";
  const painPoints = extractPainPoints(req.transcript);
  const primaryPain = painPoints[0] ?? "turning messy discussions into publishable content without losing context";

  const extractedInsight =
    painPoints.length > 0
      ? `The real challenge isn't generating text, it's preserving the nuance, tone, and strategic context from internal conversations when connecting them to external trends.`
      : `The intersection of breaking AI news and internal team knowledge creates a unique content angle that generic AI tools miss entirely.`;

  const aiNewsAngle = `While everyone is discussing "${newsHeadline.slice(0, 60)}...", the teams that win won't be the ones with the newest model. They'll be the ones who can connect industry shifts to their own operational reality.`;

  const tone = req.tone;
  const hook = buildHook(extractedInsight, tone);

  const mainBody = `${aiNewsAngle}

Here's what I've learned building content workflows:

→ The gap isn't intelligence, it's context transfer
→ Meeting notes contain 10x more insight than any news article
→ But connecting internal pain to external trends? That's where most content falls flat

${primaryPain ? `We felt this directly: ${primaryPain}.` : ""}

The teams shipping the best LinkedIn content right now aren't using AI to write faster.

They're using it to think clearer: connecting what they're building to what's changing in the industry.`;

  const cta =
    tone === "contrarian"
      ? "Agree or disagree: what's the biggest gap in your content workflow?"
      : "What's your team's biggest bottleneck: generating content or preserving context?";

  const finalPost = `${hook}\n\n${mainBody}\n\n${cta}`;

  const alternateVersions = [
    `${newsHeadline}\n\nEveryone's talking about the technology. Nobody's talking about the workflow problem it creates.\n\nWe spent months trying to turn meeting notes into posts. The issue was never the writing, it was losing the "why" behind the discussion.\n\n${cta}`,
    `Unpopular opinion: AI content tools are solving the wrong problem.\n\nYou don't need more words. You need better connections between what your team knows and what the market cares about.\n\n${cta}`,
  ];

  const scores = {
    hookStrength: tone === "concise" ? 9 : 8,
    clarity: 8,
    originality: tone === "contrarian" ? 9 : 7,
    linkedInReadability: 8,
    overall: 8,
    notes: "Strong insight-to-news connection. Consider adding a specific metric or example for extra credibility.",
  };

  if (req.rewriteAction === "shorter") {
    scores.overall = 9;
    scores.linkedInReadability = 9;
  }

  return {
    finalPost: req.rewriteAction === "shorter" ? `${hook}\n\n${extractedInsight}\n\n${cta}` : finalPost,
    hookOptions: [
      buildHook(extractedInsight, "founder"),
      buildHook(extractedInsight, "contrarian"),
      buildHook(extractedInsight, "concise"),
    ],
    mainBody,
    cta,
    hashtags: ["#AI", "#ProductLeadership", "#ContentStrategy", "#BuildInPublic", "#EnterpriseAI"],
    extractedInsight,
    aiNewsAngle,
    imagePrompt: `Editorial illustration: split-screen composition showing chaotic meeting notes transforming into a polished LinkedIn post. Left side: handwritten sticky notes and conversation bubbles in muted warm tones. Right side: clean, structured social media card. Minimal, professional, no text in image. Style: modern editorial, soft shadows, LinkedIn blue accent (#0A66C2).`,
    videoScript: `[0:00] Hook: "${extractedInsight.slice(0, 80)}..."\n[0:05] Context: Reference ${newsHeadline.slice(0, 50)}\n[0:15] Insight: The context preservation problem\n[0:30] Solution angle: Connect internal knowledge to external trends\n[0:45] CTA: "${cta}"`,
    carouselOutline: [
      { title: "The Problem", body: "Teams generate content fast but lose the context that makes it credible." },
      { title: "The News", body: newsHeadline },
      { title: "The Insight", body: extractedInsight },
      { title: "The Angle", body: aiNewsAngle },
      { title: "The Takeaway", body: "Connect what you know internally to what's changing externally." },
      { title: "Your Turn", body: cta },
    ],
    alternateVersions,
    sourceAnalysis: {
      keyFacts: [
        newsHeadline,
        "AI adoption accelerating across enterprise workflows",
        "Context preservation emerging as key differentiator",
      ],
      painPoints: painPoints.length
        ? painPoints
        : ["Time spent converting discussions to content", "Loss of tone and nuance in AI-generated text"],
      insights: [extractedInsight, "Internal conversations contain richer content angles than news alone"],
      contentAngle: `Bridge the gap between "${newsHeadline.slice(0, 40)}..." and the team's real workflow pain around ${primaryPain}`,
    },
    contentStrategy: {
      whyThisAngle:
        "Combines timely news relevance with authentic internal perspective, the formula that performs best for B2B thought leadership.",
      targetAudience: req.audience || "Founders, VP Product, and AI operators at Series A–C startups",
      emotionalAngle: "Recognition: 'finally someone said what I've been thinking'",
      credibilityAngle: "Grounded in real team conversations, not generic AI commentary",
      suggestedPostingStyle: "Post Tuesday–Thursday, 8–10 AM. Lead with the hook, add image on slide 2 if using carousel.",
    },
    postScore: scores,
  };
}
