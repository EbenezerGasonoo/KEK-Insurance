import type { Express, Request, Response } from "express";
import { z } from "zod";
import { resolveTenantSlugFromRequest } from "../tenant";
import { advanceClaim, listClaims } from "../repo";

const advanceClaimBodySchema = z.object({
  phone: z.string().min(5).optional()
});

export function registerClaimRoutes(app: Express) {
  app.get("/api/claims", async (req: Request, res: Response) => {
    const tenantSlug = resolveTenantSlugFromRequest(req);
    try {
      const claims = await listClaims(tenantSlug);
      res.json({ claims });
    } catch {
      res.status(500).json({ error: "Failed to load claims" });
    }
  });

  app.post("/api/claims/:id/advance", async (req: Request, res: Response) => {
    const tenantSlug = resolveTenantSlugFromRequest(req);
    const parsedBody = advanceClaimBodySchema.safeParse(req.body);
    if (!parsedBody.success) return res.status(400).json({ error: "Invalid payload" });

    const phone = parsedBody.data.phone;
    const claimIdRaw = req.params.id;
    const claimId = Array.isArray(claimIdRaw) ? claimIdRaw[0] : claimIdRaw;
    if (!claimId || typeof claimId !== "string") return res.status(400).json({ error: "Invalid claim id" });

    try {
      const result = await advanceClaim({ tenantSlug, claimId, phone });
      res.json({ id: claimId, tenantSlug, status: result.claim.status, stage: result.stage });
    } catch {
      res.status(500).json({ error: "Failed to advance claim" });
    }
  });
}

