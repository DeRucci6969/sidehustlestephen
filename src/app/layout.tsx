import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteSchema } from "@/components/site-schema";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "Side Hustle Stephen - The Launchpad",
  description: "The full business packs, launch assets, and playbooks behind Side Hustle Stephen's short-form ideas.",
  openGraph: {
    title: "Side Hustle Stephen - The Launchpad",
    description: "Unlock the full business packs, launch assets, scripts, and playbooks behind Side Hustle Stephen's short-form ideas.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Side Hustle Stephen - The Launchpad",
    description: "Premium side hustle launch packs, scripts, and playbooks for $12/month.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <SiteSchema />
        {children}
      </body>
    </html>
  );
}
