import { baseApi } from '@/shared/api/baseApi';

export const matchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMatches: builder.query({
      query: () => '/matches',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Match', id })),
              { type: 'Match', id: 'LIST' },
            ]
          : [{ type: 'Match', id: 'LIST' }],
    }),
    createMatch: builder.mutation({
      query: (matchData) => ({
        url: '/matches',
        method: 'POST',
        body: matchData,
      }),
      invalidatesTags: ['Tournament'],
    }),
    getMatchesByTournament: builder.query({
      query: (tournamentId) => `/matches?tournamentId=${tournamentId}`,
      providesTags: (result, error, tournamentId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Match', id })),
              { type: 'MatchesByTournament', id: tournamentId },
            ]
          : [{ type: 'MatchesByTournament', id: tournamentId }],
    }),

    getMatchById: builder.query({
      query: (id) => `/matches/${id}`,
      providesTags: (result, error, id) => [{ type: 'Match', id }],
    }),

    getPlayers: builder.query({
      query: () => '/players',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Player', id })),
              { type: 'Player', id: 'LIST' },
            ]
          : [{ type: 'Player', id: 'LIST' }],
    }),

    updateMatch: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/matches/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id, tournamentId }) => [
        { type: 'Match', id },
        { type: 'Match', id: 'LIST' },
        ...(tournamentId
          ? [{ type: 'MatchesByTournament', id: tournamentId }]
          : []),
      ],
    }),
  }),
});

export const {
  useGetMatchesQuery,
  useGetMatchesByTournamentQuery,
  useGetMatchByIdQuery,
  useGetPlayersQuery,
  useUpdateMatchMutation,
} = matchApi;
