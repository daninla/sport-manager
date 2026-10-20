import { useMemo, useState } from 'react';
import { GroupCreationFormView } from './GroupCreationFormView';

import {
  useCreateGroupMutation,
  useCreateRandomGroupsMutation,
  useUpdateGroupMutation,
} from '@/entities/group';
import { addPlayersToGroupManually } from '../model/groupCreation';

export const GroupCreationForm = ({
  tournamentId,
  tournamentPlayers,
  availablePlayers,
  editingGroup,
  onCancelEdit,
}) => {
  const [name, setName] = useState(() => editingGroup?.name || '');
  const [capacity, setCapacity] = useState(
    () => Number(editingGroup?.capacity) || 1,
  );
  const [manualMode, setManualMode] = useState(Boolean(editingGroup));
  const [selectedPlayers, setSelectedPlayers] = useState(() => {
    return editingGroup?.players || [];
  });
  const [createGroup, { isLoading: isCreating, error: createError }] =
    useCreateGroupMutation();
  const [
    createRandomGroups,
    { isLoading: isCreatingRandom, error: randomError },
  ] = useCreateRandomGroupsMutation();
  const [updateGroup, { isLoading: isUpdating, error: updateError }] =
    useUpdateGroupMutation();

  const resetForm = () => {
    setName('');
    setSelectedPlayers([]);
    setManualMode(false);
  };
  const isPlayersCountValid = editingGroup
    ? selectedPlayers.length <= Number(capacity)
    : selectedPlayers.length === Number(capacity);

  const handleManualCreate = async () => {
    const created = await addPlayersToGroupManually({
      tournamentId,
      name,
      capacity,
      selectedPlayers,
      createGroup,
    });
    if (created) resetForm();
  };

  const handleRandomCreate = () =>
    createRandomGroups({
      tournamentId: String(tournamentId),
      capacity: Number(capacity),
    })
      .unwrap()
      .then(resetForm, () => undefined);

  const handleUpdate = () => {
    if (!editingGroup) return;

    return updateGroup({
      id: editingGroup.id,
      tournamentId: String(tournamentId),
      name: name.trim(),
      capacity: Number(capacity),
      playerIds: selectedPlayers.map((player) => player.id),
    })
      .unwrap()
      .then(onCancelEdit, () => undefined);
  };

  const options = useMemo(() => {
    const map = new Map();
    [...availablePlayers, ...(editingGroup?.players ?? [])].forEach((p) =>
      map.set(String(p.id), p),
    );
    return [...map.values()];
  }, [availablePlayers, editingGroup]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingGroup) {
      handleUpdate();
    } else if (manualMode) {
      handleManualCreate();
    }
  };

  return (
    <GroupCreationFormView
      name={name}
      capacity={capacity}
      tournamentPlayers={tournamentPlayers}
      availablePlayers={availablePlayers}
      editingGroup={editingGroup}
      manualMode={manualMode}
      selectedPlayers={selectedPlayers}
      options={options}
      isCreating={isCreating}
      isCreatingRandom={isCreatingRandom}
      isUpdating={isUpdating}
      createError={createError}
      randomError={randomError}
      updateError={updateError}
      isPlayersCountValid={isPlayersCountValid}
      onSubmit={handleSubmit}
      onNameChange={(event) => setName(event.target.value)}
      onCapacityChange={(event) =>
        setCapacity(Math.max(1, Number(event.target.value)))
      }
      onSelectedPlayersChange={(_, players) => {
        setSelectedPlayers(players.slice(0, Number(capacity)));
      }}
      onRandomCreate={handleRandomCreate}
      onEnableManualMode={() => setManualMode(true)}
    />
  );
};
