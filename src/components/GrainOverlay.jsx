// A barely-visible noise texture over the whole page — felt more than seen.
// Keeps flat dark gradients from reading as plasticky/flat.
const GrainOverlay = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
    >
      <svg className="w-full h-full">
        <filter id="grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
};

export default GrainOverlay;
