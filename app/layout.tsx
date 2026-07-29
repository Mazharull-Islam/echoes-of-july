import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Newsreader,
} from "next/font/google";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./globals.css";

// UI chrome: nav, buttons, headers, labels. Replaces the previous Geist Sans
// default for `font-sans` so chrome inherits Plex Sans automatically.
const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Narrative text: dialogue, choice prompts, evidence body. Exposed as
// `font-serif`. Italic is included for the occasional emphatic pull-quote.
const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Metadata: dates, "Scene N of M" counters, source captions.
const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Echoes of July",
  description: "An interactive documentary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1">
          <Container className="py-8 sm:py-12">{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
