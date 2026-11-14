import type { Metadata, Viewport } from "next";
import { SITE_URL, jsonLd } from "@/lib/site-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: "ATH Construction Madagascar | Construction de Maisons & Ingénierie",
  description:
    "Découvrez ATH Construction, entreprise familiale spécialisée dans la construction de maisons à Madagascar. Explorez nos réalisations et contactez-nous pour votre projet.",
  authors: [{ name: "ATH Construction" }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL + "/",
  },
  openGraph: {
    title: "ATH Construction | Construction & Ingénierie",
    description:
      "Entreprise familiale de construction de maisons à Madagascar.",
    type: "website",
    locale: "fr_MG",
    url: SITE_URL + "/",
    siteName: "ATH Construction",
    images: [
      {
        url: `${SITE_URL}/assets/logo.jpg`,
        alt: "Logo ATH Construction",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ATH Construction | Construction & Ingénierie",
    description:
      "Entreprise familiale de construction de maisons à Madagascar.",
    images: [`${SITE_URL}/assets/logo.jpg`],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23080808'/%3E%3Cpath d='M6 24 16 7l10 17z' fill='none' stroke='%2343C65A' stroke-width='2'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Runtime Google Fonts (same as prior static site) — avoids build-time fetch failures. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- runtime fonts avoid build-time Google Fonts dependency for Pages CI */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
