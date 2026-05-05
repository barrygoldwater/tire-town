// All known color/finish words. When a query token matches one of these,
// we filter strictly on visualTags instead of fuzzy-matching variant data.
const COLOR_WORDS = new Set([
  'chrome', 'polished', 'silver', 'mirror',
  'machined', 'machined_black',
  'black', 'matte', 'matte_black', 'gloss', 'gloss_black',
  'gunmetal', 'gray', 'grey', 'dark_gray',
  'white', 'ivory',
  'red', 'maroon', 'burgundy', 'crimson',
  'blue', 'navy',
  'gold', 'bronze', 'brass',
  'green', 'olive',
  'yellow',
  'two_tone',
]);

// Loaded once at module init. If the file isn't there yet, the strict filter is skipped gracefully.
let _visualTagsCache = null;
async function loadVisualTags() {
  if (_visualTagsCache !== null) return _visualTagsCache;
  try {
    const r = await fetch('/visual_tags.json');
    if (r.ok) {
      _visualTagsCache = await r.json();
    } else {
      _visualTagsCache = {};
    }
  } catch {
    _visualTagsCache = {};
  }
  return _visualTagsCache;
}

// Synchronous accessor — returns whatever has loaded so far.
function getVisualTags(productId) {
  if (!_visualTagsCache) return null;
  return _visualTagsCache[productId]?.tags || [];
}

// Trigger load on module import. Search results refresh once this resolves.
loadVisualTags();

// Color synonym map — wider terms expand to canonical color words
// found in product finish strings.
const COLOR_SYNONYMS = {
  red: ['red', 'maroon', 'burgundy', 'crimson', 'scarlet', 'ruby'],
  blue: ['blue', 'navy', 'azure', 'cobalt', 'sapphire'],
  green: ['green', 'olive', 'emerald', 'forest'],
  black: ['black', 'matte', 'gloss black', 'jet', 'noir'],
  white: ['white', 'ivory', 'cream', 'pearl'],
  silver: ['silver', 'chrome', 'polished', 'machined', 'mirror'],
  gold: ['gold', 'brass', 'bronze'],
  gray: ['gray', 'grey', 'gunmetal', 'slate', 'charcoal'],
  dark: ['black', 'matte', 'gunmetal', 'gloss black', 'charcoal'],
  light: ['white', 'polished', 'chrome', 'machined', 'pearl'],
};

// Brand fuzzy aliases — common misspellings or partial matches
const BRAND_ALIASES = {
  'carlisle': ['carlisle', 'carlile', 'carlysle'],
  'achieva':  ['achieva', 'achiva', 'achieve'],
  'wanda':    ['wanda', 'wonda'],
  'arisun':   ['arisun', 'arison'],
  'innova':   ['innova', 'inova'],
  'itp':      ['itp'],
  'excel':    ['excel'],
  'wheel mate': ['wheel mate', 'wheelmate'],
  'galaxy':   ['galaxy'],
  'garden pro': ['garden pro', 'gardenpro'],
};

// Vehicle type aliases — natural language → vehicle_type values
const VEHICLE_ALIASES = {
  golf_cart:   ['golf cart', 'golf', 'cart', 'club car', 'ezgo', 'yamaha'],
  atv:         ['atv', 'utv', 'side by side', 'sxs', 'four wheeler', 'quad'],
  lawn_garden: ['lawn', 'mower', 'lawn mower', 'turf', 'garden', 'zero turn', 'zturn', 'tractor'],
  trailer:     ['trailer', 'tow', 'utility trailer'],
  industrial:  ['industrial', 'forklift', 'skid steer', 'agricultural', 'ag', 'farm'],
};

// Category aliases
const CATEGORY_ALIASES = {
  wheel: ['wheel', 'rim', 'rims', 'wheels'],
  tire:  ['tire', 'tires', 'tyre', 'tyres'],
};

