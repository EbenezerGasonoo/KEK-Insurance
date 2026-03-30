"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { LandingClaimTimelineMini } from "./LandingClaimTimelineMini";

const HERO_SLIDE_MS = 8000;

const heroBackgroundSlides = [
  {
    src: "https://plus.unsplash.com/premium_photo-1661675606409-61ab79f53d9b?auto=format&fit=crop&w=1920&q=80",
    alt: "Portrait of happy African American family outdoors"
  },
  {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80",
    alt: "Insurance advisor reviewing coverage and documents"
  },
  {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80",
    alt: "Business partners handshake — trust and partnership"
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
    alt: "Team planning strategy and risk management"
  }
] as const;

function HeroBackgroundSlider({
  active,
  setActive
}: {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}) {
  const reduceMotion = useReducedMotion();
  const len = heroBackgroundSlides.length;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % len);
    }, HERO_SLIDE_MS);
    return () => window.clearInterval(id);
  }, [len, reduceMotion, setActive]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      {heroBackgroundSlides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            opacity: i === active ? 1 : 0,
            zIndex: i === active ? 1 : 0
          }}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center scale-[1.02]"
          />
        </div>
      ))}
    </div>
  );
}

function HeroSliderDots({
  active,
  onSelect
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  const len = heroBackgroundSlides.length;
  return (
    <div
      className="pointer-events-none absolute bottom-5 left-0 right-0 z-40 flex justify-center gap-2 sm:bottom-7"
      role="tablist"
      aria-label="Hero background slides"
    >
      {heroBackgroundSlides.map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Slide ${i + 1} of ${len}`}
          tabIndex={i === active ? 0 : -1}
          className="pointer-events-auto h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d52]"
          style={{
            width: i === active ? 28 : 8,
            backgroundColor: i === active ? "rgba(212, 175, 55, 0.95)" : "rgba(255,255,255,0.38)"
          }}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}

export function LandingHero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const goSlide = useCallback((index: number) => {
    setSlideIndex(((index % heroBackgroundSlides.length) + heroBackgroundSlides.length) % heroBackgroundSlides.length);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[88vh] sm:min-h-[90vh]">
      <HeroBackgroundSlider active={slideIndex} setActive={setSlideIndex} />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#111789]/88 via-[#111789]/90 to-[#0a0d52]/95" />

      <HeroSliderDots active={slideIndex} onSelect={goSlide} />

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-center">
          <div className="max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.22em] text-[#D4AF37]/95 font-semibold">
                KEK Group · Digital ecosystem
              </p>

              <div className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/15 px-4 py-2.5 shadow-sm backdrop-blur-sm">
                <Image src="/e-icon.svg" alt="" width={22} height={22} />
                <span className="text-[11px] sm:text-xs text-white/90 font-medium tracking-wide">
                  Enterprise Insurance Platform
                </span>
              </div>

              <h1 className="mt-6 sm:mt-7 font-display text-[1.75rem] leading-[1.12] sm:text-[2.125rem] sm:leading-[1.1] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem] font-semibold tracking-[-0.02em] text-white">
                Digitally advanced insurance brokerage in Africa
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-[1.65] text-white/90 max-w-[30rem] font-body">
                Integrated design, intelligent automation, and advanced analytics—built around your protection and peace of
                mind.
              </p>

              <div className="mt-8 sm:mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="#quote"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 bg-[#D4AF37] text-[#111789] text-sm font-semibold tracking-wide shadow-md shadow-black/10 hover:brightness-105 transition"
                >
                  Get a quote
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 bg-white/10 border border-white/25 text-white text-sm font-semibold tracking-wide hover:bg-white/15 transition"
                >
                  Track your claim
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "Premium", desc: "Design language" },
                  { title: "AI", desc: "Virtual Broker" },
                  { title: "Live", desc: "Claims transparency" }
                ].map((x) => (
                  <div
                    key={x.title}
                    className="rounded-2xl bg-white/5 border border-white/12 px-4 py-3.5 backdrop-blur-[2px]"
                  >
                    <div className="text-[#D4AF37] font-semibold text-sm tracking-wide">{x.title}</div>
                    <div className="text-white/80 text-sm mt-1 leading-snug">{x.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="relative h-[520px] sm:h-[560px] lg:h-[620px] min-h-[320px]">
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
                  <div className="font-display text-[clamp(1.25rem,2.5vw,2rem)] font-semibold leading-tight max-w-[66%]">
                    KEK: DIGITALLY ADVANCED
                    <br />
                    INSURANCE BROKERAGE
                    <br />
                    IN AFRICA
                  </div>
                  <div className="mt-3 text-white/80 text-sm max-w-[58%] leading-relaxed">
                    Integrated Design, Intelligent Automation, Advanced Analytics.
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="inline-flex items-center justify-center rounded-full px-5 py-2 bg-[#D4AF37] text-[#111789] font-semibold text-sm">
                      GET A QUOTE
                    </div>
                    <div className="text-xs text-white/70">Track your claim</div>
                  </div>

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

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="absolute -right-1 top-8 w-[250px] max-w-[44%] rotate-[6deg]"
            >
              <div className="rounded-[30px] bg-white/90 border border-black/5 shadow-2xl overflow-hidden">
                <div className="bg-white px-4 py-3 text-[#111789] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="/e-icon.svg" alt="" width={18} height={18} />
                    <span className="text-xs font-semibold">KEK</span>
                  </div>
                  <span className="text-[12px] font-semibold">≡</span>
                </div>
                <div className="bg-[#111789] text-white px-4 py-4">
                  <div className="text-[11px] text-white/70 tracking-wide uppercase">Get a SME quote</div>
                  <div className="text-lg font-semibold leading-tight mt-1 font-display">3 steps</div>
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
                  <div className="mt-4 bg-white/10 border border-white/15 rounded-2xl p-3 text-xs text-white/85 leading-relaxed">
                    Quick qualification + Continue on WhatsApp.
                  </div>
                </div>
                <div className="px-4 py-3 bg-white">
                  <Link
                    href="#quote"
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#D4AF37] text-[#111789] font-semibold py-2.5 text-sm"
                  >
                    Get quick SME quote
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
