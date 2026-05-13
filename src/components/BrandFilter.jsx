export default function BrandFilter({ brands, active, onChange }) {
  const btnClass = (isActive) =>
    `flex-shrink-0 text-[13px] font-medium px-4 py-2 rounded-full border transition-colors active:scale-95 ${
      isActive
        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
        : "bg-white text-[#0a0a0a] border-border hover:border-[#0a0a0a]"
    }`;
  return (
    <>
      <button onClick={() => onChange("All")} className={btnClass(active === "All")}>
        All Brands
      </button>
      {brands.map((brand) => (
        <button key={brand} onClick={() => onChange(brand)} className={btnClass(active === brand)}>
          {brand}
        </button>
      ))}
    </>
  );
}