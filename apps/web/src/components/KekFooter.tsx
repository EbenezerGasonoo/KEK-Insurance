"use client";

import Link from "next/link";

export function KekFooter() {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[#111789]" />
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,.22) 0, transparent 28%), radial-gradient(circle at 80% 10%, rgba(255,255,255,.15) 0, transparent 26%), linear-gradient(120deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 40%), linear-gradient(60deg, rgba(255,255,255,.05) 0%, rgba(255,255,255,0) 50%)"
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#D4AF37] font-semibold">Products & Services</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-white/90">
              {[
                "Accident (General) Insurance",
                "General Business",
                "Motor Insurance",
                "Marine Insurance",
                "Liability",
                "Money Insurance",
                "Personal Lines",
                "Life Assurance"
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-semibold">Useful Links</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-white/90">
              {[
                { label: "KEK Insurance Brokers", href: "/kek-insurance-brokers/about-us" },
                { label: "KEK Reinsurance", href: "/kek-insurance-brokers/services" },
                { label: "KEK Cote d’Ivoire", href: "/kek-insurance-brokers/about-us" },
                { label: "KEK Liberia", href: "/kek-insurance-brokers/about-us" },
                { label: "KEK Sierra Leone", href: "/kek-insurance-brokers/about-us" },
                { label: "KEK Life", href: "/kek-insurance-brokers/services" }
              ].map((x) => (
                <li key={x.label}>
                  <Link href={x.href} className="hover:text-[#D4AF37] transition-colors">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-semibold">Let&apos;s Aid You</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-white/90">
              {[
                "Compliance Policies",
                "Frequently Asked Questions",
                "Claims Registration",
                "Proposal Forms",
                "Enquiry Form"
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-semibold">Contact Us</h3>
            <div className="mt-3 text-sm text-white/90 space-y-2">
              <p>
                KEK Insurance Broking House
                <br />
                No. 40/41 Senchi Street @ Aviation Road,
                <br />
                Airport Residential Area, Accra
              </p>
              <p>
                Tel:
                <br />
                +233 (0) 302 764 023
              </p>
              <p>
                Email: kek@kekgroup.net
                <br />
                Address: P. O. Box AN 6681, Accra-North,
                <br />
                Ghana, West Africa
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-white/15 text-xs text-white/80">
          © 2022 KEK Insurance Brokers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

