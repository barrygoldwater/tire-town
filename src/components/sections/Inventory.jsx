import { useState, useEffect } from "react";
import inventory from "@/lib/inventory";
import BrandFilter from "../BrandFilter";
import ProductCard from "../ProductCard";

const CATEGORY_LABELS = {
  golf_cart: "Golf Cart",
  industrial: "Industrial",
  atv: "ATV / UTV",
  lawn_garden: "Lawn & Garden",
  trailer: "Trailer",
};

const EmptyState = () => (
  <div className="py-20 text-center">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">Coming Soon</p>
    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-[#0a0a0a]">We're expanding into this category.</h3>
    <p className="mt-3 text-muted-foreground max-w-md mx-auto">
      Call <a href="tel:619-954-0034" className="text-[#0a0a0a] font-semibold underline">619-954-0034</a> to discuss your wholesale program.
    </p>
  </div>
);

export default function Inventory({ onProductClick, category }) {
  const [type, setType] = useState("wheels");
  const [activeBrand, setActiveBrand] = useState("All");

  // Reset to wheels tab when category changes
  useEffect(() => {
    setType("wheels");
    setActiveBrand("All");
  }, [category]);

  // Reset brand filter when type changes
  useEffect(() => {
    setActiveBrand("All");
  }, [type]);

  const vehicleType = category || "golf_cart";

  const allWheels = inventory.wheels.filter(w => w.category === "wheel" && (w.vehicle_type || "golf_cart") === vehicleType);
  const allTires = inventory.tires.filter(t => (t.vehicle_type || "golf_cart") === vehicleType);

  const products = type === "wheels" ? allWheels : allTires;
  const brandsForType = ["All", ...new Set(products.map(p => p.brand))];

  const filtered = activeBrand === "All" ? products : products.filter(p => p.brand === activeBrand);

  const categoryLabel = CATEGORY_LABELS[vehicleType] || "Golf Cart";
  const hasInventory = allWheels.length > 0 || allTires.length > 0;

  return (
    <section id="inventory" className="py-16 sm:py-20 lg:py-24 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          June 2026 Catalog
        </p>
        <h2 className="text-[28px] sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.025em] text-[#0a0a0a]">
          {categoryLabel} Wheels &amp; Tires
        </h2>
        <p className="mt-2 text-muted-foreground text-[15px] sm:text-base max-w-2xl">
          Same-day quotes on stocking orders. Dealer pricing available — call or submit a request below.
        </p>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Catalog Edition · June 2026
        </span>

        {!hasInventory ? <EmptyState /> : (
          <>
            {/* Type tabs */}
            <div className="flex gap-2 mt-8 mb-6">
              <button
                onClick={() => setType("wheels")}
                className={`px-6 py-3 rounded-[3px] text-[13px] font-bold uppercase tracking-[0.08em] transition-all ${
                  type === "wheels"
                    ? "bg-[#0a0a0a] text-white"
                    : "bg-white text-[#0a0a0a] border border-border hover:border-[#0a0a0a]"
                }`}
              >
                Wheels <span className="ml-1.5 opacity-60">({allWheels.length})</span>
              </button>
              <button
                onClick={() => setType("tires")}
                className={`px-6 py-3 rounded-[3px] text-[13px] font-bold uppercase tracking-[0.08em] transition-all ${
                  type === "tires"
                    ? "bg-[#0a0a0a] text-white"
                    : "bg-white text-[#0a0a0a] border border-border hover:border-[#0a0a0a]"
                }`}
              >
                Tires <span className="ml-1.5 opacity-60">({allTires.length})</span>
              </button>
            </div>

            {/* Brand filter */}
            {products.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide mb-6">
                <BrandFilter
                  brands={brandsForType.filter(b => b !== "All")}
                  activeBrand={activeBrand}
                  onBrandChange={setActiveBrand}
                />
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onClick={onProductClick} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">No products found for this filter.</div>
            )}
          </>
        )}
      </div>
    </section>
  );
}