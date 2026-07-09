const CAPABILITIES = [
  {
    title: "Dual-source input",
    description: "Paste AI news or fetch headlines. Add a team conversation when you have one.",
  },
  {
    title: "Full content package",
    description: "Post, hooks, CTA, hashtags, image prompt, carousel outline, and video script.",
  },
  {
    title: "Tone modes",
    description: "Founder, technical, contrarian, concise, storytelling, thought leader, professional.",
  },
  {
    title: "Post scoring",
    description: "Hook strength, clarity, originality, and readability — scored on every run.",
  },
  {
    title: "Strategy notes",
    description: "Why the angle works, who it’s for, and what makes it credible.",
  },
  {
    title: "Rewrite and export",
    description: "Shift tone in one click. Copy any block or export the full package as Markdown.",
  },
];

export function BentoGrid() {
  return (
    <section id="capabilities" className="border-t border-[#2a2a2e] bg-[#161618] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              What you get on every run
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a1a1aa]">
              SignalPost turns source material into a publish-ready package — not a single
              draft paragraph.
            </p>
          </div>

          <dl className="divide-y divide-[#2a2a2e] border-y border-[#2a2a2e]">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="grid gap-1 py-5 sm:grid-cols-[minmax(0,200px)_1fr] sm:gap-8"
              >
                <dt className="text-[14px] font-medium text-[#F4F4F5]">{cap.title}</dt>
                <dd className="text-[14px] leading-relaxed text-[#a1a1aa]">{cap.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
