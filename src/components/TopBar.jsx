import { Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9">
        <p className="text-[13px] font-normal tracking-wide hidden sm:block">
          Wholesale + retail · Same-day quotes · Family-owned since 1976
        </p>
        <p className="text-[13px] font-normal tracking-wide sm:hidden">
          Family-owned since 1976
        </p>
        <a href="tel:619-954-0034" className="flex items-center gap-1.5 text-[13px] font-normal hover:text-primary transition-colors">
          <Phone className="w-3 h-3" />
          Sales: 619-954-0034
        </a>
      </div>
    </div>
  );
}