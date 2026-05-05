import { useState } from "react";
import { X, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function ProductModal({ product, open, onClose, onQuoteClick }) {
  const [imgError, setImgError] = useState(false);
  if (!product) return null;
  const isWheel = product.category === "wheel";
  const showImage = product.image_url && !imgError;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="p-0 gap-0 max-w-[1080px] w-full sm:w-[calc(100%-32px)] h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-[16px] sm:rounded-[6px] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-bottom-0 fixed bottom-0 left-0 right-0 sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 translate-x-0 translate-y-0 overflow-hidden flex flex-col"
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
              <DialogTitle asChild>
                <h3 className="text-[24px] sm:text-3xl font-extrabold uppercase tracking-[-0.025em] text-[#0a0a0a] leading-[1.1]">{product.model}</h3>
              </DialogTitle>
              {product.type && (
                <p className="text-[13px] text-muted-foreground mt-2 font-medium">
                  {product.type} · {product.variants.length} size{product.variants.length !== 1 ? "s" : ""}
                </p>
              )}

              {product.features?.length > 0 && (
                <ul className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-border space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-[#404040] leading-relaxed">
                      <span className="text-primary font-bold mt-px">›</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Variants — stacked cards, no overflow possible */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-border">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  Available Sizes <span className="text-[#0a0a0a] font-bold ml-1">({product.variants.length})</span>
                </div>
                <div className="space-y-2">
                  {product.variants.map((v, i) => {
                    const c2 = isWheel ? v.finish : v.ply;
                    const c3 = isWheel ? v.offset : (v.weight || v.load_rating || v.tread_depth);
                    return (
                      <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 bg-[#fafaf9] border border-border rounded-[4px]">
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] sm:text-sm font-bold text-[#0a0a0a] truncate">{v.size}</div>
                          <div className="text-[11px] sm:text-[12px] text-muted-foreground mt-0.5 truncate">
                            {[c2, c3].filter(Boolean).join(" · ") || "—"}
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono text-[#0a0a0a] whitespace-nowrap">{v.part_number || "—"}</div>
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