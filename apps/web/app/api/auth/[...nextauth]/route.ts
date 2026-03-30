import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const dynamic = "force-static";
export const revalidate = false;

const isPresentationMode = process.env.PRESENTATION_MODE === "true";

const handler = NextAuth(authOptions);

async function presentationModeResponse() {
  return new Response("Auth API disabled in presentation mode", { status: 404 });
}

export function generateStaticParams() {
  if (!isPresentationMode) return [];
  return [{ nextauth: ["presentation"] }];
}

export const GET = isPresentationMode ? presentationModeResponse : handler;
export const POST = isPresentationMode ? presentationModeResponse : handler;

