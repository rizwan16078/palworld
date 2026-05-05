"use client";

import * as React from "react";

type ToastVariant = "default" | "destructive";

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastInput = Omit<ToastProps, "id">;

type State = {
  toasts: ToastProps[];
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 3500;

let count = 0;
const listeners = new Set<(state: State) => void>();
let memoryState: State = { toasts: [] };

function dispatch(state: State) {
  memoryState = state;
  listeners.forEach((listener) => listener(memoryState));
}

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function dismissToast(toastId?: string) {
  if (toastId) {
    dispatch({
      toasts: memoryState.toasts.filter((toast) => toast.id !== toastId),
    });
    return;
  }

  dispatch({ toasts: [] });
}

function toast({ title, description, variant = "default" }: ToastInput) {
  const id = genId();

  dispatch({
    toasts: [
      { id, title, description, variant },
      ...memoryState.toasts,
    ].slice(0, TOAST_LIMIT),
  });

  window.setTimeout(() => dismissToast(id), TOAST_REMOVE_DELAY);

  return {
    id,
    dismiss: () => dismissToast(id),
  };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: dismissToast,
  };
}

export { toast };
