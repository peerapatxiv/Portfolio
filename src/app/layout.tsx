import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import data from "@/data/data.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${data.about.firstname} ${data.about.lastname} — ${data.about.role}`,
  description: data.about.bio,
  authors: [{ name: `${data.about.firstname} ${data.about.lastname}` }],
  keywords: ["Software Developer", "Web Developer", "Frontend", "React", "Next.js", "Bangkok", "Thailand"],
  openGraph: {
    title: `${data.about.firstname} ${data.about.lastname} — ${data.about.role}`,
    description: data.about.bio,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${data.about.firstname} ${data.about.lastname} — ${data.about.role}`,
    description: data.about.bio,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
