import crypto from "crypto";
import { env } from "./env";
import { initDb, pool } from "./db";

const claimStatuses = ["filed", "assigned", "inspection", "paymentApproval"] as const;
type ClaimStatus = (typeof claimStatuses)[number];

export type Tenant = {
  slug: "ghana" | "liberia" | "sierra-leone";
  name: string;
  countryCode: string;
};

export type QuoteSession = {
  token: string;
  tenantSlug: Tenant["slug"];
  phone?: string | null;
  quoteData: Record<string, unknown>;
  status: string;
};

export type Claim = {
  id: string;
  tenantSlug: Tenant["slug"];
  policyNumber: string;
  customerName: string;
  status: ClaimStatus;
  createdAt: string;
  updatedAt: string;
};

const isMemory = !env.DATABASE_URL;

const memoryTenants: Tenant[] = [
  { slug: "ghana", name: "Ghana", countryCode: "GH" },
  { slug: "liberia", name: "Liberia", countryCode: "LR" },
  { slug: "sierra-leone", name: "Sierra Leone", countryCode: "SL" }
];

const memoryQuoteSessions = new Map<string, QuoteSession>();
const memoryClaimsByTenant = new Map<Tenant["slug"], Claim[]>();

function nowIso() {
  return new Date().toISOString();
}

function nextStatus(current: ClaimStatus): ClaimStatus {
  const idx = claimStatuses.indexOf(current);
  if (idx < 0) return "filed";
  return claimStatuses[Math.min(idx + 1, claimStatuses.length - 1)];
}

export async function initRepo(): Promise<void> {
  if (!isMemory) {
    await initDb();
    return;
  }
  // Memory mode: nothing to initialize beyond keeping the seed tenants.
}

export async function listTenants(): Promise<Tenant[]> {
  if (isMemory) return memoryTenants;
  const { rows } = await pool!.query(`SELECT slug, name, country_code FROM tenants ORDER BY name ASC`);
  return rows.map((r: any) => ({
    slug: r.slug as Tenant["slug"],
    name: r.name as string,
    countryCode: r.country_code as string
  }));
}

export async function createQuoteSession(input: {
  tenantSlug: Tenant["slug"];
  phone?: string;
  quoteData: Record<string, unknown>;
}): Promise<QuoteSession> {
  const token = crypto.randomUUID();
  const session: QuoteSession = {
    token,
    tenantSlug: input.tenantSlug,
    phone: input.phone ?? null,
    quoteData: input.quoteData,
    status: "created"
  };

  if (isMemory) {
    memoryQuoteSessions.set(token, session);
    return session;
  }

  await pool!.query(
    `INSERT INTO quote_sessions (token, tenant_slug, phone, quote_data, status)
     VALUES ($1, $2, $3, $4, $5)`,
    [token, input.tenantSlug, input.phone ?? null, JSON.stringify(input.quoteData), "created"]
  );

  return session;
}

export async function getQuoteSession(token: string): Promise<QuoteSession | null> {
  if (isMemory) return memoryQuoteSessions.get(token) ?? null;

  const { rows } = await pool!.query(
    `SELECT token, tenant_slug AS "tenantSlug", phone, quote_data AS "quoteData", status
     FROM quote_sessions
     WHERE token = $1`,
    [token]
  );
  const row = rows[0];
  if (!row) return null;

  return {
    token: row.token as string,
    tenantSlug: row.tenantSlug as Tenant["slug"],
    phone: row.phone as string | null,
    quoteData: row.quoteData as Record<string, unknown>,
    status: row.status as string
  };
}

