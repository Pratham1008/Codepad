"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ThreeBackground = dynamic(
  () => import("./ThreeBackground").then((mod) => mod.ThreeBackground),
  { ssr: false }
);

export function GlobalBackground() {
  const pathname = usePathname();
  const showBackground = pathname === "/" || pathname === "/auth";
  const [hasShown, setHasShown] = useState(showBackground);

  useEffect(() => {
    if (showBackground) setHasShown(true);
  }, [showBackground]);

  // Don't even mount or download Three.js until a page needs it!
  if (!hasShown) return null;

  return (
    <div 
      className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-700"
      style={{ 
        opacity: showBackground ? 1 : 0,
        visibility: showBackground ? 'visible' : 'hidden' 
      }}
    >
       <ThreeBackground />
    </div>
  );
}
