"use client";

import { motion } from "framer-motion";

const stages = [
  { key: "filed", label: "Claim Filed" },
  { key: "assigned", label: "Adjuster Assigned" },
  { key: "inspection", label: "Inspection" },
  { key: "paymentApproval", label: "Payment Approval" }
] as const;

export function LandingClaimTimelineMini({ currentIndex = 1 }: { currentIndex?: number }) {
  const safeIdx = Math.max(0, Math.min(currentIndex, stages.length - 1));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 px-3">
        {stages.map((s, i) => {
          const done = i <= safeIdx;
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                  done ? "bg-[#111789] text-white border-[#111789]" : "bg-white text-[#111789]/60 border-black/10"
                }`}
              >
                {i + 1}
              </div>
              <div className={`mt-2 text-[10px] leading-tight text-center ${done ? "text-[#111789]" : "text-[#111789]/55"}`}>
                {s.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2 px-3">
        <div className="h-2 rounded-full bg-black/5 overflow-hidden">
          <div
            className="h-full bg-[#D4AF37] transition-all"
            style={{ width: `${(safeIdx / (stages.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

