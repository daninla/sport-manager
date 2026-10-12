import { useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import {
  useCreateGroupMutation,
  useCreateRandomGroupMutation,
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
    createRandomGroup,
    { isLoading: isCreatingRandom, error: randomError },
  ] = useCreateRandomGroupMutation();
  const [updateGroup, { isLoading: isUpdating, error: updateError }] =
    useUpdateGroupMutation();

  const resetForm = () => {
    setName('');
    setSelectedPlayers([]);
    setManualMode(false);
  };

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
    createRandomGroup({
      tournamentId: String(tournamentId),
      name: name.trim(),
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

  return (
    <Paper
      component="form"
      variant="outlined"
      data-group-editor
      onSubmit={(event) => {
        event.preventDefault();
        if (editingGroup) {
          handleUpdate();
        } else if (manualMode) {
          handleManualCreate();
        }
      }}
      sx={{ p: 3 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {editingGroup ? 'Изменить группу' : 'Создать группу'}
      </Typography>
      <TextField
        fullWidth
        required
        disabled={isUpdating}
        label="Название группы"
        value={name}
        onChange={(event) => setName(event.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        type="number"
        disabled={isUpdating}
        label="Игроков в группе"
        value={capacity}
        onChange={(event) =>
          setCapacity(Math.max(1, Number(event.target.value)))
        }
        slotProps={{
          htmlInput: { min: 1, max: tournamentPlayers.length },
        }}
        sx={{ mb: 2 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {editingGroup ? 'Доступно игроков для группы' : 'Свободно игроков'}:{' '}
        {availablePlayers.length}
      </Typography>

      {/* Вручную можно выбрать только свободных игроков и не больше лимита. */}
      {manualMode && (
        <Autocomplete
          multiple
          disableCloseOnSelect
          disabled={isUpdating}
          options={availablePlayers}
          value={selectedPlayers}
          onChange={(_, players) =>
            setSelectedPlayers(players.slice(0, Number(capacity)))
          }
          getOptionLabel={(player) => player.fullName}
          isOptionEqualToValue={(option, value) =>
            String(option.id) === String(value.id)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Игроки группы"
              placeholder="Выберите игроков"
              helperText={`${selectedPlayers.length} из ${capacity}`}
            />
          )}
          sx={{ mb: 2 }}
        />
      )}

      {createError && !editingGroup && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Не удалось создать группу. Попробуйте еще раз.
        </Alert>
      )}
      {randomError && !editingGroup && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Не удалось создать группу. Попробуйте еще раз.
        </Alert>
      )}
      {updateError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Не удалось изменить группу. Попробуйте еще раз.
        </Alert>
      )}
      {availablePlayers.length < Number(capacity) && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Для группы такого размера недостаточно свободных игроков.
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          type="button"
          variant="contained"
          disabled={
            Boolean(editingGroup) ||
            isCreating ||
            isCreatingRandom ||
            !name.trim() ||
            availablePlayers.length < Number(capacity)
          }
          onClick={handleRandomCreate}
        >
          Добавить случайно
        </Button>
        {manualMode ? (
          <Button
            type="submit"
            variant="outlined"
            disabled={
              isCreating ||
              isUpdating ||
              !name.trim() ||
              selectedPlayers.length !== Number(capacity)
            }
          >
            {isUpdating
              ? 'Сохранение...'
              : editingGroup
                ? 'Сохранить изменения'
                : isCreating
                  ? 'Создание...'
                  : 'Создать группу вручную'}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outlined"
            disabled={availablePlayers.length === 0}
            onClick={() => setManualMode(true)}
          >
            Выбрать вручную
          </Button>
        )}
      </Box>
    </Paper>
  );
};
