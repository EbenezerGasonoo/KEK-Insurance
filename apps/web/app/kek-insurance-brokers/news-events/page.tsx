import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

export default function NewsEventsPage() {
  return (
    <BrokerSectionLayout title="News & Events" subtitle="Latest updates and gallery highlights from KEK Insurance Brokers.">
      <div className="space-y-3">
        {[
          "COVID-19 resilience and complex management decisions",
          "Service with expertise and integrity in insurance broking",
          "Claims and premium settlement success stories"
        ].map((headline, idx) => (
          <article key={headline} className="rounded-2xl border border-black/10 p-4">
            <h2 className="font-semibold text-[#111789]">{headline}</h2>
            <p className="text-sm text-[#111789]/70 mt-1">
              Demo placeholder for published story content with publication summary and event context.
            </p>
            <div className="text-xs text-[#111789]/55 mt-2">Posted: 2026-0{idx + 1}-14</div>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-black/10 bg-[#f8f9ff] p-5">
        <h3 className="font-semibold text-[#111789]">Gallery & media</h3>
        <p className="mt-2 text-sm text-[#111789]/75">
          This section is ready for image/video event highlights and downloadable media kits.
        </p>
      </div>
    </BrokerSectionLayout>
  );
}

