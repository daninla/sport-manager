import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useGetPlayersQuery } from '@/entities/player';
import { NavLink } from 'react-router';

const columns = [
  { id: 'fullName', label: 'Full name', minWidth: 200 },
  {
    id: 'age',
    label: 'Age',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'city', label: 'City', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 200 },
  {
    id: 'ukrRate',
    label: 'Ukrainian rate',
    minWidth: 150,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'worldRate',
    label: 'World rate',
    minWidth: 150,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'club', label: 'Club', minWidth: 200 },
  { id: 'notes', label: 'Notes', minWidth: 200 },
];

function PlayersTable({ value }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: players, isLoading, isError } = useGetPlayersQuery();

  useEffect(() => {
    setPage(0); // eslint-disable-line react-hooks/set-state-in-effect
  }, [value.trim()]);

  const filteredPlayers = players.filter((row) =>
    row.fullName.toLowerCase().includes(value.toLowerCase()),
  );

  if (isLoading) return 'Loading...';
  if (isError) return <div>Ошибка загрузки</div>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlayers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                  component={NavLink}
                  to={row.id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredPlayers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default PlayersTable;
