export const getTournamentMenu = (tournamentId) => [
  { label: 'Обзор', path: `/tournaments/${tournamentId}` },
  { label: 'Учасники', path: `/tournaments/${tournamentId}/participants` },
  { label: 'Жеребкування', path: `/tournaments/${tournamentId}/draw` },
  { label: 'Групи', path: `/tournaments/${tournamentId}/groups` },
  { label: 'Плей-офф', path: `/tournaments/${tournamentId}/playoff` },
  { label: 'Матчі', path: `/tournaments/${tournamentId}/matches` },
  { label: 'Монітор', path: `/tournaments/${tournamentId}/monitor` },
  { label: 'Рейтинг', path: `/tournaments/${tournamentId}/rating` },
  { label: 'Документи', path: `/tournaments/${tournamentId}/documents` },
  { label: 'Налаштування', path: `/tournaments/${tournamentId}/settings` },
];
