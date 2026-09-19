import React from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from '../../../shared/config/theme';

function formatScore(score) {
  if (typeof score === 'string') return score;
  if (score && typeof score === 'object') {
    const player1 = score.player1 ?? 0;
    const player2 = score.player2 ?? 0;
    return `${player1}:${player2}`;
  }
  return '-';
}

function MatchCard({ match, setRef, accent = theme.bracket.light.accentPrimary, variant = 'light' }) {
  const isDark = variant === 'dark';
  const cardBg = isDark ? 'rgba(15, 23, 42, 0.92)' : '#ffffff';
  const textColor = isDark ? '#e2e8f0' : '#0f172a';
  const mutedColor = isDark ? '#cbd5e1' : '#475569';
  const scoreColor = isDark ? '#f8fafc' : '#0f172a';
  const status = (match.status || 'pending').toUpperCase();

  const renderRow = ({ playerName, index, scoreValue, isTop }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 1.25,
        py: 0.8,
        borderRadius: 2,
        background: isTop ? 'rgba(255,255,255,0.08)' : 'rgba(148,163,184,0.08)',
        border: '1px solid rgba(148,163,184,0.16)',
      }}
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: isTop ? accent : 'rgba(148,163,184,0.25)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.68rem',
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {index}
      </Box>

      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: textColor,
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {playerName || 'TBD'}
      </Typography>

      <Box
        sx={{
          minWidth: isTop ? 38 : 52,
          px: 0.6,
          py: 0.2,
          borderRadius: 1,
          background: isTop ? 'rgba(15, 23, 42, 0.14)' : 'rgba(15, 23, 42, 0.12)',
          color: isTop ? scoreColor : '#e2e8f0',
          fontSize: isTop ? '0.7rem' : '0.58rem',
          fontWeight: 800,
          textAlign: 'center',
          letterSpacing: isTop ? '0' : '0.08em',
          textTransform: isTop ? 'none' : 'uppercase',
        }}
      >
        {scoreValue}
      </Box>
    </Box>
  );

  return (
    <Box
      ref={(el) => setRef && setRef(el)}
      sx={{
        width: '100%',
        background: cardBg,
        borderRadius: 3,
        border: `1px solid ${isDark ? 'rgba(148,163,184,0.18)' : 'rgba(15,23,42,0.08)'}`,
        boxShadow: isDark ? '0 20px 45px rgba(15,23,42,0.35)' : '0 14px 28px rgba(15,23,42,0.08)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          background: accent,
          px: 1.1,
          py: 0.7,
          borderBottom: isDark ? '1px solid rgba(15,23,42,0.35)' : '1px solid rgba(255,255,255,0.2)',
        }}
      >
        {renderRow({ playerName: match.player1 || 'TBD', index: 1, scoreValue: formatScore(match.score), isTop: true })}
      </Box>

      <Box sx={{ px: 1.1, py: 0.8, background: isDark ? 'rgba(15,23,42,0.88)' : '#ffffff' }}>
        {renderRow({ playerName: match.player2 || 'TBD', index: 2, scoreValue: status, isTop: false })}
      </Box>
    </Box>
  );
}

export default MatchCard;

