import { baseApi } from '@/shared/api/baseApi';
import { isMockApi } from '@/shared/config/apiConfig';

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
      query: (tournamentId) =>
        isMockApi ? '/matches' : `/matches?tournamentId=${tournamentId}`,
      transformResponse: (matches, _, tournamentId) =>
        isMockApi
          ? matches.filter(
              (match) => String(match.tournamentId) === String(tournamentId),
            )
          : matches,
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

    startMatch: builder.mutation({
      query: ({ id }) => ({
        url: `/matches/${id}/start`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Match', id },
        { type: 'Match', id: 'LIST' },
        'MatchesByTournament',
      ],
    }),
    finishMatch: builder.mutation({
      query: ({ id }) => ({
        url: `/matches/${id}/finish`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Match', id },
        { type: 'Match', id: 'LIST' },
        'MatchesByTournament',
      ],
    }),
    recordMatchPoint: builder.mutation({
      query: ({ id, player }) => ({
        url: `/matches/${id}/points`,
        method: 'POST',
        body: { player },
      }),
      invalidatesTags: (result, error, { id, tournamentId }) => [
        { type: 'Match', id },
        { type: 'Match', id: 'LIST' },
        ...(tournamentId
          ? [{ type: 'MatchesByTournament', id: tournamentId }]
          : []),
      ],
    }),
    undoMatchAction: builder.mutation({
      query: ({ id }) => ({
        url: `/matches/${id}/undo`,
        method: 'POST',
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
  useStartMatchMutation,
  useFinishMatchMutation,
  useRecordMatchPointMutation,
  useUndoMatchActionMutation,
} = matchApi;
