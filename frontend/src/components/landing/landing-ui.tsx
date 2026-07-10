import Link from "next/link";
import { cn } from "@/lib/utils";

export function BlueRadiance({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#38bdf8]/10 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-[320px] w-[420px] rounded-full bg-[#0ea5e9]/8 blur-[90px]" />
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#38bdf8]/70">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#fafafa]",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-xl text-[17px] leading-[1.65] text-[#71717a]", className)}>
      {children}
    </p>
  );
}

export function PrimaryLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[#ededed] px-6 py-2.5 text-[14px] font-medium text-[#050505] transition-all hover:bg-white hover:shadow-[0_0_32px_rgba(56,189,248,0.25)]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function GhostLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/5 px-6 py-2.5 text-[14px] font-medium text-[#7dd3fc] backdrop-blur-sm transition-all hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 hover:text-[#bae6fd]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[14px] font-medium text-[#38bdf8] transition-colors hover:text-[#7dd3fc]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SectionDivider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#38bdf8]/20 to-transparent" />
  );
}

export function AccentLine({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-10 bg-gradient-to-r from-[#38bdf8]/70 to-transparent", className)}
    />
  );
}

export function ImageFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[#38bdf8]/15 shadow-[0_0_48px_rgba(56,189,248,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}
