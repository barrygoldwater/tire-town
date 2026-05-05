export default function Hero() {
  return (
    <section className="bg-[#0a0a0a] py-16 sm:py-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white uppercase tracking-[-0.02em] leading-[1.05]">
          WHOLESALE GOLF CART<br />
          WHEELS <span className="text-primary font-extrabold">&</span> TIRES
        </h1>
        <p className="mt-5 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
          The full Excel, Achieva, Arisun, Wanda, Innova and Wheel Mate catalog — in stock and ready to ship.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#wheels"
            className="bg-primary text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-7 py-3 rounded-[4px] hover:bg-primary/90 transition-colors"
          >
            SHOP WHEELS
          </a>
          <a
            href="#tires"
            className="border border-white text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-7 py-3 rounded-[4px] hover:bg-white/10 transition-colors"
          >
            SHOP TIRES
          </a>
        </div>
        <div className="mt-10 flex flex-wrap gap-6 sm:gap-10">
          {[
            { num: "37", label: "Wheel Models" },
            { num: "23", label: "Tire Models" },
            { num: "320+", label: "Part Numbers" },
          ].map((stat) => (
            <div key={stat.label} className="text-white">
              <span className="text-2xl sm:text-3xl font-extrabold">{stat.num}</span>
              <span className="ml-2 text-sm text-white/50 uppercase tracking-[0.08em]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}