"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const baseClasses = "inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline focus:outline-2 focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97]";
    
    const variants = {
      primary: "bg-primary text-on-primary focus:outline-primary shadow-elevation-1 hover:bg-primary/90 hover:shadow-elevation-2",
      secondary: "bg-surface-2 text-on-surface focus:outline-outline hover:bg-surface-3",
      outline: "border border-outline text-primary focus:outline-primary hover:bg-primary/[0.08]",
      text: "text-primary focus:outline-primary hover:bg-primary/[0.08]",
      icon: "text-on-surface-variant hover:bg-surface-2 focus:outline-primary"
    };

    const sizes = {
      sm: "px-3 py-1 text-xs rounded-md",
      md: "px-4 py-2 text-sm rounded-md",
      lg: "px-6 py-3 text-base rounded-lg",
      icon: "p-2 rounded-full"
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[variant === "icon" ? "icon" : size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
