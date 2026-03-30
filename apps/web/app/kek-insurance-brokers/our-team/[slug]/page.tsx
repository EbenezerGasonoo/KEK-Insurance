import { notFound } from "next/navigation";
import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

const content: Record<string, { title: string; summary: string }> = {
  "board-of-directors": {
    title: "Board of Directors",
    summary: "Governance leadership and strategic oversight for sustainable growth."
  },
  "executive-management": {
    title: "Executive Management",
    summary: "Day-to-day leadership focused on service excellence and operational performance."
  },
  "technical-unit": {
    title: "Technical Unit",
    summary: "Specialists in underwriting support, claims advisory, and risk solutions."
  },
  "branch-network": {
    title: "Branch Network",
    summary: "Regional presence delivering close client support and fast service delivery."
  }
};

export default async function TeamSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = content[slug];
  if (!item) notFound();

  return (
    <BrokerSectionLayout title={item.title} subtitle={item.summary}>
      <div className="space-y-4">
        <p className="text-[#111789]/80">
          This section is ready for your real team profiles. We can plug in leadership bios, photos, and responsibilities
          next.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Profile summary and role scope",
            "Core responsibilities and reporting lines",
            "Experience and certifications",
            "Contact channel and escalation path"
          ].map((x) => (
            <div key={x} className="rounded-2xl border border-black/10 p-4 text-sm text-[#111789]/75">
              {x}
            </div>
          ))}
        </div>
      </div>
    </BrokerSectionLayout>
  );
}

