import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    
    const baseClasses = "inline-flex items-center justify-center font-label-sm text-label-sm transition-all focus:outline focus:outline-2 focus:outline-offset-2 disabled:cursor-not-allowed";
    
    // Variant classes matching the Stitch tokens
    const variants = {
      primary: "bg-primary text-on-primary relative after:absolute after:inset-0 hover:after:bg-white/[0.08] active:scale-[0.97] active:after:bg-white/[0.12] focus:outline-primary disabled:bg-on-surface/[0.12] disabled:text-on-surface/[0.38]",
      secondary: "bg-secondary-container text-on-secondary-container relative after:absolute after:inset-0 hover:after:bg-on-surface/[0.08] active:scale-[0.97] active:after:bg-on-surface/[0.12] focus:outline-secondary disabled:bg-on-surface/[0.12] disabled:text-on-surface/[0.38]",
      outline: "border border-outline text-primary relative after:absolute after:inset-0 hover:after:bg-primary/[0.08] active:scale-[0.97] active:after:bg-primary/[0.12] active:bg-primary/[0.12] focus:outline-primary disabled:border-on-surface/[0.12] disabled:text-on-surface/[0.38]",
      text: "text-primary relative after:absolute after:inset-0 hover:after:bg-primary/[0.08] hover:bg-primary/[0.08] active:scale-[0.97] active:after:bg-primary/[0.12] active:bg-primary/[0.12] focus:outline-primary disabled:text-on-surface/[0.38]",
      icon: "text-on-surface-variant relative hover:bg-on-surface/[0.08] active:scale-[0.97] active:bg-on-surface/[0.12] focus:outline-primary disabled:text-on-surface/[0.38]"
    };

    // Size classes
    const sizes = {
      sm: "px-sm py-[2px] text-[10px] rounded-ui font-medium",
      md: "px-md py-sm rounded-ui",
      lg: "px-lg py-3 rounded-ui font-title-md text-title-md",
      icon: "p-sm rounded-full"
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[variant === "icon" ? "icon" : size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
