import React from 'react';

const Stat = ({ value, label, sub }) => (
  <div className="border border-white/10 bg-white/[0.03] rounded-lg p-6">
    <div className="text-[34px] sm:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-none tabular-nums">{value}</div>
    <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary">{label}</div>
    {sub && <div className="mt-1 text-[13px] text-neutral-400">{sub}</div>}
  </div>
);

const Leak = ({ number, title, body }) => (
  <div className="border border-neutral-200 rounded-lg p-6 bg-white">
    <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-red-600">Leak {number}</div>
    <div className="mt-2 text-[20px] font-extrabold text-neutral-900 tracking-[-0.02em]">{title}</div>
    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{body}</p>
  </div>
);

const Feature = ({ title, body }) => (
  <div className="border border-white/10 bg-white/[0.03] rounded-lg p-6">
    <div className="text-[17px] font-bold text-white tracking-[-0.01em]">{title}</div>
    <p className="mt-2 text-[14px] leading-relaxed text-neutral-400">{body}</p>
  </div>
);

const Step = ({ number, title, body }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-[15px]">{number}</div>
    <div>
      <div className="text-[17px] font-bold text-neutral-900 tracking-[-0.01em]">{title}</div>
      <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{body}</p>
    </div>
  </div>
);

const CompareRow = ({ label, them, us, last }) => (
  <div className={`grid grid-cols-3 gap-4 py-4 ${last ? '' : 'border-b border-neutral-200'}`}>
    <div className="text-[15px] font-semibold text-neutral-900">{label}</div>
    <div className="text-[15px] text-neutral-500">{them}</div>
    <div className="text-[15px] font-semibold text-primary">{us}</div>
  </div>
);

const DealCard = ({ eyebrow, value, title, body }) => (
  <div className="border border-white/10 bg-white/[0.03] rounded-lg p-7 flex flex-col">
    <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>
    <div className="mt-3 text-[36px] font-extrabold text-white tracking-[-0.03em] leading-none tabular-nums">{value}</div>
    <div className="mt-2 text-[15px] font-bold text-white">{title}</div>
    <p className="mt-2 text-[14px] leading-relaxed text-neutral-400">{body}</p>
  </div>
);

const Milestone = ({ weeks, title, happens, delivered, fromYou }) => (
  <div className="relative pl-8 sm:pl-10 pb-10 last:pb-0">
    <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary" />
    <div className="absolute left-[5px] top-5 bottom-0 w-px bg-neutral-200" />
    <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary">{weeks}</div>
    <div className="mt-1 text-[22px] font-extrabold text-neutral-900 tracking-[-0.02em]">{title}</div>
    <div className="mt-4 grid md:grid-cols-3 gap-4">
      <div className="border border-neutral-200 rounded-lg bg-white p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">What happens</div>
        <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{happens}</p>
      </div>
      <div className="border border-neutral-200 rounded-lg bg-white p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">Delivered to you</div>
        <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{delivered}</p>
      </div>
      <div className="border border-neutral-200 rounded-lg bg-white p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">What we need from you</div>
        <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{fromYou}</p>
      </div>
    </div>
  </div>
);

