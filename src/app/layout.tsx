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

const siteUrl = "https://ydvamar.online";

export const viewport: Viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amarjit Yadav (Yadv Amar / Yadav Amar) | Tech Lead & Full Stack Developer",
    template: "%s | Amarjit Yadav (Yadv Amar)",
  },
  description:
    "Official website of Amarjit Yadav (also known as Yadav Amarjit, Yadv Amar, Yadav Amar, ydvamar). Tech Lead, Full Stack Developer, and Software Engineer specializing in React, Next.js, Node.js, TypeScript, Cloud Architecture, and AI/LLM products.",
  applicationName: "Amarjit Yadav Portfolio",
  authors: [{ name: "Amarjit Yadav", url: "https://github.com/Yadavamarjit" }],
  generator: "Next.js",
  keywords: [
    // Direct search queries requested by user
    "amarjit",
    "yadv amar",
    "yadav amarjit",
    "yadav amar",
    "amarjit yadav",
    "ydvamar",
    "ydv amar",
    "amar",
    "ydvamar.online",
    // Name & Portfolio queries
    "amarjit portfolio",
    "yadv amar portfolio",
    "yadav amar portfolio",
    "yadav amarjit portfolio",
    "amarjit yadav portfolio",
    "ydvamar portfolio",
    // Professional search queries
    "amarjit developer",
    "amarjit software engineer",
    "yadv amar developer",
    "yadav amar developer",
    "yadav amarjit developer",
    "amarjit yadav software engineer",
    "amarjit yadav tech lead",
    "yadv amar tech lead",
    "amarjit github",
    "amarjit linkedin",
    "yadavamarjit github",
    // Tech roles
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
    // Tech Stack
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
    // Domain & Intent
    "Web Application Development",
    "Performance Optimization",
    "Real-time Systems",
    "E-commerce Checkout",
    "AI Chatbots",
    "AskAmar",
    "Hire Full Stack Developer",
    "Hire Software Engineer",
    "Hire React Developer",
    "Software Developer India",
  ],
  creator: "Amarjit Yadav (Yadv Amar)",
  publisher: "Amarjit Yadav",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "Amarjit Yadav (Yadv Amar) Portfolio",
    title: "Amarjit Yadav (Yadv Amar / Yadav Amar) | Tech Lead & Full Stack Developer",
    description:
      "Explore projects, achievements, and tech stacks by Amarjit Yadav (Yadav Amarjit, Yadv Amar, Yadav Amar, ydvamar) — Tech Lead and Full Stack Software Developer.",
    images: [
      {
        url: `${siteUrl}/amar.webp`,
        secureUrl: `${siteUrl}/amar.webp`,
        width: 800,
        height: 800,
        alt: "Amarjit Yadav (Yadav Amarjit, Yadv Amar) - Tech Lead & Full Stack Developer",
        type: "image/webp",
      },
      {
        url: `${siteUrl}/assets/amar.webp`,
        secureUrl: `${siteUrl}/assets/amar.webp`,
        width: 800,
        height: 800,
        alt: "Amarjit Yadav Profile Photo",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amarjit Yadav (Yadv Amar / Yadav Amar) | Tech Lead & Full Stack Developer",
    description:
      "Official portfolio of Amarjit Yadav (Yadav Amarjit, Yadv Amar, Yadav Amar) — Tech Lead & Full Stack Developer.",
    images: [`${siteUrl}/amar.webp`],
    creator: "@yadavamarjit",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/amar.webp",
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
        alternateName: [
          "Yadav Amarjit",
          "Yadv Amar",
          "Yadav Amar",
          "Amarjit",
          "Amar",
          "ydvamar",
          "ydv amar",
          "yadavamarjit",
        ],
        url: siteUrl,
        image: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#primaryimage`,
          url: `${siteUrl}/amar.webp`,
          contentUrl: `${siteUrl}/amar.webp`,
          caption: "Amarjit Yadav (Yadv Amar / Yadav Amarjit) - Tech Lead & Full Stack Developer",
          width: 800,
          height: 800,
        },
        jobTitle: "Tech Lead & Full Stack Software Developer",
        description:
          "Amarjit Yadav (also searched as Yadv Amar, Yadav Amar, Yadav Amarjit, Amarjit) is a Tech Lead and Full Stack Software Developer specializing in Next.js, React, Node.js, Cloud Architecture, and AI/LLM systems.",
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
        name: "Amarjit Yadav | Yadv Amar Portfolio",
        alternateName: [
          "Yadav Amarjit Portfolio",
          "Yadv Amar Portfolio",
          "Yadav Amar Portfolio",
          "ydvamar.online",
          "Amarjit Portfolio",
        ],
        description:
          "Official portfolio of Amarjit Yadav (Yadv Amar / Yadav Amarjit), Tech Lead and Full Stack Developer.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: "Amarjit Yadav (Yadv Amar, Yadav Amar, Yadav Amarjit) - Profile",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
        primaryImageOfPage: {
          "@id": `${siteUrl}/#primaryimage`,
        },
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#primaryimage`,
        url: `${siteUrl}/amar.webp`,
        contentUrl: `${siteUrl}/amar.webp`,
        name: "Amarjit Yadav (Yadav Amarjit, Yadv Amar, Yadav Amar)",
        caption: "Amarjit Yadav - Full Stack Software Developer & Tech Lead",
        representativeOfPage: true,
        width: 800,
        height: 800,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta property="og:image:alt" content="Amarjit Yadav (Yadv Amar, Yadav Amar)" />
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
