import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: Option[];
}

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-10 w-full appearance-none rounded-xl border border-border bg-white px-3 pr-9 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20 dark:bg-card",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedForeground" />
    </div>
  );
}
