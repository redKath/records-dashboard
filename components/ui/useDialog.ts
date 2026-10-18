import { useEffect, useRef } from "react";

// Native <dialog>: showModal() provides the focus trap, ESC to close, and inert background
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return {
    ref,
    onClose,
    // A click on the dialog element itself (not its content) is a backdrop click
    onClick: (e: React.MouseEvent) => {
      if (e.target === ref.current) onClose();
    },
  };
}
