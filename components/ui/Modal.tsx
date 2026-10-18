"use client";

import { useId, type ReactNode } from "react";
import { useDialog } from "./useDialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

// Children mount only while open, so forms start fresh each time
export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialog = useDialog(open, onClose);
  const titleId = useId();

  return (
    <dialog
      {...dialog}
      aria-labelledby={titleId}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg rounded-lg bg-white shadow-xl backdrop:bg-black/40"
    >
      {open && (
        <div className="p-6">
          <h2 id={titleId} className="mb-4 text-lg font-semibold">
            {title}
          </h2>
          {children}
        </div>
      )}
    </dialog>
  );
}
