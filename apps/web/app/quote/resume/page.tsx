import { Suspense } from "react";
import QuoteResumeClient from "./QuoteResumeClient";

export default function QuoteResumePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm text-[#111789]/70">
          Loading…
        </div>
      }
    >
      <QuoteResumeClient />
    </Suspense>
  );
}

