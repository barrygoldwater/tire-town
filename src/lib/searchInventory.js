// ────────────────────────────────────────────────────────────────────────────
// searchInventory.js
//
// Smart inventory search.
//   - Color queries filter STRICTLY on each product's `visual_tags` field
//     (which describes what's actually shown in the product photo, not what
//     finish variants exist in the data).
//   - Size, brand, model, part-number queries fuzzy-match across product
//     variant data as before.
//   - Mixed queries (e.g. "14 inch chrome wheel") apply BOTH: strict color
//     filter for the "chrome" token, fuzzy match for "14x" and "wheel".
//
// Add or edit `visual_tags: [...]` on a product in inventory.js to control
// which color queries return that product.
// ────────────────────────────────────────────────────────────────────────────

// Color word vocabulary. When a query token matches one of these, we apply
// the strict visual_tags filter. Each entry maps to the set of canonical
// visual_tag values that should match that query word.
const COLOR_TAG_MATCHES = {
  chrome:         ['chrome', 'polished', 'silver', 'mirror'],
  polished:       ['polished', 'chrome', 'silver', 'mirror'],
  silver:         ['silver', 'chrome', 'polished', 'mirror', 'machined'],
  mirror:         ['mirror', 'chrome', 'polished', 'silver'],
  machined:       ['machined', 'machined_black', 'chrome', 'polished'],
  machined_black: ['machined_black', 'machined'],
  black:          ['black', 'matte_black', 'gloss_black', 'machined_black'],
  matte:          ['matte_black', 'black'],
  matte_black:    ['matte_black', 'black'],
  gloss:          ['gloss_black', 'black'],
  gloss_black:    ['gloss_black', 'black'],
  gunmetal:       ['gunmetal', 'dark_gray', 'gray'],
  gray:           ['gray', 'gunmetal', 'dark_gray'],
  grey:           ['gray', 'gunmetal', 'dark_gray'],
  dark:           ['black', 'gunmetal', 'matte_black', 'gloss_black', 'machined_black', 'dark_gray'],
  light:          ['chrome', 'polished', 'silver', 'mirror', 'white'],
  white:          ['white', 'ivory'],
  ivory:          ['ivory', 'white'],
  red:            ['red', 'maroon', 'burgundy', 'crimson'],
  maroon:         ['red', 'maroon', 'burgundy'],
  burgundy:       ['red', 'maroon', 'burgundy'],
  crimson:        ['red', 'crimson'],
  blue:           ['blue', 'navy'],
  navy:           ['blue', 'navy'],
  gold:           ['gold', 'bronze', 'brass'],
  bronze:         ['bronze', 'gold'],
  brass:          ['brass', 'gold', 'bronze'],
  green:          ['green', 'olive'],
  olive:          ['olive', 'green'],
  yellow:         ['yellow', 'gold'],
  two_tone:       ['two_tone'],
  twotone:        ['two_tone'],
};

const COLOR_WORDS = new Set(Object.keys(COLOR_TAG_MATCHES));

