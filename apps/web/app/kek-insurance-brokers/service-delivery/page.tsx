import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

export default function ServiceDeliveryPage() {
  return (
    <BrokerSectionLayout
      title="Service Delivery"
      subtitle="How KEK delivers quality, responsiveness, and transparent outcomes."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {[
          "Needs assessment and placement advisory",
          "Policy administration and renewal tracking",
          "Claim advisory and escalation coordination",
          "Digital updates across portal and WhatsApp"
        ].map((x) => (
          <div key={x} className="rounded-2xl border border-black/10 p-4 text-[#111789]/80">
            {x}
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-4 text-[#111789]/80">
        <p>
          KEK is recognized for swift premium and claims settlement support, backed by structured processes and
          dedicated client relationship management.
        </p>
        <p>
          Our digital platform further enhances delivery through self-service, milestone tracking, and omnichannel
          communication with WhatsApp handoff.
        </p>
      </div>
    </BrokerSectionLayout>
  );
}

