import { ClientNav } from "@/components/ClientNav";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";
import { Terminal, Code, FolderTree, Cpu, Command, Bug } from "lucide-react";
import { ClientDocsContent } from "./ClientDocsContent";

async function NavWithCookies() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("username");
  return <ClientNav initialIsLoggedIn={isLoggedIn} />;
}

export const metadata = {
  title: "Documentation | CodePad",
  description: "Learn how to use CodePad, from basic setup to advanced multi-file projects.",
  alternates: {
    canonical: "/docs",
  },
};

const SECTIONS = [
  { id: "getting-started", title: "Getting Started", icon: <Code size={18} /> },
  { id: "editor", title: "The Editor", icon: <FolderTree size={18} /> },
  { id: "running-code", title: "Running Code", icon: <Terminal size={18} /> },
  { id: "diagnostics", title: "Diagnostics", icon: <Bug size={18} /> },
  { id: "languages", title: "Supported Languages", icon: <Cpu size={18} /> },
  { id: "shortcuts", title: "Shortcuts", icon: <Command size={18} /> },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background overflow-x-hidden pt-16">
      <Suspense fallback={<ClientNav initialIsLoggedIn={false} />}>
        <NavWithCookies />
      </Suspense>

      <ClientDocsContent />

      <Footer />
    </div>
  );
}
