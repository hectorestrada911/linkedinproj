"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Workflow", href: "#workflow" },
  { label: "Capabilities", href: "#capabilities" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "px-4 pt-3" : "px-0 pt-0"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-14 items-center justify-between transition-all duration-300",
          scrolled
            ? "max-w-5xl rounded-full border border-white/[0.08] bg-[#0a0a0b]/85 px-5 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "max-w-6xl px-6"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-[#D4A853]/20" />
            <span className="relative h-2 w-2 rounded-full bg-[#D4A853]" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Signal<span className="text-[#D4A853]">Post</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/studio"
          className={cn(
            "group inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all",
            scrolled
              ? "rounded-full bg-[#D4A853] px-4 py-2 text-[#0a0a0b] hover:bg-[#E8C876]"
              : "rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-sm hover:bg-white/20"
          )}
        >
          Launch Studio
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </header>
  );
}
