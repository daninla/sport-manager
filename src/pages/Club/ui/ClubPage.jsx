import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
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

import { useGetClubByIdQuery } from '@/entities/club/api/clubApi';
import { usePagination } from '@/shared/lib/usePagination';
import { useGetUsersByClubQuery } from '../../../entities/user/api/userApi';
import { getColums } from '../model/columns';

import { Spinner } from '@/shared/ui/Spinner/Spinner';

function ClubPage() {
  const { t } = useTranslation('clubs');
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: club, isLoading, error } = useGetClubByIdQuery(id);

  const columns = getColums(t);

  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: members = [],
    isLoading: isLoadingMember,
    error: errorMember,
  } = useGetUsersByClubQuery(club?.title, { skip: !club?.title });

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredMembers = members.filter((player) =>
    player.fullName?.toLowerCase().includes(normalizedSearchTerm),
  );

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    currentData: players,
    page,
    handlePageChange,
  } = usePagination(filteredMembers, rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    handlePageChange(null, 1);
  };

  if (isLoading) return <Spinner />;
  if (error || !club) {
    return <Box sx={{ p: 4 }}>{error || 'No found this club'}</Box>;
  }

  return (
    <>
      <Stack spacing={5}>
        <Box>
          <Typography
            variant="h4"
            sx={{ mb: '10px', textAlign: { sm: 'center', xl: 'start' } }}
          >
            {club.title}
          </Typography>
          <Stack
            direction={{ lg: 'column', xl: 'row' }}
            alignItems="center"
            justifyContent="center"
            spacing={{ lg: 2, xl: 10 }}
            sx={{ textAlign: { sm: 'center', xl: 'start' } }}
          >
            <Box
              component="img"
              src={`/images/club/${club.logo}`}
              alt={club.title}
              sx={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
              }}
            />
            <Stack spacing={2} sx={{ fontSize: '1.2rem' }}>
              <Typography variant="p">{`${t('foundedIn')} ${club.foundedYear}`}</Typography>
              <Typography variant="p">{`${t('address')}: ${club.address}`}</Typography>
              <Typography variant="p">{`${t('email')}: ${club.email}`}</Typography>
              <Typography variant="p">{`${t('phone')}: ${club.phone}`}</Typography>
              <Typography
                variant="p"
                sx={{ borderBlockEnd: '1px solid black', pb: '10px' }}
              >
                {t('aboutUs')}
              </Typography>
              <Typography variant="p">{club.description}</Typography>
            </Stack>
          </Stack>
        </Box>
        <Stack spacing={3}>
          <Typography
            variant="h5"
            sx={{ borderBlockEnd: '1px solid black', pb: '10px' }}
          >
            {t('clubMembers')}
          </Typography>
          <TextField
            label={t('searchMember')}
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              handlePageChange(null, 1);
            }}
            sx={{ maxWidth: 400 }}
          />
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingMember && (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  )}
                  {errorMember && (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        {errorMember}
                      </TableCell>
                    </TableRow>
                  )}
                  {players.length > 0 ? (
                    players.map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: 'pointer', textDecoration: 'none' }}
                        onClick={() => navigate()}
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No members found
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
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredMembers.length}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={(_, nextPage) =>
                handlePageChange(null, nextPage + 1)
              }
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}

export default ClubPage;
