import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

export default function VisionMissionPage() {
  return (
    <BrokerSectionLayout
      title="Vision and Mission"
      subtitle="Delivering first-class insurance brokerage through expertise, integrity, and speed."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-black/10 p-5">
          <h2 className="font-semibold text-[#111789]">Vision</h2>
          <p className="mt-2 text-sm text-[#111789]/75">
            To remain a digitally enabled market leader in insurance brokerage, trusted for transparent service and
            reliable claims outcomes.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 p-5">
          <h2 className="font-semibold text-[#111789]">Mission</h2>
          <p className="mt-2 text-sm text-[#111789]/75">
            To provide high-quality, client-centered insurance solutions with efficient delivery, intelligent
            automation, and proactive risk management.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-black/10 p-5 bg-[#f8f9ff]">
        <h3 className="font-semibold text-[#111789]">Strategic priorities</h3>
        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          {[
            "Client-centric advisory excellence",
            "Digitally transparent claims journeys",
            "Regional growth with consistent service standards"
          ].map((x) => (
            <div key={x} className="rounded-xl border border-black/10 bg-white p-3 text-sm text-[#111789]/75">
              {x}
            </div>
          ))}
        </div>
      </div>
    </BrokerSectionLayout>
  );
}

