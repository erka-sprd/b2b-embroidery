import BeforeAfterCompare from "@/components/before-after-compare"
import EmbLandingHeader from "@/components/emb-landing-header"
import HeroUploadButton from "@/components/hero-upload-button"
import ProductsSection from "@/components/products-section"
import { embroideryTiles } from "@/lib/tiles"

export default function EmbLandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      <EmbLandingHeader />
      <div className="relative">
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-6/6 bg-gradient-to-t from-gray-800/45 to-gray-800/0" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
          <BeforeAfterCompare />
          <h1 className="font-display text-3xl font-[900] tracking-tight text-white sm:text-4xl">
GET YOUR DESIGN EMBROIDERED
          </h1>
          <div className="flex flex-col items-center gap-2">
          <HeroUploadButton />
          <p className="text-sm font-medium text-white/80">SVG, PNG or JPEG</p>
          </div>
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

      {/* Trust/info band below the hero */}
      <section className="bg-neutral-100">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-8 py-6 mb-20 text-center sm:grid-cols-3">
          {/* 1 — Long-lasting embroidery */}
          <div className="flex flex-col items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              className="size-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p className="text-lg font-semibold text-black">Durable stitches</p>
          </div>

          {/* 2 — Full preview before purchase */}
          <div className="flex flex-col items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              className="size-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <p className="text-lg font-semibold text-black">Full preview before purchase</p>
          </div>

          {/* 3 — No minimum order quantity */}
          <div className="flex flex-col items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              className="size-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className="text-lg font-semibold text-black">No minimum order quantity</p>
          </div>
        </div>
      </section>

      {/* Tabs + product carousel below the hero */}
      <ProductsSection tiles={embroideryTiles} />
    </main>
  )
}
