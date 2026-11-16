import { configureStore } from '@reduxjs/toolkit';

import { groupApi } from '@/entities/group/api/groupsApi';
import { baseApi } from '@/shared/api/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(baseApi.middleware).concat(groupApi.middleware),
  devTools: true,
});
