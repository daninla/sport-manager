import { useEffect, useState } from 'react';

function Connector({ containerRef, rounds = [], matchRefs = {}, colorForRound = () => '#ff7a59' }) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    if (!containerRef?.current) return;

    function build() {
      const rect = containerRef.current.getBoundingClientRect();
      const out = [];

      for (let r = 0; r < rounds.length - 1; r += 1) {
        const currentRound = rounds[r];
        const nextRound = rounds[r + 1];

        currentRound.matches.forEach((m, i) => {
          const sourceEl = matchRefs[m.id];
          if (!sourceEl) return;

          const targetIndex = Math.floor(i / 2);
          const targetMatch = nextRound.matches[targetIndex];
          const targetEl = matchRefs[targetMatch?.id];
          if (!targetEl) return;

          const sourceRect = sourceEl.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();

          const startX = sourceRect.right - rect.left;
          const startY = sourceRect.top + sourceRect.height / 2 - rect.top;
          const endX = targetRect.left - rect.left;
          const endY = targetRect.top + targetRect.height / 2 - rect.top;

          const elbowX = startX + (endX - startX) * 0.5;
          const d = `M ${startX} ${startY} L ${elbowX} ${startY} L ${elbowX} ${endY} L ${endX} ${endY}`;
          out.push({ d, key: `${m.id}-${targetMatch.id}`, round: r });
        });
      }

      setPaths(out);
    }

    build();
    const ro = new ResizeObserver(build);
    ro.observe(containerRef.current);
    window.addEventListener('scroll', build, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', build, true);
    };
  }, [containerRef, rounds, matchRefs]);

  if (!containerRef?.current) return null;
  const rect = containerRef.current.getBoundingClientRect();

  return (
    <svg
      width={rect.width}
      height={rect.height}
      style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
    >
      {paths.map((p) => (
        <path
          key={p.key}
          d={p.d}
          stroke={colorForRound(p.round)}
          strokeWidth={4}
          fill="none"
          strokeLinecap="square"
          strokeLinejoin="miter"
          opacity={0.98}
        />
      ))}
    </svg>
  );
}

export default Connector;