// Brand fuzzy aliases — common misspellings or partial matches
const BRAND_ALIASES = {
  'carlisle':   ['carlisle', 'carlile', 'carlysle'],
  'achieva':    ['achieva', 'achiva', 'achieve'],
  'wanda':      ['wanda', 'wonda'],
  'arisun':     ['arisun', 'arison'],
  'innova':     ['innova', 'inova'],
  'itp':        ['itp'],
  'excel':      ['excel'],
  'wheel mate': ['wheel mate', 'wheelmate'],
  'galaxy':     ['galaxy'],
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

// ─── Query normalization ────────────────────────────────────────────────────

function normalizeQuery(q) {
  return q
    .toLowerCase()
    // "14 inch" / "14in" / "14in." / "14\"" → "14x " (trailing space preserves token break)
    .replace(/(\d+)\s*(?:inch|in\.?|")\s*/gi, '$1x ')
    // "14 by 7" / "14 x 7" / "14X7" → "14x7"
    .replace(/(\d+)\s*(?:by|x)\s*(\d+)/gi, '$1x$2')
    // "14\"7" or "14'7" → "14x7"
    .replace(/(\d+)['"`](\d+)/g, '$1x$2')
    // "14-7" → "14x7" (only when both sides are digits)
    .replace(/(\d+)\-(\d+)\b/g, '$1x$2')
    // Strip leftover punctuation except / . - x +
    .replace(/[^\w\s\/.\-x+]/g, ' ')
    // Collapse multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

function tokensFromQuery(q) {
  return normalizeQuery(q).split(/\s+/).filter(Boolean);
}

// ─── Strict color filter ────────────────────────────────────────────────────

function colorTokenMatches(token, product) {
  // Returns true if `token` (a color word) should match this product based on
  // its visual_tags. Returns false otherwise (strict — no fall-through).
  const allowed = COLOR_TAG_MATCHES[token];
  if (!allowed) return false;
  const tags = product.visual_tags || [];
  if (tags.length === 0) {
    // Untagged product: cannot match a color query (forces correctness)
    return false;
  }
  return allowed.some(t => tags.includes(t));
}

// ─── Fuzzy matching for non-color tokens ────────────────────────────────────

function fuzzyTokenMatches(token, product, haystack) {
  // Direct substring
  if (haystack.includes(token)) return 10;

  // Brand alias
  for (const [, aliases] of Object.entries(BRAND_ALIASES)) {
    if (aliases.includes(token)) {
      if (aliases.some(a => haystack.includes(a))) return 6;
    }
  }

  // Vehicle alias
  for (const [vt, aliases] of Object.entries(VEHICLE_ALIASES)) {
    if (aliases.some(a => a === token || a.includes(token) || token.includes(a))) {
      if ((product.vehicle_type || 'golf_cart') === vt) return 8;
    }
  }

  // Category alias
  for (const [cat, aliases] of Object.entries(CATEGORY_ALIASES)) {
    if (aliases.includes(token)) {
      if ((product.category || '') === cat) return 8;
    }
  }

  return 0;
}

// ─── Score a product ────────────────────────────────────────────────────────

function scoreProduct(product, query) {
  const tokens = tokensFromQuery(query);
  if (tokens.length === 0) return 1;

  // Build a single haystack string from product text fields
  const parts = [
    product.brand || '',
    product.model || '',
    product.category || '',
    product.vehicle_type || '',
    product.type || '',
  ];
  for (const v of (product.variants || [])) {
    parts.push(v.size, v.finish, v.part_number, v.tread_pattern, v.tread_depth, v.brand, v.ply, v.load_rating);
  }
  if (product.features) {
    parts.push(...(Array.isArray(product.features) ? product.features : [product.features]));
  }
  const haystack = parts.filter(Boolean).join(' | ').toLowerCase();

  let totalScore = 0;
  for (const token of tokens) {
    if (COLOR_WORDS.has(token)) {
      // STRICT: color tokens MUST match the product's visual_tags
      if (!colorTokenMatches(token, product)) return 0;
      totalScore += 12;
      continue;
    }

    const score = fuzzyTokenMatches(token, product, haystack);
    if (score === 0) return 0;  // every non-color token must match something
    totalScore += score;

    // Bonus: brand or model exact-field match
    if (product.brand && product.brand.toLowerCase().includes(token)) totalScore += 3;
    if (product.model && product.model.toLowerCase().includes(token)) totalScore += 3;
  }
  return totalScore;
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function searchInventory(query, products) {
  if (!query || !query.trim()) {
    return products.map(p => ({ product: p, score: 1 }));
  }
  return products
    .map(p => ({ product: p, score: scoreProduct(p, query) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);
}

export const SEARCH_SUGGESTIONS = [
  '14 inch chrome wheel',
  'red golf cart wheel',
  'machined black 12x7',
  'ATV tire 6 ply',
  'turf tire for lawn mower',
  'trailer tire ST205',
];