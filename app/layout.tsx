import Link from "next/link";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "EveningSideOfTech — AI Internships & Career Launchpad",
  description:
    "Build real AI systems, not demo projects. Premium internship tracks designed for operators, builders, and high-agency talent.",
  authors: [{ name: "EveningSideOfTech AI" }],
  openGraph: {
    title: "EveningSideOfTech — AI Internships & Career Launchpad",
    description:
      "Premium AI internship tracks. Strategy, engineering, adoption, and product roles with real mentorship.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@EveningSideOfTech_ai",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
