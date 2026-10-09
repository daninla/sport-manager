import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
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
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Form, Formik } from 'formik';

import { useGetClubsQuery } from '@/entities/club/api/clubApi';
import { useGetPlayersQuery } from '@/entities/player';
import { useCreateTournamentMutation } from '@/entities/tournament';
import { initialValues } from '../model/initialValues';

import GeneralStep from './steps/GeneralStep';
import ParametersStep from './steps/ParametersStep';
import ParticipantsStep from './steps/ParticipantsStep';
import RestrictionsStep from './steps/RestrictionsStep';

dayjs.extend(utc);
dayjs.extend(timezone);

function TournamentAddPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('tournamentForm');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [createTournament, { isLoading: isTournamentCreating }] =
    useCreateTournamentMutation();

  const { data: clubs = [] } = useGetClubsQuery();

  const {
    data: players = [],
    isLoading: isPlayersLoading,
    error: errorPlayers,
  } = useGetPlayersQuery();

  const filteredPlayers = players.filter((player) =>
    player.fullName?.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );

  const handleTogglePlayer = (player) => {
    setSelectedPlayers((prev) =>
      prev.some((selectedPlayer) => selectedPlayer.id === player.id)
        ? prev.filter((selectedPlayer) => selectedPlayer.id !== player.id)
        : [...prev, player],
    );
  };

  const steps = t('steps', { returnObjects: true });
  const ageCategories = t('ageCategories', { returnObjects: true });
  const competitionTypes = t('competitionTypes', { returnObjects: true });
  const tournamentFormats = t('tournamentFormats', { returnObjects: true });
  const bestOf = t('bestOf', { returnObjects: true });
  const isRating = t('isRating', { returnObjects: true });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (values) => {
    const addPromise = (async () => {
      const playerIds = selectedPlayers.map((player) => Number(player.id));

      const startsAt = dayjs.tz(
        `${values.date}T${values.timeStart}:00`,
        'Europe/Kyiv',
      );

      const newTournament = await createTournament({
        playerIds,
        startsAt,
        ...values,
      }).unwrap();

      navigate('/tournaments');

      return newTournament;
    })();

    return toast.promise(addPromise, {
      loading: t('addLoading'),
      success: t('addSuccess'),
      error: (err) => `${t('error')}: ${err?.message}`,
    });
  };

  const renderForm = ({ values, handleChange, handleBlur, setFieldValue }) => {
    return (
      <Form>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Stack spacing={4} sx={{ marginBlock: '40px' }}>
          {/* General */}
          {activeStep === 0 && (
            <GeneralStep
              t={t}
              dayjs={dayjs}
              clubs={clubs}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
          )}
          {/* Parameters */}
          {activeStep === 1 && (
            <ParametersStep
              t={t}
              competitionTypes={competitionTypes}
              tournamentFormats={tournamentFormats}
              bestOf={bestOf}
              isRating={isRating}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {/* Restrictions */}
          {activeStep === 2 && (
            <RestrictionsStep
              t={t}
              ageCategories={ageCategories}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {/* Participants */}
          {activeStep === 3 && (
            <ParticipantsStep
              t={t}
              players={players}
              isPlayersLoading={isPlayersLoading}
              errorPlayers={errorPlayers}
              filteredPlayers={filteredPlayers}
              searchValue={searchValue}
              selectedPlayers={selectedPlayers}
              setSearchValue={setSearchValue}
              handleTogglePlayer={handleTogglePlayer}
            />
          )}
        </Stack>

        <Stack
          spacing={6}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
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
              disabled={isTournamentCreating}
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
      </Form>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          border: '3px solid #081627',
          borderRadius: '10px',
          padding: '30px',
          mt: `${activeStep === 3 ? '50px' : '0px'}`,
          minWidth: '100px',
          maxWidth: `${activeStep === 3 ? '1550px' : '550px'}`,
          width: '100%',
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: '30px' }}>
          {t('addHeading')}
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {renderForm}
        </Formik>
      </Box>
    </Box>
  );
}

export default TournamentAddPage;
