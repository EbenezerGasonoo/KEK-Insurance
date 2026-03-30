import Link from "next/link";
import { BrokerSectionLayout } from "@/components/BrokerSectionLayout";

const teamLinks = [
  { label: "Board of Directors", href: "/kek-insurance-brokers/our-team/board-of-directors" },
  { label: "Executive Management", href: "/kek-insurance-brokers/our-team/executive-management" },
  { label: "Technical Unit", href: "/kek-insurance-brokers/our-team/technical-unit" },
  { label: "Branch Network", href: "/kek-insurance-brokers/our-team/branch-network" }
];

export default function OurTeamPage() {
  return (
    <BrokerSectionLayout title="Our Team" subtitle="Explore KEK Insurance Brokers leadership and specialist units.">
      <div className="grid sm:grid-cols-2 gap-3">
        {teamLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-2xl border border-black/10 p-4 hover:bg-black/[0.02] transition"
          >
            <div className="font-semibold text-[#111789]">{l.label}</div>
            <div className="text-sm text-[#111789]/70 mt-1">View profile overview</div>
          </Link>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-black/10 bg-[#f8f9ff] p-5">
        <h3 className="font-semibold text-[#111789]">Leadership approach</h3>
        <p className="mt-2 text-sm text-[#111789]/75">
          KEK teams combine technical insurance depth with responsive client support, enabling better placement,
          better service delivery, and faster claims coordination.
        </p>
      </div>
    </BrokerSectionLayout>
  );
}

