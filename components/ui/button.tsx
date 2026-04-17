import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    primary:
      "bg-primary text-primaryForeground hover:bg-primary/90 disabled:bg-primary/50",
    secondary:
      "bg-white text-foreground border border-border hover:bg-muted disabled:bg-white dark:bg-card dark:hover:bg-muted",
    ghost: "text-foreground hover:bg-muted disabled:text-mutedForeground",
    danger: "bg-rose-600 text-white hover:bg-rose-500 disabled:bg-rose-300",
  },
  size: {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-sm",
    icon: "h-9 w-9",
  },
};

type ButtonVariant = keyof typeof buttonVariants.variant;
type ButtonSize = keyof typeof buttonVariants.size;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:cursor-not-allowed",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
