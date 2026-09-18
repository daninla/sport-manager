import { useEffect, useState } from 'react';

function Connector({ containerRef, rounds = [], matchRefs = {}, colorForRound = () => '#ff7a59' }) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    if (!containerRef?.current) return;

    function build() {
      const rect = containerRef.current.getBoundingClientRect();
      const out = [];

      for (let r = 0; r < rounds.length - 1; r++) {
        const cur = rounds[r];
        const nxt = rounds[r + 1];

        cur.matches.forEach((m, i) => {
          const sEl = matchRefs[m.id];
          if (!sEl) return;
          const target = Math.floor(i / 2);
          const tMatch = nxt.matches[target];
          const tEl = matchRefs[tMatch?.id];
          if (!tEl) return;

          const s = sEl.getBoundingClientRect();
          const t = tEl.getBoundingClientRect();

          const startX = s.right - rect.left;
          const startY = s.top + s.height / 2 - rect.top;
          const endX = t.left - rect.left;
          const endY = t.top + t.height / 2 - rect.top;

          const cx = startX + (endX - startX) * 0.5;
          const d = `M ${startX} ${startY} C ${cx} ${startY} ${cx} ${endY} ${endX} ${endY}`;
          out.push({ d, key: `${m.id}-${tMatch.id}`, round: r });
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
    <svg width={rect.width} height={rect.height} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      {paths.map((p) => (
        <path key={p.key} d={p.d} stroke={colorForRound(p.round)} strokeWidth={3.2} fill="none" strokeLinecap="round" opacity={0.98} />
      ))}
    </svg>
  );
}

export default Connector;
