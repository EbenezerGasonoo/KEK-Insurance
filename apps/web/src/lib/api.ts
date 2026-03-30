import { resolveTenantFromCookie, type TenantSlug } from "./tenant";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function getTenantForRequest(): TenantSlug {
  return resolveTenantFromCookie();
}

export async function kekFetch<T>(path: string, init?: RequestInit & { tenantSlug?: TenantSlug }): Promise<T> {
  const tenantSlug = init?.tenantSlug ?? getTenantForRequest();
  const headers = new Headers(init?.headers);
  headers.set("x-tenant", tenantSlug);
  headers.set("Content-Type", "application/json");

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

