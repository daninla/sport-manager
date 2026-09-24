import { baseApi } from '@/shared/api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users?email=${encodeURIComponent(email)}`,
    }),
    createUser: builder.mutation({
      query: (data) => ({ url: '/users', method: 'POST', body: data }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {
  useLazyGetUserByEmailQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
