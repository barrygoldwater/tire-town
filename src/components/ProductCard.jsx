import { useState } from "react";

export default function ProductCard({ product, onClick }) {
  const [imgError, setImgError] = useState(false);
  const sizesSummary = product.variants 
    ? (() => {
        const uniqueSizes = [...new Set(product.variants.map(v => v.size.split(" ")[0]))];
        return uniqueSizes.length > 3
          ? uniqueSizes.slice(0, 3).join(", ") + ` +${uniqueSizes.length - 3}`
          : uniqueSizes.join(", ");
      })()
    : product.size || "—";
  // For single-variant products (one specific SKU per card), surface the finish
  // and part number so cards stay visually distinct from one another.
  const singleVariant = product.variants?.length === 1 ? product.variants[0] : null;
  const finishLabel = singleVariant?.finish || null;
  const partNumber = singleVariant?.part_number || null;
  const showImage = product.image_url && !imgError;

  return (
    <button
      type="button"
      onClick={() => onClick(product)}
      className="text-left bg-white border border-border rounded-[4px] overflow-hidden transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08),0_4px_8px_-4px_rgba(0,0,0,0.04)] hover:border-[#0a0a0a]"
    >
      <div className={`aspect-square flex items-center justify-center overflow-hidden relative ${showImage ? 'bg-[#f5f5f4]' : 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]'}`}>
        {showImage ? (
          <img
            src={product.image_url}
            alt={product.model}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-3 sm:p-4"
          />
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[68px] h-[68px] sm:w-[88px] sm:h-[88px] border border-white/12 rounded-full" />
            </div>
            <span className="relative text-white/92 text-[15px] sm:text-[18px] font-extrabold uppercase tracking-[0.16em] text-center px-3 leading-tight">
              {product.brand}
            </span>
          </>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">{product.brand}</p>
        <p className="text-[15px] sm:text-base font-bold text-[#0a0a0a] mt-1 leading-tight">{product.model}</p>
        <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-1 truncate">{sizesSummary}</p>
        {finishLabel && (
          <p className="text-[11px] sm:text-[12px] text-[#0a0a0a]/75 mt-1 leading-tight truncate">{finishLabel}</p>
        )}
        {partNumber && (
          <p className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/80 mt-1.5 truncate">{partNumber}</p>
        )}
      </div>
    </button>
  );
}