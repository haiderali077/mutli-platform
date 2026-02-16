"use client"

import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-3 rounded-lg shadow-lg text-sm ${
          t.variant === "destructive" ? "bg-red-600 text-white" : "bg-black text-white"
        }`}>
          <p className="font-medium">{t.title}</p>
          {t.description && <p className="text-xs opacity-80 mt-1">{t.description}</p>}
        </div>
      ))}
    </div>
  )
}
