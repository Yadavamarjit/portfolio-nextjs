import type { Metadata } from "next";
import "./globals.css";
import { Inter, Calistoga } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Yadav Amarjit",
  description: "Empowering Ideas into Interactive Digital Realities",
  openGraph: {
    title: "Yadav Amarjit",
    description: "Empowering Ideas into Interactive Digital Realities",
    images: ["https://i.ibb.co/JBZBPRK/Screenshot-2025-01-07-012552.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-[#0a192f] text-white antialiased font-sans overflow-x-hidden"
          // "bg-gray-800 text-white antialiased font-sans overflow-x-hidden"
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
