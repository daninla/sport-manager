import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
// import { skipToken } from '@reduxjs/toolkit/query';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  EMPTY_PLAYER,
  useCreatePlayerMutation,
  useUpdatePlayerMutation,
} from '@/entities/player';
import { playerFormSchema } from '../model/validationSchemas';

import GameData from './steps/GameData';
import PersonalData from './steps/PersonalData';

function PlayerForm() {
  const navigate = useNavigate();
  const { t } = useTranslation('playerForm');

  const [createPlayer, { isLoading: isPlayerCreating }] =
    useCreatePlayerMutation();
  // const [updatePlayer] = useUpdatePlayerMutation();

  const [activeStep, setActiveStep] = useState(0);

  const onSubmitForm = async (values) => {
    await createPlayer(values).unwrap();
    navigate(-1);
  };

  const steps = t('steps', { returnObjects: true });

  const renderForm = ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
    validateForm,
    setTouched,
    setFieldTouched,
    isValid
  }) => {
    const handleNext = async () => {
      const step1Fields = ['user_email', 'city', 'sex', 'birth_date'];
      const currentErrors = await validateForm();

      if (activeStep === 0) {
        const hasStep1Errors = step1Fields.some(
          (field) => currentErrors[field],
        );

        if (hasStep1Errors) {
          const step1Touched = step1Fields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
          }, {});
          setTouched({ ...touched, ...step1Touched });
        } else {
          setActiveStep((prev) => prev + 1);
        }
      }
    };

    const handleBack = () => {
      setActiveStep((prev) => prev - 1);
    };

    return (
      <Form>
        <Stack gap={1}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ width: '75%', margin: '0.5em auto' }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Stack>
            {activeStep === 0 ? (
              <PersonalData
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                t={t}
                setFieldTouched={setFieldTouched}
              />
            ) : (
              <GameData
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                t={t}
              />
            )}
          </Stack>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            direction={{ xs: 'column', md: 'row' }}
            sx={{ margin: '0.5em' }}
          >
            {activeStep !== 0 ? (
              <Button
                type="button"
                color="secondary"
                variant="contained"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
              >
                {t('back')}
              </Button>
            ) : (
              <Button
                type="button"
                color="warning"
                variant="contained"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                {t('return')}
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                key="next"
                type="button"
                color="secondary"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
              >
                {t('next')}
              </Button>
            ) : (
              <Button
                key="submit"
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={isPlayerCreating || !isValid}
              >
                {t('save')}
              </Button>
            )}
            <Button
              type="reset"
              color="error"
              variant="contained"
              size="large"
              startIcon={<CancelIcon />}
              onClick={() => setActiveStep(0)}
            >
              {t('reset')}
            </Button>
          </Stack>
        </Stack>
      </Form>
    );
  };

  return (
    <Box
      sx={{
        margin: '2em auto',
        padding: '2em',
        width: '30%',
        border: '3px solid #081627',
        borderRadius: '2em',
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: '2em', marginBottom: '0.5em' }}
        align="center"
      >
        {t('addNewPlayer')}
      </Typography>
      <Formik
        initialValues={EMPTY_PLAYER}
        onSubmit={onSubmitForm}
        validationSchema={toFormikValidationSchema(playerFormSchema)}
        enableReinitialize
      >
        {renderForm}
      </Formik>
    </Box>
  );
}

export default PlayerForm;
