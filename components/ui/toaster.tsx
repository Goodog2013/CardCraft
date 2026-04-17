"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const variantStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100",
  info: "border-slate-200 bg-white text-slate-900 dark:border-border dark:bg-card dark:text-foreground",
  danger: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-900/35 dark:text-rose-100",
};

const iconMap = {
  success: CheckCircle2,
  info: Info,
  danger: XCircle,
};

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const variant = toast.variant ?? "info";
        const Icon = iconMap[variant];

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto animate-fade-up rounded-2xl border p-4 shadow-soft",
              variantStyles[variant],
            )}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <Icon className="mt-0.5 h-4 w-4" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.message ? (
                  <p className="mt-1 text-sm opacity-90">{toast.message}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="rounded-md p-1 transition hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
