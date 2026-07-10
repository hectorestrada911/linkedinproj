import Image from "next/image";
import { LANDING_IMAGES } from "@/lib/landing-images";
import {
  BlueRadiance,
  SectionTitle,
  TextLink,
} from "@/components/landing/landing-ui";

const STEPS = [
  {
    label: "Add",
    title: "Bring your source material",
    body: "Paste notes, search AI headlines, or auto-find an angle from a topic.",
    image: LANDING_IMAGES.pasteSource,
    mock: "source" as const,
  },
  {
    label: "Shape",
    title: "Pick how you want to sound",
    body: "Founder, technical, contrarian. Seven voices tuned for LinkedIn.",
    image: LANDING_IMAGES.findAngle,
    mock: "voice" as const,
  },
  {
    label: "Publish",
    title: "Get a full content package",
    body: "Post, hooks, strategy, hashtags, and score. Ready to ship.",
    image: LANDING_IMAGES.output,
    mock: "output" as const,
  },
];

export function PlatformSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28 sm:py-36">
      <BlueRadiance />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle className="mx-auto">
            The all-in-one studio for LinkedIn content.
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-[#71717a]">
            From raw input to publish-ready output. Three steps, one pipeline.
          </p>
          <div className="mt-8">
            <TextLink href="/studio">Start building →</TextLink>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.label} className="flex flex-col">
              {/* Square photo tile - no border, sharp corners */}
              <div className="group relative aspect-square overflow-hidden rounded-none transition-all hover:shadow-[0_0_80px_rgba(56,189,248,0.15)]">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="400px"
                />
                {/* Blue-black cinematic wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#38bdf8]/15" />
                <div className="absolute inset-0 bg-[#0ea5e9]/10 mix-blend-soft-light" />

                {/* Floating UI mock */}
                <div className="absolute inset-0 flex items-center justify-center p-5 pt-8">
                  <div className="w-full translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    {step.mock === "source" && <SourceMock />}
                    {step.mock === "voice" && <VoiceMock />}
                    {step.mock === "output" && <OutputMock />}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[13px] font-medium text-[#38bdf8]">{step.label}</p>
                <h3 className="mt-1 text-[16px] font-semibold text-[#fafafa]">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#71717a]">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SourceMock() {
  return (
    <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-lg bg-[#050505]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div className="border-b border-[#38bdf8]/10 bg-[#38bdf8]/5 px-3 py-2">
        <p className="font-mono text-[10px] text-[#7dd3fc]">source.txt</p>
      </div>
      <pre className="overflow-hidden p-3 font-mono text-[9px] leading-relaxed text-[#a1a1aa]">
        <span className="text-[#38bdf8]">{"[TechCrunch]"}</span>
        {"\n"}GPT-5 launches with agents…
        {"\n\n"}
        <span className="text-[#52525b]">Person A:</span> We spend too
        {"\n"}much time on content…
      </pre>
    </div>
  );
}

function VoiceMock() {
  const voices = ["Founder", "Technical", "Contrarian", "Concise"];
  return (
    <div className="mx-auto grid w-full max-w-[220px] grid-cols-2 gap-2">
      {voices.map((v, i) => (
        <div
          key={v}
          className={`flex aspect-square items-center justify-center rounded-lg text-[11px] font-medium backdrop-blur-md ${
            i === 0
              ? "bg-[#38bdf8]/25 text-[#bae6fd] shadow-[0_0_20px_rgba(56,189,248,0.25)]"
              : "bg-[#050505]/70 text-[#71717a]"
          }`}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

function OutputMock() {
  return (
    <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-lg bg-[#050505]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div className="border-b border-[#38bdf8]/10 bg-[#38bdf8]/5 px-3 py-2">
        <p className="text-[10px] font-medium text-[#7dd3fc]">LinkedIn · Preview</p>
      </div>
      <div className="space-y-2 p-3">
        <div className="h-2 w-full rounded bg-[#38bdf8]/20" />
        <div className="h-2 w-4/5 rounded bg-white/10" />
        <div className="h-2 w-3/5 rounded bg-white/[0.06]" />
        <div className="mt-3 flex items-center gap-1.5">
          <span className="rounded-md bg-[#38bdf8]/20 px-2 py-0.5 text-[9px] font-medium text-[#7dd3fc]">
            8.2
          </span>
          <span className="text-[9px] text-[#52525b]">post score</span>
        </div>
      </div>
    </div>
  );
}
