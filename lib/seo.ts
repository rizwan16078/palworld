import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

type OgType = "website" | "article" | "profile";

interface PageMetaOptions {
  /** The page title. Used VERBATIM in <title> (no " | PalBreeder" suffix
   *  appended). Keep under 60 characters / ~561 pixels for Google snippets. */
  title: string;
  description: string;
  path: string;
  /** Extra page-specific keywords. Merged with a sitewide baseline. */
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  ogType?: OgType;
}

/** Sitewide keyword baseline. Appears on every page; complemented by per-page
 *  keywords passed in via `buildPageMetadata`. */
const BASELINE_KEYWORDS = [
  "Palworld",
  "Palworld breeding",
  "Palworld breeding calculator",
  "PalBreeder",
  "Palworld guide",
  "Palworld Pals",
];

/**
 * Builds a complete Metadata object with self-consistent canonical, hreflang,
 * Open Graph, Twitter, and meta keywords tags for a given route.
 *
 * Important: this returns `title` as an `absolute` value so the parent layout's
 * title template ("%s | PalBreeder") is NOT appended. Each page is fully
 * responsible for its own (≤60 char) title.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = "/og-image.png",
  imageAlt = "PalBreeder — Palworld Breeding Calculator",
  ogType = "website",
}: PageMetaOptions): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = normalizedPath === "/" ? siteUrl : `${siteUrl}${normalizedPath}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const mergedKeywords = Array.from(
    new Set([...BASELINE_KEYWORDS, ...(keywords ?? [])])
  );

  return {
    title: { absolute: title },
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "PalBreeder",
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
