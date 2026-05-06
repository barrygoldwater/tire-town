/**
 * parseSize(sizeString)
 * Parses all real-world tire and wheel size formats used in inventory.
 * Returns a structured object with a pre-formatted human-readable string.
 * Never returns NaN or broken output — falls back to raw string gracefully.
 */

function mmToIn(mm) {
  return Math.round((mm / 25.4) * 10) / 10;
}

function stripLoadRange(s) {
  // Strip trailing load range like " C", " D", " E", " F", " G", " LRC", " LRD" etc.
  const match = s.match(/^(.*?)\s+(LR[A-G]|[B-H])$/i);
  if (match) return { stripped: match[1].trim(), loadRange: match[2].replace(/^LR/i, "").toUpperCase() };
  return { stripped: s.trim(), loadRange: null };
}

export function parseSize(raw = "") {
  const base = { rimSize: null, width: null, widthMm: null, aspectRatio: null, overallDiameter: null, type: null, loadRange: null, raw, formatted: null };

  if (!raw || typeof raw !== "string") return base;

  const { stripped, loadRange } = stripLoadRange(raw.trim());
  const s = stripped;
  const lrSuffix = loadRange ? ` · Load Range ${loadRange}` : "";

  // ── 1. Wheel: "10x7" or "10x7 4/4" or "10X7 ET-25" etc.
  // Detected BEFORE imperial tire to avoid mis-matching "10x7" as tire
  // Only treat as wheel if there's no dash-rim pattern after the second number
  const wheelMatch = s.match(/^(\d+(?:\.\d+)?)[xX](\d+(?:\.\d+)?)(?:\s.*|$)$/);
  if (wheelMatch) {
    const d = parseFloat(wheelMatch[1]);
    const w = parseFloat(wheelMatch[2]);
    // Extract offset if present
    const offsetMatch = s.match(/(?:ET|et)[\s]?([+-]?\d+)/);
    const plusMatch = s.match(/\s([+-]\d+)$/);
    const offset = offsetMatch ? `ET${offsetMatch[1]}` : (plusMatch ? `ET${plusMatch[1]}` : null);
    if (!isNaN(d) && !isNaN(w)) {
      const formatted = offset
        ? `${d}" diameter · ${w}" wide · ${offset} offset`
        : `${d}" diameter · ${w}" wide`;
      return { ...base, rimSize: d, width: w, loadRange, formatted };
    }
    return base;
  }

  // ── 2. Imperial high-flotation tire: "22x11-10", "18x8.50-8", "25x10.50-12"
  const impMatch = s.match(/^(\d+(?:\.\d+)?)[xX](\d+(?:\.\d+)?)-(\d+)/);
  if (impMatch) {
    const od = parseFloat(impMatch[1]);
    const w = parseFloat(impMatch[2]);
    const rim = parseInt(impMatch[3]);
    if (!isNaN(od) && !isNaN(w) && !isNaN(rim)) {
      return {
        ...base,
        rimSize: rim, width: w, overallDiameter: od, loadRange,
        formatted: `Fits ${rim}" rim · ${od}" tall · ${w}" wide${lrSuffix}`,
      };
    }
    return base;
  }

  // ── 3. ST Trailer bias: "ST205/75D15"
  const stBiasMatch = s.match(/^ST(\d{2,3})\/(\d{2,3})D(\d{1,2}(?:\.\d+)?)/i);
  if (stBiasMatch) {
    const wMm = parseInt(stBiasMatch[1]);
    const ar = parseInt(stBiasMatch[2]);
    const rim = parseFloat(stBiasMatch[3]);
    const wIn = mmToIn(wMm);
    return {
      ...base,
      rimSize: rim, width: wIn, widthMm: wMm, aspectRatio: ar, type: "Trailer (bias)", loadRange,
      formatted: `Trailer (bias) · Fits ${rim}" rim · ${wMm}mm wide (${wIn}") · ${ar}% aspect${lrSuffix}`,
    };
  }

  // ── 4. ST Trailer radial: "ST205/75R15"
  const stRadMatch = s.match(/^ST(\d{2,3})\/(\d{2,3})R(\d{1,2}(?:\.\d+)?)/i);
  if (stRadMatch) {
    const wMm = parseInt(stRadMatch[1]);
    const ar = parseInt(stRadMatch[2]);
    const rim = parseFloat(stRadMatch[3]);
    const wIn = mmToIn(wMm);
    return {
      ...base,
      rimSize: rim, width: wIn, widthMm: wMm, aspectRatio: ar, type: "Trailer (radial)", loadRange,
      formatted: `Trailer (radial) · Fits ${rim}" rim · ${wMm}mm wide (${wIn}") · ${ar}% aspect${lrSuffix}`,
    };
  }

  // ── 5. LT light truck: "LT235/85R16"
  const ltMatch = s.match(/^LT(\d{2,3})\/(\d{2,3})[A-Z]?(\d{1,2}(?:\.\d+)?)/i);
  if (ltMatch) {
    const wMm = parseInt(ltMatch[1]);
    const ar = parseInt(ltMatch[2]);
    const rim = parseFloat(ltMatch[3]);
    const wIn = mmToIn(wMm);
    return {
      ...base,
      rimSize: rim, width: wIn, widthMm: wMm, aspectRatio: ar, type: "Light truck", loadRange,
      formatted: `Light truck · Fits ${rim}" rim · ${wMm}mm wide (${wIn}") · ${ar}% aspect${lrSuffix}`,
    };
  }

  // ── 6. P-metric: "P205/55R16"
  const pMatch = s.match(/^P(\d{2,3})\/(\d{2,3})[A-Z]?(\d{1,2}(?:\.\d+)?)/i);
  if (pMatch) {
    const wMm = parseInt(pMatch[1]);
    const ar = parseInt(pMatch[2]);
    const rim = parseFloat(pMatch[3]);
    const wIn = mmToIn(wMm);
    return {
      ...base,
      rimSize: rim, width: wIn, widthMm: wMm, aspectRatio: ar, loadRange,
      formatted: `Fits ${rim}" rim · ${wMm}mm wide (${wIn}") · ${ar}% aspect${lrSuffix}`,
    };
  }

  // ── 7. Standard metric: "205/50-10" or "205/50R10"
  const metricMatch = s.match(/^(\d{2,3})\/(\d{2,3})[A-Z\-](\d{1,2}(?:\.\d+)?)/i);
  if (metricMatch) {
    const wMm = parseInt(metricMatch[1]);
    const ar = parseInt(metricMatch[2]);
    const rim = parseFloat(metricMatch[3]);
    const wIn = mmToIn(wMm);
    if (!isNaN(wMm) && !isNaN(ar) && !isNaN(rim)) {
      return {
        ...base,
        rimSize: rim, width: wIn, widthMm: wMm, aspectRatio: ar, loadRange,
        formatted: `Fits ${rim}" rim · ${wMm}mm wide (${wIn}") · ${ar}% aspect${lrSuffix}`,
      };
    }
    return base;
  }

  // ── 8. Old imperial bias: "5.70-8" or "4.80-8" or "5.30-12"
  const oldBiasMatch = s.match(/^(\d+(?:\.\d+)?)-(\d+)$/);
  if (oldBiasMatch) {
    const w = parseFloat(oldBiasMatch[1]);
    const rim = parseInt(oldBiasMatch[2]);
    if (!isNaN(w) && !isNaN(rim)) {
      return {
        ...base,
        rimSize: rim, width: w, loadRange,
        formatted: `Fits ${rim}" rim · ${w}" wide${lrSuffix}`,
      };
    }
    return base;
  }

  // No match — return raw only, no formatted breakdown
  return base;
}