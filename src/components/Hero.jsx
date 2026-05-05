export default function Hero() {
  return (
    <section className="bg-[#0a0a0a] py-14 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4 sm:mb-5">
          Family-Owned Since 1976
        </p>
        <h1 className="text-[34px] sm:text-5xl lg:text-[64px] font-extrabold text-white uppercase tracking-[-0.025em] sm:tracking-[-0.035em] leading-[0.98]">
          WHOLESALE GOLF CART<br />
          WHEELS <span className="text-primary">&</span> TIRES
        </h1>
        <p className="mt-4 sm:mt-5 text-white/70 text-[15px] sm:text-base lg:text-lg max-w-xl leading-relaxed">
          The full Excel, Achieva, Arisun, Wanda, Innova and Wheel Mate catalog — in stock and ready to ship.
        </p>
        <div className="mt-7 sm:mt-9 flex gap-3 sm:gap-4">
          <a href="#wheels" className="flex-1 sm:flex-none text-center bg-primary text-white text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] px-5 sm:px-7 py-3.5 sm:py-3 rounded-[4px] active:bg-primary/80 hover:bg-primary/90 transition-colors">SHOP WHEELS</a>
          <a href="#tires" className="flex-1 sm:flex-none text-center border border-white text-white text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] px-5 sm:px-7 py-3.5 sm:py-3 rounded-[4px] active:bg-white/15 hover:bg-white/10 transition-colors">SHOP TIRES</a>
        </div>
        <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-10 max-w-2xl">
          {[
            { num: "37", label: "Wheel Models" },
            { num: "23", label: "Tire Models" },
            { num: "320+", label: "Part Numbers" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[26px] sm:text-3xl lg:text-4xl font-extrabold text-white tracking-[-0.02em]">{stat.num}</div>
              <div className="mt-1 text-[10px] sm:text-[11px] text-white/55 uppercase tracking-[0.1em] font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}