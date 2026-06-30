"use client"

import { useRouter } from "next/navigation"
import { useRef } from "react"

import GradientButton from "@/components/gradient-button"

// Opens the native file picker; once a logo is chosen it's stashed (as a data
// URL) in sessionStorage and we navigate to the designer, which auto-places it
// on the canvas — same outcome as dropping it in the upload panel.
export default function HeroUploadButton() {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = "" // allow re-selecting the same file later
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            try {
                sessionStorage.setItem("pendingUpload", String(reader.result))
            } catch {}
            router.push("/")
        }
        reader.readAsDataURL(file)
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/svg+xml,image/png,image/jpeg"
                className="hidden"
                onChange={onFile}
            />
            <GradientButton onClick={() => inputRef.current?.click()}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload your logo
            </GradientButton>
        </>
    )
}
