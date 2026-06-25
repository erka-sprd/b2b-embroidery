// Star rating using the component-kit filled Star icon. Supports fractional
// values (e.g. 4.5) by clipping a gold star over a neutral one.
const STAR_PATH =
  "M11.1087 2.93833C11.6137 1.68657 13.3859 1.68657 13.8908 2.93833L15.8281 7.74044C15.8989 7.91587 16.0626 8.03634 16.2511 8.05172L21.1173 8.44879C22.4367 8.55645 22.98 10.1959 21.9859 11.0701L18.2934 14.3178C18.1568 14.438 18.0962 14.623 18.1353 14.8007L19.3161 20.1678C19.6111 21.5085 18.0994 22.5082 16.9811 21.712L12.7898 18.7277C12.6162 18.6041 12.3833 18.6041 12.2098 18.7277L8.01842 21.712C6.90016 22.5082 5.38847 21.5085 5.68343 20.1678L6.86421 14.8007C6.90331 14.623 6.84275 14.438 6.7061 14.3178L3.01346 11.0702C2.0194 10.1959 2.56266 8.55644 3.88209 8.44878L8.7484 8.05172C8.93694 8.03634 9.10066 7.91587 9.17143 7.74044L11.1087 2.93833Z"

function StarSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d={STAR_PATH} fill="currentColor" />
    </svg>
  )
}

export default function StarRating({ value, count = 5 }: { value: number; count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of ${count} stars`}>
      {Array.from({ length: count }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <span key={i} className="relative inline-block size-5">
            <StarSvg className="absolute inset-0 size-5 text-neutral-300" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <StarSvg className="size-5 text-[#FACC15]" />
            </span>
          </span>
        )
      })}
    </div>
  )
}
