import { FINISHED_STATUS } from './constans';

import {
  useFinishMatchMutation,
  useGetMatchByIdQuery,
  useRecordMatchPointMutation,
  useStartMatchMutation,
  useUndoMatchActionMutation,
} from '../../../entities/match/api/matchApi';

const EMPTY_MATCH = {
  currentSet: { player1: 0, player2: 0 },
  score: { player1: 0, player2: 0 },
  status: 'Upcoming',
};

export function useLiveMatchController(matchId) {
  const {
    currentData: matchData,
    isLoading,
    isError,
  } = useGetMatchByIdQuery(matchId, { skip: !matchId });
  const [recordMatchPoint, pointResult] = useRecordMatchPointMutation();
  const [undoMatchAction, undoResult] = useUndoMatchActionMutation();
  const [startMatch, startResult] = useStartMatchMutation();
  const [finishMatch, finishResult] = useFinishMatchMutation();

  const handleAddPoint = (player) =>
    recordMatchPoint({ id: matchId, player })
      .unwrap()
      .catch(() => undefined);

  const handleUndo = () =>
    undoMatchAction({ id: matchId })
      .unwrap()
      .catch(() => undefined);

  const handleSetStatus = (status) => {
    const mutation = status === FINISHED_STATUS ? finishMatch : startMatch;
    return mutation({ id: matchId })
      .unwrap()
      .catch(() => undefined);
  };

  return {
    matchState: matchData || EMPTY_MATCH,
    isError,
    isLoading,
    isActionLoading:
      pointResult.isLoading ||
      undoResult.isLoading ||
      startResult.isLoading ||
      finishResult.isLoading,
    isActionError: Boolean(
      pointResult.error ||
      undoResult.error ||
      startResult.error ||
      finishResult.error,
    ),
    canUndo: Boolean(matchData?.canUndo),
    addPoint: handleAddPoint,
    undo: handleUndo,
    setStatus: handleSetStatus,
  };
}
