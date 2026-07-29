import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full mt-auto relative z-10 border-t border-outline-variant/30 bg-surface-container-highest/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary text-on-primary w-7 h-7 flex items-center justify-center rounded-md font-mono text-sm font-bold">{'/>'}</span>
          <span className="font-headline-sm font-bold text-on-surface text-sm">CodePad</span>
        </div>
        <div className="text-on-surface-variant text-sm">
          © 2026 CodePad IDE
        </div>
        <div className="flex gap-6 text-sm">
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/problems">Problems</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/docs">Docs</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/pricing">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
