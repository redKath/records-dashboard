"use client";

import type { ReactNode } from "react";
import { useDialog } from "./useDialog";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const dialog = useDialog(open, onClose);

  return (
    <dialog
      {...dialog}
      aria-labelledby="drawer-title"
      className="ml-auto h-dvh max-h-none w-full max-w-md bg-white shadow-xl backdrop:bg-black/40"
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
            <h2 id="drawer-title" className="text-lg font-semibold">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        </div>
      )}
    </dialog>
  );
}
