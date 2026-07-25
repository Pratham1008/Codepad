import { ClientNav } from "@/components/ClientNav";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ClientPageContent } from "./ClientPageContent";
import Link from "next/link";

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
    <div className="flex-1 flex flex-col font-body-md overflow-x-hidden relative min-h-screen bg-background text-on-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .typewriter-cursor {
            display: inline-block;
            width: 4px;
            height: 1.2em;
            background-color: var(--primary);
            margin-left: 4px;
            vertical-align: text-bottom;
            animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        
        .tilt-card-container {
            perspective: 2000px;
        }
        .tilt-card {
            transform: rotateX(15deg) rotateY(-5deg) rotateZ(2deg);
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
            box-shadow: 0 25px 50px -12px rgba(120, 49, 0, 0.15);
        }
        .tilt-card:hover {
            transform: rotateX(5deg) rotateY(0deg) rotateZ(0deg);
        }

        .bg-pattern {
            background-image: radial-gradient(var(--outline-variant) 1px, transparent 1px);
            background-size: 24px 24px;
        }
      `}} />

      <Suspense fallback={<ClientNav initialIsLoggedIn={false} />}>
        <NavWithCookies />
      </Suspense>

      <ClientPageContent />

      {/* Footer */}
      <footer className="bg-surface-container dark:bg-surface-container-highest w-full flex flex-col md:flex-row justify-between items-center px-lg py-xl gap-md mt-auto relative z-10 border-t border-outline-variant/30">
        <div className="font-title-md text-title-md font-bold text-on-surface dark:text-on-surface">CodePad</div>
        <div className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant">
          © {new Date().getFullYear()} CodePad IDE. Built for orchestrators.
        </div>
        <div className="flex gap-md font-body-md text-body-md">
          <Link className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors active:opacity-80" href="/problems">Problems</Link>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors active:opacity-80" href="#">Privacy</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors active:opacity-80" href="#">Terms</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors active:opacity-80" href="#">Github</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors active:opacity-80" href="#">Twitter</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors active:opacity-80" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
