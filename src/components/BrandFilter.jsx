export default function BrandFilter({ brands, activeBrand, onBrandChange }) {
  const btnClass = (active) =>
    `flex-shrink-0 text-[13px] font-medium px-4 py-2 rounded-full border transition-colors active:scale-95 ${
      active
        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
        : "bg-white text-[#0a0a0a] border-border hover:border-[#0a0a0a]"
    }`;
  return (
    <>
      <button onClick={() => onBrandChange("All")} className={btnClass(activeBrand === "All")}>
        All Brands
      </button>
      {brands.map((brand) => (
        <button key={brand} onClick={() => onBrandChange(brand)} className={btnClass(activeBrand === brand)}>
          {brand}
        </button>
      ))}
    </>
  );
}