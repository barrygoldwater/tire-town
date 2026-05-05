const SYSTEM_PROMPT = `You are tagging product images for a tire and wheel distributor's search system. Look at the wheel or tire in the image and return ONLY a JSON object describing the visible colors and finish. No prose, no markdown fences, just JSON.`;

const USER_PROMPT = `Analyze this product image. Focus on the WHEEL (ignore the tire if one is mounted). Return JSON with this exact shape:

{
  "primaryColor": "single dominant color word",
  "accentColors": ["array of secondary colors visible"],
  "finishType": "chrome | polished | machined | painted | matte",
  "tags": ["all applicable search tags from the vocabulary"]
}

Tag vocabulary (use these exact strings):
- chrome, polished, silver, mirror     (shiny silver/mirrored finishes)
- machined, machined_black             (black wheel with silver/chrome accents)
- black, matte_black, gloss_black
- gunmetal, dark_gray
- white, ivory
- red, maroon, burgundy
- blue, navy
- gold, bronze, brass
- green, olive
- yellow
- two_tone                              (when multiple distinct colors are visible on the wheel)

Examples:
- All-chrome wheel: {"primaryColor":"silver","accentColors":[],"finishType":"chrome","tags":["chrome","polished","silver","mirror"]}
- Black wheel with chrome rim: {"primaryColor":"black","accentColors":["silver"],"finishType":"machined","tags":["black","machined","machined_black","two_tone","silver"]}
- Solid red wheel: {"primaryColor":"red","accentColors":[],"finishType":"painted","tags":["red"]}
- Black with red accents: {"primaryColor":"black","accentColors":["red"],"finishType":"painted","tags":["black","red","two_tone"]}`;

export async function tagProductImage(imageUrl) {
  const apiKey = window.ANTHROPIC_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not found');
  }
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'url', url: imageUrl } },
            { type: 'text', text: USER_PROMPT },
          ],
        },
      ],
    }),
  });
  if (!response.ok) {
    throw new Error(`Vision API error ${response.status}`);
  }
  const data = await response.json();
  const text = data.content?.find(b => b.type === 'text')?.text || '';
  const cleaned = text.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);
  return {
    primaryColor: parsed.primaryColor,
    accentColors: parsed.accentColors || [],
    finishType: parsed.finishType,
    tags: parsed.tags || [],
  };
}

export async function tagAllProducts(products, onProgress) {
  const results = {};
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (!p.image_url) {
      results[p.id] = { tags: [], skipped: 'no image' };
      onProgress?.(i + 1, products.length, p, results[p.id]);
      continue;
    }
    try {
      const tagged = await tagProductImage(p.image_url);
      results[p.id] = tagged;
      onProgress?.(i + 1, products.length, p, tagged);
    } catch (e) {
      results[p.id] = { tags: [], error: e.message };
      onProgress?.(i + 1, products.length, p, results[p.id]);
    }
    // Throttle to stay under rate limits
    await new Promise(r => setTimeout(r, 250));
  }
  return results;
}

// Wire this up to whatever Base44 mechanism saves files to /public.
// If unavailable, return JSON for the user to download and place manually.
export async function saveTags(tagsObject) {
  const blob = new Blob([JSON.stringify(tagsObject, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'visual_tags.json';
  a.click();
  URL.revokeObjectURL(url);
}