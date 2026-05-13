import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms of Service — PalBreeder",
  description:
    "Terms of Service for PalBreeder — the rules for using our Palworld calculators, content, and APIs.",
  path: "/terms-of-service",
  ogType: "article",
  keywords: ["terms of service", "PalBreeder license"],
});

const lastUpdated = "May 1, 2026";

export default function TermsOfServicePage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto prose prose-invert prose-blue
          prose-headings:text-white
          prose-h1:text-4xl prose-h1:font-extrabold
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
          prose-p:text-[#8b95a5] prose-p:leading-relaxed
          prose-li:text-[#8b95a5]
          prose-strong:text-white
          prose-a:text-[var(--pw-blue)] hover:prose-a:text-white">
        <h1>Terms of Service</h1>
        <p className="text-xs uppercase tracking-widest text-[#5e6a7e] font-bold not-prose mb-8">
          Last updated: {lastUpdated}
        </p>

        <p>
          These Terms of Service ("Terms") govern your use of PalBreeder at{" "}
          <a href={siteUrl}>{siteUrl.replace(/^https?:\/\//, "")}</a> (the "Service"). By using the Service, you agree to these Terms.
        </p>

        <h2>1. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service in any way that violates applicable law or infringes another party's rights.</li>
          <li>Scrape, mirror, or systematically download content beyond reasonable personal use without prior written permission.</li>
          <li>Attempt to disrupt, overload, or compromise the Service or its underlying infrastructure.</li>
          <li>Reverse engineer, decompile, or attempt to extract source code beyond what is publicly served.</li>
        </ul>

        <h2>2. Content and intellectual property</h2>
        <p>
          The PalBreeder name, logo, calculators, guides, and data sets are owned by PalBreeder or its licensors and protected by intellectual property laws. You receive a limited, non-exclusive, non-transferable license to use the Service for personal, non-commercial use.
        </p>
        <p>
          Palworld, all Pal designs, names, and game assets referenced on the Service are the property of Pocketpair, Inc. PalBreeder is an independent fan tool and is not affiliated with, endorsed by, or sponsored by Pocketpair.
        </p>

        <h2>3. Accuracy and disclaimers</h2>
        <p>
          We work hard to keep calculator outputs and guides accurate, but the Service is provided <strong>"as is"</strong> without warranties of any kind, express or implied. Game mechanics can change between patches and we make no guarantee that all content reflects the latest game state at every moment.
        </p>

        <h2>4. Third-party links</h2>
        <p>
          The Service may link to third-party sites. We are not responsible for the content, privacy practices, or availability of those sites.
        </p>

        <h2>5. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, PalBreeder and its operators are not liable for indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may suspend or restrict access to the Service for users who violate these Terms or abuse the infrastructure.
        </p>

        <h2>7. Changes</h2>
        <p>
          We may update these Terms when our practices change. Continued use of the Service after an update means you accept the revised Terms.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:hello@breedingpalworldcalculator.com">hello@breedingpalworldcalculator.com</a>.
        </p>
      </article>
    </div>
  );
}
