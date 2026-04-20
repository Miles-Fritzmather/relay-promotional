import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/** Avoids static prerender errors when Clerk keys are missing or invalid during `next build`. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Relay — Legal AI, private by default",
  description:
    "Relay is a fully local AI platform for law firms. Knowledge wiki, autonomous billing, in-depth research, and agentic workflows — all on your hardware, never ours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmMono.variable} ${GeistSans.variable}`}
    >
      <body>
        <ClerkProvider waitlistUrl="/">{children}</ClerkProvider>
      </body>
    </html>
  );
}
