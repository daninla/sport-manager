import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import MatchCard from './MatchCard';
import { theme } from '../../../shared/config/theme';

const accentMap = {
  Final: theme.bracket.light.accentPrimary,
  Semifinals: theme.bracket.light.accentSecondary,
  Quarterfinals: '#34d399',
  'Round of 16': '#06b6d4',
};

function RoundColumn({ round, roundIndex, totalRounds, setMatchRef, positions = {}, containerHeight = 600, colIndex = 0 }) {
  const accent = accentMap[round.round] || theme.bracket.light.accentPrimary;

  const colX = colIndex * 288; // matches x position used earlier

  return (
    <Box sx={{ position: 'relative', width: 240, minHeight: containerHeight }}>
      <Typography
        sx={{
          display: 'inline-block',
          px: 2,
          py: 0.6,
          borderRadius: 20,
          background: theme.bracket.light.headerBg,
          color: theme.bracket.light.headerText,
          fontWeight: 800,
          fontSize: '0.95rem',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        {round.round}
      </Typography>

      {round.matches.map((m, idx) => {
        const pos = positions[m.id] || { x: colX, y: idx * 100 };
        return (
          <Box key={m.id || idx} sx={{ position: 'absolute', left: 0, top: pos.y, width: '100%' }}>
            <MatchCard match={m} setRef={(el) => setMatchRef && setMatchRef(m.id, el)} accent={accent} variant="dark" />
          </Box>
        );
      })}
    </Box>
  );
}

export default RoundColumn;
