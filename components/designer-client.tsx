"use client"

import dynamic from "next/dynamic"

// The Designer is a fully client-side, interactive canvas app (no SEO value,
// already force-dynamic). Loading it with ssr:false skips server rendering, so
// there's no hydration step to mismatch — this avoids Radix useId hydration
// errors, including ones caused by browser extensions mutating the SSR HTML.
const Designer = dynamic(() => import("@/components/designer"), { ssr: false })

export default function DesignerClient() {
    return <Designer />
}
