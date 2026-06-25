"use client"

import { useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

// Mirrors @sprd/sprd-component-kit v2 Accordion: a title row with a chevron that
// rotates, revealing collapsible content. Self-contained open state.
export default function Accordion({ title, children }: { title: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-black md:text-lg">{title}</span>
        <svg
          className={cn(
            "size-5 shrink-0 text-black transition-transform duration-200",
            open && "rotate-180"
          )}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="max-w-3xl text-[15px] leading-relaxed text-neutral-700">{children}</div>
        </div>
      </div>
    </div>
  )
}
