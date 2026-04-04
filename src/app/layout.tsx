import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Checkit Content Explorer",
    template: "%s | Checkit Content Explorer",
  },
  description:
    "A polished content explorer built with Next.js, TypeScript, and a focus on responsive browsing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Toaster richColors duration={500} position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
