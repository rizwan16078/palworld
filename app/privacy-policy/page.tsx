import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy — PalBreeder",
  description:
    "Privacy Policy for PalBreeder — what data we collect, how analytics work, cookie usage, and how to contact us about your data.",
  path: "/privacy-policy",
  ogType: "article",
  keywords: ["privacy policy", "data collection", "cookies"],
});

const lastUpdated = "May 1, 2026";

export default function PrivacyPolicyPage() {
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
        <h1>Privacy Policy</h1>
        <p className="text-xs uppercase tracking-widest text-[#5e6a7e] font-bold not-prose mb-8">
          Last updated: {lastUpdated}
        </p>

        <p>
          This Privacy Policy explains what information PalBreeder collects when you use{" "}
          <a href={siteUrl}>{siteUrl.replace(/^https?:\/\//, "")}</a> and how that information is used.
        </p>

        <h2>1. Information we collect</h2>
        <p>
          PalBreeder is primarily a calculator and reference site. You do not need an account to use it. The information we collect is limited to:
        </p>
        <ul>
          <li><strong>Anonymous usage analytics:</strong> page views, referrer, country, device class, and screen size — collected through Google Analytics to improve the site.</li>
          <li><strong>Server logs:</strong> standard request logs including IP address, user agent, and timestamps, retained for security and abuse prevention.</li>
          <li><strong>Email correspondence:</strong> if you email us, we keep the message so we can respond and track the issue.</li>
        </ul>

        <h2>2. Cookies and similar technologies</h2>
        <p>
          We use a small number of first-party cookies for site preferences (for example, remembering your last selected calculator inputs) and third-party cookies set by Google Analytics. You can block cookies in your browser without losing core functionality.
        </p>

        <h2>3. Advertising</h2>
        <p>
          If we display ads, those ads may be served by third-party networks that use cookies and device identifiers to measure performance. We do not share personally identifying information with advertisers.
        </p>

        <h2>4. Data sharing</h2>
        <p>
          We do not sell personal data. We share anonymized data only with the analytics provider used to operate the site. We may disclose information if required by law or to protect the integrity of the service.
        </p>

        <h2>5. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to request access to, correction of, or deletion of personal data we hold about you. Send requests to{" "}
          <a href="mailto:hello@breedingpalworldcalculator.com">hello@breedingpalworldcalculator.com</a>.
        </p>

        <h2>6. Children</h2>
        <p>
          PalBreeder is not directed at children under 13 and we do not knowingly collect personal information from them.
        </p>

        <h2>7. Changes to this policy</h2>
        <p>
          We may update this policy when our practices change. Material updates will be reflected in the "Last updated" date at the top of this page.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello@breedingpalworldcalculator.com">hello@breedingpalworldcalculator.com</a>.
        </p>
      </article>
    </div>
  );
}
