import { Phone } from "lucide-react";

export default function Hero() {
  const brands = ["Excel", "Achieva", "Arisun", "Wanda", "Innova", "Wheel Mate"];
  const stats = [
    { num: "37", label: "Wheel models" },
    { num: "23", label: "Tire models" },
    { num: "320+", label: "Part numbers" },
  ];

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Atmospheric backdrop */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 75% 30%, rgba(120, 165, 80, 0.12), transparent 60%), radial-gradient(ellipse 80% 60% at 20% 100%, rgba(255,255,255,0.04), transparent 50%)",
        }}
      />
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="h-px w-8 bg-primary" />
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Independent · Family-Owned Since 1976
          </p>
        </div>

        {/* Editorial headline */}
        <h1 className="text-[40px] sm:text-[60px] lg:text-[76px] font-extrabold text-white tracking-[-0.035em] leading-[0.95] max-w-[920px]">
          The complete tire<br />
          <span className="text-white/40">and wheel catalog.</span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 sm:mt-8 text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-xl">
          Independent distribution for golf cart, turf, and specialty markets. Excel, Achieva, Arisun, Wanda, Innova, and Wheel Mate — in stock and ready to ship.
        </p>

        {/* Single primary CTA + quiet phone link */}
        <div className="mt-8 sm:mt-10 flex items-center gap-5 sm:gap-7">
          <a
            href="#wheels"
            className="bg-primary text-white text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.1em] px-6 sm:px-7 py-3.5 rounded-[2px] active:bg-primary/80 hover:bg-primary/90 transition-colors flex items-center gap-2.5 group"
          >
            Browse Catalog
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="tel:619-954-0034"
            className="hidden sm:flex items-center gap-2 text-white/55 hover:text-white text-[13px] font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            or call 619-954-0034
          </a>
        </div>

        {/* Brand marquee */}
        <div className="mt-14 sm:mt-20 lg:mt-24 pt-8 sm:pt-10 border-t border-white/10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35 mb-5 sm:mb-6">
            Authorized Distributor
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-10 lg:gap-x-14">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-[15px] sm:text-[17px] lg:text-[19px] font-bold text-white/55 tracking-[0.04em] uppercase"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Stats credential band */}
        <div className="mt-10 sm:mt-14 grid grid-cols-3 max-w-2xl divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={s.label} className={i === 0 ? "pr-4 sm:pr-8" : "px-4 sm:px-8"}>
              <div className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold text-white tracking-[-0.025em] leading-none">
                {s.num}
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] text-white/45 uppercase tracking-[0.15em] font-medium leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}