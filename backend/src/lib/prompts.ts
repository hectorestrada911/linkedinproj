import type { GenerateRequest, RewriteAction, ToneStyle } from "../types";

const TONE_GUIDANCE: Record<ToneStyle, string> = {
  founder:
    "Write like a founder sharing hard-won lessons. First-person, direct, slightly vulnerable. Short paragraphs. No corporate speak.",
  professional:
    "Polished and credible. Executive-level clarity. Confident but not arrogant. Data-backed where possible.",
  technical:
    "Practitioner-to-practitioner. Specific terminology is fine. Focus on implementation reality, not hype.",
  contrarian:
    "Challenge the obvious take. Lead with a provocative insight. Back it up with reasoning, not rage-bait.",
  concise:
    "Every word earns its place. Under 150 words for the main post. Punchy sentences. White space matters.",
  storytelling:
    "Open with a specific moment or scene. Build tension. Land the insight naturally. Human details over abstractions.",
  "thought-leader":
    "Zoom out to industry implications. Connect dots others miss. Authoritative but accessible. Future-oriented.",
};

const REWRITE_GUIDANCE: Record<RewriteAction, string> = {
  "founder-like": "Rewrite to feel more personal and founder-authentic. Add 'I' statements and builder perspective.",
  technical: "Add more technical depth, specific terminology, and practitioner credibility.",
  shorter: "Cut ruthlessly. Aim for 50% fewer words while keeping the core insight intact.",
  controversial: "Sharpen the contrarian edge. Make the take bolder but still defensible.",
  polished: "Elevate prose quality. Smoother transitions, stronger word choices, executive polish.",
};

export function buildSystemPrompt(): string {
  return `You are an elite LinkedIn content strategist who writes for founders, product leaders, and AI operators.

Your job: transform AI news + internal conversation transcripts into publish-ready LinkedIn content that sounds human, specific, and worth reading.

CRITICAL RULES:
- NEVER use generic AI buzzwords: "game-changer", "revolutionary", "in today's fast-paced world", "leverage", "synergy", "dive in", "let's unpack"
- NEVER start with "I'm excited to share" or "Hot take:"
- Write like someone who actually builds things and has opinions
- Connect the transcript insight to the news angle in a non-obvious way
- Hooks must create curiosity or tension, not clickbait
- LinkedIn posts should be scannable: short paragraphs, line breaks, maybe 1-2 bullet points max
- Hashtags: 4-6 relevant ones, mix of broad and niche
- Image prompts should be specific, editorial, not stock-photo generic

Respond ONLY with valid JSON matching the exact schema provided. No markdown fences.`;
}

export function buildUserPrompt(req: GenerateRequest): string {
  const toneGuide = TONE_GUIDANCE[req.tone];
  const rewriteGuide = req.rewriteAction ? REWRITE_GUIDANCE[req.rewriteAction] : "";

  let prompt = `Generate a complete LinkedIn content package.

## AI News / Source Material
${req.aiNews || "(none provided, infer from transcript context)"}

## Conversation Transcript
${req.transcript || "(none provided, focus on news angle)"}

## Target Topic
${req.topic || "Auto-detect from sources"}

## Target Audience
${req.audience || "Founders, product leaders, and AI practitioners on LinkedIn"}

## Tone: ${req.tone}
${toneGuide}
`;

  if (rewriteGuide) {
    prompt += `\n## Rewrite Instruction\n${rewriteGuide}\n`;
  }

  if (req.previousPackage) {
    prompt += `\n## Previous Version (refine this)\n${req.previousPackage.finalPost}\n`;
  }

  prompt += `
Return JSON with this exact structure:
{
  "finalPost": "Complete ready-to-post LinkedIn content including hook, body, and CTA",
  "hookOptions": ["hook 1", "hook 2", "hook 3"],
  "mainBody": "The main body without the hook or CTA",
  "cta": "Closing question or call-to-action",
  "hashtags": ["#tag1", "#tag2"],
  "extractedInsight": "The deeper insight from the transcript",
  "aiNewsAngle": "How the news connects to the insight",
  "imagePrompt": "Detailed image generation prompt",
  "videoScript": "30-60 second video script with timestamps",
  "carouselOutline": [{"title": "Slide title", "body": "Slide content"}],
  "alternateVersions": ["alternate post version 1", "alternate post version 2"],
  "sourceAnalysis": {
    "keyFacts": ["fact 1", "fact 2"],
    "painPoints": ["pain 1", "pain 2"],
    "insights": ["insight 1", "insight 2"],
    "contentAngle": "The unique angle combining both sources"
  },
  "contentStrategy": {
    "whyThisAngle": "Why this post angle will resonate",
    "targetAudience": "Specific audience segment",
    "emotionalAngle": "What emotion this triggers",
    "credibilityAngle": "What makes this credible",
    "suggestedPostingStyle": "Best time/format recommendations"
  },
  "postScore": {
    "hookStrength": 8,
    "clarity": 8,
    "originality": 8,
    "linkedInReadability": 8,
    "overall": 8,
    "notes": "Brief scoring rationale"
  }
}`;

  return prompt;
}
