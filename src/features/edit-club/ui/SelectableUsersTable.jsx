import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { usePaginationTable } from '@/shared/lib/usePaginationTable';

const getColumnAlignment = (index, columnCount) => {
  if (index === 0) return 'start';
  if (index === columnCount - 1) return 'end';
  return 'center';
};

function SelectableUsersTable({
  searchTitle,
  rowsPerPageTitle,
  ofTitle,
  selectColor,
  mode,
  searchTermUser,
  setSearchTermUser,
  columnsUser,
  selectedUserIds,
  filteredUsers,
  isLoadingUser,
  errorUser,
  handleToggleUser,
}) {
  const {
    currentData: currentUsers,
    page,
    rowsPerPage,
    handlePageChange,
    handleChangeRowsPerPage,
  } = usePaginationTable(filteredUsers, 10);

  return (
    <>
      <TextField
        label={searchTitle}
        value={searchTermUser}
        onChange={(event) => {
          setSearchTermUser(event.target.value);
          handlePageChange(null, 1);
        }}
        sx={{ maxWidth: 400 }}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columnsUser.map((column, index) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      textAlign: getColumnAlignment(index, columnsUser.length),
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingUser && (
                <TableRow>
                  <TableCell colSpan={columnsUser.length} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {errorUser && (
                <TableRow>
                  <TableCell colSpan={columnsUser.length} align="center">
                    {errorUser}
                  </TableCell>
                </TableRow>
              )}
              {currentUsers.length > 0 ? (
                currentUsers.map((member) => (
                  <TableRow
                    hover
                    key={member.id}
                    onClick={() => handleToggleUser(member.id)}
                    sx={{
                      backgroundColor: selectedUserIds.includes(member.id)
                        ? `${selectColor}`
                        : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {columnsUser.map((column, index) => {
                      const value = member[column.id];

                      return (
                        <TableCell
                          key={column.id}
                          sx={{
                            textAlign: getColumnAlignment(
                              index,
                              columnsUser.length,
                            ),
                          }}
                        >
                          {column.id === mode ? (
                            <Checkbox
                              checked={selectedUserIds.includes(member.id)}
                              onClick={(event) => event.stopPropagation()}
                              onChange={() => handleToggleUser(member.id)}
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
                  <TableCell colSpan={columnsUser.length} align="center">
                    No mebers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={rowsPerPageTitle}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} ${ofTitle} ${count}`
          }
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={(_, nextPage) =>
            handlePageChange(null, nextPage + 1)
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default SelectableUsersTable;
