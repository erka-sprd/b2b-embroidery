"use client"

import {
  ScopedDialog,
  ScopedDialogClose,
  ScopedDialogTitle,
} from "@/components/ui/scoped-dialog"

// Mirrors the volume-discount tiers used across the project.
const TIERS = [
  { min: 5, pct: 10 },
  { min: 20, pct: 20 },
  { min: 40, pct: 30 },
  { min: 60, pct: 40 },
  { min: 100, pct: 50 },
]

export default function VolumeDiscountDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <ScopedDialog
      open={open}
      onOpenChange={onOpenChange}
      overlayClassName="rounded-[12px]"
      className="flex max-h-[80%] w-[480px] max-w-[90%] flex-col gap-0 overflow-hidden rounded-2xl bg-white p-0 shadow-xl"
    >
      <div className="flex items-start justify-between gap-4 p-[24px] pb-[16px]">
        <ScopedDialogTitle className="font-display text-[18px] leading-tight font-[800] text-black">
          Our volume discount
        </ScopedDialogTitle>
        <ScopedDialogClose
          aria-label="Close"
          className="shrink-0 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
        >
          <img src="/icons/icon-close-x.svg" alt="" className="h-6 w-6" />
        </ScopedDialogClose>
      </div>

      <div className="overflow-y-auto px-[24px] pb-[24px]">
        <div className="border border-neutral-200">
          {TIERS.map(t => (
            <div
              key={t.min}
              className="border-b border-neutral-200 py-4 text-center text-base last:border-b-0"
            >
              <span className="font-bold text-black">{t.min}+ products</span>
              <span className="font-bold text-[#DC2626]"> −{t.pct}% off</span>
            </div>
          ))}
        </div>
      </div>
    </ScopedDialog>
  )
}
