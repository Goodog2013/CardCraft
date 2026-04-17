import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  htmlFor,
}: {
  className?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-1.5 block text-sm font-semibold text-foreground/90", className)}
    >
      {children}
    </label>
  );
}
