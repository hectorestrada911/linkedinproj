export type ToneStyle =
  | "founder"
  | "professional"
  | "technical"
  | "contrarian"
  | "concise"
  | "storytelling"
  | "thought-leader";

export type RewriteAction =
  | "founder-like"
  | "technical"
  | "shorter"
  | "controversial"
  | "polished";

export interface GenerationInput {
  aiNews: string;
  transcript: string;
  topic?: string;
  audience?: string;
  tone: ToneStyle;
}

export interface SourceAnalysis {
  keyFacts: string[];
  painPoints: string[];
  insights: string[];
  contentAngle: string;
}

export interface PostScore {
  hookStrength: number;
  clarity: number;
  originality: number;
  linkedInReadability: number;
  overall: number;
  notes: string;
}

export interface ContentStrategy {
  whyThisAngle: string;
  targetAudience: string;
  emotionalAngle: string;
  credibilityAngle: string;
  suggestedPostingStyle: string;
}

export interface CarouselSlide {
  title: string;
  body: string;
}

export interface ContentPackage {
  finalPost: string;
  hookOptions: string[];
  mainBody: string;
  cta: string;
  hashtags: string[];
  extractedInsight: string;
  aiNewsAngle: string;
  imagePrompt: string;
  imageUrl?: string;
  videoScript?: string;
  carouselOutline?: CarouselSlide[];
  alternateVersions?: string[];
  sourceAnalysis: SourceAnalysis;
  contentStrategy: ContentStrategy;
  postScore: PostScore;
}

export interface GenerateRequest extends GenerationInput {
  rewriteAction?: RewriteAction;
  previousPackage?: ContentPackage;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  category: string;
}

export interface GenerateResponse {
  package: ContentPackage;
  mode: "live" | "mock";
  generatedAt: string;
}

export const TONE_OPTIONS: { value: ToneStyle; label: string; description: string }[] = [
  { value: "founder", label: "Founder", description: "Personal, direct, builder energy" },
  { value: "professional", label: "Professional", description: "Polished, credible, executive" },
  { value: "technical", label: "Technical", description: "Deep, precise, practitioner-focused" },
  { value: "contrarian", label: "Contrarian", description: "Challenges assumptions, bold takes" },
  { value: "concise", label: "Concise", description: "Short, punchy, no fluff" },
  { value: "storytelling", label: "Storytelling", description: "Narrative arc, human moments" },
  { value: "thought-leader", label: "Thought Leader", description: "Big-picture, industry-shaping" },
];

export const REWRITE_ACTIONS: { value: RewriteAction; label: string }[] = [
  { value: "founder-like", label: "More founder-like" },
  { value: "technical", label: "More technical" },
  { value: "shorter", label: "Shorter" },
  { value: "controversial", label: "More controversial" },
  { value: "polished", label: "More polished" },
];
