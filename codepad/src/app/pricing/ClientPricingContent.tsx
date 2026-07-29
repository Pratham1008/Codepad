"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClientPricingContent() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <main className="flex-grow flex flex-col items-center pt-24 pb-32 px-4 lg:px-8 relative z-10 w-full max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(0,122,204,0.06)_0%,_transparent_60%)] -z-10 rounded-full" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-6">
          Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">transparent</span> pricing.
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
          Whether you are just starting out or orchestrating massive projects, we have a plan for you.
        </p>
      </div>

      {/* Monthly / Annual Toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <span className={cn("text-sm font-medium transition-colors", !isAnnual ? "text-on-surface" : "text-on-surface-variant")}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative w-16 h-8 rounded-full bg-surface-2 border border-outline flex items-center px-1 focus:outline-primary"
        >
          <div
            className="w-6 h-6 rounded-full bg-primary shadow-elevation-1 absolute z-10 transition-[left] duration-200 ease-out"
            style={{
              left: isAnnual ? "calc(100% - 28px)" : "4px"
            }}
          />
        </button>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium transition-colors", isAnnual ? "text-on-surface" : "text-on-surface-variant")}>Annual</span>
          <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-0.5 rounded-full">Save 20%</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto items-stretch">
        
        {/* Free Tier */}
        <div className="bg-surface-1 rounded-2xl p-8 border border-outline flex flex-col relative shadow-elevation-1 hover:shadow-elevation-3 hover:border-primary/50 hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-2xl font-bold text-on-surface mb-2">Free</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-on-surface">$0</span>
            <span className="text-on-surface-variant font-medium">/ forever</span>
          </div>
          <p className="text-on-surface-variant mb-8 text-sm">Perfect for quick experiments and small algorithms.</p>
          
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-emerald-500" /> 10 minutes session time / 24h
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-emerald-500" /> 1 Project
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-emerald-500" /> Up to 10 files per project
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-emerald-500" /> All 8 Languages Supported
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface opacity-70">
              <X size={18} className="text-red-500" /> Basic Diagnostics
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface opacity-70">
              <X size={18} className="text-red-500" /> Community Support Only
            </li>
          </ul>
          
          <Link href="/auth" className="mt-auto">
            <button className="w-full bg-surface-2 border border-outline text-on-surface font-medium py-3 rounded-xl hover:bg-surface-3 transition-colors">
              Get Started
            </button>
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="bg-surface-2 rounded-2xl p-8 border-2 border-primary relative flex flex-col z-10 shadow-elevation-2 hover:shadow-[0_20px_40px_-15px_rgba(0,122,204,0.3)] hover:-translate-y-2 transition-all duration-200 scale-[1.02]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
            Most Popular
          </div>
          <h3 className="text-2xl font-bold text-on-surface mb-2">Pro</h3>
          <div className="flex items-baseline gap-2 mb-6 h-12">
            <span className="text-4xl font-bold text-on-surface transition-all duration-200">
              ${isAnnual ? "7" : "9"}
            </span>
            <span className="text-on-surface-variant font-medium">/ month</span>
          </div>
          <p className="text-on-surface-variant mb-8 text-sm">For serious developers needing consistent access.</p>
          
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> 12 hours dedicated session / 24h
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Up to 10 Projects
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Up to 30 files per project
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> All 8 Languages Supported
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Real-time Language Server Diagnostics
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Priority Email Support
            </li>
          </ul>
          
          <Link href="/auth" className="mt-auto">
            <button className="w-full bg-primary text-on-primary font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg">
              Upgrade to Pro
            </button>
          </Link>
        </div>

        {/* Ultra Tier */}
        <div className="bg-surface-1 rounded-2xl p-8 border border-outline flex flex-col relative shadow-elevation-1 hover:shadow-elevation-3 hover:border-primary/50 hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-2xl font-bold text-on-surface mb-2 flex items-center gap-2">Ultra <span className="bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text text-lg">✨</span></h3>
          <div className="flex items-baseline gap-2 mb-6 h-12">
            <span className="text-4xl font-bold text-on-surface transition-all duration-200">
              ${isAnnual ? "15" : "19"}
            </span>
            <span className="text-on-surface-variant font-medium">/ month</span>
          </div>
          <p className="text-on-surface-variant mb-8 text-sm">No limits. Maximum performance for heavy orchestration.</p>
          
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Unlimited session time
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Up to 20 Projects
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Up to 50 files per project
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> All 8 Languages Supported
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Real-time Diagnostics + AI Assistant
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface">
              <Check size={18} className="text-primary" /> Dedicated 24/7 Support
            </li>
          </ul>
          
          <Link href="/auth" className="mt-auto">
            <button className="w-full bg-surface-2 border border-outline text-on-surface font-medium py-3 rounded-xl hover:bg-surface-3 transition-colors">
              Get Ultra
            </button>
          </Link>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="mt-32 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade at any time. Your prorated balance will be applied automatically." },
            { q: "What happens when I hit the free limit?", a: "Your containers will pause execution. You can still edit code, but running it requires waiting for the 24h reset or upgrading." },
            { q: "Do you offer student discounts?", a: "Yes! Students with a valid .edu email get 50% off the Pro plan. Contact support to apply." },
            { q: "How secure is my code?", a: "All code executes in isolated Docker containers with network access disabled. Your intellectual property remains yours." }
          ].map((faq, i) => (
            <div 
              key={i}
              className="bg-surface-1 p-6 rounded-xl border border-outline shadow-elevation-1 hover:-translate-y-0.5 transition-transform duration-150"
            >
              <h4 className="font-bold text-on-surface mb-2">{faq.q}</h4>
              <p className="text-on-surface-variant text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
