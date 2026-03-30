import { Pool } from "pg";
import { env } from "./env";

export const pool = env.DATABASE_URL
  ? new Pool({
      connectionString: env.DATABASE_URL
    })
  : null;

const tenantsSeed = [
  { id: "0a6fcd2c-2f1a-4df2-9e1b-1f2d1b5d1111", slug: "ghana", name: "Ghana", countryCode: "GH" },
  { id: "0a6fcd2c-2f1a-4df2-9e1b-1f2d1b5d2222", slug: "liberia", name: "Liberia", countryCode: "LR" },
  { id: "0a6fcd2c-2f1a-4df2-9e1b-1f2d1b5d3333", slug: "sierra-leone", name: "Sierra Leone", countryCode: "SL" }
];

export async function initDb(): Promise<void> {
  if (!pool) return;
  // For a demo we create tables idempotently on boot.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tenants (
      id uuid PRIMARY KEY,
      slug text UNIQUE NOT NULL,
      name text NOT NULL,
      country_code text NOT NULL
    );

    CREATE TABLE IF NOT EXISTS quote_sessions (
      token text PRIMARY KEY,
      tenant_slug text NOT NULL REFERENCES tenants(slug) ON DELETE CASCADE,
      phone text,
      quote_data jsonb NOT NULL,
      status text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS claims (
      id text PRIMARY KEY,
      tenant_slug text NOT NULL REFERENCES tenants(slug) ON DELETE CASCADE,
      policy_number text,
      customer_name text,
      status text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS claim_events (
      id uuid PRIMARY KEY,
      claim_id text NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
      event_type text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS whatsapp_events (
      id uuid PRIMARY KEY,
      tenant_slug text NOT NULL REFERENCES tenants(slug) ON DELETE CASCADE,
      phone text,
      event_type text NOT NULL,
      payload jsonb,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  for (const t of tenantsSeed) {
    await pool.query(
      `INSERT INTO tenants (id, slug, name, country_code) VALUES ($1, $2, $3, $4)
       ON CONFLICT (slug) DO NOTHING`,
      [t.id, t.slug, t.name, t.countryCode]
    );
  }
}

