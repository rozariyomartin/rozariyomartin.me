import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rozariyomartin.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Martin Rozariyo | Cybersecurity Portfolio",
    template: "%s | Martin Rozariyo"
  },
  description:
    "Portfolio of Martin Rozariyo, a cybersecurity student focused on web security, CTFs, and red team fundamentals.",
  keywords: [
    "Martin Rozariyo",
    "cybersecurity student",
    "CTF player",
    "web security",
    "Team Hunter",
    "portfolio"
  ],
  authors: [{ name: "Martin Rozariyo", url: "https://github.com/rozariyomartin" }],
  creator: "Martin Rozariyo",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Martin Rozariyo | Cybersecurity Portfolio",
    description:
      "Cybersecurity student, CTF player, and web security enthusiast focused on practical security engineering.",
    siteName: "Martin Rozariyo"
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Rozariyo | Cybersecurity Portfolio",
    description:
      "Cybersecurity student, CTF player, and web security enthusiast focused on practical security engineering."
  },
  alternates: {
    canonical: siteUrl
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
