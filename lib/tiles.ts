import type { ProductTileData } from "@/components/product-tile"
import { PRODUCTS, type StaticProduct } from "@/lib/products-data"

// Curated order of products (baseball cap 2nd, half-zip 3rd, …). Shared by the
// landing carousel, the multi-select drawer, and the designer's products modal.
const PRODUCT_ORDER = [
  "2116", "15", "4180", "1047", "3980", "4133", "812", "943", "2940", "916",
  "2973", "1040", "20", "813", "4181", "917", "814", "1505", "4182", "4562",
  "3001", "4312",
]

// Force a specific colourway for these tiles' default image (id -> appearanceId).
const COLOR_OVERRIDE: Record<string, string> = {
  "2116": "1224", // polo — latte
  "1047": "649", // hoodie — steel green
  "4133": "1409", // tote — heritage brown
}

// Otherwise prefer a natural/earthy colourway for the default image.
const NATURAL =
  /(nature|natural|ecru|cream|vanilla|oat|sand|beige|khaki|olive|stone|taupe|almond|mocha|latte|heather|sage|tan|camel|linen|wheat|clay|off.?white|bone|white)/i

function seed(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function shuffle<T>(arr: T[], s: number): T[] {
  const a = [...arr]
  let x = s >>> 0
  for (let i = a.length - 1; i > 0; i--) {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0
    const j = x % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function productToTile(p: StaticProduct): ProductTileData {
  const override = COLOR_OVERRIDE[p.id]
    ? p.appearances.find(a => a.id === COLOR_OVERRIDE[p.id])
    : undefined
  const natural = p.appearances.find(a => NATURAL.test(a.name)) ?? p.appearances[0]
  const chosen = override ?? natural
  return {
    id: p.id,
    image: chosen?.image || p.preview || "",
    appearanceId: chosen?.id ?? "",
    price: p.price.toFixed(2).replace(".", ",") + " €",
    priceValue: p.price,
    brand: p.details.brand || "",
    name: p.name,
    colors: shuffle(
      p.appearances.map(a => a.color),
      seed(p.id)
    ),
  }
}

const byId = new Map(PRODUCTS.map(p => [p.id, p]))

// Embroidery products, in the curated order.
export const embroideryTiles: ProductTileData[] = PRODUCT_ORDER.map(id => byId.get(id))
  .filter((p): p is StaticProduct => Boolean(p))
  .map(productToTile)

// All products — curated ones first (same order + coloring), then the rest.
const orderedAll: StaticProduct[] = [
  ...PRODUCT_ORDER.map(id => byId.get(id)).filter((p): p is StaticProduct => Boolean(p)),
  ...PRODUCTS.filter(p => !PRODUCT_ORDER.includes(p.id)),
]
export const allTiles: ProductTileData[] = orderedAll.map(productToTile)
