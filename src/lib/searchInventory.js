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
    .replace(/(\d+)\s*(?:inch|in\.?|")\s*/g, '$1x')          // "14 inch" → "14x"
    .replace(/(\d+)\s*(?:by|x)\s*(\d+)/g, '$1x$2')           // "14 by 7" / "14 x 7" → "14x7"
    .replace(/[^\w\s\/.\-x+]/g, ' ')                          // strip punctuation except / . - x +
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