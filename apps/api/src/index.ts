import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./env";
import { initRepo } from "./repo";
import { registerTenantRoutes } from "./routes/tenants";
import { registerQuoteRoutes } from "./routes/quotes";
import { registerClaimRoutes } from "./routes/claims";
import { registerAnalyticsRoutes } from "./routes/analytics";

async function main() {
  await initRepo();

  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => res.json({ ok: true, service: "kek-api" }));

  registerTenantRoutes(app);
  registerQuoteRoutes(app);
  registerClaimRoutes(app);
  registerAnalyticsRoutes(app);

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[kek-api] listening on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("[kek-api] failed to start", err);
  process.exit(1);
});

