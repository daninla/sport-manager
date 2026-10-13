import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../config/apiConfig';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [
    'Group',
    'Groups',
    'Match',
    'MatchesByTournament',
    'Tournament',
    'Player',
  ],
  endpoints: () => ({}),
});
