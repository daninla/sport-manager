import { useEffect, useReducer, useRef } from 'react';
import { FINISHED_STATUS, ONGOING_STATUS } from './constans';
import matchReducer, {
  addPoint,
  resetMatch,
  setStatus,
  setTimeStart,
  undo,
} from './matchSlice';

import { useGetPlayersQuery } from '@/entities/player/api/playerApi';
import {
  useGetMatchByIdQuery,
  useUpdateMatchMutation,
} from '../../../entities/match/api/matchApi';

export function useLiveMatchController(matchId) {
  // Each hook instance owns its match state, so table rows stay independent.
  const [matchState, dispatch] = useReducer(matchReducer, undefined, () =>
    matchReducer(undefined, { type: '@@match/init' }),
  );

  const {
    data: matchData,
    isLoading: isMatchLoading,
    isError,
  } = useGetMatchByIdQuery(matchId, { skip: !matchId });
  const { data: players, isLoading: isPlayersLoading } = useGetPlayersQuery();
  const [updateMatch] = useUpdateMatchMutation();
  const isLoading = isMatchLoading || isPlayersLoading;
  const skipNextSyncRef = useRef(true);

  useEffect(() => {
    skipNextSyncRef.current = true;
  }, [matchId]);

  useEffect(() => {
    if (!matchData || !players) return;

    const player1 = players.find((p) => Number(p.id) === matchData.player1Id);
    const player2 = players.find((p) => Number(p.id) === matchData.player2Id);

    skipNextSyncRef.current = true;
    dispatch(resetMatch({ ...matchData, player1, player2 }));
  }, [matchData, players, dispatch]);

  useEffect(() => {
    if (!matchData || !players) return;

    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    const syncWithServer = async () => {
      try {
        await updateMatch({
          id: matchId,
          score: matchState.sets,
          currentSet: matchState.currentSet,
          status: matchState.status,
          historySets: matchState.historySets,
        }).unwrap();
      } catch (error) {
        throw Error(error);
      }
    };

    syncWithServer();
  }, [matchState, matchId, updateMatch]);

  const handleFinish = () => {
    const startMs = new Date(matchState.timeStart).getTime();
    const nowMs = Date.now();
    const totalSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000));

    updateMatch({
      id: matchId,
      status: FINISHED_STATUS,
      duration: totalSeconds,
    });
  };

  const handleAddPoint = (player) => {
    dispatch(addPoint({ player, delta: 1 }));
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleSetStatus = (newStatus) => {
    dispatch(setStatus(newStatus));
    if (newStatus === ONGOING_STATUS) {
      const timeStart = new Date().toISOString();
      dispatch(setTimeStart(timeStart));
      updateMatch({
        id: matchId,
        status: ONGOING_STATUS,
        timeStart,
        duration: 0,
      });
    }
    if (newStatus === FINISHED_STATUS) {
      handleFinish();
    }
  };

  return {
    matchState,
    isError,
    isLoading,
    addPoint: handleAddPoint,
    undo: handleUndo,
    setStatus: handleSetStatus,
  };
}