export async function listClaims(tenantSlug: Tenant["slug"]): Promise<Claim[]> {
  if (isMemory) {
    const existing = memoryClaimsByTenant.get(tenantSlug) ?? [];
    if (existing.length > 0) return existing;
    const demoId = `demo-${crypto.randomUUID().slice(0, 8)}`;
    const c: Claim = {
      id: demoId,
      tenantSlug,
      policyNumber: "KEK-PL-1029",
      customerName: "Demo Client",
      status: "filed",
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    memoryClaimsByTenant.set(tenantSlug, [c]);
    return [c];
  }

  const { rows } = await pool!.query(
    `SELECT id, tenant_slug AS "tenantSlug", policy_number, customer_name, status,
            created_at AS "createdAt", updated_at AS "updatedAt"
     FROM claims
     WHERE tenant_slug = $1
     ORDER BY updated_at DESC`,
    [tenantSlug]
  );

  if (rows.length > 0) return rows as Claim[];

  const demoId = `demo-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date().toISOString();
  await pool!.query(
    `INSERT INTO claims (id, tenant_slug, policy_number, customer_name, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $6)`,
    [demoId, tenantSlug, "KEK-PL-1029", "Demo Client", "filed", now]
  );

  return [
    {
      id: demoId,
      tenantSlug,
      policyNumber: "KEK-PL-1029",
      customerName: "Demo Client",
      status: "filed",
      createdAt: now,
      updatedAt: now
    }
  ];
}

export async function advanceClaim(input: {
  tenantSlug: Tenant["slug"];
  claimId: string;
  phone?: string;
}): Promise<{ claim: Claim; stage: string }> {
  if (isMemory) {
    const list = memoryClaimsByTenant.get(input.tenantSlug) ?? [];
    const claim = list.find((c) => c.id === input.claimId);
    if (!claim) throw new Error("Claim not found");
    const newStatus = nextStatus(claim.status);
    claim.status = newStatus;
    claim.updatedAt = nowIso();
    const stage = stageLabel(newStatus);
    return { claim: { ...claim }, stage };
  }

  const { rows: currentRows } = await pool!.query(
    `SELECT status FROM claims WHERE id = $1 AND tenant_slug = $2`,
    [input.claimId, input.tenantSlug]
  );
  const current = currentRows[0];
  if (!current) throw new Error("Claim not found");

  const currentStatus = current.status as ClaimStatus;
  const newStatus = nextStatus(currentStatus);

  const eventId = crypto.randomUUID();
  await pool!.query(
    `INSERT INTO claim_events (id, claim_id, event_type)
     VALUES ($1, $2, $3)`,
    [eventId, input.claimId, newStatus]
  );

  await pool!.query(
    `UPDATE claims
     SET status = $1, updated_at = now()
     WHERE id = $2 AND tenant_slug = $3`,
    [newStatus, input.claimId, input.tenantSlug]
  );

  // Optional: demo WhatsApp notification persistence.
  await pool!.query(
    `INSERT INTO whatsapp_events (id, tenant_slug, phone, event_type, payload)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      crypto.randomUUID(),
      input.tenantSlug,
      input.phone ?? null,
      "claim_status_update",
      JSON.stringify({
        stage: stageLabel(newStatus),
        policyNumber: input.claimId,
        template: "Your claim has moved to the next milestone."
      })
    ]
  );

  const { rows } = await pool!.query(
    `SELECT id, tenant_slug AS "tenantSlug", policy_number, customer_name, status,
            created_at AS "createdAt", updated_at AS "updatedAt"
     FROM claims WHERE id = $1 AND tenant_slug = $2`,
    [input.claimId, input.tenantSlug]
  );
  const claim = rows[0] as Claim;

  return { claim, stage: stageLabel(newStatus) };
}

export async function getAnalytics(tenantSlug: Tenant["slug"]): Promise<{
  tenantSlug: Tenant["slug"];
  kpis: { activePolicies: number; revenue: number; leadConversion: number };
}> {
  if (isMemory) {
    const list = memoryClaimsByTenant.get(tenantSlug) ?? [];
    const activePolicies = list.length;
    const paymentApproval = list.filter((c) => c.status === "paymentApproval").length;
    const leadConversion = Math.min(0.42, 0.08 + activePolicies * 0.03);
    const revenue = 250000 + paymentApproval * 17500;
    return { tenantSlug, kpis: { activePolicies, revenue, leadConversion } };
  }

  const { rows } = await pool!.query(
    `SELECT
       COUNT(*)::int AS "activePolicies",
       SUM(CASE WHEN status = 'filed' THEN 1 ELSE 0 END)::int AS "filed",
       SUM(CASE WHEN status = 'assigned' THEN 1 ELSE 0 END)::int AS "assigned",
       SUM(CASE WHEN status = 'inspection' THEN 1 ELSE 0 END)::int AS "inspection",
       SUM(CASE WHEN status = 'paymentApproval' THEN 1 ELSE 0 END)::int AS "paymentApproval"
     FROM claims
     WHERE tenant_slug = $1`,
    [tenantSlug]
  );

  const row = rows[0] ?? { activePolicies: 0, paymentApproval: 0 };
  const leadConversion = Math.min(0.42, 0.08 + (row.activePolicies ?? 0) * 0.03);
  const revenue = 250000 + (row.paymentApproval ?? 0) * 17500;
  return { tenantSlug, kpis: { activePolicies: row.activePolicies ?? 0, revenue, leadConversion } };
}

function stageLabel(status: ClaimStatus) {
  switch (status) {
    case "filed":
      return "Claim Filed";
    case "assigned":
      return "Adjuster Assigned";
    case "inspection":
      return "Inspection";
    case "paymentApproval":
      return "Payment Approval";
  }
}

