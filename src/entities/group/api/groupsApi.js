import { baseApi } from '@/shared/api/baseApi';
import { isMockApi } from '@/shared/config/apiConfig';

export const groupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroupsByTournamentId: builder.query({
      query: (tournamentId) =>
        isMockApi ? '/groups' : `/groups?tournamentId=${tournamentId}`,
      transformResponse: (groups, _, tournamentId) =>
        isMockApi
          ? groups.filter(
              (group) => String(group.tournamentId) === String(tournamentId),
            )
          : groups,
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
        { type: 'Player', id: `AVAILABLE_${tournamentId}` },
      ],
    }),

    createRandomGroup: builder.mutation({
      query: ({ tournamentId, name, capacity }) => ({
        url: '/groups/random',
        method: 'POST',
        body: { tournamentId, name, capacity },
      }),
      invalidatesTags: (result, error, { tournamentId }) => [
        { type: 'Groups', id: tournamentId },
        { type: 'Player', id: `AVAILABLE_${tournamentId}` },
      ],
    }),

    getAvailablePlayersForGroup: builder.query({
      query: ({ tournamentId, groupId }) => ({
        url: isMockApi
          ? `/tournaments/${tournamentId}`
          : '/groups/available-players',
        ...(!isMockApi && {
          params: { tournamentId, ...(groupId ? { groupId } : {}) },
        }),
      }),
      transformResponse: (response) =>
        isMockApi ? response.players || [] : response,
      providesTags: (result, error, { tournamentId }) => [
        { type: 'Player', id: `AVAILABLE_${tournamentId}` },
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
        { type: 'Player', id: `AVAILABLE_${tournamentId}` },
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
        { type: 'Player', id: `AVAILABLE_${tournamentId}` },
      ],
    }),
  }),
});

export const {
  useGetGroupsByTournamentIdQuery,
  useCreateGroupMutation,
  useCreateRandomGroupMutation,
  useGetAvailablePlayersForGroupQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupApi;
