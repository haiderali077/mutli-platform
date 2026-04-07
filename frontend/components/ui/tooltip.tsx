import * as React from "react"
import { cn } from "@/lib/utils"
interface TooltipProps { children: React.ReactNode; content: string }
function Tooltip({ children, content }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">{content}</div>
    </div>
  )
}
export { Tooltip }
