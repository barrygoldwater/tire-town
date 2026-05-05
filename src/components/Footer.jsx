import Logo from "./Logo";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a]" style={{paddingBottom: "max(28px, calc(env(safe-area-inset-bottom) + 80px))"}}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_1fr] gap-8 sm:gap-12">
          {/* Logo + tagline */}
          <div>
            <Logo className="h-10 sm:h-12 w-auto brightness-0 invert" />
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

        <div className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-white/10">
          <p className="text-white/30 text-[12px] text-center">
            © 2026 Affordable Tires. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}