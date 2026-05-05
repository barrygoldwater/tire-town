const CATEGORIES = [
  { id: "golf_cart",   label: "Golf Cart",     image: "/categories/golf-cart.png", available: true  },
  { id: "industrial",  label: "Industrial",    image: "/categories/tractor.png",   available: false },
  { id: "atv",         label: "ATV / UTV",     image: "/categories/atv.png",       available: false },
  { id: "lawn_garden", label: "Lawn & Garden", image: "/categories/mower.png",     available: false },
  { id: "trailer",     label: "Trailer",       image: "/categories/trailer.png",   available: false },
];

export default function CategoryStrip({ selected, onSelect }) {
  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto py-5 sm:py-7 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
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
                <img
                  src={cat.image}
                  alt=""
                  className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 object-contain transition-opacity ${isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                />
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