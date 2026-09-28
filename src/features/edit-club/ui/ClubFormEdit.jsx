import SelectableUsersTable from './SelectableUsersTable';
import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';

import { ClubFields } from '@/entities/club';
import { getMemberColumns, getPlayerColumns } from '../model/columns';
import useFormEdit from '../model/useFormEdit';

function ClubFormEdit({ id, t, club }) {
  const columnsPlayer = getPlayerColumns(t);
  const columnsMember = getMemberColumns(t);

  const {
    fileInputRef,
    initialValues,
    photoPreview,
    searchTermPlayer,
    setSearchTermPlayer,
    searchTermMember,
    setSearchTermMember,
    selectedPlayerIds,
    selectedMemberIds,
    isLoadingPlayers,
    errorPlayers,
    filteredPlayers,
    isLoadingMembers,
    errorMembers,
    filteredMembers,
    handleTogglePlayer,
    handleToggleMember,
    handlePhotoChange,
    handleSubmit,
  } = useFormEdit({ id, t, club });

  const renderForm = ({
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    dirty,
  }) => {
    return (
      <Form>
        <ClubFields
          t={t}
          fileInputRef={fileInputRef}
          photoPreview={photoPreview}
          values={values}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handlePhotoChange={handlePhotoChange}
        />

        <Stack spacing={3} sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            sx={{ borderBlockEnd: '1px solid black', pb: '10px' }}
          >
            {t('freePlayers')}
          </Typography>

          <SelectableUsersTable
            searchTitle={t('searchPlayer')}
            rowsPerPageTitle={t('rowsPerPage')}
            ofTitle={t('of')}
            selectColor="rgba(23, 230, 0, 0.1)"
            mode="add"
            searchTermUser={searchTermPlayer}
            setSearchTermUser={setSearchTermPlayer}
            columnsUser={columnsPlayer}
            selectedUserIds={selectedPlayerIds}
            filteredUsers={filteredPlayers}
            isLoadingUser={isLoadingPlayers}
            errorUser={errorPlayers}
            handleToggleUser={handleTogglePlayer}
          />
        </Stack>

        <Stack spacing={3} sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            sx={{ borderBlockEnd: '1px solid black', pb: '10px' }}
          >
            {t('clubMembers')}
          </Typography>

          <SelectableUsersTable
            searchTitle={t('searchMember')}
            rowsPerPageTitle={t('rowsPerPage')}
            ofTitle={t('of')}
            selectColor="rgba(230, 27, 0, 0.1)"
            mode="remove"
            searchTermUser={searchTermMember}
            setSearchTermUser={setSearchTermMember}
            columnsUser={columnsMember}
            selectedUserIds={selectedMemberIds}
            filteredUsers={filteredMembers}
            isLoadingUser={isLoadingMembers}
            errorUser={errorMembers}
            handleToggleUser={handleToggleMember}
          />
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
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default ClubFormEdit;
