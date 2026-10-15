import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { isMockApi } from '@/shared/config/apiConfig';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }),
  tagTypes: ['Group', 'Groups', 'Player'],
  endpoints: (builder) => ({
    getGroupsByTournamentId: builder.query({
      query: (tournamentId) => ({
        url: '/groups',
        params: { tournamentId },
      }),
      transformResponse: (groups) =>
        groups.map(({ tournament_id, ...group }) => ({
          ...group,
          tournamentId: group.tournamentId ?? tournament_id,
        })),
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
        url: '/groups/available-players',
        params: {
          tournamentId,
          ...(groupId ? { groupId } : {}),
        },
      }),
      transformResponse: (response) => response,
      providesTags: (result, error, { tournamentId }) => [
        { type: 'Player', id: `AVAILABLE_${tournamentId}` },
      ],
    }),

    updateGroup: builder.mutation({
      query: ({ id, tournamentId, ...patch }) => ({
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
      query: ({ id, tournamentId }) => ({
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
