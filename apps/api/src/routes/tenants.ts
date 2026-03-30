import type { Express } from "express";
import { z } from "zod";
import { listTenants } from "../repo";

export function registerTenantRoutes(app: Express) {
  app.get("/api/tenants", async (_req, res) => {
    try {
      const tenants = await listTenants();
      res.json({ tenants });
    } catch (err) {
      res.status(500).json({ error: "Failed to load tenants" });
    }
  });

  // Quick sanity for dev.
  app.post("/api/tenants/validate", async (req, res) => {
    const body = z.object({ xTenant: z.string().optional() }).safeParse(req.body);
    if (!body.success) return res.status(400).json({ error: "Invalid payload" });
    res.json({ ok: true });
  });
}

