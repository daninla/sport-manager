import {
  Autocomplete,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import { usePaginationTable } from '@/shared/lib/usePaginationTable';
import { getPlayerColumns } from '../../model/columns';

const getColumnAlignment = (index, columnCount) => {
  if (index === 0) return 'start';
  if (index === columnCount - 1) return 'end';
  return 'center';
};

function ParticipantsStep({
  t,
  players,
  isPlayersLoading,
  errorPlayers,
  filteredPlayers,
  searchValue,
  selectedPlayers,
  setSearchValue,
  handleTogglePlayer,
}) {
  const columnsPlayer = getPlayerColumns(t);
  const {
    currentData: currentPlayers,
    page,
    rowsPerPage,
    handlePageChange,
    handleChangeRowsPerPage,
  } = usePaginationTable(filteredPlayers, 5);
  return (
    <>
      <Stack spacing={2} direction="column">
        <Typography
          variant="h5"
          sx={{ borderBlockEnd: '1px solid black', pb: '10px' }}
        >
          {t('players')}
        </Typography>

        <Autocomplete
          freeSolo
          options={players}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.fullName
          }
          inputValue={searchValue}
          onInputChange={(event, newInputValue) => {
            setSearchValue(newInputValue);
          }}
          loading={isPlayersLoading}
          sx={{ maxWidth: 400, marginBottom: '1rem' }}
          renderInput={(params) => (
            <TextField {...params} placeholder={t('playerSearch')} />
          )}
        />

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columnsPlayer.map((column, index) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        minWidth: column.minWidth,
                        textAlign: getColumnAlignment(
                          index,
                          columnsPlayer.length,
                        ),
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isPlayersLoading && (
                  <TableRow>
                    <TableCell colSpan={columnsPlayer.length} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
                {errorPlayers && (
                  <TableRow>
                    <TableCell colSpan={columnsPlayer.length} align="center">
                      {errorPlayers}
                    </TableCell>
                  </TableRow>
                )}
                {currentPlayers.length > 0 ? (
                  currentPlayers.map((player) => (
                    <TableRow
                      hover
                      key={player.id}
                      onClick={() => handleTogglePlayer(player)}
                      sx={{
                        backgroundColor: selectedPlayers.some(
                          (selectedPlayer) => selectedPlayer.id === player.id,
                        )
                          ? `rgba(23, 230, 0, 0.1)`
                          : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      {columnsPlayer.map((column, index) => {
                        const value = player[column.id];

                        return (
                          <TableCell
                            key={column.id}
                            sx={{
                              textAlign: getColumnAlignment(
                                index,
                                columnsPlayer.length,
                              ),
                            }}
                          >
                            {column.id === 'add' ? (
                              <Checkbox
                                checked={selectedPlayers.some(
                                  (selectedPlayer) =>
                                    selectedPlayer.id === player.id,
                                )}
                                onClick={(event) => event.stopPropagation()}
                                onChange={() => handleTogglePlayer(player)}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columnsPlayer.length} align="center">
                      {t('noPlayersFound')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage={t('rowsPerPage')}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} ${t('of')} ${count}`
            }
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredPlayers.length}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={(_, nextPage) => handlePageChange(null, nextPage + 1)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Stack>
    </>
  );
}

export default ParticipantsStep;
