import React, { useRef } from 'react';
import { Box } from '@mui/material';
import RoundColumn from './RoundColumn';
import Connector from './Connector';
import WinnerPanel from './WinnerPanel';
import { theme } from '../../../shared/config/theme';

function PlayoffBracket({ playoff = [] }) {
  const containerRef = useRef(null);
  const matchRefs = useRef({});

  if (!playoff || !playoff.length) return null;

  function setMatchRef(id, el) {
    if (!id) return;
    if (el) matchRefs.current[id] = el;
    else delete matchRefs.current[id];
  }

  // layout: compute Y positions so each parent sits between its two children
  const ITEM_H = 64;
  const V_GAP = 18;
  const COL_GAP = 48;

  const positions = {};

  // first round positions (leaf matches)
  const leaves = playoff[0].matches.length;
  for (let i = 0; i < leaves; i++) {
    const m = playoff[0].matches[i];
    positions[m.id] = {
      x: 0,
      y: i * (ITEM_H + V_GAP),
    };
  }

  // subsequent rounds
  for (let r = 1; r < playoff.length; r++) {
    const round = playoff[r];
    round.matches.forEach((match, idx) => {
      const child1 = playoff[r - 1].matches[idx * 2];
      const child2 = playoff[r - 1].matches[idx * 2 + 1];
      const y1 = positions[child1.id].y;
      const y2 = positions[child2.id].y;
      const y = (y1 + y2) / 2;
      positions[match.id] = {
        x: r * (240 + COL_GAP),
        y,
      };
    });
  }

  // compute container height
  const maxY = Math.max(...Object.values(positions).map((p) => p.y));
  const containerHeight = maxY + ITEM_H + 40;

  const finalRound = playoff[playoff.length - 1];
  const winnerName = finalRound?.matches?.[0]?.winner || 'TBD';

  return (
    <Box sx={{ position: 'relative', display: 'flex', gap: 6, alignItems: 'flex-start', p: 4, bgcolor: '#0b0b10' }}>
      <Box ref={containerRef} sx={{ display: 'flex', gap: 6, alignItems: 'flex-start', height: containerHeight }}>
        {playoff.map((round, idx) => (
          <RoundColumn
            key={round.round || idx}
            round={round}
            roundIndex={idx}
            totalRounds={playoff.length}
            setMatchRef={setMatchRef}
            positions={positions}
            containerHeight={containerHeight}
            colIndex={idx}
          />
        ))}

        <Connector containerRef={containerRef} rounds={playoff} matchRefs={matchRefs.current} colorForRound={(r) => (r < Math.ceil(playoff.length / 2) - 1 ? '#e11d48' : '#0ea5e9')} />
      </Box>

      {/* WinnerPanel intentionally removed per user request (kept out) */}
    </Box>
  );
}

export default PlayoffBracket;
