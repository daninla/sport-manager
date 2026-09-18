import React from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from '../../../shared/config/theme';

function WinnerPanel({ winner = { name: 'Winner' }, accent = theme.bracket.light.accentPrimary }) {
  return (
    <Box sx={{ minWidth: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pl: 4 }}>
      <Box sx={{ width: 140, height: 140, borderRadius: 16, border: `4px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: '3rem', fontWeight: 900, color: accent }}>🏆</Typography>
      </Box>

      <Box sx={{ width: 220, borderRadius: 12, border: `2px solid ${accent}`, p: 2, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase' }}>Winner</Typography>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 900, color: '#111827' }}>{winner.name}</Typography>
      </Box>
    </Box>
  );
}

export default WinnerPanel;
