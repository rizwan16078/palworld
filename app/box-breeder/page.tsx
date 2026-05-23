import type { Metadata } from "next";
import BoxBreeder from "@/components/BoxBreeder";
import { siteUrl, siteName } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Multi-Step Box Breeder — Palworld Calculator",
  description: "Find the shortest Palworld breeding chain from the Pals you already own to your target Pal.",
  path: "/box-breeder",
  keywords: [
    "Palworld box breeder",
    "Palworld shortest breeding path",
    "Palworld multi step breeding",
    "Palworld inventory breeding",
    "Palworld breeding chain calculator",
  ],
});

export default function BoxBreederPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Palworld Multi-Step Box Breeder",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    description: "Input the Pals you already own to calculate the shortest, most efficient breeding chain to reach any target Pal in Palworld.",
    url: `${siteUrl}/box-breeder`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-[var(--pw-blue)]">Box</span>{" "}
            <span className="text-[var(--pw-text)]">Breeder</span>
          </h1>
          <p className="text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            Don&apos;t want to start from scratch? Select the Pals currently in your Palbox, pick a target Pal, and we&apos;ll calculate the shortest breeding route using only what you have.
          </p>
        </div>

        <BoxBreeder />
        
        {/* SEO Content */}
        <section className="max-w-3xl mx-auto mt-16 prose prose-invert prose-p:text-[var(--pw-text-muted)] prose-headings:text-white">
          <div className="p-6 rounded-2xl border border-[var(--pw-border)] bg-[#131b26]/50">
            <h2 className="text-xl font-bold mt-0 mb-4">How to use the Box Breeder</h2>
            <p className="text-sm">
              Standard breeding calculators ask you to pick two parents and tell you the child. The <strong>Box Breeder</strong> works in reverse over multiple generations. 
            </p>
            <ol className="text-sm space-y-2 mt-4 ml-4 list-decimal text-[var(--pw-text-dim)]">
              <li><strong>Select your target:</strong> Pick the Pal you are trying to obtain (e.g., Anubis).</li>
              <li><strong>Input your inventory:</strong> Add 5-10 Pals you already have in your Palbox that have good passive skills.</li>
              <li><strong>Calculate:</strong> The tool will map out a multi-step breeding tree, showing you exactly which Pals to breed together step-by-step to reach your goal.</li>
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
