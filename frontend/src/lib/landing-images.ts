/** Local editorial photography for the landing page — warm, minimal, not stock-AI slop */

export const LANDING_IMAGES = {
  hero: { src: "/images/landing/hero.jpg", alt: "Warm minimal workspace with natural light" },
  pasteSource: { src: "/images/landing/paste-source.jpg", alt: "Hand writing notes in a journal" },
  searchNews: { src: "/images/landing/search-news.jpg", alt: "Reading the news over coffee" },
  findAngle: { src: "/images/landing/find-angle.jpg", alt: "Team discussion at a whiteboard" },
  workflow: { src: "/images/landing/workflow.jpg", alt: "Collaborative work session" },
  output: { src: "/images/landing/output.jpg", alt: "Clean desk ready to publish" },
  cta: { src: "/images/landing/cta.jpg", alt: "Modern café workspace" },
} as const;

export const SOURCE_MODES = [
  {
    id: "paste",
    title: "Paste Source",
    description: "Drop in headlines, meeting notes, or a full transcript.",
    image: LANDING_IMAGES.pasteSource,
  },
  {
    id: "search",
    title: "Search AI News",
    description: "Find a live story and use it as your industry hook.",
    image: LANDING_IMAGES.searchNews,
  },
  {
    id: "angle",
    title: "Auto-Find Angle",
    description: "Describe your topic — we match news and draft the angle.",
    image: LANDING_IMAGES.findAngle,
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    title: "Add sources",
    body: "Paste, search, or auto-find an angle — three ways in, same pipeline out.",
  },
  {
    title: "Pick a voice",
    body: "Founder, technical, contrarian, or five other modes tuned for LinkedIn.",
  },
  {
    title: "Generate",
    body: "Post, hooks, strategy, hashtags, and image prompt in one run.",
  },
  {
    title: "Ship it",
    body: "Rewrite, copy blocks, or export the full package as Markdown.",
  },
] as const;
