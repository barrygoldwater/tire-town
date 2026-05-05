import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Header({ onQuoteClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "WHEELS", href: "#wheels" },
    { label: "TIRES", href: "#tires" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo className="text-xl text-[#0a0a0a]" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0a0a0a] hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={onQuoteClick}
            className="bg-primary text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-5 py-2.5 rounded-[4px] hover:bg-primary/90 transition-colors"
          >
            REQUEST QUOTE
          </button>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="block py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0a0a0a] border-b border-border"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { onQuoteClick(); handleNavClick(); }}
            className="mt-3 w-full bg-primary text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-5 py-2.5 rounded-[4px]"
          >
            REQUEST QUOTE
          </button>
        </div>
      )}
    </header>
  );
}