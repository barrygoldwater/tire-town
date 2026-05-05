import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function MobileBottomBar({ onQuoteClick }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`sm:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-border transition-transform duration-200 ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{paddingBottom: "max(10px, env(safe-area-inset-bottom))"}}
    >
      <div className="grid grid-cols-2 gap-2.5 px-4 pt-3 pb-1">
        <a href="tel:619-954-0034" className="bg-primary text-white text-[12px] font-semibold uppercase tracking-[0.08em] px-3 py-3.5 rounded-[4px] flex items-center justify-center gap-2 active:bg-primary/80">
          <Phone className="w-3.5 h-3.5" /> Call
        </a>
        <button onClick={onQuoteClick} className="bg-[#0a0a0a] text-white text-[12px] font-semibold uppercase tracking-[0.08em] px-3 py-3.5 rounded-[4px] active:bg-[#0a0a0a]/80">
          Request Quote
        </button>
      </div>
    </div>
  );
}