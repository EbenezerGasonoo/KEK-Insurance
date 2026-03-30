"use client";

import { motion } from "framer-motion";

const services = [
  { title: "Accident (General) Insurance", hint: "Cover designed for everyday risks." },
  { title: "Motor Insurance", hint: "Support for vehicles and motor fleets." },
  { title: "Construction Risk Management", hint: "Structured risk mitigation for projects." },
  { title: "Claims Consulting", hint: "Pre- and post-loss guidance for clarity." },
  { title: "Life Assurance", hint: "Long-term protection with confidence." },
  { title: "General Business", hint: "Business coverage options for continuity." }
];

export function LandingServices() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl font-semibold text-[#111789]"
      >
        Our Services
      </motion.h2>
      <p className="mt-2 text-sm text-[#111789]/70 max-w-2xl">
        Insurance broking services shaped for expertise, integrity, and reliable claims outcomes.
      </p>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.03 }}
            className="rounded-3xl border border-black/5 bg-white overflow-hidden"
          >
            <div className="p-5">
              <div className="text-sm text-[#111789]/60">KEK Insurance Brokers</div>
              <div className="mt-1 font-semibold text-[#111789]">{s.title}</div>
              <div className="mt-2 text-sm text-[#111789]/70">{s.hint}</div>
            </div>
            <div className="h-1 bg-gradient-to-r from-[#111789] via-[#111789] to-[#D4AF37]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

