import { useState, useRef } from "react";
import inventory from "@/lib/inventory";

const ALL_ITEMS = [
  ...inventory.wheels,
  ...inventory.tires,
  ...(inventory.accessories || []),
];
const availableCategoryIds = new Set(ALL_ITEMS.map((item) => item.vehicle_type));

const CATEGORY_DEFS = [
  { id: "golf_cart",   label: "Golf Cart",     icon: "mdi:golf-cart",     vroom: true  },
  { id: "industrial",  label: "Industrial",    icon: "mdi:tractor",       vroom: true  },
  { id: "lawn_garden", label: "Lawn & Garden", icon: "mdi:mower",         vroom: true  },
  { id: "trailer",     label: "Trailer",       icon: "mdi:truck-trailer", vroom: true  },
  { id: "accessories", label: "Accessories",   icon: "mdi:nut",           vroom: false },
];

const CATEGORIES = CATEGORY_DEFS.map((cat) => ({
  ...cat,
  available: availableCategoryIds.has(cat.id),
}));

const PRIMARY_HEX = "527333";
const DARK_HEX = "0a0a0a";

// Vroom animation duration in ms
const VROOM_MS = 700;

export default function CategoryStrip({ selected, onSelect }) {
  const [vroomId, setVroomId] = useState(null);
  const timerRef = useRef(null);

  function handleClick(cat) {
    if (!cat.available) return;

    if (cat.vroom) {
      // Always animate — cancel any in-flight animation first
      if (timerRef.current) clearTimeout(timerRef.current);
      setVroomId(cat.id);
      timerRef.current = setTimeout(() => {
        setVroomId(null);
        onSelect(cat.id); // no-op if already selected, but animation still fires
      }, VROOM_MS - 80);
    } else {
      onSelect(cat.id);
    }
  }

  return (
    <>
      <style>{`
        @keyframes smokePuff {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
          35%  { opacity: 0.5; }
          100% { opacity: 0; transform: translate(var(--sx), var(--sy)) scale(1.5); }
        }
        @keyframes vroomIcon {
          0%   { transform: rotate(0deg) translateY(0px); }
          22%  { transform: rotate(-18deg) translateY(-3px); }
          48%  { transform: rotate(-18deg) translateY(-3px); }
          65%  { transform: rotate(0deg) translateY(0px); }
          100% { transform: translateX(72px); opacity: 0; }
        }
        .vroom-smoke {
          position: absolute;
          left: 8%;
          bottom: 4%;
          border-radius: 50%;
          background: rgba(130,130,130,0.65);
          filter: blur(4px);
          pointer-events: none;
          animation: smokePuff 380ms ease-out forwards;
        }
        .vroom-smoke-1 { width: 13px; height: 13px; --sx: -12px; --sy: -6px;  animation-delay: 0ms;  }
        .vroom-smoke-2 { width: 11px; height: 11px; --sx: -16px; --sy: -13px; animation-delay: 50ms; }
        .vroom-smoke-3 { width: 14px; height: 14px; --sx: -10px; --sy: -19px; animation-delay: 100ms; }
        .vroom-smoke-4 { width: 10px; height: 10px; --sx: -18px; --sy: -8px;  animation-delay: 30ms; }
        .vroom-smoke-5 { width: 12px; height: 12px; --sx: -8px;  --sy: -24px; animation-delay: 150ms; }
        .vroom-icon {
          animation: vroomIcon ${VROOM_MS}ms cubic-bezier(0.4,0,0.8,1) forwards;
        }
      `}</style>

      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto py-5 sm:py-7 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => {
              const isSelected = selected === cat.id;
              const isVrooming = vroomId === cat.id;
              const iconColor = isSelected ? PRIMARY_HEX : DARK_HEX;
              const iconUrl = `https://api.iconify.design/${cat.icon}.svg?color=%23${iconColor}`;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleClick(cat)}
                  aria-pressed={isSelected}
                  disabled={!cat.available}
                  className={`
                    group relative flex-shrink-0 snap-start sm:flex-1
                    w-[128px] sm:w-auto
                    flex flex-col items-center justify-center
                    px-3 py-5 sm:px-5 sm:py-6
                    rounded-[6px] border transition-all duration-150
                    overflow-visible
                    ${isSelected
                      ? "border-primary bg-primary/[0.04]"
                      : "border-border bg-white"}
                    ${cat.available
                      ? "cursor-pointer hover:border-[#0a0a0a] hover:-translate-y-0.5 active:scale-[0.98]"
                      : "cursor-not-allowed opacity-55"}
                  `}
                >
                  {/* Smoke puffs */}
                  {isVrooming && (
                    <>
                      <div className="vroom-smoke vroom-smoke-1" />
                      <div className="vroom-smoke vroom-smoke-2" />
                      <div className="vroom-smoke vroom-smoke-3" />
                      <div className="vroom-smoke vroom-smoke-4" />
                      <div className="vroom-smoke vroom-smoke-5" />
                    </>
                  )}

                  <img
                    src={iconUrl}
                    alt=""
                    className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 transition-opacity ${
                      !cat.available ? "opacity-50" : ""
                    } ${isVrooming ? "vroom-icon" : ""}`}
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
    </>
  );
}