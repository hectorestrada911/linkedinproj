export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]" aria-hidden>
      <div className="hero-glow-left absolute inset-0" />
      <div className="hero-glow-right absolute inset-0" />
      <div className="hero-grid absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-[#050505]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]" />
    </div>
  );
}
