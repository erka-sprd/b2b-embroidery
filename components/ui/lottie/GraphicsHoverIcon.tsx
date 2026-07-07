"use client"

import {useEffect, useRef} from "react"
// SVG renderer keeps the small icon crisp.
import lottie from "lottie-web/build/player/lottie_light"

import animationData from "@/components/ui/lottie/graphics.json"

// The graphics-button icon animation. Its artboard matches the whole button
// (88x66), with the shapes positioned where the static icon sits — so it's
// overlaid to fill the button. Mounted only while hovering, so it plays once
// from the start on every hover (loop: false) and resets on mouse-leave.
export default function GraphicsHoverIcon({className}: {className?: string}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = ref.current
        if (!container) return
        const anim = lottie.loadAnimation({
            container,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData,
            rendererSettings: {preserveAspectRatio: "xMidYMid meet"},
        })
        return () => anim.destroy()
    }, [])

    return <div ref={ref} className={className} aria-hidden />
}
