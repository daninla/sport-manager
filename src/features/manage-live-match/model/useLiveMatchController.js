import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPoint, resetMatch, setStatus, undo } from './matchSlice';

import {
  useGetMatchByIdQuery,
  useGetPlayersQuery,
  useUpdateMatchMutation,
} from '../../../entities/match/api/matchApi';

export function useLiveMatchController(matchId) {
  const dispatch = useDispatch();
  const matchState = useSelector((state) => state.liveMatch);

  const {
    data: matchData,
    isLoading: isMatchLoading,
    isError,
  } = useGetMatchByIdQuery(matchId);
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

  const handleAddPoint = (player) => {
    dispatch(addPoint({ player, delta: 1 }));
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleSetStatus = (newStatus) => {
    dispatch(setStatus(newStatus));
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
