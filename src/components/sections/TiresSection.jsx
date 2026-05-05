import { useState } from "react";
import inventory from "@/lib/inventory";
import BrandFilter from "../BrandFilter";
import ProductCard from "../ProductCard";

export default function TiresSection({ onProductClick }) {
  const [activeBrand, setActiveBrand] = useState("All");

  const tires = inventory.tires;
  const filtered = activeBrand === "All" ? tires : tires.filter(t => t.brand === activeBrand);
  const brands = ["Excel", "Wanda", "Innova", "Arisun"];

  return (
    <section id="tires" className="py-16 sm:py-20 bg-[#f5f5f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a]">
          TIRES
        </h2>
        <p className="mt-2 text-muted-foreground text-base max-w-2xl">
          Street, turf, all-terrain and trail patterns. DOT-approved options for street-legal builds.
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