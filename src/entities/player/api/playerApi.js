import { baseApi } from '@/shared/api/baseApi';

export const playerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: (params) => ({ url: '/players', params }),
      providesTags: ['Player'],
    }),
    getPlayerById: builder.query({
      query: (id) => `/players/${id}`,
      providesTags: (result, error, id) => [{ type: 'Player', id }],
    }),
    createPlayer: builder.mutation({
      query: (data) => ({ url: '/players', method: 'POST', body: data }),
      invalidatesTags: ['Player'],
    }),
    updatePlayer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/players/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Player'],
    }),
    deletePlayer: builder.mutation({
      query: (id) => ({ url: `/players/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Player'],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useGetPlayerByIdQuery,
  useCreatePlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
} = playerApi;
