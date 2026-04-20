/** Clean margin rule + faint lines — ledger / filing, not doodle. */
export function RuledPaperArt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        width="280"
        height="240"
        rx="3"
        stroke="rgba(232,230,224,0.08)"
        strokeWidth="0.75"
      />
      <line
        x1="36"
        y1="12"
        x2="36"
        y2="228"
        stroke="rgba(91,122,158,0.35)"
        strokeWidth="0.75"
      />
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1="48"
          y1={24 + i * 14}
          x2="268"
          y2={24 + i * 14}
          stroke="rgba(232,230,224,0.05)"
          strokeWidth="0.5"
        />
      ))}
      <rect
        x="52"
        y="44"
        width="200"
        height="8"
        rx="1"
        fill="rgba(232,230,224,0.04)"
      />
      <rect
        x="52"
        y="60"
        width="140"
        height="6"
        rx="1"
        fill="rgba(232,230,224,0.03)"
      />
    </svg>
  );
}
