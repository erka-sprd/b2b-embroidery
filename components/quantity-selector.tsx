"use client"

import { cn } from "@/lib/utils"

// Mirrors @sprd/sprd-component-kit v2 QuantitySelector: minus / number input /
// plus, bordered, min defaults to 1.
type QuantitySelectorProps = {
  quantity: number
  onChange: (value: number) => void
  min?: number
  max?: number
  /** When set, the minus button becomes a trash button at the minimum quantity. */
  onDelete?: () => void
}

const ICON = "size-5"
const BTN =
  "p-1.5 cursor-pointer hover:bg-neutral-100 active:bg-white disabled:opacity-50 disabled:pointer-events-none"

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max,
  onDelete,
}: QuantitySelectorProps) {
  const clamp = (v: number) => Math.max(min, max != null ? Math.min(max, v) : v)
  const atMin = quantity <= min
  const atMax = max != null && quantity >= max

  return (
    <div className="flex w-fit items-center border border-neutral-200 bg-white">
      {onDelete && atMin ? (
        <button
          type="button"
          onClick={onDelete}
          aria-label="Remove"
          className={cn(BTN, "border-r border-neutral-200")}
        >
          <svg viewBox="0 0 24 24" fill="none" className={ICON} aria-hidden>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9945 3.85074C15.9182 2.81588 15.0544 2 14 2H10L9.85074 2.00549C8.81588 2.08183 8 2.94564 8 4V6H5.01169H4.99054H4L3.88338 6.00673C3.38604 6.06449 3 6.48716 3 7C3 7.55228 3.44772 8 4 8H4.07987L5.00345 19.083L5.00819 19.2507C5.09634 20.7511 6.40232 22 8 22H16L16.1763 21.9949C17.7511 21.9037 19 20.5977 19 19L19.9199 8H20L20.1166 7.99327C20.614 7.93551 21 7.51284 21 7C21 6.44772 20.5523 6 20 6H16V4L15.9945 3.85074ZM14 6V4H10V6H14ZM9 8H6.08649L7 19C7 19.5128 7.38604 19.9355 7.88338 19.9933L8 20H16C16.5155 20 16.9398 19.61 16.9969 19.0414L17.0035 18.917L17.9132 8H15H9ZM10 10C10.5128 10 10.9355 10.386 10.9933 10.8834L11 11V17C11 17.5523 10.5523 18 10 18C9.48716 18 9.06449 17.614 9.00673 17.1166L9 17V11C9 10.4477 9.44772 10 10 10ZM14.9933 10.8834C14.9355 10.386 14.5128 10 14 10C13.4477 10 13 10.4477 13 11V17L13.0067 17.1166C13.0645 17.614 13.4872 18 14 18C14.5523 18 15 17.5523 15 17V11L14.9933 10.8834Z"
              fill="currentColor"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onChange(clamp(quantity - 1))}
          disabled={atMin}
          aria-label="Decrease quantity"
          className={cn(BTN, "border-r border-neutral-200")}
        >
          <svg viewBox="0 0 20 20" fill="none" className={ICON} aria-hidden>
            <path
              d="M15.8333 9.16663C16.2935 9.16663 16.6666 9.53972 16.6666 9.99996C16.6666 10.4273 16.3449 10.7795 15.9305 10.8277L15.8333 10.8333H4.16665C3.70641 10.8333 3.33331 10.4602 3.33331 9.99996C3.33331 9.5726 3.65501 9.22037 4.06946 9.17223L4.16665 9.16663H15.8333Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
      <input
        type="number"
        value={quantity}
        min={min}
        max={max}
        aria-label="Quantity"
        onChange={e => {
          const v = Number(e.target.value)
          onChange(Number.isNaN(v) ? min : clamp(v))
        }}
        className="w-12 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(quantity + 1))}
        disabled={atMax}
        aria-label="Increase quantity"
        className={cn(BTN, "border-l border-neutral-200")}
      >
        <svg viewBox="0 0 20 20" fill="none" className={ICON} aria-hidden>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.8277 4.06952C10.7796 3.65507 10.4273 3.33337 9.99998 3.33337C9.53974 3.33337 9.16665 3.70647 9.16665 4.16671V9.16671H4.16665L4.06946 9.17231C3.65501 9.22045 3.33331 9.57268 3.33331 10C3.33331 10.4603 3.70641 10.8334 4.16665 10.8334H9.16665V15.8334L9.17225 15.9306C9.22039 16.345 9.57262 16.6667 9.99998 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8334V10.8334H15.8333L15.9305 10.8278C16.3449 10.7796 16.6666 10.4274 16.6666 10C16.6666 9.5398 16.2935 9.16671 15.8333 9.16671H10.8333V4.16671L10.8277 4.06952Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}
