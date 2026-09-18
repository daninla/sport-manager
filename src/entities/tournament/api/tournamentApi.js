import { baseApi } from '@/shared/api/baseApi';

export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query({
      query: () => '/tournaments',
      providesTags: ['Tournament'],
    }),
    getTournamentById: builder.query({
      query: (id) => `/tournaments/${id}`,
      providesTags: (id) => [{ type: 'Tournament', id }],
    }),
    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `/tournaments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tournament'],
    }),
    updateTournament: builder.mutation({
      query: ({ id, ...tournamentData }) => ({
        url: `/tournaments/${id}`,
        method: 'PUT',
        body: tournamentData,
      }),
      invalidatesTags: ['Tournament'],
    }),
    createTournament: builder.mutation({
      query: (tournamentData) => ({
        url:'/tournaments',
        method:'POST',
        body: tournamentData
      }),
      invalidatesTags: ['Tournament'],
    }),
    getMatchesByTournamentId: builder.query({
      query: (tournamentId) => `/matches?tournamentId=${tournamentId}`,
      providesTags: (result, error, tournamentId) => [{ type: 'Tournament', id: tournamentId }],
    }),
    createMatch: builder.mutation({
      query: (matchData) => ({
        url: '/matches',
        method: 'POST',
        body: matchData,
      }),
      invalidatesTags: ['Tournament'],
    }),
    getPlayoffMatches: builder.query({
      query: () => '/playoffMatches',
      providesTags: ['Tournament'],
    }),
    getPlayoffMatchesByTournamentId: builder.query({
      query: (tournamentId) => `/playoffMatches?tournamentId=${tournamentId}`,
      providesTags: (result, error, tournamentId) => [{ type: 'Tournament', id: tournamentId }],
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
  useCreatePlayoffMatchMutation,
} = tournamentApi;
