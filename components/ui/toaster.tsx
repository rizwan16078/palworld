"use client";

import { X } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[100] flex w-full max-w-sm flex-col gap-3 sm:right-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${
            toast.variant === "destructive"
              ? "border-rose-400/30 bg-rose-950/90 text-rose-50"
              : "border-slate-700 bg-slate-900/95 text-slate-50"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              {toast.title ? (
                <p className="text-sm font-semibold">{toast.title}</p>
              ) : null}
              {toast.description ? (
                <p className="mt-1 text-sm text-inherit/90">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="rounded-full p-1 text-current/70 transition hover:bg-black/10 hover:text-current"
              aria-label="Dismiss toast"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
