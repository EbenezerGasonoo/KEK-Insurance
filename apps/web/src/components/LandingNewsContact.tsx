"use client";

import { motion } from "framer-motion";

export function LandingNewsContact() {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div id="news" className="rounded-3xl border border-black/5 bg-white overflow-hidden">
          <div className="bg-[#111789] text-white p-6">
            <div className="text-sm text-white/80">KEK</div>
            <h2 className="text-2xl font-semibold">News & Events</h2>
            <p className="text-white/80 text-sm mt-2">Demo section for announcements and updates.</p>
          </div>
          <div className="p-6 space-y-3">
            {["Compliance Policies", "Frequently Asked Questions", "Gallery"].map((x, i) => (
              <motion.div
                key={x}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="rounded-2xl border border-black/5 p-4"
              >
                <div className="font-semibold text-[#111789]">{x}</div>
                <div className="text-sm text-[#111789]/70 mt-1">Coming soon (demo)</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="contact" className="rounded-3xl border border-black/5 bg-white overflow-hidden">
          <div className="bg-white p-6">
            <h2 className="text-2xl font-semibold text-[#111789]">Contact Us</h2>
            <p className="text-sm text-[#111789]/70 mt-2">
              KEK Insurance Broking House — Accra-North (demo).
            </p>
          </div>
          <div className="p-6 space-y-3">
            <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-4">
              <div className="text-sm font-semibold text-[#111789]">Phone</div>
              <div className="text-sm text-[#111789]/70 mt-1">+233 (0) 302 764 023</div>
            </div>
            <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-4">
              <div className="text-sm font-semibold text-[#111789]">Email</div>
              <div className="text-sm text-[#111789]/70 mt-1">kek@kekgroup.net</div>
            </div>
            <div className="flex gap-3 flex-wrap pt-2">
              <a
                href="mailto:kek@kekgroup.net"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#D4AF37] text-[#111789] font-semibold hover:brightness-105 transition"
              >
                Send Email
              </a>
              <a
                href="https://wa.me/233201234567?text=Hi%20KEK%20I%20need%20help%20with%20insurance."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

