import Link from "next/link";
import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

export default function BrokerClaimsPage() {
  return (
    <BrokerSectionLayout title="Claims" subtitle="Claims support with clear tracking and responsive intervention.">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
        <div className="space-y-4">
          <p className="text-[#111789]/80">
            Our claims consulting professionals assist in pre- and post-loss design and implementation of claim
            management strategies.
          </p>
          <div className="rounded-2xl border border-black/10 p-4">
            <div className="font-semibold text-[#111789]">Claims stages</div>
            <ul className="mt-2 space-y-1 text-sm text-[#111789]/75 list-disc pl-5">
              <li>Claim filed and documentation review</li>
              <li>Adjuster assignment and assessment</li>
              <li>Inspection and insurer coordination</li>
              <li>Payment approval and client closure</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-[#f8f9ff] p-4">
          <div className="font-semibold text-[#111789]">Quick actions</div>
          <div className="mt-3 flex flex-col gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-[#111789] text-white font-semibold"
            >
              Open Claims Tracker
            </Link>
            <Link
              href="/kek-insurance-brokers/get-a-quote"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 border border-black/10 text-[#111789] font-semibold bg-white"
            >
              Start a Quote
            </Link>
            <a
              href="https://wa.me/233201234567?text=Hi%20KEK%2C%20I%20need%20help%20with%20my%20claim."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-[#25D366] text-white font-semibold"
            >
              Claims via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </BrokerSectionLayout>
  );
}

