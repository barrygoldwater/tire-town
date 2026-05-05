import { useState } from "react";
import Logo from "./Logo";
import { Phone, ChevronDown } from "lucide-react";

const HOW_TO_ORDER_STEPS = [
  {
    number: "01",
    title: "Browse the catalog",
    description: "Filter by vehicle type and brand to find the exact tire or wheel you need.",
  },
  {
    number: "02",
    title: "Call us or request a quote",
    description: "We confirm pricing and availability same-day. No wait, no runaround.",
  },
  {
    number: "03",
    title: "Same-day pricing & freight",
    description: "Ships from Phoenix or Greenville — most US orders arrive in 1–3 days.",
  },
];

export default function Footer() {
  const [howToOpen, setHowToOpen] = useState(false);

  return (
    <footer className="bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_1fr] gap-8 sm:gap-10">
          {/* Logo + tagline */}
          <div>
            <Logo className="h-14 sm:h-16 w-auto brightness-0 invert" />
            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              Wholesale Golf Cart Wheels & Tires. Family-owned since 1976.
            </p>
          </div>

          {/* Sales */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">Sales</p>
            <p className="text-white font-bold mt-2">John Gregory</p>
            <a href="tel:619-954-0034" className="flex items-center gap-2 text-white/70 text-sm mt-1 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" />
              619-954-0034
            </a>
          </div>

          {/* Turf/Golf */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">Turf / Golf</p>
            <p className="text-white font-bold mt-2">Joe Landis</p>
            <a href="tel:623-258-8277" className="flex items-center gap-2 text-white/70 text-sm mt-1 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" />
              623-258-8277
            </a>
          </div>
        </div>

        {/* How to Order accordion */}
        <div className="mt-10 sm:mt-12 border-t border-[#262626] border-b border-[#262626]">
          <button
            onClick={() => setHowToOpen(o => !o)}
            className="w-full flex items-center justify-between h-14 hover:bg-[#111] transition-colors duration-150 px-0"
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#fafafa]">How to Order</span>
            <ChevronDown
              className="w-4 h-4 text-[#737373] transition-transform duration-200"
              style={{ transform: howToOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: howToOpen ? "400px" : "0px" }}
          >
            <div className="py-8 grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-[#262626] gap-6 sm:gap-0">
              {HOW_TO_ORDER_STEPS.map((step, i) => (
                <div key={step.number} className={i > 0 ? "sm:pl-6" : "sm:pr-6"}>
                  <p className="text-[11px] font-mono tracking-[0.15em] text-primary mb-2">{step.number}</p>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.03em] text-[#fafafa]">{step.title}</p>
                  <p className="text-[14px] text-[#a3a3a3] leading-relaxed mt-1">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/10">
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.08em] text-[#a3a3a3] mb-6">
            Family-Owned Since 1976 · Authorized Distributor · Same-Day Quotes · Net Terms Available
          </p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-white/30 text-[12px]">© 2026 Affordable Tires</p>
            <p className="text-white/30 text-[12px] text-right">Wholesale dealer pricing available</p>
          </div>
        </div>
      </div>
    </footer>
  );
}