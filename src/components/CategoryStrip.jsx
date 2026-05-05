function GolfCartIcon({ className }) {
  return (
    <svg viewBox="0 0 96 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Canopy frame: back pillar + roof + front pillar */}
      <path d="M22 42V16h48v26" />
      {/* Front cowl protruding past front pillar */}
      <path d="M70 32l12 4v6" />
      {/* Body floor (deck) */}
      <path d="M14 42h68" />
      {/* Seat back */}
      <path d="M46 42v-14" />
      {/* Wheels */}
      <circle cx="28" cy="52" r="6" />
      <circle cx="68" cy="52" r="6" />
    </svg>
  );
}

function TractorIcon({ className }) {
  return (
    <svg viewBox="0 0 96 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="68" cy="44" r="14" />
      <circle cx="68" cy="44" r="5" />
      <circle cx="22" cy="50" r="8" />
      <path d="M30 50h24" />
      <path d="M54 32h-8l-6-12H28v22" />
      <path d="M40 32v-12" />
      <path d="M54 24h14v6" />
    </svg>
  );
}

function ATVIcon({ className }) {
  return (
    <svg viewBox="0 0 96 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="22" cy="50" r="8" />
      <circle cx="74" cy="50" r="8" />
      <path d="M30 50h36" />
      <path d="M14 42l4-8h60l4 8" />
      <path d="M22 34l4-12h44l4 12" />
      <path d="M44 22v12M52 22v12" />
    </svg>
  );
}

function MowerIcon({ className }) {
  return (
    <svg viewBox="0 0 96 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="22" cy="52" r="6" />
      <circle cx="58" cy="52" r="6" />
      <path d="M14 46l3-10h46l3 10" />
      <path d="M30 36V24h20v12" />
      <path d="M66 40l14-14h6" />
      <path d="M82 22h6v6" />
    </svg>
  );
}

function TrailerIcon({ className }) {
  return (
    <svg viewBox="0 0 96 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 30h66v14H8z" />
      <circle cx="26" cy="50" r="6" />
      <circle cx="56" cy="50" r="6" />
      <path d="M74 38h10l-4-6h-6" />
      <path d="M8 30v-4h12" />
    </svg>
  );
}

const CATEGORIES = [
  { id: "golf_cart", label: "Golf Cart", icon: GolfCartIcon, available: true },
  { id: "industrial", label: "Industrial", icon: TractorIcon, available: false },
  { id: "atv", label: "ATV / UTV", icon: ATVIcon, available: false },
  { id: "lawn_garden", label: "Lawn & Garden", icon: MowerIcon, available: false },
  { id: "trailer", label: "Trailer", icon: TrailerIcon, available: false },
];

export default function CategoryStrip({ selected, onSelect }) {
  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto py-5 sm:py-7 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selected === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => cat.available && onSelect(cat.id)}
                aria-pressed={isSelected}
                disabled={!cat.available}
                className={`
                  group relative flex-shrink-0 snap-start sm:flex-1
                  w-[128px] sm:w-auto
                  flex flex-col items-center justify-center
                  px-3 py-5 sm:px-5 sm:py-6
                  rounded-[6px] border transition-all duration-150
                  ${isSelected
                    ? "border-primary bg-primary/[0.04]"
                    : "border-border bg-white"}
                  ${cat.available
                    ? "cursor-pointer hover:border-[#0a0a0a] hover:-translate-y-0.5 active:scale-[0.98]"
                    : "cursor-not-allowed opacity-55"}
                `}
              >
                <Icon className={`w-11 h-11 sm:w-12 sm:h-12 mb-3 transition-colors ${isSelected ? "text-primary" : "text-[#0a0a0a] group-hover:text-primary"}`} />
                <div className="text-[11px] sm:text-[12px] font-bold text-[#0a0a0a] uppercase tracking-[0.08em] text-center leading-tight">
                  {cat.label}
                </div>
                {!cat.available && (
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mt-1.5">
                    Coming Soon
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}