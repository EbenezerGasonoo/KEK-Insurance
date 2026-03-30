import Link from "next/link";
import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

export default function BrokerQuotePage() {
  return (
    <BrokerSectionLayout title="Get a Quote" subtitle="Begin your quote journey with KEK Insurance Brokers.">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
        <div className="space-y-4">
          <p className="text-[#111789]/80">
            Provide your business and risk details and our team will guide you through the right coverage options.
          </p>
          <div className="rounded-2xl border border-black/10 p-4">
            <div className="font-semibold text-[#111789]">What we typically request</div>
            <ul className="mt-2 space-y-1 text-sm text-[#111789]/75 list-disc pl-5">
              <li>Business type and profile</li>
              <li>Employee count and turnover range</li>
              <li>Current cover and key risk priorities</li>
              <li>Desired timeline for policy placement</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-[#f8f9ff] p-4">
          <div className="font-semibold text-[#111789]">Start now</div>
          <div className="mt-3 flex flex-col gap-3">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-[#D4AF37] text-[#111789] font-semibold"
            >
              Open SME Quick Quote
            </Link>
            <a
              href="https://wa.me/233201234567?text=Hi%20KEK%2C%20I%20want%20to%20get%20a%20quote."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-[#25D366] text-white font-semibold"
            >
              Quote via WhatsApp
            </a>
            <Link
              href="/kek-insurance-brokers/services"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 border border-black/10 text-[#111789] font-semibold bg-white"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </BrokerSectionLayout>
  );
}

