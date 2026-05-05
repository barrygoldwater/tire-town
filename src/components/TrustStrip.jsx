export default function TrustStrip() {
  const items = [
    "Family-Owned Since 1976",
    "Authorized Distributor",
    "Same-Day Quotes",
    "Net Terms Available",
  ];

  return (
    <div className="bg-[#0a0a0a] py-2.5 sm:py-3">
      <div className="flex items-center justify-center gap-0 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden px-4">
        {items.map((item, i) => (
          <span key={item} className="flex items-center">
            <span className={`text-[11px] sm:text-[12px] tracking-[0.08em] text-white/70 ${i === items.length - 1 ? "hidden [@media(min-width:420px)]:inline" : ""}`}>
              {item}
            </span>
            {i < items.length - 1 && (
              <span className={`mx-3 text-white/25 text-[11px] ${i === items.length - 2 ? "hidden [@media(min-width:420px)]:inline" : ""}`}>·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}