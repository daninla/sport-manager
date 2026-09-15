import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const matchApi = createApi({
  reducerPath: 'matchApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),

  endpoints: (builder) => ({
    getMatch: builder.query({
      query: (id) => `/matches/${id}`,
    }),

    updateMatch: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/matches/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMatchQuery,
  useUpdateMatchMutation,
} = matchApi;