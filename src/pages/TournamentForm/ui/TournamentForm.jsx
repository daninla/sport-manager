import { useState } from 'react';
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
import { Form, Formik } from 'formik';

import { useGetClubsQuery } from '@/entities/club/api/clubApi';
import { useGetPlayersQuery } from '@/entities/player';
import { useCreateTournamentMutation } from '@/entities/tournament';
import { initialValues } from '../model/initialValues';

import GeneralStep from './steps/GeneralStep';
import ParametersStep from './steps/ParametersStep';
import ParticipantsStep from './steps/ParticipantsStep';
import RestrictionsStep from './steps/RestrictionsStep';

function TournamentForm() {
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
  const gamesFormats = t('gamesFormats', { returnObjects: true });
  const isRating = t('isRating', { returnObjects: true });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleAddPlayer = (value) => {
    if (!value) return;

    const playerName =
      typeof value === 'string' ? value.trim() : value.fullName?.trim();

    if (!playerName) return;

    const matchedPlayer = players.find(
      (player) => player.fullName.toLowerCase() === playerName.toLowerCase(),
    );

    if (!matchedPlayer) return;

    const alreadyAdded = selectedPlayers.some(
      (player) => player.id === matchedPlayer.id,
    );

    if (!alreadyAdded) {
      setSelectedPlayers((prev) => [...prev, matchedPlayer]);
    }

    setSearchValue('');
  };

  const mapCompetitionType = (type) => {
    switch (type) {
      case 'team':
        return 'Team';
      case 'double':
        return 'Double';
      case 'single':
      default:
        return 'Single';
    }
  };

  const mapBracketFormat = (format) => {
    switch (format) {
      case 'round_robin':
        return 'Round Robin';
      case 'swiss':
        return 'Swiss System';
      case 'single_elimination':
      default:
        return 'Single Elimination';
    }
  };

  const mapMatchFormat = (gamesToWin) => {
    const games = Number(gamesToWin) || 3;
    return `Best of ${games}`;
  };

  const handleSubmit = async (values) => {
    if (selectedPlayers.length === 0) {
      return;
    }

    const playerIds = selectedPlayers.map((player) => Number(player.id));

    const tournamentPayload = {
      name: values.name,
      ageCategory: values.ageCategory,
      date: values.date,
      timeStart: values.timeStart,
      clubId: values.clubId,
      location: values.location,
      players: playerIds,
      competitionType: mapCompetitionType(values.tournamentType),
      bracketFormat: mapBracketFormat(values.format),
      matchFormat: mapMatchFormat(values.gamesToWin),
      pointsPerGame: 11,
      maxParticipants: Number(values.playersLimit) || playerIds.length,
      currentParticipants: playerIds.length,
      status: 'Upcoming',
    };

    await createTournament(tournamentPayload).unwrap();

    navigate('/tournaments');
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
              gamesFormats={gamesFormats}
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
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              disabled={isTournamentCreating || selectedPlayers.length === 0}
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
          {t('heading')}
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

export default TournamentForm;
