import { baseApi } from '@/shared/api/baseApi';

export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query({
      query: () => '/tournaments',
    }),
    getTournamentById: builder.query({
      query: (id) => `/tournaments/${id}`,
    }),
  }),
});

export const { useGetTournamentsQuery, useGetTournamentByIdQuery } =
  tournamentApi;
