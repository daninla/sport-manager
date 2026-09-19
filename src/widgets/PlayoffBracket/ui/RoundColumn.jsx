import React from 'react';
import { Box, Typography } from '@mui/material';
import MatchCard from './MatchCard';
import { theme } from '../../../shared/config/theme';

const accentMap = {
  Final: '#ff7a59',
  Semifinals: '#8b5cf6',
  Quarterfinals: '#34d399',
  'Round of 16': '#06b6d4',
  'Round of 32': '#f59e0b',
};

function RoundColumn({ round, setMatchRef, positions = {}, containerHeight = 600, colIndex = 0 }) {
  const accent = accentMap[round.round] || theme.bracket.light.accentPrimary;

  return (
    <Box sx={{ position: 'relative', width: 260, minHeight: containerHeight, flexShrink: 0 }}>
      <Typography
        sx={{
          display: 'inline-block',
          px: 2,
          py: 0.7,
          mb: 2,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.08)',
          color: '#f8fafc',
          fontWeight: 800,
          fontSize: '0.85rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          border: '1px solid rgba(148,163,184,0.2)',
        }}
      >
        {round.round}
      </Typography>

      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {round.matches.map((m, idx) => {
          const pos = positions[m.id] || { y: idx * 128 };
          return (
            <Box
              key={m.id || idx}
              sx={{
                position: 'relative',
                top: 0,
                width: '100%',
                transform: `translateY(${pos.y - (idx * 12)}px)`,
              }}
            >
              <MatchCard
                match={m}
                setRef={(el) => setMatchRef && setMatchRef(m.id, el)}
                accent={accent}
                variant="dark"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default RoundColumn;
