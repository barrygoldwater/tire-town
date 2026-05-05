import { useState } from "react";

export default function ProductCard({ product, onClick }) {
  const [imgError, setImgError] = useState(false);

  const uniqueSizes = [...new Set(product.variants.map(v => v.size.split(" ")[0]))];
  const sizesSummary = uniqueSizes.length > 3
    ? uniqueSizes.slice(0, 3).join(", ") + ` +${uniqueSizes.length - 3}`
    : uniqueSizes.join(", ");

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white border border-border cursor-pointer group rounded-[4px] overflow-hidden hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="aspect-square bg-[#f5f5f4] flex items-center justify-center overflow-hidden">
        {product.image_url && !imgError ? (
          <img
            src={product.image_url}
            alt={product.model}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#0a0a0a] flex items-center justify-center">
            <span className="text-white text-[32px] font-extrabold">
              {product.brand[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {product.brand}
        </p>
        <p className="text-base font-bold text-[#0a0a0a] mt-0.5">{product.model}</p>
        <p className="text-[13px] text-muted-foreground mt-1">{sizesSummary}</p>
      </div>
    </div>
  );
}