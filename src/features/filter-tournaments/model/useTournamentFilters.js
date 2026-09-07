import { useMemo, useState } from 'react';

import { sortTournamentsByDate } from '@/entities/tournament';

const STATUS_OPTIONS = ['Upcoming', 'Ongoing', 'Completed'];
const FORMAT_OPTIONS = [
  'Single Elimination',
  'Double Elimination',
  'Swiss System',
  'Round Robin',
  'Mixed System',
];

export const useTournamentFilters = (tournamentsList = []) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filteredTournaments = useMemo(() => {
    const sorted = sortTournamentsByDate(tournamentsList);

    if (selectedFilters.length === 0) {
      return sorted;
    }

    const selectedStatuses = selectedFilters.filter((f) =>
      STATUS_OPTIONS.includes(f),
    );
    const selectedFormats = selectedFilters.filter((f) =>
      FORMAT_OPTIONS.includes(f),
    );

    return sorted.filter((tournament) => {
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(tournament.status);
      const matchesFormat =
        selectedFormats.length === 0 ||
        selectedFormats.includes(tournament.bracketFormat);

      return matchesStatus && matchesFormat;
    });
  }, [tournamentsList, selectedFilters]);

  return {
    selectedFilters,
    setSelectedFilters,
    filteredTournaments,
  };
};
