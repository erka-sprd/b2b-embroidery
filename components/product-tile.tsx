import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type ProductTileData = {
  id: string
  image: string
  /** appearance (colour) id shown as the tile preview */
  appearanceId: string
  price: string
  priceValue: number
  brand: string
  name: string
  colors: string[]
}

type ProductTileProps = {
  t: ProductTileData
  selected?: boolean
  quantity?: number
  topLeft?: ReactNode
  bottomCenter?: ReactNode
}

const eur = (n: number) => n.toFixed(2).replace(".", ",") + " €"

// Shared product tile (kit ProductCard style): gray image area, price,
// brand + name, and a row of colour swatches (+N). Width is controlled by
// the parent so it works in both the carousel and the drawers' grids.
// Optional overlays render inside the gray image box.
export default function ProductTile({
  t,
  selected = false,
  quantity,
  topLeft,
  bottomCenter,
}: ProductTileProps) {
  const shown = t.colors.slice(0, 5)
  const extra = t.colors.length - shown.length
  return (
    <div className="w-full">
      <div
        className={cn(
          "relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-neutral-100",
          selected && "border-2 border-black"
        )}
      >
        <img src={t.image} alt={t.name} className="h-full w-full object-contain" />
        {topLeft && <div className="absolute top-2 left-2 z-10">{topLeft}</div>}
        {bottomCenter && <div className="absolute inset-x-0 bottom-0 z-10">{bottomCenter}</div>}
      </div>
      <p className="mt-3 text-base font-medium text-black">
        {t.price}
        {quantity && quantity > 1 ? (
          <span className="text-neutral-400">
            {" "}
            x {quantity} = {eur(t.priceValue * quantity)}
          </span>
        ) : null}
      </p>
      <p className="mt-1.5 text-base font-bold text-black">{t.brand}</p>
      <p className="truncate text-base text-neutral-700">{t.name}</p>
      <ul className="mt-2 flex items-center gap-1">
        {shown.map((c, i) => (
          <li key={i}>
            <span
              className="block h-4 w-4 rounded-full border border-black/15"
              style={{ backgroundColor: c }}
            />
          </li>
        ))}
        {extra > 0 && <li className="ml-1 text-sm text-neutral-700">+{extra}</li>}
      </ul>
    </div>
  )
}
