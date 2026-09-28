import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/api/baseApi';
import matchReducer from '../features/manage-live-match/model/matchSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    liveMatch: matchReducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});
