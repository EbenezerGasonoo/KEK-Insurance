"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { kekFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

type Claim = {
  id: string;
  tenantSlug: string;
  policyNumber: string;
  customerName: string;
  status: "filed" | "assigned" | "inspection" | "paymentApproval" | string;
  createdAt: string;
  updatedAt: string;
};

const stages = ["filed", "assigned", "inspection", "paymentApproval"] as const;

function stageLabel(status: Claim["status"]) {
  switch (status) {
    case "filed":
      return "Claim Filed";
    case "assigned":
      return "Adjuster Assigned";
    case "inspection":
      return "Inspection";
    case "paymentApproval":
      return "Payment Approval";
    default:
      return String(status);
  }
}

export default function PortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [advancingId, setAdvancingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  const isAuthed = status === "authenticated" && !!session?.user?.role;
  const role = session?.user?.role;
  const canAccess = isAuthed && (role === "client" || role === "admin");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [router, status]);

  async function loadClaims() {
    setLoading(true);
    try {
      const res = await kekFetch<{ claims: Claim[] }>("/api/claims");
      setClaims(res.claims);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to load claims";
      setToast(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!canAccess) return;
    loadClaims();
  }, [canAccess]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function advanceClaim(claimId: string) {
    setAdvancingId(claimId);
    try {
      const res = await kekFetch<{ status: Claim["status"]; stage: string; id: string }>("/api/claims/" + claimId + "/advance", {
        method: "POST",
        body: JSON.stringify({ phone: phone.trim() ? phone.trim() : undefined })
      });
      setToast(`Notification sent: ${res.stage}`);
      // Update UI quickly by reloading claims.
      await loadClaims();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to advance claim";
      setToast(message);
    } finally {
      setAdvancingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold text-[#111789]">Client Portal</h1>
            <p className="text-[#111789]/70 mt-1">Secure self-service + real-time claims transparency.</p>
          </div>
          <div className="rounded-2xl bg-[#111789] text-white px-4 py-3">
            <div className="text-xs text-white/80">Role</div>
            <div className="font-semibold">{role}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <section className="lg:col-span-1 rounded-3xl border border-black/5 overflow-hidden">
            <div className="bg-[#111789] text-white p-5">
              <h2 className="font-semibold">Policy Dashboard</h2>
              <div className="text-white/80 text-sm mt-1">Demo overview for {session?.user?.email ?? "client"}</div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#111789]/70">Active coverage</div>
                <div className="font-semibold">1 Policy</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#111789]/70">Next renewal</div>
                <div className="font-semibold">{new Date(Date.now() + 1000 * 60 * 60 * 24 * 32).toLocaleDateString()}</div>
              </div>

              <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 p-3">
                <div className="text-sm font-semibold text-[#111789]">Document Vault</div>
                <div className="text-xs text-[#111789]/70 mt-1">
                  Demo upload UI (IDs + vehicle registrations).
                </div>
                <input type="file" className="mt-3 w-full text-sm" multiple />
              </div>
            </div>
          </section>

          <section className="lg:col-span-2 rounded-3xl border border-black/5 overflow-hidden">
            <div className="bg-[#111789] text-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">Real-Time Claims Tracker</h2>
                  <p className="text-white/80 text-sm mt-1">Milestones sync with portal and WhatsApp (demo).</p>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs text-white/80">WhatsApp destination (demo)</div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 233201234567"
                    className="mt-1 w-64 max-w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            <div className="p-5">
              {toast && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mb-4 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/15 px-4 py-3 text-sm text-[#111789]"
                  >
                    {toast}
                  </motion.div>
                </AnimatePresence>
              )}

              {loading && <div className="text-[#111789]/70">Loading claims…</div>}
              {!loading && claims.length === 0 && (
                <div className="text-[#111789]/70">No claims found for this region yet.</div>
              )}

              {!loading && claims.length > 0 && (
                <div className="space-y-4">
                  {claims.map((c) => {
                    const idx = stages.indexOf(c.status as (typeof stages)[number]);
                    const currentIdx = idx >= 0 ? idx : 0;

                    return (
                      <div key={c.id} className="rounded-3xl border border-black/5 overflow-hidden bg-white">
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                              <div className="text-xs text-[#111789]/60">Policy</div>
                              <div className="font-semibold text-[#111789]">{c.policyNumber}</div>
                              <div className="text-sm text-[#111789]/70 mt-1">{c.customerName}</div>
                            </div>
                            <div className="rounded-2xl bg-[#111789]/5 border border-[#111789]/10 px-3 py-2">
                              <div className="text-xs text-[#111789]/70">Current status</div>
                              <div className="font-semibold text-[#111789]">{stageLabel(c.status)}</div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between gap-2 text-[11px] text-[#111789]/70">
                              {stages.map((s, i) => (
                                <div key={s} className={`flex items-center gap-2`}>
                                  <span
                                    className={`inline-block w-7 h-7 rounded-full flex items-center justify-center border ${
                                      i <= currentIdx
                                        ? "bg-[#111789] text-white border-[#111789]"
                                        : "bg-white text-[#111789]/60 border-black/10"
                                    }`}
                                  >
                                    {i + 1}
                                  </span>
                                  <span className={i <= currentIdx ? "text-[#111789]" : ""}>{stageLabel(s)}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-black/5 overflow-hidden">
                              <div
                                className="h-full bg-[#D4AF37] transition-all"
                                style={{ width: `${(currentIdx / (stages.length - 1)) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                            <div className="text-xs text-[#111789]/60">
                              Updated {new Date(c.updatedAt).toLocaleString()}
                            </div>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                disabled={advancingId === c.id}
                                onClick={() => advanceClaim(c.id)}
                                className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-[#111789] text-white font-semibold hover:brightness-110 transition disabled:opacity-50"
                              >
                                {advancingId === c.id ? "Advancing..." : "Advance milestone (demo)"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

