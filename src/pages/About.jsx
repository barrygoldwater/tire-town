import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Flag, GraduationCap, Building2, Handshake, HardHat, Wrench, Phone } from "lucide-react";

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-[#0a0a0a] py-24 text-center px-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8102e] mb-5">
        About Us
      </p>
      <h1 className="text-[40px] sm:text-[56px] font-extrabold tracking-[-0.025em] leading-[1.05] max-w-3xl mx-auto">
        <span className="text-white">Built On A Specialty.</span>
        <br />
        <span className="text-[#c8102e]">Backed By Half A Century.</span>
      </h1>
      <p className="mt-6 text-[17px] sm:text-[18px] text-white/70 max-w-[720px] mx-auto leading-relaxed">
        Affordable Turf &amp; Specialty Tire has been the source for hard-to-find wheels and tires since 1976. Family-owned, dealer-focused, and stocked deep across every category our customers operate in.
      </p>
    </section>
  );
}

// ── Story Section ────────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section className="bg-white py-24 px-5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-start">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            Our Story
          </p>
          <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-[#0a0a0a] leading-[1.08] mb-6">
            Fifty Years In Specialty Rubber
          </h2>
          <div className="space-y-5 text-[17px] leading-[1.65] text-[#525252]">
            <p>
              We started in 1976 with a simple bet: that the people who keep golf courses, school districts, and industrial sites running deserve a tire supplier who actually carries what they need. Five decades later, that bet still holds.
            </p>
            <p>
              The market shifted, the equipment got more specialized, and the brands consolidated — but the gap between what specialty operators need and what mass distributors stock has only gotten wider. Affordable was built to live in that gap. We carry the obscure sizes, the hard-to-find finishes, the load ratings most retailers won't touch, and we ship them out of two domestic warehouses fast enough to keep your equipment in service.
            </p>
            <p>
              We're family-owned, we answer the phone when you call, and we still write our own catalog.
            </p>
          </div>
        </div>
        <div
          className="w-full rounded-[4px] bg-[#f4f4f3]"
          style={{ aspectRatio: "4/5" }}
        />
      </div>
    </section>
  );
}

// ── Markets Served ───────────────────────────────────────────────────────────
const MARKETS = [
  {
    icon: Flag,
    label: "Golf Courses",
    desc: "Tournament-grade tires and wheels for fleets of every size.",
  },
  {
    icon: GraduationCap,
    label: "School Districts & Universities",
    desc: "Grounds equipment, athletic field maintenance, transit and utility carts.",
  },
  {
    icon: Building2,
    label: "Hotels & Resorts",
    desc: "Guest cart fleets, landscape equipment, beach and trail vehicles.",
  },
  {
    icon: Handshake,
    label: "Equipment Dealers",
    desc: "Wholesale pricing, Net 30 terms with approved credit, same-day quotes.",
  },
  {
    icon: HardHat,
    label: "Industrial & Agricultural",
    desc: "Skid steer, forklift, and ag-tire applications most distributors won't carry.",
  },
  {
    icon: Wrench,
    label: "Independent Operators",
    desc: "Anyone running specialty equipment who's tired of \"we can order that for you.\"",
  },
];

