"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const LABELS: Record<string, string> = {
  dashboard: "Projects",
  settings: "Settings",
  editor: "Playground",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname.startsWith("/editor")) return null; // editor owns its own header

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  let acc = "";
  const crumbs = segments.map((seg) => {
    acc += `/${seg}`;
    return { label: LABELS[seg] ?? seg, href: acc };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 px-4 md:px-8 pt-4 text-sm text-on-surface-variant">
      <Link href="/editor" className="flex items-center gap-1 hover:text-primary transition-colors">
        <Home size={14} />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="opacity-50" />
          {i === crumbs.length - 1 ? (
            <span className="font-semibold text-on-surface">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
