import { ClientNav } from "@/components/ClientNav";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ClientPageContent } from "./ClientPageContent";

async function NavWithCookies() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("username");
  return <ClientNav initialIsLoggedIn={isLoggedIn} />;
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CodePad",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background overflow-x-hidden pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .tilt-card-container {
            perspective: 2000px;
        }
        .tilt-card {
            transform: rotateX(15deg) rotateY(-5deg) rotateZ(2deg);
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
            box-shadow: 0 25px 50px -12px rgba(0, 122, 204, 0.15);
        }
        .tilt-card:hover {
            transform: rotateX(5deg) rotateY(0deg) rotateZ(0deg);
        }
      `}} />

      <Suspense fallback={<ClientNav initialIsLoggedIn={false} />}>
        <NavWithCookies />
      </Suspense>

      <ClientPageContent />

      <Footer />
    </div>
  );
}
