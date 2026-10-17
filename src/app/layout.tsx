import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Calistoga } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== "http://localhost:3000"
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://yadavamarjit.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amarjit Yadav | Full Stack Developer & Tech Lead",
    template: "%s | Amarjit Yadav (Yadav Amarjit)",
  },
  description:
    "Official portfolio of Amarjit Yadav (Yadav Amarjit) — Tech Lead, Full Stack Developer, and Software Engineer. Specializing in React, Next.js, Node.js, TypeScript, Cloud Architecture, and AI/LLM solutions.",
  applicationName: "Amarjit Yadav Portfolio",
  authors: [{ name: "Amarjit Yadav", url: "https://github.com/Yadavamarjit" }],
  generator: "Next.js",
  keywords: [
    // Name variations
    "Amarjit Yadav",
    "Yadav Amarjit",
    "Amarjit",
    "yadavamarjit",
    "Amarjit Yadav portfolio",
    "Yadav Amarjit portfolio",
    "Amarjit Yadav developer",
    "Yadav Amarjit developer",
    "Amarjit Yadav software engineer",
    "Amarjit Yadav tech lead",
    "Amarjit Yadav GitHub",
    "Amarjit Yadav LinkedIn",
    // Roles & Titles
    "Software Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Tech Lead",
    "Technical Lead",
    "Frontend Developer",
    "Frontend Engineer",
    "Backend Developer",
    "Backend Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    // Technologies
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "DynamoDB",
    "AWS",
    "Amazon EC2",
    "Tailwind CSS",
    "Material UI",
    "Socket.IO",
    "OpenAI",
    "LLM Integration",
    "Pinecone",
    "REST API",
    "Microservices",
    // Domains & Skills
    "Web Application Development",
    "Performance Optimization",
    "Real-time Systems",
    "E-commerce Checkout",
    "AI Chatbots",
    "AskAmar",
    // Intent / Hiring
    "Hire Full Stack Developer",
    "Hire Software Engineer",
    "Hire React Developer",
    "Software Developer India",
  ],
  creator: "Amarjit Yadav",
  publisher: "Amarjit Yadav",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "Amarjit Yadav Portfolio",
    title: "Amarjit Yadav | Full Stack Developer & Tech Lead",
    description:
      "Explore the work of Amarjit Yadav (Yadav Amarjit) — Tech Lead and Full Stack Software Developer building high-performance web applications, real-time systems, and AI-driven products.",
    images: [
      {
        url: "https://i.ibb.co/JBZBPRK/Screenshot-2025-01-07-012552.png",
        width: 1200,
        height: 630,
        alt: "Amarjit Yadav - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amarjit Yadav | Full Stack Developer & Tech Lead",
    description:
      "Official portfolio of Amarjit Yadav (Yadav Amarjit) — Tech Lead and Full Stack Developer.",
    images: ["https://i.ibb.co/JBZBPRK/Screenshot-2025-01-07-012552.png"],
    creator: "@yadavamarjit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Amarjit Yadav",
        alternateName: ["Yadav Amarjit", "Amarjit", "yadavamarjit"],
        url: siteUrl,
        image: "https://i.ibb.co/JBZBPRK/Screenshot-2025-01-07-012552.png",
        jobTitle: "Tech Lead & Full Stack Software Developer",
        description:
          "Amarjit Yadav (Yadav Amarjit) is a Tech Lead and Full Stack Software Developer specializing in React, Next.js, Node.js, TypeScript, Cloud Architecture, and AI/LLM integration.",
        sameAs: [
          "https://github.com/Yadavamarjit",
          "https://www.linkedin.com/in/yadav-amarjit/",
          "mailto:yadavamarjit772@gmail.com",
        ],
        worksFor: [
          {
            "@type": "Organization",
            name: "Dpanda",
          },
          {
            "@type": "Organization",
            name: "Borderfree",
          },
        ],
        knowsAbout: [
          "Software Engineering",
          "Full Stack Web Development",
          "React.js",
          "Next.js",
          "Node.js",
          "TypeScript",
          "JavaScript",
          "Express.js",
          "MongoDB",
          "DynamoDB",
          "Amazon Web Services (AWS)",
          "Socket.IO",
          "OpenAI",
          "Artificial Intelligence",
          "Large Language Models (LLM)",
          "REST APIs",
          "Microservices",
          "Tailwind CSS",
          "Performance Optimization",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Amarjit Yadav Portfolio",
        alternateName: "Yadav Amarjit Portfolio",
        description:
          "Official portfolio of Amarjit Yadav (Yadav Amarjit), Tech Lead and Full Stack Developer.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: "Amarjit Yadav (Yadav Amarjit) - Profile",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-[#0a192f] text-white antialiased font-sans overflow-x-hidden"
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
