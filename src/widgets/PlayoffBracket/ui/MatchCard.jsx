import React from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from '../../../shared/config/theme';

function Pill({ text, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 28, height: 28, borderRadius: 14, bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
        •
      </Box>
      <Typography sx={{ fontSize: '0.92rem', color: '#111827', fontWeight: 700 }}>{text}</Typography>
    </Box>
  );
}

function MatchCard({ match, setRef, accent = theme.bracket.light.accentPrimary, variant = 'light' }) {
  const isLight = variant === 'light';
  const topColor = accent;
  const bottomColor = lightenHex(accent, 24);

  return (
    <Box ref={(el) => setRef && setRef(el)} sx={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'transparent' }}>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: topColor, px: 2, py: 0.6, borderRadius: 999, boxShadow: '0 12px 30px rgba(0,0,0,0.25)' }}>
        <Box sx={{ width: 28, height: 28, borderRadius: 14, bgcolor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>1</Box>
        <Typography sx={{ fontSize: '0.95rem', color: '#fff', fontWeight: 800 }}>{match.player1 || 'Team'}</Typography>
        <Box sx={{ ml: 'auto', color: '#fff', fontWeight: 800 }}>{match.score ?? '-'}</Box>
      </Box>

      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: bottomColor, px: 2, py: 0.6, borderRadius: 999, boxShadow: '0 8px 22px rgba(0,0,0,0.18)' }}>
        <Box sx={{ width: 28, height: 28, borderRadius: 14, bgcolor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>2</Box>
        <Typography sx={{ fontSize: '0.95rem', color: '#fff', fontWeight: 700 }}>{match.player2 || 'Team'}</Typography>
        <Box sx={{ ml: 'auto', color: '#fff', fontWeight: 800 }}>{(match.status || 'pending').toUpperCase()}</Box>
      </Box>
    </Box>
  );
}

function lightenHex(hex, percent) {
  try {
    const c = hex.replace('#', '');
    const num = parseInt(c, 16);
    let r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100));
    let b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100));
    r = r < 255 ? r : 255;
    g = g < 255 ? g : 255;
    b = b < 255 ? b : 255;
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  } catch (e) {
    return hex;
  }
}

export default MatchCard;

