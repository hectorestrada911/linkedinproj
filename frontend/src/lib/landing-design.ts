/** Landing design tokens - black + radiant sky blue */
export const L = {
  bg: "#050505",
  surface: "#0a0a0b",
  elevated: "#111113",
  text: "#fafafa",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
  textDim: "#52525b",
  /** Primary radiant blue */
  blue: "#38bdf8",
  blueLight: "#7dd3fc",
  blueDim: "#0ea5e9",
  blueGlow: "rgba(56,189,248,0.12)",
  blueBorder: "rgba(56,189,248,0.15)",
  blueBorderHover: "rgba(56,189,248,0.35)",
  cta: "#ededed",
} as const;

export const blueGradientBg =
  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(14,165,233,0.08), transparent 50%)";

export const photoBlueWash =
  "linear-gradient(to top, #0a0a0b 0%, rgba(10,10,11,0.75) 45%, rgba(56,189,248,0.12) 100%)";
