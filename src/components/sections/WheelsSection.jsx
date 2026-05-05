import { useState } from "react";
import inventory from "@/lib/inventory";
import BrandFilter from "../BrandFilter";
import ProductCard from "../ProductCard";

const EmptyState = () => (
  <div className="py-20 text-center">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">Coming Soon</p>
    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-[#0a0a0a]">We're expanding into this category.</h3>
    <p className="mt-3 text-muted-foreground max-w-md mx-auto">
      Call <a href="tel:619-954-0034" className="text-[#0a0a0a] font-semibold underline">619-954-0034</a> to discuss your wholesale program.
    </p>
  </div>
);

export default function WheelsSection({ onProductClick, category }) {
  const [activeBrand, setActiveBrand] = useState("All");

  const wheels = inventory.wheels.filter(w => w.category === "wheel" && (w.vehicle_type || "golf_cart") === category);
  const filtered = activeBrand === "All" ? wheels : wheels.filter(w => w.brand === activeBrand);
  const brands = inventory.categories.wheels.brands;

  return (
    <section id="wheels" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Wheels</p>
        <h2 className="text-[28px] sm:text-4xl lg:text-[44px] font-extrabold uppercase tracking-[-0.025em] text-[#0a0a0a] mt-1">
          ALUMINUM & STEEL WHEELS
        </h2>
        <p className="mt-2 text-muted-foreground text-[15px] sm:text-base max-w-2xl">
          {inventory.categories.wheels.description}
        </p>
        {wheels.length === 0 ? <EmptyState /> : (
          <>
            <div className="mt-5 sm:mt-6 flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
              <BrandFilter brands={brands} activeBrand={activeBrand} onBrandChange={setActiveBrand} />
            </div>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}