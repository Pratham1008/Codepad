import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalBackground } from "@/components/GlobalBackground";
import { Suspense } from "react";
import { NetworkChecker } from "@/components/NetworkChecker";
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "CodePad - Online Code Editor & Judge Platform",
    template: "%s | CodePad",
  },
  description: "A high-performance online code editor with real-time diagnostics, multi-file projects, and algorithmic problem solving. Run code in 8 languages with secure sandboxed execution.",
  keywords: ["Online Code Editor", "Online IDE", "Code Judge", "Competitive Programming", "Algorithm Practice", "Java", "Python", "C++", "Rust", "Kotlin", "TypeScript", "Cloud IDE", "Code Playground", "Sandboxed Execution"],
  applicationName: "CodePad",
  authors: [{ name: "CodePad Team" }],
  openGraph: {
    title: "CodePad - Online Code Editor & Judge Platform",
    description: "Write, run, and judge code in 8 languages. Real-time diagnostics, multi-file projects, and algorithmic challenges.",
    type: "website",
    siteName: "CodePad",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "CodePad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePad - Online Code Editor & Judge Platform",
    description: "Write, run, and judge code in 8 languages with real-time diagnostics.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { TokenRefresher } from "@/components/TokenRefresher";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          dir="ltr"
          suppressHydrationWarning
          className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased w-full h-full m-0 p-0`}
      >
      <body className="min-h-screen w-full h-full m-0 p-0 flex flex-col ember-bg">
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
      >
        <Suspense fallback={<div className="fixed inset-0 -z-20" style={{ background: 'var(--background)' }} />}>
          <GlobalBackground />
        </Suspense>
        <NetworkChecker />
        <TokenRefresher />
        <ServiceWorkerRegister />
        {children}
      </ThemeProvider>
      </body>
      </html>
);
}