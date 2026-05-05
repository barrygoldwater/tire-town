import { Phone } from "lucide-react";

export default function Hero() {
  const brands = ["Excel", "Achieva", "Arisun", "Wanda", "Innova", "Wheel Mate"];
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 lg:pb-14">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
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
        <p className="mt-5 sm:mt-6 text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-xl">
          Same-day quotes, dealer pricing, and fast freight nationwide. Stock programs for shops, fleets, and resellers.
        </p>

        {/* Brand marquee */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35 mb-4 sm:mb-5">
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


      </div>
    </section>
  );
}