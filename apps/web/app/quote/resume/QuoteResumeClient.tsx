"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { kekFetch } from "@/lib/api";
import { useSession } from "next-auth/react";

type QuoteSession = {
  token: string;
  tenantSlug: string;
  phone?: string | null;
  quoteData: {
    businessType?: string;
    employeeCount?: number;
    annualRevenue?: number;
  };
  status: string;
};

export default function QuoteResumeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<QuoteSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resumeWhatsAppUrl = useMemo(() => {
    const phone = data?.phone ?? undefined;
    const text = `Hi KEK Virtual Broker 👋\n\nResume your quote session using this token:\n${token}\n\nReply YES to continue.`;
    if (!phone) return `https://wa.me/233201234567?text=${encodeURIComponent(text)}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }, [data?.phone, token]);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          if (!mounted) return;
          setError("Missing token");
          return;
        }
        const res = await kekFetch<QuoteSession>(`/api/quote-sessions/${encodeURIComponent(token)}`);
        if (!mounted) return;
        setData(res);
      } catch (e: unknown) {
        if (!mounted) return;
        const message = e instanceof Error ? e.message : "Failed to load quote session";
        setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-[#111789]/70 hover:text-[#111789] transition"
        >
          ← Back
        </button>

        <div className="mt-6 rounded-3xl border border-black/5 overflow-hidden">
          <div className="bg-[#111789] text-white p-6">
            <h1 className="text-2xl font-semibold">Resume Quote</h1>
            <p className="text-white/80 text-sm mt-1">Demo resume using your token.</p>
          </div>

          <div className="p-6">
            {loading && <div className="text-sm text-[#111789]/70">Loading…</div>}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
            )}

            {!loading && data && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-4">
                    <div className="text-xs text-[#111789]/70">Business Type</div>
                    <div className="font-semibold text-[#111789] mt-1">{data.quoteData.businessType}</div>
                  </div>
                  <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-4">
                    <div className="text-xs text-[#111789]/70">Employee Count</div>
                    <div className="font-semibold text-[#111789] mt-1">{data.quoteData.employeeCount ?? "-"}</div>
                  </div>
                  <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-4 sm:col-span-2">
                    <div className="text-xs text-[#111789]/70">Annual Revenue</div>
                    <div className="font-semibold text-[#111789] mt-1">
                      {data.quoteData.annualRevenue ? new Intl.NumberFormat().format(data.quoteData.annualRevenue) : "-"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={resumeWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#111789] text-white font-semibold hover:brightness-110 transition"
                  >
                    Continue on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => (session ? router.push("/portal") : router.push("/login"))}
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-white border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition"
                  >
                    {session ? "Open Client Portal" : "Login to continue"}
                  </button>
                </div>

                <div className="mt-4 text-xs text-[#111789]/60">
                  Token: <span className="font-mono">{data.token}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

