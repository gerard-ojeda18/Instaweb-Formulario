"use client";

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-[200] max-w-[min(90vw,24rem)] -translate-x-1/2 rounded-lg border-l-4 border-gold bg-navy-900 px-6 py-4 text-[0.9375rem] text-white shadow-elevated transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      {message}
    </div>
  );
}
