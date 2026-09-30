import { baseApi } from '@/shared/api/baseApi';

export const groupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroupsByTournamentId: builder.query({
      query: (tournamentId) => `/groups?tournamentId=${tournamentId}`,
      providesTags: (result, error, tournamentId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Group', id })),
              { type: 'Groups', id: tournamentId },
            ]
          : [{ type: 'Groups', id: tournamentId }],
    }),

    createGroup: builder.mutation({
      query: (body) => ({
        url: '/groups',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { tournamentId }) => [
        { type: 'Groups', id: tournamentId },
      ],
    }),

    updateGroup: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/groups/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id, tournamentId }) => [
        { type: 'Group', id },
        { type: 'Groups', id: tournamentId },
      ],
    }),

    deleteGroup: builder.mutation({
      query: ({ id }) => ({
        url: `/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, tournamentId }) => [
        { type: 'Group', id },
        { type: 'Groups', id: tournamentId },
      ],
    }),
  }),
});

export const {
  useGetGroupsByTournamentIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupApi;