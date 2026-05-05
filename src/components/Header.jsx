import { useState, useEffect } from "react";
import { Phone, Download } from "lucide-react";
import Logo from "./Logo";

export default function Header({ onQuoteClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/96 backdrop-blur border-b border-border transition-all duration-200">
      <div
        className={`max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between gap-3 transition-all duration-200 ${
          scrolled ? "h-16" : "h-[60px] sm:h-20"
        }`}
      >
        {/* Left: Logo + catalog label */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center"
        >
          <Logo
            className={`w-auto transition-all duration-200 ${
              scrolled ? "h-8" : "h-9 sm:h-11"
            }`}
          />
          <span
            className="hidden sm:flex items-center gap-2 ml-4 pl-4"
            style={{ borderLeft: "1px solid #d4d4d4", height: "24px" }}
          >
            <span
              className={`text-[#525252] font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-200 ${
                scrolled ? "text-[12px]" : "text-[14px]"
              }`}
            >
              June 2026 Catalog
            </span>
            <a
              href="/catalog.pdf"
              download="Affordable-Tires-Catalog.pdf"
              target="_blank"
              rel="noopener"
              aria-label="Download catalog PDF"
              title="Download PDF"
              className="text-primary hover:bg-primary/10 rounded-sm p-0.5 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className={scrolled ? "w-4 h-4" : "w-[18px] h-[18px]"} />
            </a>
          </span>
        </a>

        {/* Right: Phone + Quote button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="tel:619-954-0034"
            className="hidden sm:flex items-center gap-2 px-2 py-2 text-[14px] font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
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
            className={`bg-[#0a0a0a] text-white text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] px-3.5 sm:px-5 rounded-[2px] active:bg-primary hover:bg-primary transition-colors whitespace-nowrap flex items-center ${
              scrolled ? "h-10" : "h-10 sm:h-11"
            }`}
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request Quote</span>
          </a>
        </div>
      </div>
    </header>
  );
}