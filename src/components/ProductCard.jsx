import { useState } from "react";

function Placeholder({ brand }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
      <div className="flex items-center justify-center w-28 h-28 rounded-full border border-white/20">
        <span
          className="text-white font-extrabold uppercase text-center leading-tight px-2"
          style={{ fontSize: "13px", letterSpacing: "0.16em" }}
        >
          {brand}
        </span>
      </div>
    </div>
  );
}

export default function ProductCard({ product, onClick }) {
  const [imgError, setImgError] = useState(false);

  const uniqueSizes = [...new Set(product.variants.map(v => v.size.split(" ")[0]))];
  const sizesSummary = uniqueSizes.length > 4
    ? uniqueSizes.slice(0, 4).join(", ") + ` +${uniqueSizes.length - 4}`
    : uniqueSizes.join(", ");

  const hasImage = product.image_url && !imgError;

  return (
    <button
      onClick={() => onClick(product)}
      data-id={product.id}
      data-brand={product.brand}
      className="text-left bg-white border border-border cursor-pointer group rounded-[4px] overflow-hidden hover:-translate-y-[2px] hover:shadow-md transition-all duration-200 w-full"
    >
      <div className="aspect-square bg-[#f5f5f4] flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <img
            src={product.image_url}
            alt={product.model}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-4 group-hover:scale-[1.04] transition-transform duration-300"
          />
        ) : (
          <Placeholder brand={product.brand} />
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {product.brand}
        </p>
        <p className="text-[17px] font-bold text-[#0a0a0a] mt-0.5 leading-snug">{product.model}</p>
        <p className="text-[12px] text-muted-foreground mt-1 leading-snug">{sizesSummary}</p>
      </div>
    </button>
  );
}