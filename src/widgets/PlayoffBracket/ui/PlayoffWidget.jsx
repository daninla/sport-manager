import React, { useRef } from 'react';
import { Box } from '@mui/material';
import RoundColumn from './RoundColumn';
import Connector from './Connector';

function PlayoffBracket({ playoff = [] }) {
  const containerRef = useRef(null);
  const matchRefs = useRef({});

  if (!playoff || !playoff.length) return null;

  function setMatchRef(id, el) {
    if (!id) return;
    if (el) matchRefs.current[id] = el;
    else delete matchRefs.current[id];
  }

  const ITEM_H = 110;
  const V_GAP = 18;
  const COL_GAP = 42;

  const positions = {};

  const leaves = playoff[0].matches.length;
  for (let i = 0; i < leaves; i += 1) {
    const match = playoff[0].matches[i];
    positions[match.id] = {
      x: 0,
      y: i * (ITEM_H + V_GAP),
    };
  }

  for (let roundIndex = 1; roundIndex < playoff.length; roundIndex += 1) {
    const round = playoff[roundIndex];
    round.matches.forEach((match, idx) => {
      const child1 = playoff[roundIndex - 1].matches[idx * 2];
      const child2 = playoff[roundIndex - 1].matches[idx * 2 + 1];
      if (!child1 || !child2) return;

      const y1 = positions[child1.id]?.y ?? 0;
      const y2 = positions[child2.id]?.y ?? 0;
      const y = (y1 + y2) / 2;
      positions[match.id] = {
        x: roundIndex * (260 + COL_GAP),
        y,
      };
    });
  }

  const maxY = Math.max(...Object.values(positions).map((p) => p.y));
  const containerHeight = maxY + ITEM_H + 80;

  return (
    <Box
      sx={{
        position: 'relative',
        py: 3,
        px: { xs: 1, md: 2 },
        overflowX: 'auto',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(2,6,23,0.98) 100%)',
        borderRadius: 4,
        border: '1px solid rgba(148,163,184,0.2)',
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          display: 'flex',
          gap: 3,
          alignItems: 'flex-start',
          minWidth: Math.max(760, playoff.length * 280),
          height: containerHeight,
          p: 1,
        }}
      >
        {playoff.map((round, idx) => (
          <RoundColumn
            key={round.round || idx}
            round={round}
            setMatchRef={setMatchRef}
            positions={positions}
            containerHeight={containerHeight}
            colIndex={idx}
          />
        ))}

        <Connector
          containerRef={containerRef}
          rounds={playoff}
          matchRefs={matchRefs.current}
          colorForRound={(r) => (r < Math.ceil(playoff.length / 2) - 1 ? '#ff7a59' : '#38bdf8')}
        />
      </Box>
    </Box>
  );
}

export default PlayoffBracket;
