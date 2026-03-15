"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = "Submit anyway",
  cancelLabel = "Go back",
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-5 pb-4">
          <h3 className="text-sm font-semibold text-gray-900 text-center">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-4 px-6 py-4 border-y border-gray-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex px-3 py-2 gap-2">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}