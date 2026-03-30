"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LandingClaimTimelineMini } from "./LandingClaimTimelineMini";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden min-h-[86vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=70)"
        }}
      />
      <div className="absolute inset-0 bg-[#111789]/92" />

      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-14">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2">
                <Image src="/e-icon.svg" alt="e icon" width={22} height={22} />
                <span className="text-xs text-white/85 font-semibold">KEK Group Enterprise Digital Ecosystem</span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
                KEK: DIGITALLY ADVANCED INSURANCE BROKERAGE IN AFRICA
              </h1>

              <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl">
                Integrated Design, Intelligent Automation, and Advanced Analytics for Your Protection.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="#quote"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#D4AF37] text-[#111789] font-semibold hover:brightness-105 transition"
                >
                  GET A QUOTE
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition"
                >
                  Track Your Claim
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[#D4AF37] font-semibold">Premium</div>
                  <div className="text-white/80 text-sm mt-1">Design language</div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[#D4AF37] font-semibold">AI</div>
                  <div className="text-white/80 text-sm mt-1">Virtual Broker</div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[#D4AF37] font-semibold">Live</div>
                  <div className="text-white/80 text-sm mt-1">Claims transparency</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[560px] lg:h-[620px]">
            {/* Desktop mock */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute left-0 top-8 w-[760px] max-w-full"
            >
              <div className="relative rounded-[28px] bg-[#0e0e0e]/60 border border-white/20 shadow-2xl overflow-hidden">
                <div className="bg-white/95 text-[#111789] px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="/kek-logo.svg" alt="KEK Group" width={120} height={30} />
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {["HOME", "SME", "CORPORATE", "CLAIMS"].map((x) => (
                      <span key={x} className="opacity-70">
                        {x}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111789] text-white px-7 py-8 relative min-h-[450px]">
                  <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-[#D4AF37]/15 blur-2xl" />
                  <div className="text-[34px] font-semibold leading-tight max-w-[66%]">
                    KEK: DIGITALLY ADVANCED
                    <br />
                    INSURANCE BROKERAGE
                    <br />
                    IN AFRICA
                  </div>
                  <div className="mt-3 text-white/80 text-sm max-w-[58%]">
                    Integrated Design, Intelligent Automation, Advanced Analytics.
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="inline-flex items-center justify-center rounded-full px-5 py-2 bg-[#D4AF37] text-[#111789] font-semibold">
                      GET A QUOTE
                    </div>
                    <div className="text-xs text-white/70">Track your claim</div>
                  </div>

                  {/* Broker preview */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.06 }}
                    className="absolute right-6 top-24 w-[260px] rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#D4AF37] text-[#111789] font-bold">
                          e
                        </span>
                        <div className="text-xs font-semibold">KEK Virtual Broker</div>
                      </div>
                      <div className="text-[10px] text-white/70">AI</div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="bg-[#111789]/70 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/90">
                        Hi! What are you insuring today?
                      </div>
                      <div className="bg-white/90 rounded-xl px-3 py-2 text-[11px] text-[#111789]">
                        Track your claim
                      </div>
                    </div>
                  </motion.div>

                  <div className="absolute left-6 right-6 bottom-5 rounded-2xl bg-white/95 text-[#111789] border border-black/10 p-4">
                    <div className="text-sm font-semibold">Track Your Claim</div>
                    <div className="mt-2">
                      <LandingClaimTimelineMini currentIndex={1} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto mt-2 h-4 w-40 rounded-b-2xl bg-white/70 border border-white/40" />
              <div className="mx-auto h-6 w-[70%] rounded-[999px] bg-black/30 backdrop-blur" />
            </motion.div>

            {/* Mobile mock */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="absolute -right-1 top-8 w-[250px] max-w-[44%] rotate-[6deg]"
            >
              <div className="rounded-[30px] bg-white/90 border border-black/5 shadow-2xl overflow-hidden">
                <div className="bg-white px-4 py-3 text-[#111789] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="/e-icon.svg" alt="e icon" width={18} height={18} />
                    <span className="text-xs font-semibold">KEK</span>
                  </div>
                  <span className="text-[12px] font-semibold">≡</span>
                </div>
                <div className="bg-[#111789] text-white px-4 py-4">
                  <div className="text-[11px] text-white/70">GET A SME QUOTE</div>
                  <div className="text-lg font-semibold leading-tight mt-1">(3 STEPS)</div>
                  <div className="mt-3 flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`w-10 h-2 rounded-full ${
                          i === 0 ? "bg-[#D4AF37]" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-4 bg-white/10 border border-white/15 rounded-2xl p-3 text-xs text-white/85">
                    Quick qualification + Continue on WhatsApp.
                  </div>
                </div>
                <div className="px-4 py-3 bg-white">
                  <Link
                    href="#quote"
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#D4AF37] text-[#111789] font-semibold py-2"
                  >
                    GET QUICK SME
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

