import { useState, useEffect, useMemo } from 'react';
import inventory from '@/lib/inventory';
import BrandFilter from '../BrandFilter';
import ProductCard from '../ProductCard';
import InventorySearch from '../InventorySearch';
import { searchInventory } from '@/lib/searchInventory';
import { aiSemanticSearch } from '@/lib/aiSemanticSearch';

const CATEGORY_LABELS = {
  golf_cart: 'Golf Cart',
  industrial: 'Industrial',
  lawn_garden: 'Lawn & Garden',
  trailer: 'Trailer',
  accessories: 'Accessories',
};

const EmptyState = () => (
  <div className="py-20 text-center">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">Coming Soon</p>
    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-[#0a0a0a]">We're expanding into this category.</h3>
    <p className="mt-3 text-muted-foreground max-w-md mx-auto">
      Call <a href="tel:619-954-0034" className="text-[#0a0a0a] font-semibold underline">619-954-0034</a> to discuss your wholesale program.
    </p>
  </div>
);

export default function Inventory({ onProductClick, category }) {
  const vehicleType = category || 'golf_cart';
  const isAccessoryCategory = vehicleType === 'accessories';

  // For accessories category, default tab is 'accessories' (only one tab)
  // For other categories, default tab is 'wheels'
  const [type, setType] = useState(isAccessoryCategory ? 'accessories' : 'tires');
  const [activeBrand, setActiveBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResults, setAiResults] = useState(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  useEffect(() => {
    setType(isAccessoryCategory ? 'accessories' : 'tires');
    setActiveBrand('All');
    setSearchQuery('');
    setAiResults(null);
  }, [category, isAccessoryCategory]);
  useEffect(() => { setActiveBrand('All'); setSearchQuery(''); setAiResults(null); }, [type]);

  const allWheels = inventory.wheels.filter(w => w.category === 'wheel' && (w.vehicle_type || 'golf_cart') === vehicleType);
  const allTires = inventory.tires.filter(t => (t.vehicle_type || 'golf_cart') === vehicleType);
  const allAccessories = (inventory.accessories || []).filter(a => (a.vehicle_type || 'accessories') === vehicleType);

  const products =
    type === 'wheels' ? allWheels :
    type === 'tires' ? allTires :
    allAccessories;
  const brandsForType = ['All', ...new Set(products.map(p => p.brand))];
  const brandFiltered = activeBrand === 'All' ? products : products.filter(p => p.brand === activeBrand);

  // Client-side smart search
  const clientResults = useMemo(() => {
    return searchInventory(searchQuery, brandFiltered).map(x => x.product);
  }, [searchQuery, brandFiltered]);

  // Trigger AI search when client results are sparse for natural-language queries
  useEffect(() => {
    setAiResults(null);
    const q = searchQuery.trim();
    if (!q) return;
    const looksLikeNaturalLanguage = q.split(/\s+/).length >= 2 || clientResults.length === 0;
    if (!looksLikeNaturalLanguage) return;

    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsAiSearching(true);
      const result = await aiSemanticSearch(q, brandFiltered);
      if (cancelled) return;
      setIsAiSearching(false);
      if (result && result.products.length > 0) {
        setAiResults(result);
      }
    }, 600);
    return () => { cancelled = true; clearTimeout(timer); setIsAiSearching(false); };
  }, [searchQuery, brandFiltered, clientResults.length]);

  const filtered = aiResults && aiResults.products.length > 0 ? aiResults.products : clientResults;

  const categoryLabel = CATEGORY_LABELS[vehicleType] || 'Golf Cart';
  const hasInventory = allWheels.length > 0 || allTires.length > 0 || allAccessories.length > 0;

  return (
    <section id="inventory" className="py-16 sm:py-20 lg:py-24 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          {categoryLabel}
        </p>

        {/* Tab headers — for Accessories category, only show one tab */}
        <h2 className="text-[28px] sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.05]">
          {isAccessoryCategory ? (
            <button
              onClick={() => setType('accessories')}
              className="text-[#0a0a0a] transition-colors"
            >
              Accessories<span className="ml-2 text-[16px] sm:text-xl font-semibold align-baseline">{allAccessories.length}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setType('wheels')}
                className={`transition-colors ${type === 'wheels' ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]/25 hover:text-[#0a0a0a]/55'}`}
              >
                Wheels<span className="ml-2 text-[16px] sm:text-xl font-semibold align-baseline">{allWheels.length}</span>
              </button>
              <span className="text-[#0a0a0a]/15 mx-3 sm:mx-4 font-light">/</span>
              <button
                onClick={() => setType('tires')}
                className={`transition-colors ${type === 'tires' ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]/25 hover:text-[#0a0a0a]/55'}`}
              >
                Tires<span className="ml-2 text-[16px] sm:text-xl font-semibold align-baseline">{allTires.length}</span>
              </button>
            </>
          )}
        </h2>

        {!hasInventory ? <EmptyState /> : (
          <>
            {/* Search bar — hidden until functional */}
            {false && (
              <div className="mt-10 mb-6">
                <InventorySearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                  resultCount={filtered.length}
                  totalCount={brandFiltered.length}
                  isAiSearching={isAiSearching}
                  aiInterpretation={aiResults?.interpretation}
                  contextLabel={`${categoryLabel.toLowerCase()} ${type}`}
                />
              </div>
            )}

            {/* Brand filter pills */}
            {products.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide mt-8 mb-8 justify-center">
                <BrandFilter
                  brands={brandsForType.filter(b => b !== 'All')}
                  active={activeBrand}
                  onChange={setActiveBrand}
                />
              </div>
            )}

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                No results for "{searchQuery}". Try a different search.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onClick={() => onProductClick && onProductClick(p)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}