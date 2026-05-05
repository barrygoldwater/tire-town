import { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Loader2 } from 'lucide-react';
import { SEARCH_SUGGESTIONS } from '@/lib/searchInventory';

export default function InventorySearch({
  value,
  onChange,
  resultCount,
  totalCount,
  isAiSearching,
  aiInterpretation,
  contextLabel,
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showSuggestions = focused && !value.trim();

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[640px] mx-auto">
      {/* Search bar */}
      <div
        className={`relative flex items-center h-[52px] bg-white rounded-full transition-all duration-200 ${
          focused
            ? 'border border-primary shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
            : 'border border-border shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[#bfbfbf]'
        }`}
      >
        {/* Search icon (left) */}
        <div className="flex items-center justify-center pl-5 pr-3">
          {isAiSearching ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-[#737373]" />
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={`Search ${contextLabel || 'inventory'} — try a size, color, brand, or part number`}
          className="flex-1 h-full bg-transparent text-[15px] text-foreground placeholder:text-[#a3a3a3] focus:outline-none"
        />

        {/* AI sparkles (when AI is processing or has contributed) */}
        {(isAiSearching || aiInterpretation) && !value === false && (
          <div className="hidden sm:flex items-center gap-1.5 pr-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            AI
          </div>
        )}

        {/* Clear button (right) */}
        {value && (
          <button
            type="button"
            onClick={() => { onChange(''); inputRef.current?.focus(); }}
            aria-label="Clear search"
            className="flex items-center justify-center w-8 h-8 mr-2 rounded-full hover:bg-[#f4f4f3] transition-colors"
          >
            <X className="w-4 h-4 text-[#525252]" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[12px] border border-border shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden z-20">
          <p className="px-5 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#737373]">
            Try Searching
          </p>
          <ul>
            {SEARCH_SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => { onChange(s); setFocused(false); }}
                  className="w-full text-left px-5 py-3 text-[14px] text-foreground hover:bg-[#fafaf9] flex items-center gap-3 transition-colors"
                >
                  <Search className="w-4 h-4 text-[#a3a3a3] flex-shrink-0" />
                  <span>{s}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 border-t border-border bg-[#fafaf9] flex items-center gap-2 text-[11px] text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Smart search understands colors, sizes, and natural language</span>
          </div>
        </div>
      )}

      {/* Result count + AI interpretation */}
      {value && !showSuggestions && (
        <div className="flex items-center justify-center gap-3 mt-3 text-[13px] text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">{resultCount}</span> of {totalCount}
          </span>
          {aiInterpretation && (
            <>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5 text-primary">
                <Sparkles className="w-3 h-3" />
                <span className="italic">{aiInterpretation}</span>
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}