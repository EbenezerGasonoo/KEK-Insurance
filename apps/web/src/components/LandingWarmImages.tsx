"use client";

import { motion } from "framer-motion";

const tiles = [
  {
    title: "Real-time transparency",
    body: "A clear claims journey with milestone updates designed to reduce uncertainty.",
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Seamless communication",
    body: "From the quote funnel to WhatsApp handoff, every step stays connected.",
    img: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=70"
  },
  {
    title: "Fast onboarding",
    body: "SME qualification designed to get results in under 2 minutes (demo).",
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=70"
  }
];

export function LandingWarmImages() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiles.map((t, idx) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="rounded-3xl overflow-hidden border border-black/5 bg-white shadow-sm"
          >
            <div className="h-40 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.img} alt={t.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>
            <div className="p-5">
              <div className="text-sm text-[#111789]/60">KEK</div>
              <div className="mt-1 font-semibold text-[#111789]">{t.title}</div>
              <div className="mt-2 text-sm text-[#111789]/70">{t.body}</div>
              <div className="mt-4 h-1 bg-gradient-to-r from-[#111789] via-[#111789] to-[#D4AF37]" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

