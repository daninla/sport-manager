import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {
  Box,
  Button,
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
import { Form, Formik } from 'formik';

import {
  useGetClubByIdQuery,
  useUpdateClubMutation,
} from '@/entities/club/api/clubApi';
import {
  useGetUsersByClubQuery,
  useGetUserWithoutClubQuery,
  useUpdateUserMutation,
} from '@/entities/user/api/userApi';
import { usePaginationTable } from '@/shared/lib/usePaginationTable';
import { getMemberColumns, getPlayerColumns } from '../model/columns';
import { defaultValues } from '../model/defaultValues';

const getColumnAlignment = (index, columnCount) => {
  if (index === 0) return 'start';
  if (index === columnCount - 1) return 'end';
  return 'center';
};

function ClubForm() {
  const { id } = useParams();

  const { t } = useTranslation('clubs');

  const columnsPlayer = getPlayerColumns(t);
  const columnsMember = getMemberColumns(t);

  const fileInputRef = useRef(null);

  const [initialValues, setInitialValues] = useState(defaultValues);

  const [photoPreview, setPhotoPreview] = useState('');

  const [searchTermPlayer, setSearchTermPlayer] = useState('');
  const [searchTermMember, setSearchTermMember] = useState('');

  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);

  const [updateUser] = useUpdateUserMutation();
  const [updateClub] = useUpdateClubMutation();

  const { data: club, isLoadingClub, errorClub } = useGetClubByIdQuery(id);

  useEffect(() => {
    if (!club) return;

    const getClub = () => {
      setInitialValues({ ...defaultValues, ...club });
    };
    getClub();
  }, [club]);

  const {
    data: usersWithoutClub = [],
    isLoadingPlayers,
    errorPlayers,
  } = useGetUserWithoutClubQuery();

  const filteredPlayers = usersWithoutClub.filter((player) =>
    player.fullName
      ?.toLowerCase()
      .includes(searchTermPlayer.trim().toLowerCase()),
  );

  const {
    currentData: players,
    page: pagePlayer,
    rowsPerPage: rowsPerPagePlayer,
    handlePageChange: handlePageChangePlayer,
    handleChangeRowsPerPage: handleChangeRowsPerPagePlayer,
  } = usePaginationTable(filteredPlayers, 10);

  const {
    data: clubMembers = [],
    isLoadingMembers,
    errorMembers,
  } = useGetUsersByClubQuery(club?.title, { skip: !club?.title });

  const filteredMembers = clubMembers.filter((member) =>
    member.fullName
      ?.toLowerCase()
      .includes(searchTermMember.trim().toLowerCase()),
  );

  const {
    currentData: members,
    page: pageMember,
    rowsPerPage: rowsPerPageMember,
    handlePageChange: handlePageChangeMember,
    handleChangeRowsPerPage: handleChangeRowsPerPageMember,
  } = usePaginationTable(filteredMembers, 10);

  const handleTogglePlayer = (playerId) => {
    setSelectedPlayerIds((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId],
    );
  };

  const handleToggleMember = (memberId) => {
    setSelectedMemberIds((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId],
    );
  };

  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFieldValue('logo', file.name);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleAcceptChange = async (values, { resetForm }) => {
    const selectedPlayers = usersWithoutClub.filter((player) =>
      selectedPlayerIds.includes(player.id),
    );

    const selectedMembers = clubMembers.filter((member) =>
      selectedMemberIds.includes(member.id),
    );

    const updatePromise = (async () => {
      if (selectedPlayers.length > 0) {
        await Promise.all(
          selectedPlayers.map((player) =>
            updateUser({ ...player, club: values.title }).unwrap(),
          ),
        );
      }

      if (selectedMembers.length > 0) {
        await Promise.all(
          selectedMembers.map((member) =>
            updateUser({ ...member, club: 'None' }).unwrap(),
          ),
        );
      }
      const updatedClub = await updateClub({
        ...values,
        amountMembers:
          Number(values.amountMembers || 0) +
          selectedPlayers.length -
          selectedMembers.length,
      }).unwrap();

      resetForm({ values: { ...defaultValues, ...updatedClub } });
      setSelectedPlayerIds([]);
      setSelectedMemberIds([]);

      return updatedClub;
    })();

    return toast.promise(updatePromise, {
      loading: t('editLoading'),
      success: t('editSuccess'),
      error: (err) => `${t('editError')}: ${err.message}`,
    });
  };

  if (isLoadingClub) return <Spinner />;
  if (errorClub || !club) {
    return <Box sx={{ p: 4 }}>{errorClub || 'No found this club'}</Box>;
  }

  const renderForm = ({
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    dirty,
  }) => {
    return (
      <Form>
        <Stack
          direction={{ lg: 'column', xl: 'row' }}
          spacing={{ lg: 2, xl: 10 }}
          sx={{ textAlign: { sm: 'center', xl: 'start' } }}
        >
          <Box>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(event) => handlePhotoChange(event, setFieldValue)}
            />
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                width: 300,
                height: 300,
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #081627',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f2f2f2',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(8, 22, 39, 0.08)',
              }}
            >
              {photoPreview || values.logo ? (
                <Box
                  component="img"
                  src={photoPreview || `/images/club/${values.logo}`}
                  alt="Club logo"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  {t('uploadPhoto')}
                </Typography>
              )}
            </Box>
          </Box>

          <Stack spacing={2} sx={{ fontSize: '1.2rem', width: '100%' }}>
            <Stack spacing={2} direction="row">
              <TextField
                fullWidth
                label={t('title')}
                variant="outlined"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                fullWidth
                label={t('foundedYear')}
                variant="outlined"
                name="foundedYear"
                type="number"
                value={values.foundedYear}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Stack>

            <Stack spacing={2} direction="row">
              <TextField
                fullWidth
                label={t('email')}
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                fullWidth
                label={t('phone')}
                variant="outlined"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Stack>

            <TextField
              fullWidth
              label={t('address')}
              variant="outlined"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextField
              fullWidth
              label={t('description')}
              variant="outlined"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              multiline
              minRows={2}
            />
          </Stack>
        </Stack>

        <Stack spacing={3} sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            sx={{ borderBlockEnd: '1px solid black', pb: '10px' }}
          >
            {t('freePlayers')}
          </Typography>

          <TextField
            label={t('searchPlayer')}
            value={searchTermPlayer}
            onChange={(event) => setSearchTermPlayer(event.target.value)}
            sx={{ maxWidth: 400 }}
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
                  {isLoadingPlayers && (
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
                  {players.length > 0 ? (
                    players.map((player) => (
                      <TableRow
                        hover
                        key={player.id}
                        onClick={() => handleTogglePlayer(player.id)}
                        sx={{
                          backgroundColor: selectedPlayerIds.includes(player.id)
                            ? 'rgba(0, 230, 118, 0.1)'
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
                                  checked={selectedPlayerIds.includes(
                                    player.id,
                                  )}
                                  onClick={(event) => event.stopPropagation()}
                                  onChange={() => handleTogglePlayer(player.id)}
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
                        No free players found
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
              count={filteredPlayers.length}
              rowsPerPage={rowsPerPagePlayer}
              page={pagePlayer - 1}
              onPageChange={(_, nextPage) =>
                handlePageChangePlayer(null, nextPage + 1)
              }
              onRowsPerPageChange={handleChangeRowsPerPagePlayer}
            />
          </Paper>
        </Stack>

        <Stack spacing={3} sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            sx={{ borderBlockEnd: '1px solid black', pb: '10px' }}
          >
            {t('clubMembers')}
          </Typography>

          <TextField
            label={t('searchMember')}
            value={searchTermMember}
            onChange={(event) => setSearchTermMember(event.target.value)}
            sx={{ maxWidth: 400 }}
          />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columnsMember.map((column, index) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          minWidth: column.minWidth,
                          textAlign: getColumnAlignment(
                            index,
                            columnsMember.length,
                          ),
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingMembers && (
                    <TableRow>
                      <TableCell colSpan={columnsMember.length} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  )}
                  {errorMembers && (
                    <TableRow>
                      <TableCell colSpan={columnsMember.length} align="center">
                        {errorMembers}
                      </TableCell>
                    </TableRow>
                  )}
                  {members.length > 0 ? (
                    members.map((member) => (
                      <TableRow
                        hover
                        key={member.id}
                        onClick={() => handleToggleMember(member.id)}
                        sx={{
                          backgroundColor: selectedMemberIds.includes(member.id)
                            ? 'rgba(230, 19, 0, 0.1)'
                            : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        {columnsMember.map((column, index) => {
                          const value = member[column.id];

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
                              {column.id === 'remove' ? (
                                <Checkbox
                                  checked={selectedMemberIds.includes(
                                    member.id,
                                  )}
                                  onClick={(event) => event.stopPropagation()}
                                  onChange={() => handleToggleMember(member.id)}
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
                      <TableCell colSpan={columnsMember.length} align="center">
                        No mebers found
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
              rowsPerPage={rowsPerPageMember}
              page={pageMember - 1}
              onPageChange={(_, nextPage) =>
                handlePageChangeMember(null, nextPage + 1)
              }
              onRowsPerPageChange={handleChangeRowsPerPageMember}
            />
          </Paper>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mt: '30px' }}
        >
          <Button type="reset" variant="contained">
            {t('btnReset')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              !dirty &&
              selectedPlayerIds.length === 0 &&
              selectedMemberIds.length === 0
            }
          >
            {t('btnSubmit')}
          </Button>
        </Stack>
      </Form>
    );
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: '10px', textAlign: { sm: 'center', xl: 'start' } }}
      >
        {t('editClub')}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleAcceptChange}
      >
        {renderForm}
      </Formik>
    </>
  );
}

export default ClubForm;
