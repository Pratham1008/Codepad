import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
  description: "A high-fidelity developer environment blending terminal aesthetics with modern warmth.",
  keywords: ["Code Editor", "Online Judge", "Developer Environment", "Next.js", "Spring Boot"],
  authors: [{ name: "Enterprise Architects" }],
  openGraph: {
    title: "CodePad",
    description: "Enterprise Grade Code Editor",
    type: "website",
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
        {children}
      </ThemeProvider>
      </body>
      </html>
);
}