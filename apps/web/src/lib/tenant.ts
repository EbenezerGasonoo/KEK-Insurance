export type TenantSlug = "ghana" | "liberia" | "sierra-leone";

export const tenantOptions: { slug: TenantSlug; label: string }[] = [
  { slug: "ghana", label: "Ghana" },
  { slug: "liberia", label: "Liberia" },
  { slug: "sierra-leone", label: "Sierra Leone" }
];

export function resolveTenantFromCookie(): TenantSlug {
  if (typeof document === "undefined") return "ghana";
  const match = document.cookie.match(/(^| )kek_tenant=([^;]+)/);
  const raw = match ? decodeURIComponent(match[2]) : null;
  if (raw === "ghana" || raw === "liberia" || raw === "sierra-leone") return raw;
  return "ghana";
}

