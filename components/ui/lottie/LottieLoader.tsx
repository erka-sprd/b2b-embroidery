"use client"

import { useEffect, useRef } from "react"
// SVG-only ("light") build — smaller, renders the animation as inline SVG.
import lottie from "lottie-web/build/player/lottie_light"

import animationData from "@/components/ui/lottie/designer-loader.json"

type LottieLoaderProps = {
  size?: number
  className?: string
}

// Renders the Lottie JSON as a looping inline-SVG animation.
export default function LottieLoader({ size = 180, className }: LottieLoaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    let anim: ReturnType<typeof lottie.loadAnimation> | undefined
    const rafs: number[] = []
    const queue = (fn: () => void) => rafs.push(requestAnimationFrame(fn))

    // Building this mask/track-matte-heavy animation is main-thread work, and
    // in Chrome the first *paint* of all those <mask>/<clipPath> nodes is the
    // expensive part — if motion starts on that same frame, it stutters
    // ("laggy start"). Firefox paints it more gracefully, so it's smooth there.
    //
    // So: (1) wait two paints so the designer's mount commits first, then
    // (2) build with autoplay OFF and render a *static* frame 0, letting Chrome
    // do its heavy first layout/paint while nothing is moving, then
    // (3) start motion a couple frames later, on a settled tree — smooth in
    // both browsers, and the SVG look Firefox handles well is unchanged.
    queue(() =>
      queue(() => {
        anim = lottie.loadAnimation({
          container,
          renderer: "svg",
          loop: true,
          autoplay: false,
          animationData,
          // Build every layer up front so the first loop doesn't hitch.
          rendererSettings: { progressiveLoad: false },
        })
        anim.addEventListener("DOMLoaded", () => {
          anim?.goToAndStop(0, true) // force the costly first paint, static
          queue(() => queue(() => anim?.play())) // then start motion, settled
        })
      })
    )
    return () => {
      rafs.forEach(cancelAnimationFrame)
      anim?.destroy()
    }
  }, [])

  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size }}
      className={className}
    />
  )
}
