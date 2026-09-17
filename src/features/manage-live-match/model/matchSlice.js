import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player1: null,
  player2: null,
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

      const p1 = state.currentSet.player1;
      const p2 = state.currentSet.player2;
      const isFinished = (p1 >= 11 || p2 >= 11) && Math.abs(p1 - p2) >= 2;

      if (isFinished) {
        state.sets[player] += 1;

        // Фиксируем итоговый счет сета до сброса
        const finalSetScore = { ...state.currentSet };
        state.historySets.push(finalSetScore);

        state.actionHistory.push({
          type: 'SET_FINISHED',
          winner: player,
          finalSetScore,
        });

        state.currentSet = { player1: 0, player2: 0 };
      } else {
        state.actionHistory.push({ type: 'POINT', player, delta });
      }
    },

    undo: (state) => {
      const lastAction = state.actionHistory.pop();
      if (!lastAction) return;

      if (lastAction.type === 'POINT') {
        state.currentSet[lastAction.player] -= lastAction.delta;
      } else if (lastAction.type === 'SET_FINISHED') {
        state.sets[lastAction.winner] -= 1;
        state.historySets.pop();

        // Возвращаем счет сета и откатываем только последнее очко
        state.currentSet = { ...lastAction.finalSetScore };
        state.currentSet[lastAction.winner] -= 1; // Корректный откат победного очка
      } else if (lastAction.type === 'STATUS_CHANGED') {
        state.status = lastAction.previousStatus;
      }
    },

    setStatus: (state, action) => {
      const newStatus = action.payload;

      state.actionHistory.push({
        type: 'STATUS_CHANGED',
        previousStatus: state.status,
        newStatus,
      });

      state.status = newStatus;
    },

    resetMatch: (state, action) => {
      if (action.payload) {
        return {
          ...initialState,
          ...action.payload,
          player1: action.payload.player1 ?? null,
          player2: action.payload.player2 ?? null,
          currentSet: action.payload.currentSet || { player1: 0, player2: 0 },
          sets: action.payload.score ||
            action.payload.sets || { player1: 0, player2: 0 },
          historySets: action.payload.historySets || [],
          actionHistory: state.actionHistory,
        };
      }
      return initialState;
    },
  },
});

export const { addPoint, undo, setStatus, resetMatch } = matchSlice.actions;
export default matchSlice.reducer;
