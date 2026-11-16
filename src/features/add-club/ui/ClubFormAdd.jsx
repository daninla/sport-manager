import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Stack } from '@mui/material';
import { Form, Formik } from 'formik';

import { ClubFields } from '@/entities/club';
import { defaultValues } from '@/entities/club/model/defaultValues';
import useFormAdd from '../model/useFormAdd';

function ClubFormAdd({ t }) {
  const {
    fileInputRef,
    photoPreview,
    setPhotoPreview,
    handlePhotoChange,
    handleSubmit,
  } = useFormAdd({ t });

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
          setPhotoPreview={setPhotoPreview}
          handlePhotoChange={handlePhotoChange}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mt: '30px' }}
        >
          <Button
            type="reset"
            color="error"
            variant="contained"
            startIcon={<CancelIcon />}
          >
            {t('btnReset')}
          </Button>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<SaveIcon />}
            disabled={!dirty}
          >
            {t('btnSubmitAdd')}
          </Button>
        </Stack>
      </Form>
    );
  };

  return (
    <Formik initialValues={defaultValues} onSubmit={handleSubmit}>
      {renderForm}
    </Formik>
  );
}

export default ClubFormAdd;
