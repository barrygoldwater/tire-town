import { useState } from "react";
import { X, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// ── Size parsers ──────────────────────────────────────────────────────────────

// Wheel size: "15x6 4/4" → { diameter: "15", width: "6" }
function parseWheelSize(sizeStr = "") {
  const match = sizeStr.match(/^(\d+(?:\.\d+)?)[xX](\d+(?:\.\d+)?)/);
  if (!match) return null;
  return { diameter: match[1], width: match[2] };
}

// Tire size: "18x8.50-8" or "18X9.50-8" or "ST205/75R15" etc.
// Returns { overall, width, rim } where possible, else null
function parseTireSize(sizeStr = "") {
  // Format: 18x8.50-8 or 22X11-10
  const lug = sizeStr.match(/^(\d+(?:\.\d+)?)[xX](\d+(?:\.\d+)?)-(\d+)/);
  if (lug) return { overall: lug[1], width: lug[2], rim: lug[3] };

  // Metric: 205/50-10 or 205/50R10
  const metric = sizeStr.match(/^(\d{3})\/(\d+)[Rr\-](\d+)/);
  if (metric) return { overall: null, width: (parseInt(metric[1]) / 25.4).toFixed(1), rim: metric[3], metricWidth: metric[1], aspectRatio: metric[2] };

  // ST205/75R15
  const st = sizeStr.match(/^ST(\d{3})\/(\d+)[Rr\-](\d+)/i);
  if (st) return { overall: null, width: (parseInt(st[1]) / 25.4).toFixed(1), rim: st[3], metricWidth: st[1], aspectRatio: st[2] };

  return null;
}

// ── Application badge ─────────────────────────────────────────────────────────

function getApplicationLabel(product) {
  const vt = product.vehicle_type || "";
  if (vt === "golf_cart") return { label: "Golf Carts", color: "bg-green-100 text-green-800" };
  if (vt === "industrial") return { label: "Industrial / Forklift", color: "bg-orange-100 text-orange-800" };
  if (vt === "trailer") return { label: "Trailer Use", color: "bg-blue-100 text-blue-800" };
  if (vt === "lawn_garden") return { label: "Lawn & Garden / Turf", color: "bg-lime-100 text-lime-800" };
  return null;
}

// ── Wheel specs section ───────────────────────────────────────────────────────

function WheelSpecs({ variants }) {
  // Collect all unique diameters & finishes
  const diameters = [...new Set(variants.map(v => {
    const p = parseWheelSize(v.size);
    return p ? p.diameter : null;
  }).filter(Boolean))];

  const widths = [...new Set(variants.map(v => {
    const p = parseWheelSize(v.size);
    return p ? p.width : null;
  }).filter(Boolean))];

  const finishes = [...new Set(variants.map(v => v.finish).filter(Boolean))];
  const offsets = [...new Set(variants.map(v => v.offset).filter(Boolean))];

  const primaryDiameter = diameters[0];
  const primaryWidth = widths[0];

  return (
    <div className="mt-5 space-y-4">
      {/* Prominent rim size */}
      {primaryDiameter && (
        <div className="flex items-end gap-3 pb-4 border-b border-border">
          <div className="text-center bg-[#0a0a0a] text-white rounded-[6px] px-4 py-3 min-w-[72px]">
            <div className="text-[36px] font-extrabold leading-none">{primaryDiameter}"</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/60 mt-1">Rim Size</div>
          </div>
          <div className="flex-1">
            <p className="text-[13px] text-[#404040] leading-relaxed">
              {diameters.length > 1
                ? `Available in ${diameters.join('", ')}"-diameter sizes`
                : `${primaryDiameter}-inch diameter rim`}
              {primaryWidth ? `, ${primaryWidth} inches wide` : ""}.
            </p>
            {primaryDiameter && primaryWidth && (
              <p className="text-[12px] text-muted-foreground mt-1">
                This means a {primaryDiameter}-inch tall rim with a {primaryWidth}-inch wide face.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {diameters.length > 0 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Diameter</p>
            <p className="text-[13px] font-bold text-[#0a0a0a] mt-0.5">{diameters.join(", ")} inches</p>
          </div>
        )}
        {widths.length > 0 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Width</p>
            <p className="text-[13px] font-bold text-[#0a0a0a] mt-0.5">{widths.join(", ")} inches</p>
          </div>
        )}
        {finishes.length > 0 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5 col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Available Finishes</p>
            <p className="text-[13px] font-medium text-[#0a0a0a] mt-0.5">{finishes.join(" · ")}</p>
          </div>
        )}
        {offsets.length > 0 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5 col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Offset</p>
            <p className="text-[13px] font-medium text-[#0a0a0a] mt-0.5">{offsets.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tire specs section ────────────────────────────────────────────────────────

function TireSpecs({ variants }) {
  const firstSize = variants[0]?.size || "";
  const parsed = parseTireSize(firstSize);

  const plies = [...new Set(variants.map(v => v.ply).filter(Boolean))];
  const loadRatings = [...new Set(variants.map(v => v.load_rating).filter(Boolean))];
  const brands = [...new Set(variants.map(v => v.brand).filter(Boolean))];
  const treadPatterns = [...new Set(variants.map(v => v.tread_pattern).filter(Boolean))];

  return (
    <div className="mt-5 space-y-4">
      {/* Size breakdown */}
      {parsed && (
        <div className="pb-4 border-b border-border">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">Size Breakdown</p>
          <div className="flex gap-2 flex-wrap mb-2">
            {parsed.overall && (
              <div className="text-center bg-[#0a0a0a] text-white rounded-[6px] px-3 py-2 min-w-[60px]">
                <div className="text-[22px] font-extrabold leading-none">{parsed.overall}"</div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/60 mt-0.5">Height</div>
              </div>
            )}
            <div className="text-center bg-[#f5f5f4] rounded-[6px] px-3 py-2 min-w-[60px] border border-border">
              <div className="text-[22px] font-extrabold leading-none text-[#0a0a0a]">{parsed.width}"</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-0.5">Width</div>
            </div>
            <div className="text-center bg-primary/10 rounded-[6px] px-3 py-2 min-w-[60px] border border-primary/20">
              <div className="text-[22px] font-extrabold leading-none text-primary">{parsed.rim}"</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-primary/70 mt-0.5">Rim Fits</div>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground">
            Fits a <strong className="text-[#0a0a0a]">{parsed.rim}-inch</strong> rim
            {parsed.overall ? `, ${parsed.overall} inches tall` : ""}
            {parsed.width ? `, ${parsed.width} inches wide` : ""}.
          </p>
        </div>
      )}

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {plies.length > 0 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Ply Rating</p>
            <p className="text-[13px] font-bold text-[#0a0a0a] mt-0.5">{plies.join(", ")} ply</p>
          </div>
        )}
        {loadRatings.length > 0 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Load Rating</p>
            <p className="text-[13px] font-bold text-[#0a0a0a] mt-0.5">{loadRatings[0]}</p>
          </div>
        )}
        {treadPatterns.length > 0 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5 col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Tread Pattern</p>
            <p className="text-[13px] font-medium text-[#0a0a0a] mt-0.5">{treadPatterns.join(", ")}</p>
          </div>
        )}
        {brands.length > 1 && (
          <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5 col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Brands in This Group</p>
            <p className="text-[13px] font-medium text-[#0a0a0a] mt-0.5">{brands.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export default function ProductModal({ product, open, onClose, onQuoteClick }) {
  const [imgError, setImgError] = useState(false);
  if (!product) return null;

  const isWheel = product.category === "wheel";
  const showImage = product.image_url && !imgError;
  const appLabel = !isWheel ? getApplicationLabel(product) : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="p-0 gap-0 max-w-[1080px] w-full sm:w-[calc(100%-32px)] h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-[16px] sm:rounded-[6px] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-bottom-0 fixed bottom-0 left-0 right-0 sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 translate-x-0 translate-y-0 overflow-hidden flex flex-col [&>button:last-of-type]:hidden"
      >
        {/* Sticky header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-border bg-[#fafaf9] flex-shrink-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{product.brand}</span>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center active:bg-[#0a0a0a] active:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="grid sm:grid-cols-[1fr_1.15fr] sm:min-h-[480px]">

            {/* Image */}
            <div className={`aspect-square sm:aspect-auto flex items-center justify-center relative ${showImage ? 'bg-[#f5f5f4]' : 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]'}`}>
              {showImage ? (
                <img src={product.image_url} alt={product.model} onError={() => setImgError(true)} className="w-full h-full object-contain p-6 sm:p-9" />
              ) : (
                <>
                  <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] border border-white/14 rounded-full absolute" />
                  <span className="relative text-white/92 text-[24px] sm:text-[32px] font-extrabold uppercase tracking-[0.18em] text-center px-4">{product.brand}</span>
                </>
              )}
            </div>

            {/* Details */}
            <div className="p-5 sm:p-9 min-w-0">
              {/* Title + application badge */}
              <div className="flex items-start gap-3 flex-wrap">
                <DialogTitle asChild>
                  <h3 className="text-[24px] sm:text-3xl font-extrabold uppercase tracking-[-0.025em] text-[#0a0a0a] leading-[1.1]">{product.model}</h3>
                </DialogTitle>
              </div>

              {/* Application pill for tires */}
              {appLabel && (
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] ${appLabel.color}`}>
                    Best For: {appLabel.label}
                  </span>
                  {product.type && (
                    <span className="text-[12px] text-muted-foreground font-medium">{product.type}</span>
                  )}
                </div>
              )}
              {isWheel && product.type && (
                <p className="text-[13px] text-muted-foreground mt-1.5 font-medium">{product.type}</p>
              )}

              {/* Specs — wheel or tire */}
              {isWheel
                ? <WheelSpecs variants={product.variants} />
                : <TireSpecs variants={product.variants} />
              }

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="mt-5 pt-4 border-t border-border">
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

              {/* Logistics chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5 mb-6">
                <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Lead Time</p>
                  <p className="text-[12px] font-medium text-[#0a0a0a] mt-0.5">In stock — ships next business day</p>
                </div>
                <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Ships From</p>
                  <p className="text-[12px] font-medium text-[#0a0a0a] mt-0.5">{product.ships_from || "Phoenix, AZ or Greenville, SC"}</p>
                </div>
                <div className="rounded-md border border-black/8 bg-[#fafaf9] px-3.5 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Min Order</p>
                  <p className="text-[12px] font-medium text-[#0a0a0a] mt-0.5">1 piece — no minimum</p>
                </div>
              </div>

              {/* Variants table */}
              <div className="pt-4 sm:pt-5 border-t border-border">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  {isWheel ? "Available Sizes & Finishes" : "Available Sizes"} <span className="text-[#0a0a0a] font-bold ml-1">({product.variants.length})</span>
                </div>
                <div className="space-y-2">
                  {product.variants.map((v, i) => {
                    const sub = isWheel
                      ? [v.finish, v.offset].filter(Boolean).join(" · ")
                      : [v.ply ? `${v.ply} ply` : null, v.load_rating, v.tread_pattern].filter(Boolean).join(" · ");
                    return (
                      <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 bg-[#fafaf9] border border-border rounded-[4px]">
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] sm:text-sm font-bold text-[#0a0a0a] truncate">{v.size}</div>
                          {sub && <div className="text-[11px] sm:text-[12px] text-muted-foreground mt-0.5 truncate">{sub}</div>}
                        </div>
                        {v.part_number && (
                          <div className="text-[10px] sm:text-[11px] font-mono text-muted-foreground whitespace-nowrap">{v.part_number}</div>
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