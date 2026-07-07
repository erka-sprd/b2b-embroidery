"use client"

import {useEffect, useRef} from "react"
// SVG renderer keeps the small icon crisp.
import lottie, {type AnimationItem} from "lottie-web/build/player/lottie_light"

import animationData from "@/components/ui/lottie/graphics.json"

type Props = {
    // Whether the button is currently hovered. On mount / when true it plays
    // forward once; when it flips to false it plays in reverse once and then
    // calls onReverseDone so the parent can swap back to the static icon.
    hovered: boolean
    onReverseDone?: () => void
    className?: string
}

// The graphics-button icon animation. Its artboard matches the whole button
// (88x66), with the shapes where the static icon sits, so it's overlaid to fill
// the button. Plays once forward on hover-in, once reversed on hover-out.
export default function GraphicsHoverIcon({hovered, onReverseDone, className}: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const animRef = useRef<AnimationItem | null>(null)
    const dir = useRef(1)
    const completed = useRef(false) // forward reached the end
    const doneRef = useRef(onReverseDone)
    doneRef.current = onReverseDone

    // Load once (playback is driven by the hovered effect below).
    useEffect(() => {
        const container = ref.current
        if (!container) return
        const anim = lottie.loadAnimation({
            container,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData,
            rendererSettings: {preserveAspectRatio: "xMidYMid meet"},
        })
        animRef.current = anim
        anim.addEventListener("complete", () => {
            if (dir.current === 1) completed.current = true // forward finished
            else doneRef.current?.() // reverse reached the start
        })
        return () => anim.destroy()
    }, [])

    // Drive playback from hover state (also runs on mount, hovered = true).
    useEffect(() => {
        const anim = animRef.current
        if (!anim) return
        if (hovered) {
            completed.current = false
            dir.current = 1
            anim.setDirection(1)
            anim.play() // forward from the current frame (0 on first hover)
        } else {
            dir.current = -1
            anim.setDirection(-1)
            if (completed.current) {
                // Fully played out -> reverse from the middle so the wind-back
                // is shorter (about half the duration) at normal speed.
                anim.goToAndPlay(anim.totalFrames / 2, true)
            } else {
                anim.play() // reverse from wherever the forward got to
            }
        }
    }, [hovered])

    return <div ref={ref} className={className} aria-hidden />
}
