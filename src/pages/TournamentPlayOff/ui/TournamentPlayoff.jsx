import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetPlayersQuery } from '@/entities/player';
import {
  buildPlayoffBracket,
  flattenPlayoffBracket,
  getNearestBracketSize,
  useGetPlayoffMatchesByTournamentIdQuery,
  useGetTournamentByIdQuery,
} from '@/entities/tournament';
import { PlayoffBracket } from '@/widgets/PlayoffBracket';

const roundOrder = {
  'Round of 64': 0,
  'Round of 32': 1,
  'Round of 16': 2,
  Quarterfinals: 3,
  Semifinals: 4,
  Final: 5,
};

const normalizePlayoffData = (matches = [], players = []) => {
  const playersById = new Map(
    players.map((player) => [Number(player.id), player.fullName || player.name])
  );

  const grouped = matches.reduce((acc, match) => {
    const round = match.round || 'Final';
    if (!acc[round]) acc[round] = [];

    acc[round].push({
      ...match,
      id: match.id || `${round}-${acc[round].length + 1}`,
      player1:
        match.player1 ||
        playersById.get(Number(match.player1Id)) ||
        (match.player1Id ? `Player ${match.player1Id}` : 'TBD'),
      player2:
        match.player2 ||
        playersById.get(Number(match.player2Id)) ||
        (match.player2Id ? `Player ${match.player2Id}` : 'TBD'),
      score:
        match.score && typeof match.score === 'object'
          ? `${match.score.player1 ?? 0}:${match.score.player2 ?? 0}`
          : match.score ?? '-',
      status: match.status || 'pending',
      active: Boolean(match.active),
    });

    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([round, roundMatches]) => ({
      round,
      matches: roundMatches.sort(
        (a, b) => Number(a.matchIndex || 0) - Number(b.matchIndex || 0)
      ),
    }))
    .sort(
      (a, b) => (roundOrder[a.round] ?? 99) - (roundOrder[b.round] ?? 99)
    );
};

const buildFallbackPlayoff = (tournament, players = []) => {
  if (!tournament || tournament.bracketFormat !== 'Single Elimination') {
    return [];
  }

  const participantIds = Array.isArray(tournament.players)
    ? tournament.players
    : [];

  if (participantIds.length < 2) {
    return [];
  }

  const bracketSize = getNearestBracketSize(participantIds.length);
  const selectedPlayers = participantIds
    .slice(0, bracketSize)
    .map((id) => {
      const player = players.find((item) => Number(item.id) === Number(id));

      return player
        ? { id: Number(player.id), fullName: player.fullName || player.name }
        : { id: Number(id), fullName: `Player ${id}` };
    })
    .filter(Boolean);

  const paddedPlayers = [...selectedPlayers];
  while (paddedPlayers.length < bracketSize) {
    paddedPlayers.push({ id: null, fullName: 'TBD' });
  }

  if (!paddedPlayers.length) {
    return [];
  }

  const bracket = buildPlayoffBracket(paddedPlayers);
  return normalizePlayoffData(flattenPlayoffBracket(bracket), players);
};

function TournamentPlayoffPage() {
  const { id } = useParams();
  const { data: tournament, isLoading, error } = useGetTournamentByIdQuery(id);
  const { data: players = [] } = useGetPlayersQuery();
  const { data: playoffMatches = [] } = useGetPlayoffMatchesByTournamentIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <Typography sx={{ p: 4 }}>Loading playoff...</Typography>;
  }

  if (error || !tournament) {
    return (
      <Typography sx={{ p: 4, color: 'error.main' }}>
        Tournament not found
      </Typography>
    );
  }

  const participantIds = Array.isArray(tournament.players) ? tournament.players : [];
  const playoffFromParticipants = buildFallbackPlayoff(tournament, players);
  const playoffFromDb = normalizePlayoffData(playoffMatches, players);
  const playoff = participantIds.length >= 2
    ? playoffFromParticipants
    : playoffFromDb;
  const isSingleElimination = tournament.bracketFormat === 'Single Elimination';

  if (!isSingleElimination || playoff.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Playoff bracket
        </Typography>
        <Typography sx={{ color: '#cbd5e1' }}>
          This tournament format does not have a playoff bracket yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #172554 0%, #0f172a 42%, #020817 100%)',
        color: '#f8fafc',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
          {tournament.name}
        </Typography>
        <Typography sx={{ mt: 1, color: '#cbd5e1' }}>
          Playoff bracket · {tournament.bracketFormat}
        </Typography>
      </Box>

      <PlayoffBracket playoff={playoff} />
    </Box>
  );
}

export default TournamentPlayoffPage;
