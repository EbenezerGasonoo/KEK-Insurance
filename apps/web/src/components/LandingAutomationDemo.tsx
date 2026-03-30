"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type TriggerKey = "renewal" | "pdf" | "claim";

const triggers: {
  key: TriggerKey;
  title: string;
  subtitle: string;
  template: string;
}[] = [
  {
    key: "renewal",
    title: "Policy Renewal Alerts",
    subtitle: "Automated WhatsApp reminders before expiry (demo).",
    template: "Hi KEK, your policy renewal is coming up soon. Reply to confirm/renew (demo)."
  },
  {
    key: "pdf",
    title: "Digital PDF Delivery",
    subtitle: "Instant delivery confirmation for generated documents (demo).",
    template: "Hi KEK, your requested document is ready as a secure PDF (demo)."
  },
  {
    key: "claim",
    title: "Claim Status Updates",
    subtitle: "Milestone-based updates synced to your portal (demo).",
    template: "Hi KEK, your claim status has moved to the next milestone (demo)."
  }
];

export function LandingAutomationDemo() {
  const [active, setActive] = useState<TriggerKey>("renewal");
  const [phone, setPhone] = useState("");
  const [lastSent, setLastSent] = useState<string | null>(null);

  const trigger = useMemo(() => triggers.find((t) => t.key === active)!, [active]);

  const waUrl = useMemo(() => {
    const dest = phone.trim() ? phone.trim() : "233201234567";
    return `https://wa.me/${dest}?text=${encodeURIComponent(trigger.template)}`;
  }, [phone, trigger.template]);

  return (
    <section id="automations" className="max-w-6xl mx-auto px-4 py-14">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl font-semibold text-[#111789]"
      >
        AI + Automation Demo
      </motion.h2>
      <p className="mt-2 text-sm text-[#111789]/70 max-w-2xl">
        See how KEK can automatically trigger WhatsApp updates, document delivery, and claims transparency (demo UI).
      </p>

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 rounded-3xl border border-black/5 bg-white overflow-hidden shadow-sm">
          <div className="p-5 bg-[#111789] text-white">
            <div className="text-sm text-white/80">Automation trigger</div>
            <div className="mt-1 text-xl font-semibold">{trigger.title}</div>
            <div className="mt-2 text-sm text-white/80">{trigger.subtitle}</div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {triggers.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`text-left rounded-2xl border p-4 transition ${
                    t.key === active ? "border-[#D4AF37] bg-[#D4AF37]/15" : "border-black/10 bg-white hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="text-sm font-semibold text-[#111789]">{t.title}</div>
                  <div className="mt-1 text-xs text-[#111789]/70">{t.subtitle}</div>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111789]/70">WhatsApp number (demo)</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 233201234567"
                  inputMode="tel"
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 bg-white"
                />
              </div>

              <div className="rounded-2xl border border-black/5 bg-[#111789]/[0.03] p-4">
                <div className="text-xs font-semibold text-[#111789]/70">Message preview</div>
                <div className="mt-2 text-xs text-[#111789]/80 whitespace-pre-line">{trigger.template}</div>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#D4AF37] text-[#111789] font-semibold hover:brightness-105 transition"
              >
                Send via WhatsApp (demo)
              </a>
              <button
                type="button"
                onClick={() => setLastSent(`Simulated: ${trigger.title}`)}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-white border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition"
              >
                Simulate (portal update)
              </button>
            </div>

            {lastSent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-3 text-sm text-[#111789]"
              >
                {lastSent}
              </motion.div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-[#111789]">Automation pillars</div>
          <div className="mt-3 space-y-3">
            {[
              { k: "01", t: "Real-time transparency", b: "Milestones and status changes are visible instantly (demo UI)." },
              { k: "02", t: "Seamless communication", b: "WhatsApp handoffs keep customers in sync and reduce drop-off." },
              { k: "03", t: "Frictionless documents", b: "Digital PDFs delivered quickly with confirmation messaging." }
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-black/5 p-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#111789] text-white flex items-center justify-center text-xs font-bold">
                    {x.k}
                  </div>
                  <div className="font-semibold text-[#111789]">{x.t}</div>
                </div>
                <div className="mt-2 text-sm text-[#111789]/70">{x.b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

