import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

export const GroupCreationFormView = ({
  name,
  capacity,
  tournamentPlayers,
  availablePlayers,
  editingGroup,
  manualMode,
  selectedPlayers,
  options,
  isCreating,
  isCreatingRandom,
  isUpdating,
  createError,
  randomError,
  updateError,
  isPlayersCountValid,
  onSubmit,
  onNameChange,
  onCapacityChange,
  onSelectedPlayersChange,
  onRandomCreate,
  onEnableManualMode,
}) => (
  <Paper
    component="form"
    variant="outlined"
    data-group-editor
    onSubmit={onSubmit}
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
      onChange={onNameChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      required
      type="number"
      disabled={isUpdating}
      label="Игроков в группе"
      value={capacity}
      onChange={onCapacityChange}
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
        options={options}
        value={selectedPlayers}
        onChange={onSelectedPlayersChange}
        getOptionLabel={(player) => player.firstName + ' ' + player.lastName}
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Button
        type="button"
        variant="contained"
        disabled={
          Boolean(editingGroup) ||
          isCreating ||
          isCreatingRandom ||
          capacity <= 2 ||
          capacity > availablePlayers.length
        }
        onClick={onRandomCreate}
      >
        Создать все группы
      </Button>
      {manualMode ? (
        <Button
          type="submit"
          variant="outlined"
          disabled={
            isCreating || isUpdating || !name.trim() || !isPlayersCountValid
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
          onClick={onEnableManualMode}
        >
          Выбрать вручную
        </Button>
      )}
    </Box>
  </Paper>
);
