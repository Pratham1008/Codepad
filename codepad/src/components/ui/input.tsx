"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "bg-surface-2 rounded-md px-4 py-2 text-base text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors duration-150 w-full",
          error
            ? "border-2 border-error focus:ring-2 focus:ring-error/60"
            : "border border-outline focus:border-primary focus:ring-2 focus:ring-primary/60",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
