import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

function Placeholder({ brand }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
      <div className="flex items-center justify-center w-36 h-36 rounded-full border border-white/20">
        <span
          className="text-white font-extrabold uppercase text-center leading-tight px-3"
          style={{ fontSize: "15px", letterSpacing: "0.16em" }}
        >
          {brand}
        </span>
      </div>
    </div>
  );
}

export default function ProductModal({ product, open, onClose, onQuoteClick }) {
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setImgError(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open, product]);

  const handleKey = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  if (!product && !open) return null;
  if (!product) return null;

  const isWheel = product.category === "wheel";
  const hasImage = product.image_url && !imgError;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-[4px] w-full overflow-hidden transition-all duration-200 flex flex-col"
        style={{
          maxWidth: "1080px",
          maxHeight: "90vh",
          transform: visible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#f5f5f4] border-b border-border flex-shrink-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {product.brand}
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4 text-[#0a0a0a]" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1">
          <div
            className="grid"
            style={{ gridTemplateColumns: "1fr 1.15fr" }}
          >
            {/* Left: image — collapses to full-width on narrow */}
            <div
              className="bg-[#f5f5f4] flex items-center justify-center"
              style={{ minHeight: "300px" }}
            >
              {hasImage ? (
                <img
                  src={product.image_url}
                  alt={product.model}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain p-8"
                  style={{ maxHeight: "420px" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
                  <Placeholder brand={product.brand} />
                </div>
              )}
            </div>

            {/* Right: details */}
            <div
              className="p-6 flex flex-col"
              style={{ minWidth: 0 }}
            >
              <div>
                <h3
                  className="font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a] leading-tight"
                  style={{ fontSize: "30px" }}
                >
                  {product.model}
                </h3>

                {product.type && (
                  <p className="text-[13px] text-muted-foreground mt-1">
                    {product.type} · {product.variants.length} variant{product.variants.length !== 1 ? "s" : ""}
                  </p>
                )}

                {product.features && product.features.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#0a0a0a]">
                        <span className="text-primary font-bold mt-0.5 flex-shrink-0">›</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Variant table */}
              <div className="mt-5 flex-1 overflow-hidden">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">
                  Available Sizes ({product.variants.length})
                </p>
                <div className="border border-border rounded-[4px] overflow-hidden">
                  <div className="overflow-x-hidden">
                    <table
                      className="w-full"
                      style={{ tableLayout: "fixed", borderCollapse: "collapse" }}
                    >
                      <colgroup>
                        <col style={{ width: "28%" }} />
                        <col style={{ width: "24%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "28%" }} />
                      </colgroup>
                      <thead>
                        <tr className="bg-[#f5f5f4] border-b border-border">
                          {["Size", isWheel ? "Finish" : "Ply", isWheel ? "Offset" : "Spec", "Part #"].map((h) => (
                            <th
                              key={h}
                              className="text-left px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0a0a0a]"
                              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {product.variants.map((v, i) => (
                          <tr key={i} className={i % 2 === 1 ? "bg-[#fafaf9]" : "bg-white"}>
                            <td
                              className="px-3 py-2 text-[12px] text-[#0a0a0a]"
                              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                              title={v.size}
                            >
                              {v.size}
                            </td>
                            <td
                              className="px-3 py-2 text-[12px] text-[#0a0a0a]"
                              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                              title={isWheel ? v.finish : v.ply}
                            >
                              {isWheel ? (v.finish || "—") : (v.ply || "—")}
                            </td>
                            <td
                              className="px-3 py-2 text-[12px] text-[#0a0a0a]"
                              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                              title={isWheel ? v.offset : (v.weight || v.load_rating || v.tread_depth)}
                            >
                              {isWheel
                                ? (v.offset || "—")
                                : (v.weight || v.load_rating || v.tread_depth || "—")}
                            </td>
                            <td
                              className="px-3 py-2 text-[12px] font-mono text-right text-[#0a0a0a]"
                              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                              title={v.part_number}
                            >
                              {v.part_number || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-5 flex flex-wrap gap-3 flex-shrink-0">
                <a
                  href="tel:619-954-0034"
                  className="bg-primary text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-5 py-2.5 rounded-[4px] hover:bg-primary/90 transition-colors"
                >
                  CALL FOR PRICING
                </a>
                <button
                  onClick={() => { onClose(); onQuoteClick(); }}
                  className="border border-[#0a0a0a] text-[#0a0a0a] text-[13px] font-semibold uppercase tracking-[0.08em] px-5 py-2.5 rounded-[4px] hover:bg-[#0a0a0a] hover:text-white transition-colors"
                >
                  REQUEST QUOTE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}