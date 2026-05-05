import { useState } from "react";
import { Phone, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

export default function ContactSection({ quoteFormRef }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const body = `
      <h2>New Quote Request from AffordableTires.com</h2>
      <p><strong>Name:</strong> ${form.name}</p>
      <p><strong>Email:</strong> ${form.email}</p>
      <p><strong>Phone:</strong> ${form.phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${form.message}</p>
    `;

    await base44.integrations.Core.SendEmail({
      to: "john@affordabletiresusa.com",
      subject: `Quote Request from ${form.name}`,
      body,
      from_name: "Affordable Tires Website"
    });

    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" ref={quoteFormRef} className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a]">
              GET IN TOUCH
            </h2>
            <p className="mt-3 text-muted-foreground">
              Call us directly or fill out the form. We respond to every inquiry same day.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Sales</p>
                <p className="text-lg font-bold text-[#0a0a0a] mt-1">John Gregory</p>
                <a href="tel:619-954-0034" className="flex items-center gap-2 text-primary font-semibold mt-1 hover:underline">
                  <Phone className="w-4 h-4" />
                  619-954-0034
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Turf / Golf</p>
                <p className="text-lg font-bold text-[#0a0a0a] mt-1">Joe Landis</p>
                <a href="tel:623-258-8277" className="flex items-center gap-2 text-primary font-semibold mt-1 hover:underline">
                  <Phone className="w-4 h-4" />
                  623-258-8277
                </a>
              </div>
            </div>
          </div>

          {/* Quote form */}
          <div>
            <h3 className="text-xl font-extrabold uppercase tracking-[-0.02em] text-[#0a0a0a]">
              REQUEST A QUOTE
            </h3>
            {sent ? (
              <div className="mt-6 p-6 bg-[#f5f5f4] rounded-[4px] border border-border">
                <p className="font-bold text-[#0a0a0a]">Quote request sent</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you within the same business day.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary hover:underline"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-[4px] h-11"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="rounded-[4px] h-11"
                />
                <Input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-[4px] h-11"
                />
                <Textarea
                  placeholder="What products are you interested in? Include sizes, quantities, etc."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="rounded-[4px] resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white text-[13px] font-semibold uppercase tracking-[0.08em] px-5 py-3 rounded-[4px] hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "SENDING..." : "SEND REQUEST"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}