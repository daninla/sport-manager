export const getTournamentMenu = (tournamentId) => [
  { label: 'Review', path: `/tournaments/${tournamentId}` },
  { label: 'Participants', path: `/tournaments/${tournamentId}/participants` },
  { label: 'Groups', path: `/tournaments/${tournamentId}/groups` },
  { label: 'Playoff', path: `/tournaments/${tournamentId}/playoff` },
  { label: 'Matches', path: `/tournaments/${tournamentId}/matches` },
  { label: 'Documents', path: `/tournaments/${tournamentId}/documents` },
  { label: 'Settings', path: `/tournaments/${tournamentId}/settings` },
];
