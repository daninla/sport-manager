import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PlayoffMatchCard } from './MatchCard.jsx';

const CARD_WIDTH = 240;
const CARD_HEIGHT = 140;      // Must strictly match the height in MatchCard.jsx
const BASE_SLOT_HEIGHT = 160; // Base slot container height for Round 1
const CONNECTOR_WIDTH = 40;   // Horizontal connector line length
const LINE_COLOR = '#94a3b8'; // Slate 400

/**
 * Renders an exact SVG orthogonal bracket between two stages.
 * Both input and output lines hit the exact vertical center of their respective cards.
 */
function BracketConnector({ height }) {
  const topY = height / 4;
  const bottomY = (height * 3) / 4;
  const midY = height / 2;
  const halfX = CONNECTOR_WIDTH / 2;

  return (
    <Box
      sx={{
        width: CONNECTOR_WIDTH,
        height: `${height}px`,
        flexShrink: 0
      }}
    >
      <svg
        width={CONNECTOR_WIDTH}
        height={height}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Upper match outgoing horizontal line */}
        <line
          x1={0}
          y1={topY}
          x2={halfX}
          y2={topY}
          stroke={LINE_COLOR}
          strokeWidth="2"
        />

        {/* Lower match outgoing horizontal line */}
        <line
          x1={0}
          y1={bottomY}
          x2={halfX}
          y2={bottomY}
          stroke={LINE_COLOR}
          strokeWidth="2"
        />

        {/* Vertical junction bar */}
        <line
          x1={halfX}
          y1={topY}
          x2={halfX}
          y2={bottomY}
          stroke={LINE_COLOR}
          strokeWidth="2"
        />

        {/* Center line entering the next round card */}
        <line
          x1={halfX}
          y1={midY}
          x2={CONNECTOR_WIDTH}
          y2={midY}
          stroke={LINE_COLOR}
          strokeWidth="2"
        />
      </svg>
    </Box>
  );
}

export function RoundColumn({
  roundName,
  matches = [],
  roundIndex,
  totalRounds,
  playerLookup,
  onEditMatch,
  isLocked = false
}) {
  const hasNextRound = roundIndex < totalRounds - 1;
  const currentSlotHeight = BASE_SLOT_HEIGHT * Math.pow(2, roundIndex);
  const nextSlotHeight = currentSlotHeight * 2;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* 1. Stage Header (Fixed height to prevent vertical offset) */}
      <Box sx={{ width: CARD_WIDTH, height: 60, mb: 2 }}>
        <Paper
          elevation={0}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'primary.50',
            border: '1px solid',
            borderColor: 'primary.100',
            borderRadius: 2
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: 0.5,
              color: 'primary.dark',
              textTransform: 'uppercase'
            }}
          >
            {roundName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </Typography>
        </Paper>
      </Box>

      {/* 2. Grid Body: Matches and SVG Lines start at the exact same Y coordinate */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Matches Column */}
        <Box sx={{ width: CARD_WIDTH, display: 'flex', flexDirection: 'column' }}>
          {matches.map((match) => (
            <Box
              key={match.id}
              sx={{
                height: `${currentSlotHeight}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PlayoffMatchCard
                match={match}
                playerLookup={playerLookup}
                isLocked={isLocked}
                onEditMatch={onEditMatch}
              />
            </Box>
          ))}
        </Box>

        {/* SVG Connectors Column (Aligned 1-to-1 with matches) */}
        {hasNextRound && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: Math.ceil(matches.length / 2) }).map((_, pairIdx) => (
              <BracketConnector key={pairIdx} height={nextSlotHeight} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RoundColumn;