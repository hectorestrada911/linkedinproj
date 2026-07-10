"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PrimaryLink } from "@/components/landing/landing-ui";

const NAV = [
  { label: "Sources", href: "#sources" },
  { label: "Workflow", href: "#workflow" },
  { label: "Product", href: "#product" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[#38bdf8]/10 bg-[#050505]/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-[52px] max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-[14px] font-semibold tracking-[-0.02em] text-[#fafafa]"
        >
          SignalPost
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[13px] text-[#71717a] transition-colors hover:text-[#7dd3fc]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <PrimaryLink href="/studio" className="px-4 py-1.5 text-[13px]">
          Open Studio
        </PrimaryLink>
      </nav>
    </header>
  );
}
