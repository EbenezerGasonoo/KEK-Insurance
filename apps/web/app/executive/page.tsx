"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { kekFetch } from "@/lib/api";

type AnalyticsResponse = {
  tenantSlug: string;
  kpis: {
    activePolicies: number;
    revenue: number;
    leadConversion: number;
  };
};

export default function ExecutiveAnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const role = session?.user?.role;
  const canAccess = status === "authenticated" && role === "admin";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && role !== "admin") router.push("/portal");
  }, [router, role, status]);

  useEffect(() => {
    if (!canAccess) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const r = await kekFetch<AnalyticsResponse>("/api/analytics");
        if (!cancelled) setData(r);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load analytics";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [canAccess]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-semibold text-[#111789]">Executive Analytics</h1>
          <p className="text-[#111789]/70 mt-1">
            Real-time KPIs (demo) by region: <span className="font-semibold">{data?.tenantSlug ?? "—"}</span>
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard label="Active Policies" value={loading ? "—" : data?.kpis.activePolicies ?? 0} />
          <KpiCard
            label="Revenue (demo)"
            value={
              loading
                ? "—"
                : data
                    ? new Intl.NumberFormat().format(data.kpis.revenue)
                    : "0"
            }
          />
          <KpiCard
            label="Lead Conversion"
            value={
              loading
                ? "—"
                : data
                    ? `${(data.kpis.leadConversion * 100).toFixed(1)}%`
                    : "0%"
            }
          />
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        )}

        <div className="mt-6 rounded-3xl border border-black/5 overflow-hidden">
          <div className="bg-[#111789] text-white p-5">
            <div className="font-semibold">Risk explainers (demo)</div>
          </div>
          <div className="p-5 space-y-3">
            <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-4">
              <div className="font-semibold text-[#111789]">Operational transparency</div>
              <div className="text-sm text-[#111789]/70 mt-1">
                Claims milestones update across portal and WhatsApp to reduce customer uncertainty.
              </div>
            </div>
            <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-4">
              <div className="font-semibold text-[#111789]">Conversion efficiency</div>
              <div className="text-sm text-[#111789]/70 mt-1">
                SME funnel + resume-on-WhatsApp reduces drop-off and improves time-to-quote.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-black/5 overflow-hidden bg-white"
    >
      <div className="p-5 bg-white">
        <div className="text-xs text-[#111789]/60">{label}</div>
        <div className="mt-2 text-2xl font-semibold text-[#111789]">{value}</div>
      </div>
    </motion.div>
  );
}

