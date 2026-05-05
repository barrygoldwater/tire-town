import { Phone } from "lucide-react";
import Logo from "./Logo";

export default function Header({ onQuoteClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/96 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-14 sm:h-[72px] flex items-center justify-between gap-3">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
          <Logo className="h-20 sm:h-24" />
        </a>
        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-7">
            <a href="#wheels" className="text-sm font-medium text-[#404040] hover:text-[#0a0a0a] transition-colors">Wheels</a>
            <a href="#tires" className="text-sm font-medium text-[#404040] hover:text-[#0a0a0a] transition-colors">Tires</a>
          </nav>
          <a
            href="tel:619-954-0034"
            aria-label="Call sales"
            className="sm:hidden w-10 h-10 rounded-full bg-[#fafaf9] border border-border flex items-center justify-center active:bg-[#0a0a0a] active:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={onQuoteClick}
            className="bg-[#0a0a0a] text-white text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] px-3.5 sm:px-5 py-2.5 rounded-[2px] active:bg-primary hover:bg-primary transition-colors whitespace-nowrap"
          >
            Request<span className="hidden sm:inline"> Quote</span>
          </button>
        </div>
      </div>
    </header>
  );
}