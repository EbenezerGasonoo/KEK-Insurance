"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { kekFetch } from "@/lib/api";
import { getTenantForRequest } from "@/lib/api";

type QuoteDraft = {
  businessType?: string;
  employeeCount?: number;
  annualRevenue?: number;
};

function formatMoney(n?: number) {
  if (!n && n !== 0) return "";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

export function QuoteFunnel() {
  const tenantSlug = getTenantForRequest();
  const [step, setStep] = useState(0);

  const [draft, setDraft] = useState<QuoteDraft>(() => ({
    businessType: "Retail/Wholesale",
    employeeCount: undefined,
    annualRevenue: undefined
  }));

  const [phone, setPhone] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [inactivityCTAVisible, setInactivityCTAVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const businessTypes = useMemo(
    () => ["Retail/Wholesale", "Construction", "Logistics", "Health Services", "Education", "Hospitality"],
    []
  );

  // Demo: after user pauses (no interaction for ~25s), show the WhatsApp resume CTA.
  useEffect(() => {
    let timeout: number | undefined;
    const onActivity = () => {
      setInactivityCTAVisible(false);
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setInactivityCTAVisible(true), 25000);
    };
    onActivity();
    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);
    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  async function createSessionAndGetWaLink(opts?: { force?: boolean }) {
    const force = opts?.force ?? false;
    if (!draft.businessType && !force) return;
    if (!draft.employeeCount && !force) return;
    if (!draft.annualRevenue && !force) return;

    setLoading(true);
    try {
      const res = await kekFetch<{
        token: string;
        resumeUrl: string;
        quoteData: QuoteDraft;
      }>("/api/quote-sessions", {
        method: "POST",
        body: JSON.stringify({
          tenantSlug,
          phone: phone.trim() ? phone.trim() : undefined,
          quoteData: draft
        })
      });
      setToken(res.token);
      setResumeUrl(res.resumeUrl);
    } finally {
      setLoading(false);
      setInactivityCTAVisible(false);
    }
  }

  return (
    <section className="relative">
      <div className="rounded-3xl bg-white border border-black/5 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-[#111789] text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold" id="quote">
                SME Quick Quote
              </h2>
              <p className="text-white/80 text-sm mt-1">Answer 3 questions in under 2 minutes.</p>
            </div>
            <div className="text-right text-xs">
              <div>Step {step + 1} of 3</div>
              <div className="mt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] mr-1" />
                <span className="inline-block w-2 h-2 rounded-full bg-white/30" />
                <span className="inline-block w-2 h-2 rounded-full bg-white/30 ml-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <label className="block text-sm font-medium text-[#111789]">Business Type</label>
                <select
                  value={draft.businessType}
                  onChange={(e) => setDraft((d) => ({ ...d, businessType: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 bg-white"
                >
                  {businessTypes.map((t) => (
                    <option key={t} value={t} className="text-black">
                      {t}
                    </option>
                  ))}
                </select>

                <motion.div
                  className="mt-4 rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="text-sm font-semibold text-[#111789] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    Premium Brand Expression
                  </div>
                  <p className="text-sm text-[#111789]/80 mt-1">
                    This is a demo estimate. Real coverage details are confirmed during underwriting.
                  </p>
                </motion.div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-2xl bg-[#111789] text-white py-3 font-semibold hover:brightness-110 transition"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <label className="block text-sm font-medium text-[#111789]">
                  Employee Count <span className="text-[#111789]/60">(approx.)</span>
                </label>
                <input
                  inputMode="numeric"
                  value={draft.employeeCount ?? ""}
                  onChange={(e) => {
                    const v = e.target.value ? Number(e.target.value) : undefined;
                    setDraft((d) => ({ ...d, employeeCount: v }));
                  }}
                  placeholder="e.g. 12"
                  className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 bg-white"
                />
                <div className="mt-2 text-xs text-[#111789]/60">For demo we just simulate qualification.</div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 rounded-2xl border border-black/10 bg-white py-3 font-semibold hover:bg-black/[0.03] transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!draft.employeeCount}
                    className="flex-1 rounded-2xl bg-[#111789] text-white py-3 font-semibold hover:brightness-110 transition disabled:opacity-40"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <label className="block text-sm font-medium text-[#111789]">Annual Revenue</label>
                <input
                  inputMode="numeric"
                  value={draft.annualRevenue ?? ""}
                  onChange={(e) => {
                    const v = e.target.value ? Number(e.target.value) : undefined;
                    setDraft((d) => ({ ...d, annualRevenue: v }));
                  }}
                  placeholder="e.g. 500000"
                  className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 bg-white"
                />
                <div className="mt-2 text-xs text-[#111789]/60">
                  Preview: {formatMoney(draft.annualRevenue)}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#111789]">
                    WhatsApp number <span className="text-[#111789]/60">(optional)</span>
                  </label>
                  <input
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 233201234567"
                    className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 bg-white"
                  />
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-2xl border border-black/10 bg-white py-3 font-semibold hover:bg-black/[0.03] transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!draft.employeeCount || !draft.annualRevenue}
                    onClick={() => createSessionAndGetWaLink({ force: true })}
                    className="flex-1 rounded-2xl bg-[#D4AF37] text-[#111789] py-3 font-semibold hover:brightness-105 transition disabled:opacity-40"
                  >
                    {loading ? "Creating..." : "Continue on WhatsApp"}
                  </button>
                </div>

                <AnimatePresence>
                  {resumeUrl && (
                    <motion.div
                      key={resumeUrl}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 rounded-2xl border border-[#111789]/10 bg-[#111789]/5 p-4"
                    >
                      <div className="font-semibold text-[#111789]">Resume your quote</div>
                      <div className="text-sm text-[#111789]/80 mt-1">
                        Token: <span className="font-mono">{token}</span>
                      </div>
                      <div className="mt-3 flex gap-3 flex-wrap">
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl px-4 py-3 bg-[#111789] text-white font-semibold hover:brightness-110 transition"
                        >
                          Open WhatsApp
                        </a>
                        <a
                          href={`/quote/resume?token=${encodeURIComponent(token ?? "")}`}
                          className="inline-flex items-center justify-center rounded-2xl px-4 py-3 bg-white border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition"
                        >
                          Resume on web
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {inactivityCTAVisible && !resumeUrl && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="border-t border-black/5 bg-white/90 backdrop-blur px-5 py-3"
            >
              <button
                type="button"
                disabled={!draft.businessType || !draft.employeeCount || !draft.annualRevenue}
                onClick={() => createSessionAndGetWaLink({ force: false })}
                className="w-full rounded-2xl bg-[#D4AF37] text-[#111789] py-3 font-semibold hover:brightness-105 transition disabled:opacity-40"
              >
                Continue on WhatsApp
              </button>
              <div className="text-xs text-[#111789]/70 mt-1 text-center">
                Resume the quote where you left off.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

