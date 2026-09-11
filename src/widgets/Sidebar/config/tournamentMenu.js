export const getTournamentMenu = (tournamentId) => [
  { label: 'Review', path: `/tournaments/${tournamentId}` },
  { label: 'Participants', path: `/tournaments/${tournamentId}/participants` },
  { label: 'Draw', path: `/tournaments/${tournamentId}/draw` },
  { label: 'Groups', path: `/tournaments/${tournamentId}/groups` },
  { label: 'Playoffs', path: `/tournaments/${tournamentId}/playoff` },
  { label: 'Matches', path: `/tournaments/${tournamentId}/matches` },
  { label: 'Monitor', path: `/tournaments/${tournamentId}/monitor` },
  { label: 'Rating', path: `/tournaments/${tournamentId}/rating` },
  { label: 'Documents', path: `/tournaments/${tournamentId}/documents` },
  { label: 'Settings', path: `/tournaments/${tournamentId}/settings` },
];
