"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Sources", href: "#sources" },
  { label: "Workflow", href: "#workflow" },
  { label: "Capabilities", href: "#capabilities" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-[#2a2a2e] bg-[#121214]/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-[#F4F4F5]">
          SignalPost
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-[#a1a1aa] transition-colors hover:text-[#F4F4F5]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/studio"
          className="rounded-lg bg-[#F4F4F5] px-4 py-2 text-[13px] font-medium text-[#121214] transition-colors hover:bg-white"
        >
          Open Studio
        </Link>
      </nav>
    </header>
  );
}
