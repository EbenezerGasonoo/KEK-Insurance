import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";
import { SessionProviders } from "@/components/SessionProviders";

const displayFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-kek-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-kek-body"
});

export const metadata: Metadata = {
  title: "KEK Group | Digital Ecosystem",
  description: "Premium, digitally-led insurance experience"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-kek-body)]">
        <SessionProviders>{children}</SessionProviders>
      </body>
    </html>
  );
}

