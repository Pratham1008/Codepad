import { ClientNav } from "@/components/ClientNav";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ClientPricingContent } from "./ClientPricingContent";

async function NavWithCookies() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("username");
  return <ClientNav initialIsLoggedIn={isLoggedIn} />;
}

export const metadata = {
  title: "Pricing | CodePad",
  description: "Flexible pricing for developers. Choose the plan that fits your needs.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background overflow-x-hidden pt-16">
      <Suspense fallback={<ClientNav initialIsLoggedIn={false} />}>
        <NavWithCookies />
      </Suspense>

      <ClientPricingContent />

      <Footer />
    </div>
  );
}
