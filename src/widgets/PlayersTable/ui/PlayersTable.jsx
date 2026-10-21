import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useGetPlayersQuery } from '@/entities/player';

function PlayersTable({ inputValue }) {
  const { t } = useTranslation('players');
  const columns = [
    {
      id: 'full_name',
      label: t('columns.fullName'),
      minWidth: 200,
      valueGetter: (value, row) => `${row.first_name} ${row.last_name}`,
    },
    {
      id: 'age',
      label: t('columns.age'),
      minWidth: 150,
      valueGetter: (value, row) =>
        row.birth_date
          ? Math.floor(
              (new Date() - new Date(row.birth_date)) /
                (1000 * 60 * 60 * 24 * 365.25),
            )
          : null,
    },
    { id: 'city', label: t('columns.city'), minWidth: 200 },
    { id: 'rank_category', label: t('columns.rankCategory'), minWidth: 150 },
    {
      id: 'ukr_rating',
      label: t('columns.ukrRate'),
      minWidth: 150,
    },
    { id: 'club', label: t('columns.club'), minWidth: 200 },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const { data: players = [], isLoading, isError } = useGetPlayersQuery();

  useEffect(() => {
    setPage(0); // eslint-disable-line react-hooks/set-state-in-effect
  }, [inputValue.trim()]);

  if (isLoading) return t('loading');
  if (isError) return <div>{t('error')}</div>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredAndSortedPlayers = players
    .filter((row) =>
      `${row.firstName} ${row.lastName}`
        .toLowerCase()
        .includes(inputValue.toLowerCase()),
    )
    .toSorted((a, b) => b.ukrRate - a.ukrRate);

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
            {filteredAndSortedPlayers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                  onClick={() => navigate(`${row.id}`)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {(column.valueGetter
                        ? column.valueGetter(row[column.id], row)
                        : row[column.id]) ?? t('noData')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredAndSortedPlayers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default PlayersTable;