function MarketsServed() {
  return (
    <section className="bg-[#fafaf9] py-24 px-5">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4 text-center">
          Who We Serve
        </p>
        <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-[#0a0a0a] text-center mb-12">
          Specialty Operators, Specialty Inventory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETS.map((m) => (
            <div
              key={m.label}
              className="bg-white border border-[#e5e5e3] rounded-[4px] p-8 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
            >
              <m.icon className="w-6 h-6 text-primary mb-4" />
              <p className="text-[16px] font-bold uppercase tracking-[0.04em] text-[#0a0a0a] mb-2">
                {m.label}
              </p>
              <p className="text-[14px] text-[#525252] leading-[1.5]">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Brand Partners ───────────────────────────────────────────────────────────
const BRAND_ROWS = [
  ["EXCEL", "ACHIEVA", "ARISUN", "ITP"],
  ["WANDA", "INNOVA", "CARLISLE", "GALAXY"],
  ["GARDEN PRO", "WHEEL MATE", "GREENBALL", "DEESTONE"],
  ["AMERICANA", "", "", ""],
];

function BrandPartners() {
  return (
    <section className="bg-white py-24 px-5">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4 text-center">
          Our Brands
        </p>
        <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-[#0a0a0a] text-center mb-4">
          Authorized Distribution. Real Inventory.
        </h2>
        <p className="text-[17px] text-[#525252] max-w-[720px] mx-auto text-center leading-relaxed mb-12">
          We're an authorized distributor for the brands that built this category. Excel, Achieva, Arisun, ITP, Wanda, Innova, Carlisle, Galaxy, Garden Pro, Wheel Mate, Greenball, Deestone, and Americana — stocked across our Glendale and Greenville warehouses, ready to pull and ship.
        </p>
        <div className="border border-[#e5e5e3] rounded-[4px] overflow-hidden">
          {BRAND_ROWS.map((row, ri) => (
            <div key={ri} className="grid grid-cols-4 border-b border-[#e5e5e3] last:border-b-0">
              {row.map((brand, ci) => (
                <div
                  key={ci}
                  className={`py-6 px-3 text-center text-[16px] font-bold tracking-[0.04em] transition-colors ${
                    brand
                      ? "text-[#525252] hover:text-[#0a0a0a] cursor-default"
                      : ""
                  } ${ci < 3 ? "border-r border-[#e5e5e3]" : ""}`}
                >
                  {brand}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Locations Block ──────────────────────────────────────────────────────────
function LocationsBlock() {
  return (
    <section className="bg-[#fafaf9] py-24 px-5">
      <div className="max-w-[900px] mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4 text-center">
          Two Warehouses
        </p>
        <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-[#0a0a0a] text-center mb-12">
          Coast-To-Coast Coverage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              region: "WEST",
              city: "Glendale, Arizona",
              address: ["7880 N. Glen Harbor Blvd.", "Glendale, AZ 85307"],
              coverage: "1-day shipping to Arizona, Nevada, California, New Mexico, and Utah.",
            },
            {
              region: "EAST",
              city: "Greenville, South Carolina",
              address: ["[Address TBD — to be confirmed]", "Greenville, SC"],
              coverage: "1-day shipping across the Carolinas, Georgia, Tennessee, and Virginia.",
            },
          ].map((loc) => (
            <div key={loc.region} className="bg-white border border-[#e5e5e3] rounded-[4px] p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c8102e] mb-2">
                {loc.region}
              </p>
              <h3 className="text-[24px] font-extrabold text-[#0a0a0a] mb-4">{loc.city}</h3>
              <div className="text-[16px] text-[#525252] space-y-0.5">
                {loc.address.map((line) => <p key={line}>{line}</p>)}
              </div>
              <hr className="border-[#e5e5e3] my-5" />
              <p className="text-[15px] text-[#525252] leading-relaxed">{loc.coverage}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-[#737373] italic text-center">
          Combined inventory ships same-day on orders placed before 2 PM local time.
        </p>
      </div>
    </section>
  );
}

// ── Team Section ─────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "John Gregory",
    title: "GOLF & ATV SALES",
    phone: "619-954-0034",
    bio: "Twenty-plus years in specialty tire distribution. John handles golf cart fleets, ATV and UTV programs, and dealer accounts west of the Mississippi.",
  },
  {
    name: "Joe Landis",
    title: "TURF & GOLF SALES",
    phone: "623-258-8277",
    bio: "Joe leads turf programs for golf courses, school districts, and grounds maintenance contractors. Specializes in matching tread patterns to course conditions.",
  },
];

function TeamSection() {
  return (
    <section className="bg-white py-24 px-5">
      <div className="max-w-[800px] mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-4 text-center">
          Your Reps
        </p>
        <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-[#0a0a0a] text-center mb-12">
          Talk To A Human
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {TEAM.map((person) => (
            <div
              key={person.name}
              className="bg-white border border-[#e5e5e3] rounded-[4px] p-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#f4f4f3] mb-5" />
              <p className="text-[20px] font-extrabold text-[#0a0a0a]">{person.name}</p>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#c8102e] mt-1 mb-3">
                {person.title}
              </p>
              <a
                href={`tel:${person.phone}`}
                className="flex items-center gap-2 text-[16px] font-semibold text-primary hover:text-primary/80 transition-colors mb-4"
              >
                <Phone className="w-4 h-4" />
                {person.phone}
              </a>
              <p className="text-[14px] text-[#525252] leading-[1.6]">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA ──────────────────────────────────────────────────────────────
function ClosingCTA() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-5 text-center">
      <h2 className="text-[32px] sm:text-[40px] font-extrabold text-white tracking-[-0.02em] mb-5">
        Ready to put us to work?
      </h2>
      <p className="text-[17px] text-white/70 max-w-[600px] mx-auto mb-10 leading-relaxed">
        Wholesale pricing, Net 30 terms, free tire and wheel mounting, and the deepest specialty inventory in the country.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="/#contact"
          className="bg-[#c8102e] text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-7 py-3.5 rounded-[2px] hover:bg-[#a00d24] transition-colors whitespace-nowrap"
        >
          Request a Quote
        </a>
        <a
          href="tel:619-954-0034"
          className="border border-white text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-7 py-3.5 rounded-[2px] hover:bg-white hover:text-[#0a0a0a] transition-colors whitespace-nowrap"
        >
          Call 619-954-0034
        </a>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div>
      <Header />
      <Hero />
      <StorySection />
      <MarketsServed />
      <BrandPartners />
      <LocationsBlock />
      <TeamSection />
      <ClosingCTA />
      <Footer />
    </div>
  );
}