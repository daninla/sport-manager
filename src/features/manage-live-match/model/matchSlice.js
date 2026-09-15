import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSet: { player1: 0, player2: 0 },
  sets: { player1: 0, player2: 0 },
  historySets: [],
  actionHistory: [],
  status: 'Upcoming',
};

export const matchSlice = createSlice({
  name: 'liveMatch',
  initialState,
  reducers: {
    addPoint: (state, action) => {
      const { player, delta = 1 } = action.payload;
      state.currentSet[player] += delta;
      if (state.currentSet[player] >= 11) {
        state.sets[player] += 1;
        state.historySets.push({ ...state.currentSet });
        state.actionHistory.push({
          type: 'SET_FINISHED',
          winner: player,
          finalSetScore: { ...state.currentSet },
        });
        state.currentSet = { player1: 0, player2: 0 };
      } else {
        state.actionHistory.push({ type: 'POINT', player, delta });
      }
    },
  },
});
