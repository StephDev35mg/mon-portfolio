import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { VisitTracker } from "@/components/visit-tracker";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StephDev35 | Portfolio de GOSINARY NOMENJANAHARY Stéphanot",
  description:
    "Développeur web et mobile passionné, spécialisé en React, Next.js, Node.js, Laravel et technologies modernes. Découvrez mes projets, compétences et réalisations.",
  keywords: [
    "StephDev35",
    "Stéphanot Gosinary",
    "Portfolio",
    "Développeur web",
    "Développeur mobile",
    "React",
    "Next.js",
    "Node.js",
    "Laravel",
    "Javascript",
    "Typescript",
    "Frontend",
    "Backend",
    "Projets",
    "Compétences",
    "Programmation",
    "Madagascar",
    "Fullstack",
    "Développement web",
    "Développement mobile"
  ],
  authors: [{ name: "GOSINARY NOMENJANAHARY Stéphanot", url: "https://stephdev35.vercel.app/" }],
  creator: "StephDev35",
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
  openGraph: {
    title: "StephDev35 | Portfolio de GOSINARY NOMENJANAHARY Stéphanot",
    description:
      "Développeur web et mobile passionné, spécialisé en React, Next.js, Node.js, Laravel et technologies modernes. Découvrez mes projets, compétences et réalisations.",
    url: "https://stephdev35.vercel.app/",
    siteName: "StephDev35 Portfolio",
    images: [
      {
        url: "/steph.jpg",
        width: 1200,
        height: 630,
        alt: "StephDev - Développeur web et mobile",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StephDev35 | Portfolio de GOSINARY NOMENJANAHARY Stéphanot",
    description:
      "Développeur web et mobile passionné, spécialisé en React, Next.js, Node.js, Laravel et technologies modernes. Découvrez mes projets, compétences et réalisations.",
    images: ["/steph.jpg"],
    creator: "@StephDev35",
  },
  icons: {
    icon: "/steph.jpg",
    shortcut: "/steph.jpg",
    apple: "/steph.jpg",
    other: [
      { rel: "icon", url: "/dev.jpg" },
      { rel: "apple-touch-icon", url: "/steph.jpg" },
    ],
  },
  metadataBase: new URL("https://stephdev35.vercel.app/"),
  alternates: {
    canonical: "https://stephdev35.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <Head>
        {/* SEO meta tags supplémentaires */}
        <meta name="keywords" content="StephDev35, Stéphanot Gosinary, Portfolio, Développeur web, Développeur mobile, React, Next.js, Node.js, Laravel, Javascript, Typescript, Frontend, Backend, Projets, Compétences, Programmation, Madagascar, Fullstack, Développement web, Développement mobile" />
        <meta name="author" content="GOSINARY NOMENJANAHARY Stéphanot" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://stephdev35.vercel.app/" />
        {/* Favicon personnalisé */}
        <link rel="icon" href="/steph.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/steph.jpg" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <VisitTracker />
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
