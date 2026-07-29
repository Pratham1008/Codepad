import type { Metadata } from "next";
import { Suspense } from "react";
import { ClientNav } from "@/components/ClientNav";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Coding Problems - CodePad",
  description: "Browse and solve algorithmic coding challenges. Practice with curated problems across multiple difficulty levels.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Coding Problems - CodePad",
    description: "Browse and solve algorithmic coding challenges on CodePad.",
    type: "website",
  },
};

async function NavWithCookies() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("username");
  return <ClientNav initialIsLoggedIn={isLoggedIn} />;
}

export default function ProblemsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background overflow-x-hidden">
      <Suspense fallback={<ClientNav initialIsLoggedIn={false} />}>
        <NavWithCookies />
      </Suspense>
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
