import { useState } from "react";
import { X, Phone, CheckCircle, MapPin, Package, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { parseSize } from "@/lib/parseSize";

// ── Type pill label ───────────────────────────────────────────────────────────

function getTypePill(product) {
  const isWheel = product.category === "wheel";

  if (isWheel) {
    // Use the most common finish across variants
    const finishes = product.variants.map(v => v.finish).filter(Boolean);
    if (finishes.length > 0) {
      // Summarize: find most descriptive common term
      const all = finishes.join(" ").toLowerCase();
      if (all.includes("chrome")) return "Chrome";
      if (all.includes("machined black")) return "Machined Black";
      if (all.includes("machined")) return "Machined Aluminum";
      if (all.includes("gloss black")) return "Gloss Black";
      if (all.includes("satin black")) return "Satin Black";
      if (all.includes("bronze")) return "Bronze";
      if (all.includes("gunmetal")) return "Gunmetal";
      if (all.includes("polished")) return "Polished";
      if (all.includes("black")) return "Black";
      return finishes[0];
    }
    return product.type || null;
  }

  // Tire: use product.type first, then fall back to first feature phrase
  if (product.type) return product.type;

  // Try to extract from features
  if (product.features?.length > 0) {
    const first = product.features[0];
    // Trim to a short descriptor
    if (first.length < 40) return first;
    return first.split(/[,–—·]/)[0].trim();
  }

  return null;
}

// ── Main modal ────────────────────────────────────────────────────────────────

export default function ProductModal({ product, open, onClose, onQuoteClick }) {
  const [imgError, setImgError] = useState(false);
  if (!product) return null;

  const isWheel = product.category === "wheel";
  const showImage = product.image_url && !imgError;
  const typePill = getTypePill(product);

  // Collect shared ply ratings across variants (for tires)
  const plies = !isWheel ? [...new Set(product.variants.map(v => v.ply).filter(Boolean))] : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="p-0 gap-0 max-w-[1100px] w-full sm:w-[calc(100%-32px)] h-[92vh] sm:h-[85vh] rounded-t-[16px] sm:rounded-[6px] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-bottom-0 fixed bottom-0 left-0 right-0 sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 translate-x-0 translate-y-0 overflow-hidden flex flex-col [&>button:last-of-type]:hidden"
      >
        {/* Sticky header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-border bg-[#fafaf9] flex-shrink-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{product.brand}</span>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center active:bg-[#0a0a0a] active:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body — mobile: single scroll column; desktop: image fixed left, details scroll right */}
        <div className="flex-1 overflow-y-auto sm:overflow-hidden overscroll-contain flex flex-col sm:flex-row">

          {/* Image — full width on mobile, fixed left column on desktop */}
          <div className={`aspect-square sm:aspect-auto sm:w-[44%] flex-shrink-0 flex flex-col items-center justify-center relative ${showImage ? 'bg-[#f5f5f4]' : 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]'}`}>
            {showImage ? (
              <>
                <img src={product.image_url} alt={product.model} onError={() => setImgError(true)} className="w-full h-full object-contain p-6 sm:p-9" />
                {product.image_note && (
                  <p className="text-[10px] italic text-muted-foreground px-4 pb-3 text-center">{product.image_note}</p>
                )}
              </>
            ) : (
              <>
                <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] border border-white/14 rounded-full absolute" />
                <span className="relative text-white/92 text-[24px] sm:text-[32px] font-extrabold uppercase tracking-[0.18em] text-center px-4">{product.brand}</span>
              </>
            )}
          </div>

          {/* Details — scrolls independently on desktop */}
          <div className="flex-1 sm:overflow-y-auto overscroll-contain min-w-0">
            <div className="p-5 sm:p-9 min-w-0">

              {/* Title + type pill */}
              <DialogTitle asChild>
                <h3 className="text-[24px] sm:text-3xl font-extrabold uppercase tracking-[-0.025em] text-[#0a0a0a] leading-[1.1]">{product.model}</h3>
              </DialogTitle>

              {typePill && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] bg-green-100 text-green-800">
                    {typePill}
                  </span>
                </div>
              )}

              {/* Ply rating (tires only, if consistent across variants) */}
              {plies.length > 0 && (
                <div className="mt-4 rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5 inline-block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Ply Rating</p>
                  <p className="text-[13px] font-bold text-[#0a0a0a] mt-0.5">{plies.join(", ")} ply</p>
                </div>
              )}

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">Features</p>
                  <ul className="space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-[#404040] leading-relaxed">
                        <span className="text-primary font-bold mt-px">›</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Logistics inline bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-4 mb-5 py-2.5 border-y border-border text-[12px] text-[#555]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  In stock — ships next business day
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  {product.ships_from || "Phoenix, AZ or Greenville, SC"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  No minimum order
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  Volume pricing available
                </span>
              </div>

              {/* Variants table — breakdown per row */}
              <div className="pt-4 sm:pt-5 border-t border-border">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  Available Sizes <span className="text-[#0a0a0a] font-bold ml-1">({product.variants.length})</span>
                </div>
                <div className="space-y-2">
                  {product.variants.map((v, i) => {
                    const parsed = parseSize(v.size);
                    const breakdown = parsed.formatted;
                    const sub = isWheel
                      ? [v.finish, v.offset].filter(Boolean).join(" · ")
                      : [v.ply ? `${v.ply} ply` : null, v.load_rating, v.tread_pattern].filter(Boolean).join(" · ");
                    return (
                      <div key={i} className="flex items-start justify-between gap-3 px-3 py-2.5 bg-[#fafaf9] border border-border rounded-[4px]">
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] sm:text-sm font-bold text-[#0a0a0a]">{v.size}</div>
                          {breakdown && (
                            <div className="text-[11px] text-muted-foreground mt-0.5">{breakdown}</div>
                          )}
                          {sub && (
                            <div className="text-[11px] sm:text-[12px] text-[#666] mt-0.5">{sub}</div>
                          )}
                        </div>
                        {v.part_number && (
                          <div className="text-[10px] sm:text-[11px] font-mono text-muted-foreground whitespace-nowrap pt-0.5">{v.part_number}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTAs */}
        <div className="flex-shrink-0 grid grid-cols-2 gap-2.5 px-5 sm:px-7 py-3.5 sm:py-4 border-t border-border bg-white" style={{paddingBottom: "max(14px, env(safe-area-inset-bottom))"}}>
          <a href="tel:619-954-0034" className="bg-primary text-white text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] px-3 py-3.5 sm:py-3 rounded-[4px] flex items-center justify-center gap-2 active:bg-primary/80 hover:bg-primary/90 transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call for Pricing
          </a>
          <button onClick={() => { onClose(); onQuoteClick(); }} className="border border-[#0a0a0a] text-[#0a0a0a] text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] px-3 py-3.5 sm:py-3 rounded-[4px] active:bg-[#0a0a0a] active:text-white hover:bg-[#0a0a0a] hover:text-white transition-colors">
            Request Quote
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}