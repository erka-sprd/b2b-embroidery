import { getCatalog, resolveImageUrl, type Catalog, type StaticProduct } from "product-catalog-client"

// Base URL of the deployed product catalogue (data + images). Override per env;
// falls back to the shared deployment so it works without config.
export const CATALOG_URL =
    process.env.NEXT_PUBLIC_CATALOG_URL || "https://product-catalog-five-self.vercel.app"

/** Resolve a catalogue image path (e.g. "/products/...") to an absolute URL. */
export const img = (path: string | null | undefined) => resolveImageUrl(CATALOG_URL, path)

// Rewrite every image field to an absolute catalogue URL once, at load time, so
// the rest of the app can keep using `.image` / `.preview` / `.modelImage`
// directly in <img src> without per-call resolution.
function absolutize(products: StaticProduct[]): StaticProduct[] {
    return products.map(p => ({
        ...p,
        preview: img(p.preview),
        modelImageFront: p.modelImageFront ? img(p.modelImageFront) : null,
        appearances: p.appearances.map(a => ({
            ...a,
            image: img(a.image),
            modelImage: a.modelImage ? img(a.modelImage) : null,
            views: a.views.map(v => ({ ...v, image: img(v.image) })),
        })),
    }))
}

/** Fetch the catalogue and absolutize its image URLs. */
export async function loadCatalog(): Promise<Catalog> {
    const c = await getCatalog(CATALOG_URL)
    return { featuredProductId: c.featuredProductId, products: absolutize(c.products) }
}
