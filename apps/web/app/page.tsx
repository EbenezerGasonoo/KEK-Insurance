import { KekHeader } from "@/components/KekHeader";
import { QuoteFunnel } from "@/components/QuoteFunnel";
import { VirtualBrokerDemo } from "@/components/VirtualBrokerDemo";
import { LandingHero } from "@/components/LandingHero";
import { LandingWhyKeK } from "@/components/LandingWhyKeK";
import { LandingServices } from "@/components/LandingServices";
import { LandingClaimsAnchor } from "@/components/LandingClaimsAnchor";
import { LandingNewsContact } from "@/components/LandingNewsContact";
import { LandingWarmImages } from "@/components/LandingWarmImages";
import { LandingAutomationDemo } from "@/components/LandingAutomationDemo";
import { SiteDesignHelpPopup } from "@/components/SiteDesignHelpPopup";
import { KekFooter } from "@/components/KekFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <KekHeader />

      <main>
        <LandingHero />

        {/* Structured body starts here */}
        <section className="bg-gradient-to-b from-[#fffdf7] to-white border-y border-black/5">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="rounded-3xl border border-black/5 bg-white p-5 sm:p-6 shadow-sm">
              <div className="text-xs font-semibold tracking-wide text-[#111789]/60">YOUR DIGITAL JOURNEY</div>
              <h2 className="mt-2 text-2xl font-semibold text-[#111789]">Everything you need in one structured flow</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { title: "Explore KEK", href: "#why-kek" },
                  { title: "Get a Quote", href: "#quote" },
                  { title: "Track Claims", href: "#claims" },
                  { title: "AI + Automation", href: "#ai" }
                ].map((x, i) => (
                  <a
                    key={x.title}
                    href={x.href}
                    className="rounded-2xl border border-black/10 p-4 hover:bg-black/[0.02] transition"
                  >
                    <div className="text-xs text-[#111789]/60">Step 0{i + 1}</div>
                    <div className="mt-1 font-semibold text-[#111789]">{x.title}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <LandingWarmImages />
        </section>

        <section className="bg-[#f7f8ff] border-y border-black/5">
          <div className="max-w-6xl mx-auto">
            <LandingWhyKeK />
            <LandingServices />
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-6xl mx-auto">
            <LandingClaimsAnchor />
          </div>
        </section>

        <section className="bg-[#fffdf7] border-y border-black/5">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-5">
              <div className="text-xs font-semibold tracking-wide text-[#111789]/60">QUOTE EXPERIENCE</div>
              <h3 className="mt-1 text-2xl font-semibold text-[#111789]">SME Quick Quote</h3>
            </div>
            <QuoteFunnel />
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-5">
              <div className="text-xs font-semibold tracking-wide text-[#111789]/60">ASSISTED SUPPORT</div>
              <h3 className="mt-1 text-2xl font-semibold text-[#111789]">Virtual Broker + WhatsApp Handoff</h3>
            </div>
            <VirtualBrokerDemo />
          </div>
        </section>

        <section className="bg-[#f7f8ff] border-y border-black/5">
          <LandingAutomationDemo />
        </section>

        <section className="bg-white">
          <LandingNewsContact />
        </section>
      </main>

      <KekFooter />

      <SiteDesignHelpPopup />
    </div>
  );
}
