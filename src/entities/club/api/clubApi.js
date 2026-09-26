import { baseApi } from '@/shared/api/baseApi';

export const clubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query({
      query: () => `/clubs`,
      providesTags: ['Club'],
    }),
    getClubById: builder.query({
      query: (id) => `/clubs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Player', id }],
    }),
  }),
});

export const { useGetClubsQuery, useGetClubByIdQuery } = clubApi;
