import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalBackground } from "@/components/GlobalBackground";
import { Suspense } from "react";
import { NetworkChecker } from "@/components/NetworkChecker";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://code.prathameshcorporations.site"),
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
          className={`${inter.variable} ${jetbrainsMono.variable} antialiased w-full h-full m-0 p-0`}
      >
      <body className="min-h-screen w-full h-full m-0 p-0 flex flex-col ember-bg">
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >
        <Suspense fallback={<div className="fixed inset-0 -z-20" style={{ background: 'var(--background)' }} />}>
          <GlobalBackground />
        </Suspense>
        <NetworkChecker />
        <TokenRefresher />
        {children}
      </ThemeProvider>
      </body>
      </html>
);
}