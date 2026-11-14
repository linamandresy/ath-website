import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SITE_URL, jsonLd } from "@/lib/site-data";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: "ATH Construction Madagascar | Construction de Maisons & Ingénierie",
  description:
    "Découvrez ATH Construction, entreprise familiale spécialisée dans la construction de maisons à Madagascar. Explorez nos réalisations et contactez-nous pour votre projet.",
  authors: [{ name: "ATH Construction" }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ATH Construction | Construction & Ingénierie",
    description:
      "Entreprise familiale de construction de maisons à Madagascar.",
    type: "website",
    locale: "fr_MG",
    url: "/",
    siteName: "ATH Construction",
    images: [
      {
        url: "assets/logo.jpg",
        alt: "Logo ATH Construction",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ATH Construction | Construction & Ingénierie",
    description:
      "Entreprise familiale de construction de maisons à Madagascar.",
    images: ["assets/logo.jpg"],
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
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
