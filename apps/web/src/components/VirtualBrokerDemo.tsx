"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { id: string; role: "user" | "assistant"; text: string };

function uid() {
  return Math.random().toString(16).slice(2);
}

export function VirtualBrokerDemo() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: uid(),
      role: "assistant",
      text: "Hi, I’m the KEK Virtual Broker. Tell me what you want to insure and I’ll guide you to a quote."
    }
  ]);

  const suggestions = useMemo(
    () => ["Get a quote for my business", "What documents do I need?", "Claim status update"],
    []
  );

  function getAssistantReply(userText: string) {
    const t = userText.toLowerCase();
    if (t.includes("claim")) {
      return "To check your claim, log into the Client Portal and open the Real-Time Claims Tracker. For demo, we can simulate milestone updates from your account.";
    }
    if (t.includes("document") || t.includes("need")) {
      return "For a quote, we typically ask for business registration details. For a claim, we need ID + supporting documents. In this demo, you can upload files to the Document Vault later.";
    }
    return "Great. I’ll qualify you now: business type, employee count, and annual revenue. After that, you can Continue on WhatsApp to finish with a human agent if needed.";
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: uid(), role: "user", text: trimmed };
    const assistantMsg: Msg = { id: uid(), role: "assistant", text: getAssistantReply(trimmed) };
    setMsgs((m) => [...m, userMsg, assistantMsg]);
    setInput("");
  }

  const [waPhone, setWaPhone] = useState("");
  const [claimStage, setClaimStage] = useState(0);
  const claimStages = useMemo(
    () => ["Claim Filed", "Adjuster Assigned", "Inspection", "Payment Approval"] as const,
    []
  );

  const waMessage = useMemo(() => {
    const stageLabel = claimStages[claimStage] ?? claimStages[0];
    return `Hi KEK, I reached the Virtual Broker.\n\nI’d like a claim status update.\nCurrent stage: ${stageLabel}.\nPlease guide me with next steps.`;
  }, [claimStage, claimStages]);

  const waUrl = useMemo(() => {
    const dest = waPhone.trim() ? waPhone.trim() : "233201234567";
    return `https://wa.me/${dest}?text=${encodeURIComponent(waMessage)}`;
  }, [waMessage, waPhone]);

  return (
    <section id="ai" className="mt-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between gap-4"
      >
        <div>
          <h3 className="text-2xl font-semibold text-[#111789]">KEK Virtual Broker</h3>
          <p className="text-sm text-[#111789]/70 mt-1">24/7 conversational assistance with an instant WhatsApp handoff (demo).</p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center justify-center rounded-full px-5 py-2 bg-[#D4AF37] text-[#111789] font-semibold hover:brightness-105 transition"
        >
          Continue on WhatsApp
        </a>
      </motion.div>

      <div className="mt-4 rounded-3xl border border-black/5 overflow-hidden bg-white">
        <div className="px-4 py-3 bg-[#111789] text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-semibold">Risk explainers (demo)</span>
            </div>
            <div className="text-xs text-white/80">Subtle Framer Motion</div>
          </div>
        </div>

        <div className="p-4 max-h-[320px] overflow-auto">
          <div className="space-y-3">
            {msgs.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-4 py-3 rounded-2xl max-w-[92%] ${
                  m.role === "user"
                    ? "bg-[#111789] text-white ml-auto"
                    : "bg-[#111789]/5 text-[#111789] mr-auto border border-[#111789]/10"
                }`}
              >
                {m.text}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="text-xs rounded-full border border-black/10 px-3 py-1.5 hover:bg-black/[0.03] transition"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-2xl border border-black/10 px-4 py-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") send(input);
              }}
            />
            <button
              type="button"
              onClick={() => send(input)}
              className="rounded-2xl px-4 py-3 bg-[#111789] text-white font-semibold hover:brightness-110 transition"
            >
              Send
            </button>
          </div>
          <AnimatePresence />
          <div className="text-xs text-[#111789]/60 mt-2">
            In production this would qualify you and hand off to a human via WhatsApp Business API.
          </div>
        </div>

        {/* WhatsApp handoff demo */}
        <div className="px-4 pb-5">
          <div className="rounded-3xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/12 via-white to-[#111789]/[0.02] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="text-sm font-semibold text-[#111789]">WhatsApp Live Handoff (demo)</div>
                <div className="mt-1 text-sm text-[#111789]/75">
                  Pick a claim stage, preview your message, then continue directly on WhatsApp.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white font-bold shadow-sm">
                  W
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111789]/70">Your WhatsApp number</label>
                <input
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  placeholder="e.g. 233201234567"
                  inputMode="tel"
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111789]/70">Claim milestone</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {claimStages.map((s, idx) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setClaimStage(idx)}
                      className={`text-xs rounded-full px-3 py-1.5 border transition ${
                        idx === claimStage
                          ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#111789]"
                          : "border-black/10 bg-white/70 text-[#111789] hover:bg-black/[0.02]"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-[#111789]/70">Selected: {claimStages[claimStage]}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-[#25D366] text-white font-semibold hover:brightness-105 transition"
              >
                Send WhatsApp message
              </a>
              <button
                type="button"
                onClick={() => setWaPhone("")}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-white border border-black/10 text-[#111789] font-semibold hover:bg-black/[0.03] transition"
              >
                Clear number
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-white border border-[#25D366]/30 p-3">
              <div className="text-xs font-semibold text-[#111789]/60">Preview message to broker</div>
              <div className="mt-1 text-xs text-[#111789]/80 whitespace-pre-line">{waMessage}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

