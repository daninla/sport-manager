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

    getMatchesByTournament: builder.query({
      query: (tournamentId) => `/matches?tournamentId=${tournamentId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Match', id })),
              { type: 'Match', id: 'LIST' },
            ]
          : [{ type: 'Match', id: 'LIST' }],
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
      invalidatesTags: (result, error, { id }) => [
        { type: 'Match', id },
        { type: 'Match', id: 'LIST' },
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
