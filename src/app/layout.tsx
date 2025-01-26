import type { Metadata } from "next";
import { Geist as FontHeader, Geist_Mono as FontBody } from "next/font/google";
import "./globals.css";
import { CartProvider } from '../context/CartContext';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontHeader = FontHeader({
  variable: "--font-header",
  subsets: ["latin"],
});

const fontBody = FontBody({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pranjo: Your Premier Destination for Yoga Essentials",
  description: "Discover and purchase premium yoga products at Pranjo. From mats to accessories, find everything you need for your yoga practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontHeader.variable} ${fontBody.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
        {/* Vercel Analytics */}
        <Analytics />
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
