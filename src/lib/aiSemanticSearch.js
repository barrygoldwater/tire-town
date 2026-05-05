/**
 * AI semantic search — uses Base44's LLM integration to interpret natural
 * language queries that the client-side matcher couldn't handle.
 *
 * IMPORTANT: This function calls Base44's built-in LLM mechanism. If Base44
 * exposes a server-side function for LLM calls (e.g. base44.invokeLLM,
 * base44.callAI, or a Backend Function with Anthropic SDK), wire it into the
 * `callLLM` placeholder below. If no such mechanism exists yet, the function
 * returns null and the UI gracefully falls back to client-side results only.
 */

const SYSTEM_PROMPT = `You are a product search engine for a specialty tire and wheel distributor.
Match user queries to products in the inventory liberally and intelligently.
- Colors: "red" includes maroon/burgundy; "dark" includes black/gunmetal; "silver" includes chrome/polished/machined.
- Sizes: "14 inch" matches "14x"; "12 by 7" matches "12x7"; "10\"" matches "10x".
- Vehicle types: "golf cart" → golf_cart; "ATV/UTV/quad" → atv; "lawn mower/zero turn" → lawn_garden.
- Categories: "wheel/rim" → wheel; "tire/tyre" → tire.
- If the user describes a use case ("muddy trails", "smooth turf", "street legal"), match against features and tread descriptions.
Return ONLY valid JSON, no preamble.`;

const USER_PROMPT = (query, productSummary) => `User search: "${query}"

Inventory (JSON):
${productSummary}

Return JSON with this exact shape:
{
  "matchingIds": ["id1", "id2", ...],
  "interpretation": "brief 1-line description of what was searched"
}

Order by relevance, max 12 results. Empty array if nothing fits.`;

// Build a compact summary of inventory to send to the LLM.
// Sends only fields the LLM needs for matching, drops large variant lists,
// keeps a concise size/finish summary instead. Should stay under ~3K tokens.
function compactInventory(products) {
  return products.map(p => {
    const variants = p.variants || [];
    const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))].slice(0, 8);
    const finishes = [...new Set(variants.map(v => v.finish).filter(Boolean))].slice(0, 8);
    const partNumbers = variants.map(v => v.part_number).filter(Boolean).slice(0, 4);
    return {
      id: p.id,
      brand: p.brand,
      model: p.model,
      category: p.category,
      vehicle_type: p.vehicle_type || 'golf_cart',
      sizes,
      finishes,
      partNumbers,
      ...(p.features ? { features: Array.isArray(p.features) ? p.features.slice(0, 4) : [p.features] } : {}),
    };
  });
}

// Replace this with the actual Base44 LLM call. The function should:
//   - Take system + user prompt strings
//   - Return the model's text response
// Examples (adapt to whatever Base44 exposes):
//   return await base44.invokeLLM({ system, user, model: 'claude-sonnet-4-20250514' });
//   return await fetch('/api/ai-search', {...}).then(r => r.text());
async function callLLM(system, user) {
  // TODO: Wire this to Base44's LLM integration.
  // If unavailable, return null and the search gracefully falls back.
  if (typeof window !== 'undefined' && window.base44Invoke) {
    return await window.base44Invoke({ system, user, model: 'claude-sonnet-4-20250514', maxTokens: 800 });
  }
  return null;
}

export async function aiSemanticSearch(query, products) {
  try {
    const summary = JSON.stringify(compactInventory(products));
    const response = await callLLM(SYSTEM_PROMPT, USER_PROMPT(query, summary));
    if (!response) return null;
    // Strip markdown code fences if present
    const cleaned = response.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed.matchingIds)) return null;
    const idSet = new Set(parsed.matchingIds);
    const matched = products.filter(p => idSet.has(p.id));
    // Preserve the order Claude returned
    matched.sort((a, b) => parsed.matchingIds.indexOf(a.id) - parsed.matchingIds.indexOf(b.id));
    return {
      products: matched,
      interpretation: parsed.interpretation || '',
    };
  } catch (e) {
    console.error('AI search failed:', e);
    return null;
  }
}