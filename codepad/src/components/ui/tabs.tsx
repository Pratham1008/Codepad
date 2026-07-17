import React from "react";
import { cn } from "@/lib/utils";

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex gap-2 bg-surface-container-low p-1 rounded-full w-fit border border-outline-variant/50", className)}
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }>(
  ({ className, active, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "px-lg py-1.5 rounded-full font-label-sm text-label-sm transition-colors",
        active 
          ? "bg-primary-container text-on-primary-container" 
          : "text-on-surface-variant hover:bg-on-surface/[0.04]",
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = "TabsTrigger";

export const EditorTabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex bg-surface border-b border-outline-variant/50 pt-2 px-2 overflow-x-auto", className)}
      {...props}
    />
  )
);
EditorTabsList.displayName = "EditorTabsList";

export const EditorTab = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { active?: boolean }>(
  ({ className, active, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group flex items-center gap-2 px-md py-2 cursor-pointer min-w-max transition-colors",
        active 
          ? "bg-surface-container-highest border-b-2 border-primary text-primary" 
          : "bg-surface hover:bg-surface-container text-on-surface-variant",
        className
      )}
      {...props}
    />
  )
);
EditorTab.displayName = "EditorTab";
