import { Phone, Download } from "lucide-react";
import Logo from "./Logo";

export default function Header({ onQuoteClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/96 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-14 sm:h-[72px] flex items-center justify-between gap-3">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 sm:gap-4">
          <Logo className="h-9 sm:h-11" />
          <span className="hidden sm:inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground border-l border-border pl-3 sm:pl-4">
            June 2026 Catalog
            <a
              href="/catalog.pdf"
              download="Affordable-Tires-Catalog.pdf"
              target="_blank"
              rel="noopener"
              aria-label="Download catalog PDF"
              title="Download PDF"
              className="text-primary hover:bg-primary/10 rounded-sm p-0.5 transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="tel:619-954-0034"
            className="hidden sm:flex items-center gap-2 px-2 py-2 text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            Call 619-954-0034
          </a>
          <a
            href="tel:619-954-0034"
            aria-label="Call sales"
            className="sm:hidden w-10 h-10 rounded-full bg-[#fafaf9] border border-border flex items-center justify-center active:bg-[#0a0a0a] active:text-white"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="bg-[#0a0a0a] text-white text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] px-3.5 sm:px-5 py-2.5 rounded-[2px] active:bg-primary hover:bg-primary transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request Quote</span>
          </a>
        </div>
      </div>
    </header>
  );
}