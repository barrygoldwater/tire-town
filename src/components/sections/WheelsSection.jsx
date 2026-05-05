import { useState } from "react";
import inventory from "@/lib/inventory";
import BrandFilter from "../BrandFilter";
import ProductCard from "../ProductCard";

export default function WheelsSection({ onProductClick }) {
  const [activeBrand, setActiveBrand] = useState("All");

  const wheels = inventory.wheels.filter(w => w.category === "wheel");
  const filtered = activeBrand === "All" ? wheels : wheels.filter(w => w.brand === activeBrand);
  const brands = inventory.categories.wheels.brands;

  return (
    <section id="wheels" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a]">
          WHEELS
        </h2>
        <p className="mt-2 text-muted-foreground text-base max-w-2xl">
          {inventory.categories.wheels.description}
        </p>
        <div className="mt-6">
          <BrandFilter brands={brands} activeBrand={activeBrand} onBrandChange={setActiveBrand} />
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
}