"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export function LandingClaimsAnchor() {
  const stages = useMemo(
    () => [
      { key: "filed", label: "Claim Filed" },
      { key: "assigned", label: "Adjuster Assigned" },
      { key: "inspection", label: "Inspection" },
      { key: "paymentApproval", label: "Payment Approval" }
    ],
    []
  );

  const [activeStage, setActiveStage] = useState(0);
  const [phone, setPhone] = useState("");

  const message = useMemo(() => {
    const stageLabel = stages[activeStage]?.label ?? stages[0].label;
    const extra = "Please share the next milestone and what I should prepare.";
    return `Hi KEK, I’d like a claim status update.\n\nCurrent stage: ${stageLabel}.\n${extra}`;
  }, [activeStage, stages]);

  const waUrl = useMemo(() => {
    const dest = phone.trim() ? phone.trim() : "233201234567";
    return `https://wa.me/${dest}?text=${encodeURIComponent(message)}`;
  }, [message, phone]);

  return (
    <section id="claims" className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid xl:grid-cols-[1.05fr_1.95fr] gap-8 items-start">
        <div className="xl:sticky xl:top-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-[#111789]/60">Claims</div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-[#111789]">Track Your Claim</h2>
            <p className="mt-3 text-sm text-[#111789]/70">
              A 4-stage journey designed for clarity. Choose a milestone and preview how we would notify you via WhatsApp.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row xl:flex-col gap-3">
              <Link
                href="/portal"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#111789] text-white font-semibold hover:brightness-110 transition"
              >
                Open Real-Time Tracker
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#25D366] text-white font-semibold hover:brightness-105 transition"
              >
                WhatsApp Update (demo)
              </a>
            </div>
          </motion.div>
        </div>

        <div className="min-w-0">
          <div className="rounded-3xl border border-black/5 overflow-hidden bg-white shadow-sm">
            <div className="relative h-44 sm:h-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=70"
                alt="Claims support"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111789]/92 via-[#111789]/75 to-transparent" />
              <div className="absolute inset-0 flex items-end p-5">
                <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3 backdrop-blur">
                  <div className="text-xs text-white/80">Milestone timeline</div>
                  <div className="text-white font-semibold">{stages[activeStage]?.label}</div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid lg:grid-cols-[1.05fr_1fr] gap-4 xl:gap-5">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-[#111789]">4 stages</div>
                    <div className="text-xs text-[#111789]/60">Select a stage to preview</div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {stages.map((s, i) => {
                      const done = i <= activeStage;
                      return (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => setActiveStage(i)}
                          className={`w-full text-left rounded-2xl border px-4 py-3 transition ${
                            i === activeStage
                              ? "border-[#D4AF37] bg-[#D4AF37]/15"
                              : done
                              ? "border-[#111789]/15 bg-[#111789]/5"
                              : "border-black/10 bg-white hover:bg-black/[0.02]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-semibold text-[#111789] text-sm">{s.label}</div>
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-semibold ${
                                i === activeStage
                                  ? "bg-[#D4AF37] text-[#111789] border-[#D4AF37]"
                                  : done
                                  ? "bg-[#111789] text-white border-[#111789]"
                                  : "bg-white text-[#111789]/70 border-black/10"
                              }`}
                            >
                              {i + 1}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 h-2 rounded-full bg-black/5 overflow-hidden">
                    <div
                      className="h-full bg-[#D4AF37] transition-all"
                      style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-[#25D366]/25 bg-gradient-to-br from-[#25D366]/10 via-white to-[#111789]/[0.03] p-4 h-fit">
                  <div className="text-sm font-semibold text-[#111789]">WhatsApp notification preview</div>
                  <div className="mt-2 text-sm text-[#111789]/70">
                    We would send a milestone update and next steps to the contact you provide (demo link).
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs text-[#111789]/70 font-semibold">Your WhatsApp number</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 233201234567"
                      inputMode="tel"
                      className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 bg-white"
                    />
                  </div>

                  <div className="mt-4 rounded-2xl bg-white border border-black/5 p-3">
                    <div className="text-xs font-semibold text-[#111789]/60">Message</div>
                    <div className="mt-1 text-xs text-[#111789]/80 whitespace-pre-line">{message}</div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl px-4 py-3 bg-[#25D366] text-white font-semibold hover:brightness-105 transition sm:flex-1"
                    >
                      Send via WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setPhone("")}
                      className="inline-flex items-center justify-center rounded-2xl px-4 py-3 bg-white border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition sm:flex-1"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

