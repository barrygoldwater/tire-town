import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Phone, FileText, TrendingUp, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const RANGES = [
  { key: "7", label: "7 days", days: 7 },
  { key: "30", label: "30 days", days: 30 },
  { key: "all", label: "All time", days: null },
];

const SOURCE_LABELS = {
  "header-desktop": "Header (desktop)",
  "header-mobile": "Header (mobile)",
  "mobile-bottom-bar": "Mobile bottom bar",
  "product-modal": "Product modal",
  "inventory-section": "Inventory section",
  "contact-sales": "Contact · Sales",
  "contact-turf-golf": "Contact · Turf/Golf",
  "footer-sales": "Footer · Sales",
  "footer-turf-golf": "Footer · Turf/Golf",
  "about-team": "About · Team cards",
  "about-closing-cta": "About · Closing CTA",
};

function inRange(record, days) {
  if (!days) return true;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return new Date(record.created_date).getTime() >= cutoff;
}

function fmtDate(d) {
  return new Date(d).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

function StatCard({ icon: Icon, value, label, sub }) {
  return (
    <div className="border border-border rounded-[4px] bg-white p-5">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="w-4 h-4" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</span>
      </div>
      <p className="mt-2 text-[32px] font-extrabold tracking-[-0.02em] text-[#0a0a0a] leading-none tabular-nums">{value}</p>
      {sub && <p className="mt-1.5 text-[12px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [range, setRange] = useState("30");
  const [openQuote, setOpenQuote] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [q, c] = await Promise.all([
          base44.entities.QuoteRequest.list("-created_date", 500),
          base44.entities.PhoneClick.list("-created_date", 2000),
        ]);
        setQuotes(q || []);
        setClicks(c || []);
      } catch (e) {
        setError(e?.message || "Failed to load analytics data.");
      }
      setLoading(false);
    })();
  }, []);

  const days = RANGES.find(r => r.key === range)?.days ?? null;
  const q = useMemo(() => quotes.filter(r => inRange(r, days)), [quotes, days]);
  const c = useMemo(() => clicks.filter(r => inRange(r, days)), [clicks, days]);

  const bySource = useMemo(() => {
    const m = {};
    for (const r of c) {
      const k = r.source || "unknown";
      m[k] = (m[k] || 0) + 1;
    }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [c]);

  const byDay = useMemo(() => {
    const daysBack = 14;
    const out = [];
    for (let i = daysBack - 1; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const next = new Date(d); next.setDate(d.getDate() + 1);
      const label = d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
      const cc = clicks.filter(r => { const t = new Date(r.created_date); return t >= d && t < next; }).length;
      const qc = quotes.filter(r => { const t = new Date(r.created_date); return t >= d && t < next; }).length;
      out.push({ label, clicks: cc, quotes: qc });
    }
    return out;
  }, [clicks, quotes]);

  const maxDay = Math.max(1, ...byDay.map(d => d.clicks + d.quotes));
  const maxSource = Math.max(1, ...bySource.map(([, n]) => n));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Admin</p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a]">
              Site Conversion
            </h1>
          </div>
          <div className="flex gap-1.5">
            {RANGES.map(r => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`text-[12px] font-semibold uppercase tracking-[0.06em] px-3.5 py-2 rounded-[3px] border transition-colors ${
                  range === r.key
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                    : "bg-white text-[#525252] border-border hover:border-[#0a0a0a]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-6 text-sm text-red-600 border border-red-200 bg-red-50 rounded-[4px] p-4">{error}</p>
        )}

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={FileText} value={q.length} label="Quote requests" sub={`${quotes.length} all time`} />
          <StatCard icon={Phone} value={c.length} label="Phone clicks" sub={`${clicks.length} all time`} />
          <StatCard
            icon={TrendingUp}
            value={q.length + c.length}
            label="Total conversion actions"
            sub="Calls + quote submissions"
          />
        </div>

        {/* 14-day trend */}
        <div className="mt-10">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Last 14 days</h2>
          <div className="mt-4 border border-border rounded-[4px] bg-white p-5">
            <div className="flex items-end gap-1.5 h-32">
              {byDay.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <div className="w-full flex flex-col justify-end" style={{ height: "96px" }}>
                    {d.quotes > 0 && (
                      <div
                        className="w-full bg-[#0a0a0a] rounded-t-[2px]"
                        style={{ height: `${(d.quotes / maxDay) * 96}px` }}
                        title={`${d.quotes} quote${d.quotes === 1 ? "" : "s"}`}
                      />
                    )}
                    {d.clicks > 0 && (
                      <div
                        className={`w-full bg-primary ${d.quotes === 0 ? "rounded-t-[2px]" : ""}`}
                        style={{ height: `${(d.clicks / maxDay) * 96}px` }}
                        title={`${d.clicks} call click${d.clicks === 1 ? "" : "s"}`}
                      />
                    )}
                  </div>
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">{d.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-primary rounded-[1px]" /> Phone clicks</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-[1px]" /> Quote requests</span>
            </div>
          </div>
        </div>

        {/* Clicks by source */}
        <div className="mt-10">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Phone clicks by placement {days ? `(last ${days} days)` : "(all time)"}
          </h2>
          <div className="mt-4 border border-border rounded-[4px] bg-white divide-y divide-border">
            {bySource.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">No phone clicks recorded yet.</p>
            )}
            {bySource.map(([src, n]) => (
              <div key={src} className="flex items-center gap-4 px-5 py-3">
                <span className="w-44 flex-shrink-0 text-[13px] font-semibold text-[#0a0a0a] truncate">
                  {SOURCE_LABELS[src] || src}
                </span>
                <div className="flex-1 h-2 bg-[#f0f0ee] rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(n / maxSource) * 100}%` }} />
                </div>
                <span className="w-10 text-right text-[14px] font-extrabold tabular-nums text-[#0a0a0a]">{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote submissions */}
        <div className="mt-10">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Quote requests {days ? `(last ${days} days)` : "(all time)"}
          </h2>
          <div className="mt-4 border border-border rounded-[4px] bg-white divide-y divide-border">
            {q.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">No quote requests in this period.</p>
            )}
            {q.map(r => (
              <div key={r.id}>
                <button
                  onClick={() => setOpenQuote(openQuote === r.id ? null : r.id)}
                  className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-[#fafaf9] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-[#0a0a0a] truncate">{r.name || "No name"}</p>
                    <p className="text-[12px] text-muted-foreground truncate">
                      {[r.phone, r.email].filter(Boolean).join(" · ") || "No contact info"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {r.email_sent === false && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-amber-700 bg-amber-50 border border-amber-200 rounded-[3px] px-2 py-0.5">
                        Email failed
                      </span>
                    )}
                    <span className="text-[12px] text-muted-foreground whitespace-nowrap">{fmtDate(r.created_date)}</span>
                    {openQuote === r.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>
                {openQuote === r.id && (
                  <div className="px-5 pb-4 text-[14px] text-[#333] leading-relaxed whitespace-pre-wrap">
                    {r.message || "No message."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-[11px] text-muted-foreground">
          Tracking began when this dashboard shipped. Clicks and submissions before that date were not recorded.
        </p>
      </div>
    </div>
  );
}
