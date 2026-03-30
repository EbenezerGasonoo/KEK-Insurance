"use client";

import { motion } from "framer-motion";

export function NotificationMockups() {
  const cards = [
    {
      title: "Policy Renewal Alerts",
      body: "Automated WhatsApp reminders before expiry, with a one-tap renewal CTA."
    },
    {
      title: "Digital PDF Delivery",
      body: "Instant confirmation when documents are generated and securely delivered."
    },
    {
      title: "Claim Status Updates",
      body: "Milestone-based push notifications synced to the client portal timeline."
    }
  ];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-[#111789]">Notification Engine (UI demo)</h2>
      <p className="text-sm text-[#111789]/70 mt-1">Mockups for automated WhatsApp triggers.</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-black/5 overflow-hidden bg-white"
          >
            <div className="bg-[#111789] text-white p-4">
              <div className="font-semibold">{c.title}</div>
              <div className="text-white/80 text-xs mt-1">WhatsApp trigger</div>
            </div>
            <div className="p-4 text-sm text-[#111789]/70">{c.body}</div>
            <div className="px-4 pb-4">
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/15 px-3 py-1 text-xs text-[#111789]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                Demo template
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

