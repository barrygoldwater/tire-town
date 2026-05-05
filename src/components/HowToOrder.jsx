const STEPS = [
  {
    number: "01",
    title: "Browse the catalog",
    description: "Filter by vehicle type and brand to find the exact tire or wheel you need.",
  },
  {
    number: "02",
    title: "Call us or request a quote",
    description: "We confirm pricing and availability same-day. No wait, no runaround.",
  },
  {
    number: "03",
    title: "Same-day pricing & freight",
    description: "Ships from Phoenix or Greenville — most US orders arrive in 1–3 days.",
  },
];

export default function HowToOrder() {
  return (
    <section className="py-8 sm:py-10 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4">
          How to Order
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-black/8">
          {STEPS.map((step, i) => (
            <div key={step.number} className={`${i > 0 ? "mt-6 sm:mt-0 sm:px-6" : "sm:pr-6"}`}>
              <p className="text-[11px] font-mono tracking-[0.15em] text-primary mb-2">{step.number}</p>
              <p className="text-[15px] sm:text-[16px] font-semibold tracking-[-0.01em] text-[#0a0a0a]">{step.title}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}