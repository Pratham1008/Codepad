import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalBackground } from "@/components/GlobalBackground";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "CodePad - The Editor with an Ember Heart",
  description: "A high-fidelity developer environment blending terminal aesthetics with modern warmth. Write, run, and save code snippets seamlessly in the cloud.",
  keywords: ["Code Editor", "Online IDE", "Developer Environment", "Next.js", "Code Snippets", "Playground", "Cloud Execution"],
  authors: [{ name: "CodePad Team" }],
  openGraph: {
    title: "CodePad - High Performance Code Editor",
    description: "Enterprise Grade Code Editor in the Cloud. Blending terminal aesthetics with modern warmth.",
    type: "website",
    siteName: "CodePad",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePad - The Editor with an Ember Heart",
    description: "A high-fidelity developer environment blending terminal aesthetics with modern warmth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
        <GlobalBackground />
        {children}
      </ThemeProvider>
      </body>
      </html>
);
}