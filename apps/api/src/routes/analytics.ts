import type { Express, Request, Response } from "express";
import { resolveTenantSlugFromRequest } from "../tenant";
import { getAnalytics } from "../repo";

export function registerAnalyticsRoutes(app: Express) {
  app.get("/api/analytics", async (req: Request, res: Response) => {
    const tenantSlug = resolveTenantSlugFromRequest(req);
    try {
      const result = await getAnalytics(tenantSlug);
      res.json(result);
    } catch {
      res.status(500).json({ error: "Failed to load analytics" });
    }
  });
}

