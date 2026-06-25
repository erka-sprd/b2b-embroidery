import type { ProductTileData } from "@/components/product-tile"
import { PRODUCTS, type StaticProduct } from "@/lib/products-data"

// Prefer a natural/earthy colourway for a product's default tile image.
const NATURAL =
  /(nature|natural|ecru|cream|vanilla|oat|sand|beige|khaki|olive|stone|taupe|almond|mocha|latte|heather|sage|tan|camel|linen|wheat|clay|off.?white|bone|white)/i

export function productToTile(p: StaticProduct): ProductTileData {
  const natural = p.appearances.find(a => NATURAL.test(a.name)) ?? p.appearances[0]
  return {
    id: p.id,
    image: natural?.image || p.preview || "",
    price: p.price.toFixed(2).replace(".", ",") + " €",
    priceValue: p.price,
    brand: p.details.brand || "",
    name: p.name,
    colors: p.appearances.map(a => a.color),
  }
}

export const allTiles: ProductTileData[] = PRODUCTS.map(productToTile)
export const embroideryTiles: ProductTileData[] = PRODUCTS.filter(p => p.embroidery).map(productToTile)
