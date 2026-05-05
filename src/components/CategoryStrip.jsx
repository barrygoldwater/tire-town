const CATEGORIES = [
  { id: "golf_cart",   label: "Golf Cart",     icon: "mdi:golf-cart",     available: true  },
  { id: "industrial",  label: "Industrial",    icon: "mdi:tractor",       available: true },
  { id: "atv",         label: "ATV / UTV",     icon: "mdi:atv",           available: true },
  { id: "lawn_garden", label: "Lawn & Garden", icon: "mdi:mower",         available: true },
  { id: "trailer",     label: "Trailer",       icon: "mdi:truck-trailer", available: true },
];

const PRIMARY_HEX = "527333";
const DARK_HEX = "0a0a0a";

export default function CategoryStrip({ selected, onSelect }) {
  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto py-5 sm:py-7 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const isSelected = selected === cat.id;
            const iconColor = isSelected ? PRIMARY_HEX : DARK_HEX;
            const iconUrl = `https://api.iconify.design/${cat.icon}.svg?color=%23${iconColor}`;

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
                  src={iconUrl}
                  alt=""
                  className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 transition-opacity ${
                    !cat.available ? "opacity-50" : ""
                  }`}
                />
                <div
                  className={`text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.08em] text-center leading-tight transition-colors ${
                    isSelected ? "text-primary" : "text-[#0a0a0a]"
                  }`}
                >
                  {cat.label}
                </div>

              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}