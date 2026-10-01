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

import { useCreateGroupMutation } from '@/entities/group';
import {
  addPlayersToGroupManually,
  addPlayersToGroupRandomly,
} from '../model/groupCreation';

export const GroupCreationForm = ({
  tournamentId,
  tournamentPlayers,
  groups,
}) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(4);
  const [manualMode, setManualMode] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [createGroup, { isLoading: isCreating, error: createError }] =
    useCreateGroupMutation();

  const assignedPlayerIds = new Set(
    groups.flatMap((group) => group.playerIds || []).map(String),
  );
  const availablePlayers = tournamentPlayers.filter(
    (player) => !assignedPlayerIds.has(String(player.id)),
  );

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

  const handleRandomCreate = async () => {
    const created = await addPlayersToGroupRandomly({
      tournamentId,
      name,
      capacity,
      availablePlayers,
      createGroup,
    });
    if (created) resetForm();
  };

  return (
    <Paper
      component="form"
      variant="outlined"
      onSubmit={(event) => {
        event.preventDefault();
        handleManualCreate();
      }}
      sx={{ p: 3 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Создать группу
      </Typography>
      <TextField
        fullWidth
        required
        label="Название группы"
        value={name}
        onChange={(event) => setName(event.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        type="number"
        label="Игроков в группе"
        value={capacity}
        onChange={(event) => {
          setCapacity(Math.max(1, Number(event.target.value)));
          setSelectedPlayers([]);
        }}
        slotProps={{
          htmlInput: { min: 1, max: tournamentPlayers.length },
        }}
        sx={{ mb: 2 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Свободно игроков: {availablePlayers.length}
      </Typography>

      {/* Вручную можно выбрать только свободных игроков и не больше лимита. */}
      {manualMode && (
        <Autocomplete
          multiple
          disableCloseOnSelect
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

      {createError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Не удалось создать группу. Попробуйте еще раз.
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
            isCreating ||
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
              !name.trim() ||
              selectedPlayers.length !== Number(capacity)
            }
          >
            {isCreating ? 'Создание...' : 'Создать группу вручную'}
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
