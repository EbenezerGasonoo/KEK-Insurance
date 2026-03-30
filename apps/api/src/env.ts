import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  // If not provided, we fall back to an in-memory demo store (useful for local dev).
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  WEB_BASE_URL: process.env.WEB_BASE_URL ?? "http://localhost:3000",
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER ?? "", // e.g. 233201234567 (no +)
};

