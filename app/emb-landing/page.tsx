import BeforeAfterCompare from "@/components/before-after-compare"
import EmbLandingHeader from "@/components/emb-landing-header"
import GradientButton from "@/components/gradient-button"
import ProductsSection from "@/components/products-section"
import { PRODUCTS } from "@/lib/products-data"

// Curated order of embroidery products: baseball cap 2nd, half-zip 3rd.
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

// Prefer a natural/earthy colourway for each tile's default image.
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

export default function EmbLandingPage() {
  const byId = new Map(PRODUCTS.map(p => [p.id, p]))
  const embroideryTiles = PRODUCT_ORDER.map(id => byId.get(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map(p => {
      const override = COLOR_OVERRIDE[p.id]
        ? p.appearances.find(a => a.id === COLOR_OVERRIDE[p.id])
        : undefined
      const natural = p.appearances.find(a => NATURAL.test(a.name)) ?? p.appearances[0]
      const chosen = override ?? natural
      return {
        id: p.id,
        image: chosen?.image || p.preview || "",
        price: p.price.toFixed(2).replace(".", ",") + " €",
        priceValue: p.price,
        brand: p.details.brand || "",
        name: p.name,
        colors: shuffle(
          p.appearances.map(a => a.color),
          seed(p.id)
        ),
      }
    })

  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      <EmbLandingHeader />
      <div className="relative mb-[100px]">
        <section className="relative flex h-[560px] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: "url('/images/emb-bg.png')" }}
        />
        {/* Floating product images — scattered, varied position, tilt, size and
            depth-of-field. Far/smaller items are blurrier. */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full max-w-[1600px] -translate-x-1/2">
          {/* tote — nature — 2x larger */}
          <img
            src="/products/56/404/1.webp"
            alt=""
            className="hero-float-a absolute top-[2%] right-[16%] w-[20rem] rotate-[6deg] blur-[3px]"
          />
          {/* polo — soft ecru */}
          <img
            src="/products/2116/947/1.webp"
            alt=""
            className="hero-float-c absolute top-[16%] left-[10%] w-76 rotate-[6deg] blur-[2px]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-t from-gray-800/45 to-gray-800/0" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
          <BeforeAfterCompare />
          <h1 className="font-display text-3xl font-[900] tracking-tight text-white sm:text-4xl">
GET YOUR DESIGN EMBROIDERED
          </h1>
          <GradientButton>Create now</GradientButton>
        </div>
        </section>

        {/* Baseball cap lives outside the hero's overflow-hidden so its bottom
            isn't clipped — it hangs past the hero's bottom edge. */}
        <div className="pointer-events-none absolute top-0 left-1/2 z-20 h-[560px] w-full max-w-[1600px] -translate-x-1/2">
          <img
            src="/products/15/10/1.webp"
            alt=""
            className="hero-float-b absolute right-[3%] bottom-[-16%] w-100 -rotate-[-32deg]"
          />
        </div>
      </div>

      {/* Tabs + product carousel below the hero */}
      <ProductsSection tiles={embroideryTiles} />
    </main>
  )
}
