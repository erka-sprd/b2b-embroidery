"use client"

import { useState } from "react"

import StarRating from "@/components/star-rating"
import {
  ScopedDialog,
  ScopedDialogClose,
  ScopedDialogTitle,
} from "@/components/ui/scoped-dialog"

type Review = {
  img: string
  name: string
  city: string
  pieces: number
  rating: number
  quote: string
}

const REVIEWS: Review[] = [
  {
    img: "/images/customer1.png",
    name: "Riverside Sports Club",
    city: "Bremen",
    pieces: 60,
    rating: 4.5,
    quote:
      "Great stitching on all 60 club polos and the colours are spot on. Setup was easy and delivery on time. Only small gripe: one polo's crest sat a couple of millimetres off-centre — quick to sort, but enough to hold back the last half star.",
  },
  {
    img: "/images/customer2.png",
    name: "Eagles Football Club",
    city: "Dortmund",
    pieces: 48,
    rating: 4.5,
    quote: "Badge really pops on our matchday hoodies. Delivery landed a day late — otherwise spotless.",
  },
  {
    img: "/images/customer3.png",
    name: "Northfield Student Club",
    city: "Leipzig",
    pieces: 35,
    rating: 4,
    quote:
      "Solid quality on our society sweatshirts and great value at our quantity — the stitching is neat and tidy. Two of the lighter garments showed a faint backing shadow behind the logo, minor but noticeable up close.",
  },
  {
    img: "/images/customer4.png",
    name: "SunDancing Org",
    city: "Cologne",
    pieces: 52,
    rating: 4.5,
    quote: "Vibrant colours that survived a muddy festival weekend. Proofing took a couple of emails.",
  },
  {
    img: "/images/customer5.png",
    name: "GrünWerk",
    city: "Freiburg",
    pieces: 30,
    rating: 4.5,
    quote:
      "Beautiful, durable embroidery on our organic cotton work shirts — exactly the eco-premium look we were after, and the colour match against our brand green was perfect. It has held up through repeated industrial washes without any fading or loose threads, which matters a lot for daily workwear. Half a star off only because the quantity calculator felt a little fiddly on mobile.",
  },
]

function ReviewInfo({ r }: { r: Review }) {
  return (
    <>
      <p className="font-bold text-black">{r.name}</p>
      <p className="text-sm text-neutral-600">
        {r.city} · {r.pieces} pieces ordered
      </p>
      <div className="mt-2 flex items-center gap-2">
        <StarRating value={r.rating} />
        <span className="text-sm font-semibold text-black">{r.rating}</span>
      </div>
    </>
  )
}

export default function CustomerReviews() {
  const [active, setActive] = useState<Review | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <figure
            key={i}
            className="-mt-0.5 -ml-0.5 flex gap-5 border-2 border-black p-8"
          >
            {/* fixed width, auto height — preserves each image's native ratio */}
            <button
              type="button"
              onClick={() => setActive(r)}
              className="shrink-0 cursor-zoom-in self-start"
              aria-label={`View ${r.name} review`}
            >
              <img src={r.img} alt={r.name} className="w-36" />
            </button>
            <div className="min-w-0">
              <ReviewInfo r={r} />
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-700">
                “{r.quote.length > 150 ? r.quote.slice(0, 150).trimEnd() + "… " : r.quote}”
                {r.quote.length > 150 && (
                  <button
                    type="button"
                    onClick={() => setActive(r)}
                    className="ml-1 cursor-pointer font-semibold text-black underline underline-offset-2"
                  >
                    read more
                  </button>
                )}
              </blockquote>
            </div>
          </figure>
        ))}

        {/* ghost box → see all */}
        <button
          type="button"
          className="-mt-0.5 -ml-0.5 flex cursor-pointer items-center justify-center border-2 border-black p-8 text-base font-semibold text-black transition-colors hover:bg-neutral-200"
        >
          See all customer reviews
        </button>
      </div>

      {/* classic modal — landscape: photo left, full review right */}
      <ScopedDialog
        open={!!active}
        onOpenChange={open => !open && setActive(null)}
        overlayClassName="rounded-[12px]"
        className="flex w-[1120px] max-w-[92%] gap-8 rounded-2xl bg-white p-8 shadow-xl"
      >
        {active && (
          <>
            <ScopedDialogClose
              aria-label="Close"
              className="absolute top-5 right-5 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
            >
              <img src="/icons/icon-close-x.svg" alt="" className="h-6 w-6" />
            </ScopedDialogClose>
            <img src={active.img} alt={active.name} className="w-[720px] shrink-0 self-start" />
            <div className="flex-1 pr-6">
              <ScopedDialogTitle className="font-display pr-8 text-[20px] leading-tight font-[800] text-black">
                {active.name}
              </ScopedDialogTitle>
              <p className="mt-1 text-sm text-neutral-600">
                {active.city} · {active.pieces} pieces ordered
              </p>
              <div className="mt-2 flex items-center gap-2">
                <StarRating value={active.rating} />
                <span className="text-sm font-semibold text-black">{active.rating}</span>
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-neutral-700">
                “{active.quote}”
              </blockquote>
            </div>
          </>
        )}
      </ScopedDialog>
    </>
  )
}
