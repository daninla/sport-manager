import { baseApi } from '@/shared/api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users?email=${encodeURIComponent(email)}`,
    }),
    createUser: builder.mutation({
      query: (data) => ({ url: '/users', method: 'POST', body: data }),
    }),
  }),
});

export const { useLazyGetUserByEmailQuery, useCreateUserMutation } = userApi;
