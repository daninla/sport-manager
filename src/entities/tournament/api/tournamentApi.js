import { baseApi } from '@/shared/api/baseApi';

export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query({
      query: () => '/tournaments',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tournament', id })),
              { type: 'Tournament', id: 'LIST' },
            ]
          : [{ type: 'Tournament', id: 'LIST' }],
    }),
    getTournamentById: builder.query({
      query: (id) => `/tournaments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tournament', id }],
    }),

    getTournamentPlayers: builder.query({
      async queryFn(tournamentId, _, __, fetchWithBQ) {
        const tournamentResponse = await fetchWithBQ(
          `/tournaments/${tournamentId}`,
        );
        if (tournamentResponse.error)
          return { error: tournamentResponse.error };

        const playerIds = tournamentResponse.data?.playerIds || [];

        if (playerIds.length === 0) {
          return { data: [] };
        }

        const playersResponse = await fetchWithBQ('/players');
        if (playersResponse.error) return { error: playersResponse.error };

        const tournamentPlayers = playersResponse.data.filter((player) =>
          playerIds.includes(Number(player.id)),
        );

        return { data: tournamentPlayers };
      },
      providesTags: (result, error, tournamentId) => [
        { type: 'Tournament', id: tournamentId },
        { type: 'Player', id: `TOURNAMENT_${tournamentId}` },
      ],
    }),

    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `/tournaments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Tournament', id },
        { type: 'Tournament', id: 'LIST' },
      ],
    }),

    updateTournament: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `tournaments/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Tournament', id },
        { type: 'Tournament', id: 'LIST' },
      ],
    }),
    createTournament: builder.mutation({
      query: (body) => ({
        url: '/tournaments',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tournament', id: 'LIST' }],
    }),

    getMatchesByTournamentId: builder.query({
      query: (tournamentId) => `/matches?tournamentId=${tournamentId}`,
      providesTags: (result, error, tournamentId) => [
        { type: 'Tournament', id: tournamentId },
      ],
    }),
    getPlayoffMatches: builder.query({
      query: () => '/playoffMatches',
      providesTags: ['Tournament'],
    }),
    getPlayoffMatchesByTournamentId: builder.query({
      query: (tournamentId) => `/playoffMatches?tournamentId=${tournamentId}`,
      providesTags: (result, error, tournamentId) => [
        { type: 'Tournament', id: tournamentId },
      ],
    }),
    updatePlayoffMatch: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/playoffMatches/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { tournamentId }) => [
        { type: 'Tournament', id: tournamentId },
      ],
    }),
    createPlayoffMatch: builder.mutation({
      query: (playoffMatchData) => ({
        url: '/playoffMatches',
        method: 'POST',
        body: playoffMatchData,
      }),
      invalidatesTags: ['Tournament'],
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useDeleteTournamentMutation,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useGetMatchesByTournamentIdQuery,
  useCreateMatchMutation,
  useGetPlayoffMatchesQuery,
  useGetPlayoffMatchesByTournamentIdQuery,
  useUpdatePlayoffMatchMutation,
  useCreatePlayoffMatchMutation,
  useGetTournamentPlayersQuery,
} = tournamentApi;
