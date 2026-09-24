import { baseApi } from '@/shared/api/baseApi';

export const clubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query({
      query: () => `/clubs`,
      providesTags: ['Club'],
    }),
  }),
});

export const { useGetClubsQuery } = clubApi;
