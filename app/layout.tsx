import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