export default function Proposal() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">

      {/* HERO */}
      <section className="bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Prepared for Rob and Dan, Affordable Tire</p>
          </div>
          <h1 className="text-[38px] sm:text-[58px] lg:text-[68px] font-extrabold text-white tracking-[-0.035em] leading-[0.98] max-w-[900px]">
            Your customers are ready to order online. Your website just has to let them.
          </h1>
          <p className="mt-6 text-[17px] sm:text-[19px] leading-relaxed text-neutral-400 max-w-[720px]">
            A wholesale ordering platform built specifically for Affordable Tire. Real photos, your real price levels, live inventory from TireShop, and orders that land in your system without anyone re-keying them. Built by Vory, owned by you.
          </p>
        </div>
      </section>

      {/* THE BUSINESS TODAY */}
      <section className="bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">The business today</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white tracking-[-0.03em] leading-tight max-w-[760px]">
            You already built a $7M wholesale business. These are your numbers.
          </h2>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat value="$7M" label="Annual revenue" sub="Across both locations" />
            <Stat value="10,828" label="Orders YTD" sub="5,762 Glendale + 5,066 Greenville" />
            <Stat value="$378" label="Average order" sub="Consistent, repeat buyers" />
            <Stat value="2" label="Warehouses" sub="Glendale, AZ and Greenville, SC" />
          </div>
          <p className="mt-8 text-[16px] leading-relaxed text-neutral-400 max-w-[760px]">
            The demand is proven. The customers are loyal. The volume is real. What is missing is a digital storefront that works as hard as your counter does.
          </p>
        </div>
      </section>

      {/* THE LEAKS */}
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">Where money is leaking</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-neutral-900 tracking-[-0.03em] leading-tight max-w-[760px]">
            Three leaks, all fixable.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <Leak
              number="1"
              title="10,000+ customer emails, never marketed to"
              body="Your POS has been collecting customer emails since 2014, and the only thing those addresses have ever received is invoices and statements, mostly sent to accounting departments. The people who actually order tires have never heard from you once. That list is the cheapest revenue you will ever generate, and it is sitting untouched."
            />
            <Leak
              number="2"
              title="Paying a vendor who refuses to work"
              body="TireTutor costs you roughly $650 a month, a flat fee plus a cut of online orders, for a website they will not edit and will not even add photos to. A quarter of your order volume already flows through it. Imagine what that channel does when the site actually works."
            />
            <Leak
              number="3"
              title="2.9% on every card payment"
              body="About a quarter of your volume pays by card, roughly $1.75M a year processed at 2.9%. That is over $50,000 a year in fees. We can move you to modern processing at roughly 2.3%, worth about $10,000 a year back with a simple switch."
            />
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">The platform</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white tracking-[-0.03em] leading-tight max-w-[760px]">
            A wholesale ordering platform that belongs to you.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Feature title="Wholesale accounts, approved by you" body="Customers register, you approve the account and assign a price level before it goes live. You stay in control of who buys and at what price." />
            <Feature title="Your TireShop price levels, mirrored" body="Each customer is assigned the same price level they have in TireShop, and the site shows them exactly one price: theirs. Tires, wheels, parts, and tubes all priced by level, not just the tire levels TireTutor handles." />
            <Feature title="Pay on account or by card" body="75% of your customers buy on terms today. Approved accounts check out with charge to account, everyone else pays by card, and both land in TireShop the same way." />
            <Feature title="Shipping rules you control" body="Threshold logic built in: orders under $399 pay full freight, $400 to $599 pay half, and $600 and up ship free, or whatever numbers you choose. Local truck delivery radius handled per warehouse." />
            <Feature title="Real photos on every product" body="Manufacturer image packs loaded across the catalog, with a drag and drop uploader for anything new. Customers buy what they can see." />
            <Feature title="Live inventory from TireShop" body="Stock levels and pricing sync automatically from TireShop for both locations. What is on the site is what is on the shelf." />
            <Feature title="Orders flow back into TireShop" body="A web order lands in your system automatically. No phone tag, no re-keying, no missed orders." />
            <Feature title="Built for email campaigns" body="The platform connects to a professional email system so your 10,000 person list finally starts producing orders." />
          </div>
        </div>
      </section>

      {/* HOW AN ORDER FLOWS */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">How it works</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-neutral-900 tracking-[-0.03em] leading-tight max-w-[760px]">
            From new customer to order in your system.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-8 max-w-[900px]">
            <Step number="1" title="Customer registers" body="A golf course superintendent or shop owner creates an account with their business details." />
            <Step number="2" title="You approve and assign a price level" body="One click in the admin dashboard. Their account goes live tied to the TireShop price level you decide they get." />
            <Step number="3" title="They shop their price" body="Full catalog with photos, sizes, and live stock, showing only their price level. Reordering takes minutes." />
            <Step number="4" title="The order lands in TireShop" body="It appears in your system automatically, tagged to the right location, ready to fulfill." />
          </div>
        </div>
      </section>

      {/* EMAIL MATH */}
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">The list you already own</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-neutral-900 tracking-[-0.03em] leading-tight max-w-[760px]">
            What 10,000 customer emails are worth when you actually use them.
          </h2>
          <div className="mt-10 border border-neutral-200 rounded-lg bg-white p-7 sm:p-10 max-w-[900px]">
            <div className="grid sm:grid-cols-3 gap-6 items-center">
              <div>
                <div className="text-[34px] font-extrabold text-neutral-900 tracking-[-0.03em] tabular-nums">10,000</div>
                <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Past customers on your list</div>
              </div>
              <div>
                <div className="text-[34px] font-extrabold text-neutral-900 tracking-[-0.03em] tabular-nums">1 in 100</div>
                <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Placing one order per quarter</div>
              </div>
              <div>
                <div className="text-[34px] font-extrabold text-primary tracking-[-0.03em] tabular-nums">$37,800</div>
                <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-500">In quarterly orders at your $378 average</div>
              </div>
            </div>
            <p className="mt-7 text-[14px] leading-relaxed text-neutral-500">
              Illustrative math at your current average order value. We clean and verify the list before the first send so campaigns reach the people who actually buy, not the accounting inbox. The platform gives them somewhere to click.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">Side by side</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-neutral-900 tracking-[-0.03em] leading-tight max-w-[760px]">
            What you pay for now versus what you get.
          </h2>
          <div className="mt-10 max-w-[900px]">
            <div className="grid grid-cols-3 gap-4 pb-3 border-b-2 border-neutral-900">
              <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-neutral-900"> </div>
              <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-neutral-500">TireTutor</div>
              <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-primary">Your platform</div>
            </div>
            <CompareRow label="Product photos" them="No" us="Every product" />
            <CompareRow label="Edits and changes" them="Refused" us="Same week" />
            <CompareRow label="Wholesale pricing" them="3 or 4 tire levels, changed by emailing them" us="All your price levels: tires, wheels, parts, tubes" />
            <CompareRow label="TireShop integration" them="No" us="Two way, automatic" />
            <CompareRow label="Email marketing" them="No" us="Built in" />
            <CompareRow label="Who owns it" them="They do" us="You do" last />
          </div>
        </div>
      </section>

      {/* THE DEAL */}
      <section className="bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">The engagement</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white tracking-[-0.03em] leading-tight max-w-[760px]">
            Structured so we only win when you do.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <DealCard
              eyebrow="One time"
              value="$15,000"
              title="Platform build"
              body="Half to begin, half at launch. Covers the full platform: accounts, price level pricing, catalog with photos, TireShop integration, on account and card checkout, shipping rules, and the admin dashboard."
            />
            <DealCard
              eyebrow="Monthly"
              value="$3,500"
              title="Platform management and email program"
              body="Replaces the roughly $650 you send TireTutor today, with the balance funding the monthly email program that works your customer list, plus hosting, updates, and catalog maintenance."
            />
            <DealCard
              eyebrow="Performance"
              value="2%"
              title="Of platform orders"
              body="On orders placed through the platform. If it does not sell, we do not collect. Our incentive is your order volume, permanently."
            />
          </div>
          <div className="mt-8 border border-white/10 bg-white/[0.03] rounded-lg p-7 max-w-[900px]">
            <p className="text-[16px] leading-relaxed text-neutral-300">
              A piece of the monthly number is money you already spend with a vendor who ignores you. The rest buys an email program working your customer list every month. If the platform does not produce orders, the performance fee costs you nothing. And unlike TireTutor, everything we build is yours. The platform, the code, the customer accounts, and the email list are assets of Affordable Tire, not a rental you lose the day you stop paying.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">Timeline</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-neutral-900 tracking-[-0.03em] leading-tight max-w-[760px]">
            First online orders inside 45 days.
          </h2>
          <div className="mt-10 max-w-[980px]">
            <Milestone
              weeks="Milestone 1 · Weeks 1 to 2"
              title="Foundation and TireShop connection"
              happens="TireShop API connected, catalog structure built, and inventory syncing automatically from both locations."
              delivered="A private staging site where you can browse your full live inventory, both stores, updating on its own."
              fromYou="Forward the TireShop questions to their team so API access is granted in week one."
            />
            <Milestone
              weeks="Milestone 2 · Weeks 3 to 4"
              title="Photos, price levels, and accounts"
              happens="Manufacturer image packs loaded across the catalog, your TireShop price levels mirrored, and customer registration with your approval step built."
              delivered="The catalog with real photos, where a logged in test account sees its price level and nothing else."
              fromYou="Image packs requested from your manufacturers, plus which price level each customer type should get on the site."
            />
            <Milestone
              weeks="Milestone 3 · Week 5"
              title="Admin dashboard and checkout"
              happens="Your dashboard for approving accounts, assigning price levels, and viewing orders. Card and on account checkout go live with your shipping rules, and web orders start landing in TireShop automatically."
              delivered="The complete platform, ready for a real end to end test: you place an order and watch it appear in TireShop."
              fromYou="Thirty minutes to walk the dashboard with us and approve the first batch of test accounts."
            />
            <Milestone
              weeks="Milestone 4 · Week 6"
              title="Launch and first campaign"
              happens="Platform goes live to customers. The first email campaign goes out to your list, driving them to register and order."
              delivered="A live ordering platform and your first campaign report: opens, clicks, registrations, and orders."
              fromYou="A yes on the campaign before it sends. Then we watch the orders come in."
            />
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">Next steps</p>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white tracking-[-0.03em] leading-tight max-w-[760px]">
            Three things start the clock.
          </h2>
          <div className="mt-8 space-y-4 max-w-[720px]">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-[14px]">1</div>
              <p className="text-[16px] leading-relaxed text-neutral-300 pt-1">Green light on the engagement.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-[14px]">2</div>
              <p className="text-[16px] leading-relaxed text-neutral-300 pt-1">Forward the TireShop questions to their team so the integration starts on day one.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-[14px]">3</div>
              <p className="text-[16px] leading-relaxed text-neutral-300 pt-1">Request the product image packs from your manufacturers.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-[13px] text-neutral-500">Prepared by JP Porter, Vory</p>
          </div>
        </div>
      </section>

    </div>
  );
}