import { baseApi } from '@/shared/api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users?email=${email}`,
      providesTags: ['User'],
    }),
    getUserWithoutClub: builder.query({
      query: () => `/users?club=None`,
      providesTags: ['User'],
    }),
    getUsersByClub: builder.query({
      query: (club) => `/users?club=${club}`,
      providesTags: ['User'],
    }),
    createUser: builder.mutation({
      query: (data) => ({ url: '/users', method: 'POST', body: data }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLazyGetUserByEmailQuery,
  useGetUserWithoutClubQuery,
  useGetUsersByClubQuery,
  useLazyGetUsersByClubQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
