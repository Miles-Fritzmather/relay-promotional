import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

/** Avoids static prerender errors when Clerk keys are missing or invalid during `next build`. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Relay — AI for Law, Kept Local",
  description:
    "Upload Anything, Track Everything, Share Nothing. Relay is the AI legal assistant that runs entirely on your machine. No cloud. No compromise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ClerkProvider waitlistUrl="/">{children}</ClerkProvider>
      </body>
    </html>
  );
}
