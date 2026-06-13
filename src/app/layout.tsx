import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nectar & Oak | Rare Fine Wines, Limited Whiskeys & Premium Spirits Vault",
  description: "Unlock allocations of rare single-malt whiskeys, elite Grand Cru Bordeaux wines, Trappist beers, and custom-blended rum casks. Step into the ultimate luxury sommelier reserve and alchemical spirits cellar.",
  keywords: [
    "rare whiskey allocations",
    "fine wine reserves",
    "grand cru vintages",
    "single malt scotch",
    "luxury spirits cellar",
    "limited release rum",
    "premium champagnes",
    "artisanal craft beers",
    "cask maturation cooperage",
    "private cellar master",
    "nectar and oak reserve"
  ],
  authors: [{ name: "Nectar & Oak Vaults" }],
  openGraph: {
    title: "Nectar & Oak | Elite Spirits Vault & Vintage Cellars",
    description: "Slumbering reserves of rare single-malt whiskeys, Grand Cru Bordeaux vintages, and luxury alchemical spirits.",
    url: "https://nectar-and-oak.com",
    siteName: "Nectar & Oak Reserve",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
