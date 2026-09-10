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
  }),
});

export const {
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useDeleteTournamentMutation,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
} = tournamentApi;
