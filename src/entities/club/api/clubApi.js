import { baseApi } from '@/shared/api/baseApi';

export const clubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query({
      query: () => `/clubs`,
      providesTags: ['Club'],
    }),
    getClubById: builder.query({
      query: (id) => `/clubs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Club', id }],
    }),
    updateClub: builder.mutation({
      query: ({ id, ...clubData }) => ({
        url: `/clubs/${id}`,
        method: 'PUT',
        body: clubData,
      }),
      invalidatesTags: ['Club'],
    }),
    deleteClub: builder.mutation({
      query: (id) => ({
        url: `/clubs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Club'],
    }),
  }),
});

export const {
  useGetClubsQuery,
  useGetClubByIdQuery,
  useUpdateClubMutation,
  useDeleteClubMutation,
} = clubApi;
