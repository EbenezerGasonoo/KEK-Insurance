"use client";

import { useMemo, useState } from "react";

type TenantSlug = "ghana" | "liberia" | "sierra-leone";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  // Cookie used for demo multi-tenancy.
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000`;
}

export function TenantSwitcher() {
  const options = useMemo(
    () =>
      [
        { slug: "ghana" as const, label: "Ghana" },
        { slug: "liberia" as const, label: "Liberia" },
        { slug: "sierra-leone" as const, label: "Sierra Leone" }
      ] as const,
    []
  );

  const [tenant, setTenant] = useState<TenantSlug>(() => {
    const v = readCookie("kek_tenant");
    if (v === "ghana" || v === "liberia" || v === "sierra-leone") return v;
    return "ghana";
  });

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-white/80 hidden sm:block">Region</label>
      <select
        value={tenant}
        onChange={(e) => {
          const next = e.target.value as TenantSlug;
          setTenant(next);
          setCookie("kek_tenant", next);
          // Simple demo UX: reload so the whole app picks up new tenant context.
          window.location.reload();
        }}
        className="bg-white/10 text-white border border-white/20 rounded-full px-3 py-1 text-xs"
        aria-label="Select tenant region"
      >
        {options.map((o) => (
          <option key={o.slug} value={o.slug} className="text-black">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

