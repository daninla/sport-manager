import { useMemo, useState } from 'react';
import { FORMATS, STATUSES } from './constants';

import { sortTournamentsByDate } from '@/entities/tournament';

export const useTournamentFilters = (tournamentsList = []) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filteredTournaments = useMemo(() => {
    const sorted = sortTournamentsByDate(tournamentsList);

    if (selectedFilters.length === 0) {
      return sorted;
    }

    const selectedStatuses = selectedFilters.filter((f) =>
      STATUSES.includes(f),
    );
    const selectedFormats = selectedFilters.filter((f) => FORMATS.includes(f));

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
