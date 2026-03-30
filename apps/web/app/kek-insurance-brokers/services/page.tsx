import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

const items = [
  { title: "Accident (General) Insurance", desc: "Protection against common risk events for individuals and businesses." },
  { title: "General Business", desc: "Tailored business risk cover aligned to your operating model." },
  { title: "Motor Insurance", desc: "Personal and fleet motor solutions with claims guidance." },
  { title: "Marine Insurance", desc: "Cargo and shipment-related risk protection and advisory." },
  { title: "Liability", desc: "Coverage for legal liabilities and third-party exposures." },
  { title: "Money Insurance", desc: "Risk cover for money-in-transit and related scenarios." },
  { title: "Personal Lines", desc: "Insurance products designed for personal asset protection." },
  { title: "Life Assurance", desc: "Long-term protection and continuity-focused life cover." }
];

export default function ServicesPage() {
  return (
    <BrokerSectionLayout title="Services" subtitle="Products and services from KEK Insurance Brokers.">
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-black/10 p-4">
            <div className="font-semibold text-[#111789]">{item.title}</div>
            <div className="mt-1 text-sm text-[#111789]/70">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-black/10 bg-[#f8f9ff] p-5">
        <h3 className="font-semibold text-[#111789]">Service model</h3>
        <p className="mt-2 text-sm text-[#111789]/75">
          We assess risk context, recommend fit-for-purpose cover, coordinate insurer placement, and stay involved
          through claim resolution.
        </p>
      </div>
    </BrokerSectionLayout>
  );
}

