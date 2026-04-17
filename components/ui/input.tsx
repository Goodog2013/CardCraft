import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-10 w-full rounded-xl border border-border bg-white px-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-mutedForeground focus:border-primary/40 focus:ring-2 focus:ring-primary/20 dark:bg-card",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
