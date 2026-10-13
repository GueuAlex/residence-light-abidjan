import type { Metadata, Viewport } from "next";
import { Gloock, Hanken_Grotesk } from "next/font/google";
import { residence } from "@/content/site";
import "./globals.css";

const gloock = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-gloock", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://residence-light-abidjan.vercel.app"),
  title: `${residence.nom} · Appartements meublés à ${residence.ville}`,
  description: residence.description,
  // Site de prospection : pas d'indexation avant la signature
  robots: { index: false, follow: false },
  openGraph: {
    title: `${residence.nom} · ${residence.slogan}`,
    description: residence.description,
    siteName: residence.nom,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fffdf8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${gloock.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
