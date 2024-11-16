const NoiseGrain = () => {
  return (
    <svg
      className="pointer-events-none fixed inset-0 -z-50 size-full overflow-hidden bg-white/10 opacity-10"
      aria-hidden="true"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

export { NoiseGrain }
