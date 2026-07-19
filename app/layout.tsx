import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "319Junk | Junk Removal in Eastern & Southeast Iowa",
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { title: "You Call, We Haul! | 319Junk", description: siteConfig.description, url: "/", siteName: "319Junk", type: "website", images: [{ url: "/brand/319junk-black.png", width: 834, height: 516, alt: "319Junk" }] },
  twitter: { card: "summary_large_image", title: "319Junk", description: siteConfig.description, images: ["/brand/319junk-black.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#090909",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geistSans.variable}>{children}</body></html>;
}
