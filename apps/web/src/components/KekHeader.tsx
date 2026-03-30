"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useMemo, useState } from "react";
import { TenantSwitcher } from "./TenantSwitcher";

export function KekHeader() {
  const { data: session } = useSession();

  const role = session?.user?.role;
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = useMemo(() => {
    const base = [
      { href: "/portal", label: "Client Portal", show: role === "client" || role === "admin" },
      { href: "/executive", label: "Executive Analytics", show: role === "admin" }
    ];
    return base;
  }, [role]);

  return (
    <header className="w-full bg-white/95 backdrop-blur sticky top-0 z-50 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-[180px]">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/kek-logo.svg" alt="KEK Group" width={120} height={30} priority />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <TenantSwitcher />
            </div>

            <a
              href="https://wa.me/233201234567?text=Hi%20KEK%20I%20need%20help%20with%20my%20insurance%20or%20claim."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#25D366] text-white font-semibold hover:brightness-105 transition shadow-sm"
            >
              WhatsApp
            </a>

            {!role ? (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 bg-white border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition"
              >
                LOGIN
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href={role === "admin" ? "/executive" : "/portal"}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#D4AF37] text-[#111789] font-semibold hover:brightness-105 transition"
                >
                  {role === "admin" ? "DASHBOARD" : "PORTAL"}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center justify-center rounded-full px-3 py-2 border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition"
                  type="button"
                >
                  LOGOUT
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open navigation menu"
              className="xl:hidden inline-flex items-center justify-center rounded-full w-10 h-10 border border-black/10 text-[#111789] bg-white hover:bg-black/[0.03] transition"
            >
              <span className="text-sm font-semibold">{mobileOpen ? "✕" : "≡"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden xl:block pb-3">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex flex-nowrap items-center justify-center gap-1 overflow-x-auto text-[13px] text-[#111789] rounded-full border border-black/10 bg-white px-2 py-1.5 shadow-sm">
            <Link href="/" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              HOME
            </Link>
            <Link href="#why-kek" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              WHY KEK
            </Link>
            <Link href="#services" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              SERVICES
            </Link>
            <Link href="/kek-insurance-brokers/about-us" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              BROKERS
            </Link>
            <Link href="#claims" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              CLAIMS
            </Link>
            <Link href="#ai" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              AI
            </Link>
            <Link href="#automations" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              AUTOMATION
            </Link>
            <Link href="#quote" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              QUOTE
            </Link>
            <Link href="#contact" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              CONTACT
            </Link>
            <Link href="/portal" className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
              PORTALS
            </Link>

            {links
              .filter((l) => l.show)
              .map((l) => (
                <Link key={l.href} href={l.href} className="whitespace-nowrap px-3 py-2 rounded-full hover:bg-[#111789]/5 transition-colors">
                  {l.label.toUpperCase().replace("CLIENT ", "").replace("EXECUTIVE ", "")}
                </Link>
              ))}
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-black/5 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <TenantSwitcher />
              <a
                href="https://wa.me/233201234567?text=Hi%20KEK%20I%20need%20help%20with%20my%20insurance%20or%20claim."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#D4AF37] text-[#111789] font-semibold hover:brightness-105 transition"
              >
                WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link href="/" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                HOME
              </Link>
              <Link href="#why-kek" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                WHY KEK
              </Link>
              <Link href="#services" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                OUR SERVICES
              </Link>
              <Link href="/kek-insurance-brokers/about-us" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                BROKERS
              </Link>
              <Link href="#claims" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                CLAIMS
              </Link>
              <Link href="#ai" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                AI BROKER
              </Link>
              <Link href="#automations" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                AUTOMATIONS
              </Link>
              <Link href="#quote" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                GET A QUOTE
              </Link>
              <Link href="#news" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                NEWS & EVENTS
              </Link>
              <Link href="#contact" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                CONTACT US
              </Link>
              <Link href="/portal" className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/[0.03] transition" onClick={() => setMobileOpen(false)}>
                PORTALS
              </Link>
            </div>

            {!role ? (
              <Link href="/login" className="block rounded-2xl bg-[#111789] text-white font-semibold text-center px-4 py-3 hover:brightness-110 transition" onClick={() => setMobileOpen(false)}>
                LOGIN
              </Link>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link
                  href={role === "admin" ? "/executive" : "/portal"}
                  className="block rounded-2xl bg-[#111789] text-white font-semibold text-center px-4 py-3 hover:brightness-110 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {role === "admin" ? "DASHBOARD" : "PORTAL"}
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="block rounded-2xl border border-black/10 text-[#111789] font-semibold text-center px-4 py-3 hover:bg-black/[0.03] transition"
                  type="button"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

