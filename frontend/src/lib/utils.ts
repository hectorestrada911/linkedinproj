import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function downloadTextFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatPackageAsMarkdown(pkg: import("@/types").ContentPackage): string {
  const lines = [
    "# LinkedIn Content Package",
    "",
    "## Final Post",
    "",
    pkg.finalPost,
    "",
    "## Hook Options",
    "",
    ...pkg.hookOptions.map((h, i) => `${i + 1}. ${h}`),
    "",
    "## Extracted Insight",
    "",
    pkg.extractedInsight,
    "",
    "## AI News Angle",
    "",
    pkg.aiNewsAngle,
    "",
    "## CTA / Question",
    "",
    pkg.cta,
    "",
    "## Hashtags",
    "",
    pkg.hashtags.join(" "),
    "",
    "## Image Prompt",
    "",
    pkg.imagePrompt,
  ];

  if (pkg.videoScript) {
    lines.push("", "## Video Script", "", pkg.videoScript);
  }

  if (pkg.carouselOutline?.length) {
    lines.push("", "## Carousel Outline", "");
    pkg.carouselOutline.forEach((slide, i) => {
      lines.push(`### Slide ${i + 1}: ${slide.title}`, "", slide.body, "");
    });
  }

  if (pkg.alternateVersions?.length) {
    lines.push("", "## Alternate Versions", "");
    pkg.alternateVersions.forEach((v, i) => {
      lines.push(`### Version ${i + 1}`, "", v, "");
    });
  }

  lines.push(
    "",
    "## Content Strategy",
    "",
    `**Why this angle:** ${pkg.contentStrategy.whyThisAngle}`,
    "",
    `**Target audience:** ${pkg.contentStrategy.targetAudience}`,
    "",
    `**Emotional angle:** ${pkg.contentStrategy.emotionalAngle}`,
    "",
    `**Credibility angle:** ${pkg.contentStrategy.credibilityAngle}`,
    "",
    `**Posting style:** ${pkg.contentStrategy.suggestedPostingStyle}`,
    "",
    "## Post Score",
    "",
    `- Hook strength: ${pkg.postScore.hookStrength}/10`,
    `- Clarity: ${pkg.postScore.clarity}/10`,
    `- Originality: ${pkg.postScore.originality}/10`,
    `- LinkedIn readability: ${pkg.postScore.linkedInReadability}/10`,
    `- Overall: ${pkg.postScore.overall}/10`,
    "",
    pkg.postScore.notes
  );

  return lines.join("\n");
}

export function scoreColor(score: number): string {
  if (score >= 8) return "text-emerald-600";
  if (score >= 6) return "text-amber-600";
  return "text-red-500";
}

export function scoreBg(score: number): string {
  if (score >= 8) return "bg-emerald-500";
  if (score >= 6) return "bg-amber-500";
  return "bg-red-400";
}
