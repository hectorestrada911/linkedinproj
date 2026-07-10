import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const landingFont = Inter({
  subsets: ["latin"],
  variable: "--font-landing",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SignalPost | LinkedIn Content Generator",
  description:
    "Transform AI news and conversation transcripts into publish-ready LinkedIn content packages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${landingFont.variable} ${displayFont.variable}`}>
      <body className="min-h-screen font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
