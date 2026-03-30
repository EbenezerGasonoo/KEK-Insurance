"use client";

import { motion } from "framer-motion";

export function LandingWhyKeK() {
  const items = [
    { title: "Market Leader", body: "Why KEK earns trust through expertise, integrity, and speed." },
    { title: "First Class Services", body: "Swift premiums and claims settlement with clarity." },
    { title: "Experience", body: "Service delivery built on operational discipline." },
    { title: "Partnerships", body: "Collaborating with clients and insurers to spread risk." }
  ];

  return (
    <section id="why-kek" className="max-w-6xl mx-auto px-4 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl font-semibold text-[#111789]"
      >
        Why KEK
      </motion.h2>
      <p className="mt-2 text-sm text-[#111789]/70 max-w-2xl">
        Premium brand expression, designed for real transparency and confidence—end-to-end.
      </p>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="rounded-3xl border border-black/5 bg-white overflow-hidden"
          >
            <div className="p-5 bg-white">
              <div className="text-sm text-[#111789]/60">KEK</div>
              <div className="mt-1 font-semibold text-[#111789]">{it.title}</div>
              <div className="mt-2 text-sm text-[#111789]/70">{it.body}</div>
            </div>
            <div className="h-1 bg-gradient-to-r from-[#111789] via-[#111789] to-[#D4AF37]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

