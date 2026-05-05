import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductModal({ product, open, onClose, onQuoteClick }) {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const isWheel = product.category === "wheel";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[4px] p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-2/5 aspect-square bg-[#f5f5f4] flex items-center justify-center flex-shrink-0">
            {product.image_url && !imgError ? (
              <img
                src={product.image_url}
                alt={product.model}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <span className="text-white text-[40px] font-extrabold">
                  {product.brand[0]}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:w-3/5 p-6">
            <DialogHeader className="text-left">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {product.brand}
              </p>
              <DialogTitle className="text-2xl font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a] mt-1">
                {product.model}
              </DialogTitle>
            </DialogHeader>

            {product.type && (
              <p className="text-[13px] text-muted-foreground mt-1">
                {product.type} · {product.variants.length} variant{product.variants.length !== 1 ? "s" : ""}
              </p>
            )}

            {product.features && product.features.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#0a0a0a]">
                    <span className="text-primary font-bold mt-0.5">›</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Variant table */}
            <div className="mt-6 border border-border rounded-[4px] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f5f5f4]">
                    <TableHead className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0a0a0a]">Size</TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0a0a0a]">
                      {isWheel ? "Finish" : "Ply"}
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0a0a0a]">
                      {isWheel ? "Offset" : "Spec"}
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0a0a0a]">Part #</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.variants.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-[13px]">{v.size}</TableCell>
                      <TableCell className="text-[13px]">
                        {isWheel ? (v.finish || "—") : (v.ply || "—")}
                      </TableCell>
                      <TableCell className="text-[13px]">
                        {isWheel
                          ? (v.offset || "—")
                          : (v.weight || v.load_rating || v.tread_depth || "—")}
                      </TableCell>
                      <TableCell className="text-[13px] font-mono">{v.part_number || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
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
      </DialogContent>
    </Dialog>
  );
}