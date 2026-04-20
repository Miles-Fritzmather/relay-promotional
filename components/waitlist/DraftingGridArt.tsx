/** Geometric drafting-table motif — precision, not sketch. Decorative only. */
export function DraftingGridArt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="399"
        height="319"
        rx="2"
        stroke="rgba(232,230,224,0.07)"
        strokeWidth="1"
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={40 + i * 28}
          y1="8"
          x2={40 + i * 28}
          y2="312"
          stroke="rgba(232,230,224,0.04)"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="8"
          y1={32 + i * 28}
          x2="392"
          y2={32 + i * 28}
          stroke="rgba(232,230,224,0.04)"
          strokeWidth="0.5"
        />
      ))}
      <rect
        x="48"
        y="48"
        width="120"
        height="72"
        stroke="rgba(91,122,158,0.35)"
        strokeWidth="0.75"
      />
      <rect
        x="200"
        y="120"
        width="152"
        height="96"
        stroke="rgba(232,230,224,0.1)"
        strokeWidth="0.75"
      />
      <path
        d="M56 200 L180 200 L180 248 L56 248 Z"
        stroke="rgba(232,230,224,0.08)"
        strokeWidth="0.6"
        fill="none"
      />
      <circle cx="320" cy="64" r="24" stroke="rgba(91,122,158,0.25)" strokeWidth="0.75" />
    </svg>
  );
}
