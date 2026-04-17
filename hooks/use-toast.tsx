"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { makeId } from "@/lib/utils";

export type ToastVariant = "success" | "info" | "danger";

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((item: Omit<ToastItem, "id">) => {
    const id = makeId("toast");
    setToasts((prev) => [...prev, { id, ...item }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toastItem) => toastItem.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      toast,
      dismiss,
    }),
    [dismiss, toast, toasts],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
