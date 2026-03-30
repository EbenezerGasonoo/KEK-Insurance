"use client";

import { useState } from "react";
import Link from "next/link";

export function SiteDesignHelpPopup() {
  const key = "kek_site_design_help_seen_v1";
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const seen = localStorage.getItem(key);
      return !seen;
    } catch {
      return false;
    }
  });

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(key, "1");
    } catch {
      // ignore
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-black/30" onClick={close} />

      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-white shadow-2xl">
        <div className="bg-[#111789] text-white p-4 sm:p-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/80">Welcome</div>
            <div className="mt-1 text-lg font-semibold">New site design (demo) — let us help you</div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-sm font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-sm text-[#111789]/70">
            This is a demo of KEK’s premium experience. If you want, we’ll guide you to the right section in one tap.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="#quote"
              onClick={close}
              className="rounded-2xl bg-[#D4AF37] text-[#111789] font-semibold px-4 py-3 text-center hover:brightness-105 transition"
            >
              Get a Quote
            </Link>
            <Link
              href="#claims"
              onClick={close}
              className="rounded-2xl bg-white border border-black/10 text-[#111789] font-semibold px-4 py-3 text-center hover:bg-black/[0.03] transition"
            >
              Track Claim
            </Link>
            <Link
              href="#ai"
              onClick={close}
              className="rounded-2xl bg-white border border-black/10 text-[#111789] font-semibold px-4 py-3 text-center hover:bg-black/[0.03] transition"
            >
              AI Broker
            </Link>
            <Link
              href="#automations"
              onClick={close}
              className="rounded-2xl bg-white border border-black/10 text-[#111789] font-semibold px-4 py-3 text-center hover:bg-black/[0.03] transition"
            >
              Automations
            </Link>
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-4 w-full rounded-2xl bg-[#111789] text-white font-semibold px-4 py-3 hover:brightness-110 transition"
          >
            Keep browsing
          </button>
        </div>
      </div>
    </div>
  );
}

