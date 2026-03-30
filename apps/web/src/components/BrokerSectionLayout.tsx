"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { brokerNavItems } from "@/lib/brokers-pages";

export function BrokerSectionLayout({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9ff] to-white">
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[270px_1fr] gap-6 items-start">
        <aside className="rounded-3xl overflow-hidden border border-black/5 shadow-sm">
          <div className="bg-[#111789] text-white p-4">
            <div className="font-semibold">KEK Insurance Brokers</div>
            <div className="text-xs text-white/80 mt-1">Section navigation</div>
          </div>
          <nav className="bg-[#111789] pb-3">
            {brokerNavItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-5 py-3 text-sm transition ${
                    active
                      ? "text-white bg-white/10 border-l-2 border-[#D4AF37]"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="rounded-3xl border border-black/5 bg-white overflow-hidden shadow-sm">
          <div className="bg-[#111789] text-white p-6 relative">
            <div className="absolute -right-14 -top-14 w-44 h-44 rounded-full bg-[#D4AF37]/15 blur-2xl" />
            <div className="relative">
              <div className="text-xs text-white/70">KEK Insurance Brokers</div>
            <h1 className="text-3xl font-semibold">{title}</h1>
            {subtitle ? <p className="text-white/80 text-sm mt-2">{subtitle}</p> : null}
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { k: "40+", t: "Years of experience" },
                { k: "24/7", t: "Client support" },
                { k: "3", t: "Regional entities" },
                { k: "Fast", t: "Claims response" }
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-black/10 bg-[#f8f9ff] p-3">
                  <div className="text-lg font-semibold text-[#111789]">{x.k}</div>
                  <div className="text-xs text-[#111789]/70">{x.t}</div>
                </div>
              ))}
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}

