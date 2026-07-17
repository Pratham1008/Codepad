import React from "react";
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
          "bg-surface rounded-ui px-md py-sm font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-shadow w-full",
          error
            ? "border-2 border-error"
            : "border border-outline focus:border-primary focus:ring-1 focus:ring-primary",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