// Normalize a query for matching:
// - lowercase
// - replace " by ", " x ", "in.", "inch", '"' with consistent size syntax
function normalizeQuery(q) {
  return q
    .toLowerCase()
    // "14 inch" / "14in" / "14in." / "14\"" → "14x " (note trailing space — preserves token break)
    .replace(/(\d+)\s*(?:inch|in\.?|")\s*/gi, '$1x ')
    // "14 by 7" / "14 x 7" / "14X7" → "14x7"
    .replace(/(\d+)\s*(?:by|x)\s*(\d+)/gi, '$1x$2')
    // Common size shorthand: "14\"7" or "14'7" → "14x7"
    .replace(/(\d+)['"`](\d+)/g, '$1x$2')
    // Hyphenated sizes "14-7" → "14x7" (only when both sides are digits)
    .replace(/(\d+)\-(\d+)\b/g, '$1x$2')
    // Strip leftover punctuation except / . - x +
    .replace(/[^\w\s\/.\-x+]/g, ' ')
    // Collapse multiple spaces to one
    .replace(/\s+/g, ' ')
    .trim();
}

function tokensFromQuery(q) {
  return normalizeQuery(q).split(/\s+/).filter(Boolean);
}

// Expand a single token into possible matching strings
function expandToken(token) {
  const expansions = new Set([token]);
  // Color expansions
  if (COLOR_SYNONYMS[token]) {
    COLOR_SYNONYMS[token].forEach(c => expansions.add(c));
  }
  // Brand expansions
  for (const [canonical, aliases] of Object.entries(BRAND_ALIASES)) {
    if (aliases.includes(token)) {
      expansions.add(canonical);
      aliases.forEach(a => expansions.add(a));
    }
  }
  return Array.from(expansions);
}

// Score a product against a query. Higher score = better match.
// Returns 0 if the product fails the AND-match across tokens.
function scoreProduct(product, query) {
  const tokens = tokensFromQuery(query);
  if (tokens.length === 0) return 1;

  // Build a single searchable string from product
  const haystackParts = [
    product.brand || '',
    product.model || '',
    product.category || '',
    product.vehicle_type || '',
    product.type || '',
  ];
  for (const v of (product.variants || [])) {
    haystackParts.push(v.size, v.finish, v.part_number, v.tread_pattern, v.tread_depth, v.brand, v.ply, v.load_rating);
  }
  if (product.features) {
    haystackParts.push(...(Array.isArray(product.features) ? product.features : [product.features]));
  }
  const haystack = haystackParts.filter(Boolean).join(' | ').toLowerCase();

  let totalScore = 0;
  for (const token of tokens) {
    // STRICT COLOR FILTER: if token is a color word, the product MUST have it in visualTags
    if (COLOR_WORDS.has(token)) {
      const visualTags = getVisualTags(product.id);
      if (visualTags !== null && visualTags.length > 0) {
        // Check if token or its synonyms are in visualTags
        const synonyms = COLOR_SYNONYMS[token] || [token];
        const matches = [token, ...synonyms].some(s => visualTags.includes(s));
        if (matches) {
          totalScore += 12;
          continue;
        }
      }
      // If visual tags not loaded or color not found, fall through to fuzzy match
    }

    let tokenMatched = false;
    let tokenScore = 0;

    // Direct substring match — strongest signal
    if (haystack.includes(token)) {
      tokenScore = 10;
      tokenMatched = true;
    } else {
      // Expanded synonym match (color, brand alias)
      for (const expansion of expandToken(token)) {
        if (haystack.includes(expansion)) {
          tokenScore = Math.max(tokenScore, 6);
          tokenMatched = true;
        }
      }
      // Vehicle alias match
      for (const [vt, aliases] of Object.entries(VEHICLE_ALIASES)) {
        if (aliases.some(a => a === token || a.includes(token) || token.includes(a))) {
          if ((product.vehicle_type || 'golf_cart') === vt) {
            tokenScore = Math.max(tokenScore, 8);
            tokenMatched = true;
          }
        }
      }
      // Category alias
      for (const [cat, aliases] of Object.entries(CATEGORY_ALIASES)) {
        if (aliases.includes(token)) {
          if ((product.category || '') === cat) {
            tokenScore = Math.max(tokenScore, 8);
            tokenMatched = true;
          }
        }
      }
    }

    if (!tokenMatched) return 0;  // every token must match something
    totalScore += tokenScore;

    // Bonus: brand match in brand field specifically
    if (product.brand && product.brand.toLowerCase().includes(token)) totalScore += 3;
    // Bonus: model match in model field
    if (product.model && product.model.toLowerCase().includes(token)) totalScore += 3;
  }
  return totalScore;
}

export function searchInventory(query, products) {
  if (!query || !query.trim()) return products.map(p => ({ product: p, score: 1 }));
  const scored = products
    .map(p => ({ product: p, score: scoreProduct(p, query) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored;
}

// Suggested example queries for the empty-state dropdown
export const SEARCH_SUGGESTIONS = [
  '14 inch chrome wheel',
  'red golf cart wheel',
  'machined black 12x7',
  'ATV tire 6 ply',
  'turf tire for lawn mower',
  'trailer tire ST205',
];