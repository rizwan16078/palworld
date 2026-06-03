import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { siteName, siteUrl, siteDescription } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | PalBreeder`,
  },
  description: siteDescription,
  // Per-page metadata sets full openGraph/twitter blocks (see lib/seo.ts).
  // We omit them here so children don't silently inherit a stale og:url.
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "peE6sMHTfQOZrHiqBpEWOzPA4OPcv__4tt9rydf_ZsY",
    yandex: "919001dc75add260",
    other: {
      "msvalidate.01": "2B1BC6D0939A71E8F71442B1F50A9065",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1923",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <head>
        {/* Preconnect to Google Analytics origins so those requests start immediately */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
