import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-slate-700/80 bg-slate-950/80 px-3.5 py-2.5 text-sm font-medium text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500/30 transition-all duration-200 outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
