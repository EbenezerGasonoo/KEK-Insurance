export type TenantSlug = "ghana" | "liberia" | "sierra-leone";

const allowedTenants = new Set<TenantSlug>(["ghana", "liberia", "sierra-leone"]);

export function resolveTenantSlugFromRequest(req: {
  headers: Record<string, string | string[] | undefined>;
}): TenantSlug {
  const raw = req.headers["x-tenant"];
  if (!raw) return "ghana";
  const slug = Array.isArray(raw) ? raw[0] : raw;
  if (typeof slug === "string" && allowedTenants.has(slug as TenantSlug)) return slug as TenantSlug;
  return "ghana";
}

