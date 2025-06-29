import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { VisitTracker } from "@/components/visit-tracker";

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
  description: "Développeur web et mobile passionné, spécialisé en React, Laravel ,Next.js et technologies modernes. Découvrez mes projets, compétences et réalisations.",
  openGraph: {
    title: "StephDev35 | Portfolio de GOSINARY NOMENJANAHARY Stéphanot",
    description: "Développeur web et mobile passionné, spécialisé en React, Next.js, Node.js et technologies modernes. Découvrez mes projets, compétences et réalisations.",
    url: "https://votre-domaine.com/", // Remplace par ton vrai domaine si tu l'as
    siteName: "StephDev35 Portfolio",
    images: [
      {
        url: "/dev.jpg",
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
    description: "Développeur web et mobile passionné, spécialisé en React, Next.js, Node.js et technologies modernes. Découvrez mes projets, compétences et réalisations.",
    images: ["/dev.jpg"],
    creator: "@StephDev35" // Remplace par ton vrai handle si tu en as un
  },
  icons: {
    icon: "/dev.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <VisitTracker />
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
