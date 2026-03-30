import type { Express, Request, Response } from "express";
import { z } from "zod";
import { env } from "../env";
import { createQuoteSession, getQuoteSession } from "../repo";

const createQuoteSessionSchema = z.object({
  tenantSlug: z.enum(["ghana", "liberia", "sierra-leone"]),
  phone: z.string().min(5).optional(),
  // Demo payload: accept any JSON object, passthrough keys.
  quoteData: z.object({}).passthrough()
});

function whatsappResumeUrl(opts: { phone?: string; token: string }) {
  const text = `Hi KEK Virtual Broker 👋\n\nResume your quote session using this token:\n${opts.token}\n\nReply YES to continue.`;
  if (!opts.phone) {
    // Demo fallback: show a generic CTA link.
    return `https://wa.me/${encodeURIComponent(env.WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
  }
  return `https://wa.me/${encodeURIComponent(opts.phone)}?text=${encodeURIComponent(text)}`;
}

export function registerQuoteRoutes(app: Express) {
  app.post("/api/quote-sessions", async (req: Request, res: Response) => {
    const parsed = createQuoteSessionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });

    const { tenantSlug, phone, quoteData } = parsed.data;

    try {
      const session = await createQuoteSession({ tenantSlug, phone, quoteData });
      res.json({
        token: session.token,
        status: session.status,
        resumeUrl: whatsappResumeUrl({ phone, token: session.token }),
        quoteData: session.quoteData
      });
    } catch {
      res.status(500).json({ error: "Failed to create quote session" });
    }
  });

  app.get("/api/quote-sessions/:token", async (req: Request, res: Response) => {
    const tokenRaw = req.params.token;
    const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw;
    if (!token || typeof token !== "string") return res.status(400).json({ error: "Invalid token" });
    try {
      const session = await getQuoteSession(token);
      if (!session) return res.status(404).json({ error: "Quote session not found" });
      res.json(session);
    } catch {
      res.status(500).json({ error: "Failed to load quote session" });
    }
  });
}

