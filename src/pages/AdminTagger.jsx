import { useState } from 'react';
import inventory from '@/lib/inventory';
import { tagAllProducts, saveTags } from '@/lib/imageTagger';

export default function AdminTagger() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [results, setResults] = useState({});
  const [done, setDone] = useState(false);

  const products = [...inventory.wheels, ...inventory.tires];

  const run = async () => {
    setRunning(true);
    setDone(false);
    setResults({});
    setProgress({ current: 0, total: products.length });
    const tags = await tagAllProducts(products, (current, total, product, result) => {
      setProgress({ current, total });
      setCurrentProduct(product);
      setResults(prev => ({ ...prev, [product.id]: result }));
    });
    setRunning(false);
    setDone(true);
    saveTags(tags);
  };

  return (
    <section className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">Admin · One-time job</p>
        <h1 className="text-[36px] font-extrabold tracking-[-0.02em] text-foreground mb-3">Tag Inventory Images</h1>
        <p className="text-muted-foreground mb-8">
          Runs Claude Vision over every product image and produces visual_tags.json. Download the file when complete and drop it into public/ to enable strict color search.
        </p>

        {!running && !done && (
          <button
            onClick={run}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-[13px] font-semibold uppercase tracking-[0.08em] px-6 py-3 rounded-[2px]"
          >
            Start Tagging ({products.length} products)
          </button>
        )}

        {(running || done) && (
          <div className="space-y-4">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
            <p className="text-[14px] text-muted-foreground">
              {progress.current} / {progress.total} {done ? '— done' : '— processing...'}
            </p>
            {currentProduct && running && (
              <div className="flex items-center gap-4 p-4 border border-border rounded-[4px]">
                <img src={currentProduct.image_url} alt="" className="w-20 h-20 object-contain bg-secondary" />
                <div>
                  <p className="font-semibold text-foreground">{currentProduct.brand} {currentProduct.model}</p>
                  <p className="text-[13px] text-muted-foreground">{currentProduct.id}</p>
                  <p className="text-[13px] text-primary mt-1">
                    {results[currentProduct.id]?.tags?.join(', ') || '...'}
                  </p>
                </div>
              </div>
            )}
            {done && (
              <p className="text-[14px] text-foreground bg-secondary p-4 rounded-[4px]">
                visual_tags.json downloaded. Place it at <code className="font-mono text-primary">public/visual_tags.json</code> and redeploy. Color search will use it automatically.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}