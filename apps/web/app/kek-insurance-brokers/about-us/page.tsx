import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

export default function AboutUsPage() {
  return (
    <BrokerSectionLayout
      title="About us"
      subtitle="KEK Insurance Brokers Limited is a renowned high-quality insurance brokerage firm."
    >
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-5">
        <div className="space-y-4 text-[#111789]/80">
          <p>
            Incorporated in the early 80s, KEK Insurance Brokers has developed substantial partner relationships with
            international firms and sister risk and insurance brokerages.
          </p>
          <p>
            We are positioned to offer clients practical insurance solutions, fast claims support, and long-term risk
            guidance across personal and business lines.
          </p>
          <p>
            Our digital approach combines advisory depth with transparent workflows so clients can track progress,
            documents, and decisions clearly.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-[#f8f9ff] p-5">
          <div className="font-semibold text-[#111789]">Why clients choose KEK</div>
          <ul className="mt-3 space-y-2 text-sm text-[#111789]/75 list-disc pl-5">
            <li>Strong insurer and partner networks</li>
            <li>Claims support with practical intervention</li>
            <li>Consultative risk guidance beyond placement</li>
            <li>Regional support across West African markets</li>
          </ul>
        </div>
      </div>
    </BrokerSectionLayout>
  );
}

