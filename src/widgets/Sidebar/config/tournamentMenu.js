export const getTournamentMenu = (tournamentId) => [
  { label: 'Обзор', path: `/tournaments/${tournamentId}` },
  { label: 'Участники', path: `/tournaments/${tournamentId}/participants` },
  { label: 'Жеребьёвка', path: `/tournaments/${tournamentId}/draw` },
  { label: 'Группы', path: `/tournaments/${tournamentId}/groups` },
  { label: 'Плей-офф', path: `/tournaments/${tournamentId}/playoff` },
  { label: 'Матчи', path: `/tournaments/${tournamentId}/matches` },
  { label: 'Монитор', path: `/tournaments/${tournamentId}/monitor` },
  { label: 'Рейтинг', path: `/tournaments/${tournamentId}/rating` },
  { label: 'Документы', path: `/tournaments/${tournamentId}/documents` },
  { label: 'Настройки', path: `/tournaments/${tournamentId}/settings` },
];
