import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      // Passive skill URLs: underscores → hyphens (SEO best practice, 16 pages)
      { source: "/passives/divine_dragon", destination: "/passives/divine-dragon", permanent: true },
      { source: "/passives/lord_of_the_underworld", destination: "/passives/lord-of-the-underworld", permanent: true },
      { source: "/passives/flame_emperor", destination: "/passives/flame-emperor", permanent: true },
      { source: "/passives/earth_emperor", destination: "/passives/earth-emperor", permanent: true },
      { source: "/passives/spirit_emperor", destination: "/passives/spirit-emperor", permanent: true },
      { source: "/passives/celestial_emperor", destination: "/passives/celestial-emperor", permanent: true },
      { source: "/passives/ice_emperor", destination: "/passives/ice-emperor", permanent: true },
      { source: "/passives/lord_of_lightning", destination: "/passives/lord-of-lightning", permanent: true },
      { source: "/passives/lord_of_the_sea", destination: "/passives/lord-of-the-sea", permanent: true },
      { source: "/passives/burly_body", destination: "/passives/burly-body", permanent: true },
      { source: "/passives/work_slave", destination: "/passives/work-slave", permanent: true },
      { source: "/passives/diet_lover", destination: "/passives/diet-lover", permanent: true },
      { source: "/passives/stronghold_strategist", destination: "/passives/stronghold-strategist", permanent: true },
      { source: "/passives/motivational_leader", destination: "/passives/motivational-leader", permanent: true },
      { source: "/passives/mine_foreman", destination: "/passives/mine-foreman", permanent: true },
      { source: "/passives/logging_foreman", destination: "/passives/logging-foreman", permanent: true },
    ];
  },
  async headers() {
    return [
      // ── 1. Security + HTML page cache (matched first, overridden below for static assets) ──
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          // HTML pages: CDN edge cache 1 h, serve stale for up to 1 day while revalidating
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      // ── 2. Next.js static chunks (JS/CSS) — content-hashed, safe to cache 1 year ──
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // ── 3. Next.js optimised images — vary per format/size but revalidate daily ──
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      // ── 4. Public static assets — 7-day browser + CDN cache ──
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/pal/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/logo.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/og-image.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
