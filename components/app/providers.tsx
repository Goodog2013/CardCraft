"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
}
