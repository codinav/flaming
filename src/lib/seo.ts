import type { Metadata } from "next";
import { company, addressOneLine } from "./site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? company.url;

const defaultDescription =
  "Flaming Integrated Logistiks Ltd — freight forwarding, customs clearance, and supply chain solutions from Lagos, Nigeria to 120+ countries. We Manage It. We Clear It. We Deliver It.";

export const defaultKeywords = [
  "Logistics Company Nigeria",
  "Freight Forwarding Nigeria",
  "Customs Clearance Lagos",
  "International Shipping Nigeria",
  "Cargo Services Nigeria",
  "Freight Services Lagos",
  "Air Freight Nigeria",
  "Ocean Freight Nigeria",
];

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Global Freight & Logistics`,
    template: `%s · ${company.shortName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} — Global Freight & Logistics`,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — Global Freight & Logistics`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.svg" },
};

/** Helper to build per-page metadata with sensible canonical + OG defaults. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${company.shortName}`, description, url: `${siteUrl}${path}` },
    twitter: { title: `${title} · ${company.shortName}`, description },
  };
}

/** Organization / LocalBusiness JSON-LD for the homepage. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: company.name,
    url: siteUrl,
    telephone: company.phone,
    email: company.emails.info,
    slogan: company.tagline,
    description: defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      addressLocality: company.address.area,
      addressRegion: company.address.city,
      addressCountry: "NG",
    },
    areaServed: "Worldwide",
    openingHours: "Mo-Sa 09:00-18:00",
    sameAs: Object.values(company.social),
  };
}

export { addressOneLine };
