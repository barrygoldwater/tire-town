export default function BrandFilter({ brands, activeBrand, onBrandChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onBrandChange("All")}
        className={`text-[13px] font-medium px-4 py-1.5 rounded-full border transition-colors ${
          activeBrand === "All"
            ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
            : "bg-white text-[#0a0a0a] border-border hover:border-[#0a0a0a]"
        }`}
      >
        All Brands
      </button>
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => onBrandChange(brand)}
          className={`text-[13px] font-medium px-4 py-1.5 rounded-full border transition-colors ${
            activeBrand === brand
              ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
              : "bg-white text-[#0a0a0a] border-border hover:border-[#0a0a0a]"
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}