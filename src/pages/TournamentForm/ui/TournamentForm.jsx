import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';

import { useGetPlayersQuery } from '@/entities/player';
import {
  buildPlayoffBracket,
  flattenPlayoffBracket,
  getNearestBracketSize,
  useCreatePlayoffMatchMutation,
  useCreateTournamentMutation,
} from '@/entities/tournament';

import styles from './TournamentForm.module.css';

const initialValues = {
  name: '',
  players: [],
  playersLimit: 16,
  ageCategory: '',
  date: '',
  timeStart: '',
  timeEnd: '',
  location: '',
  tournamentType: 'single',
  format: 'single_elimination',
  gamesToWin: 3,
  pointsPerGame: 11,
  isRated: 'false',
  ratingCoefficient: 0,
  status: 'draft',
};

function TournamentForm() {
  const navigate = useNavigate();
  const { t } = useTranslation('tournamentForm');
  const { data: players = [], isLoading: isPlayersLoading } = useGetPlayersQuery();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [createTournament, { isLoading: isTournamentCreating }] =
    useCreateTournamentMutation();
  const [createPlayoffMatch, { isLoading: isPlayoffCreating }] =
    useCreatePlayoffMatchMutation();

  const ageCategories = t('ageCategories', { returnObjects: true });
  const competitionTypes = t('competitionTypes', { returnObjects: true });
  const tournamentFormats = t('tournamentFormats', { returnObjects: true });
  const gamesFormats = t('gamesFormats', { returnObjects: true });

  const handleAddPlayer = (value) => {
    if (!value) return;

    const playerName =
      typeof value === 'string' ? value.trim() : value.fullName?.trim();

    if (!playerName) return;

    const matchedPlayer = players.find(
      (player) =>
        player.fullName.toLowerCase() === playerName.toLowerCase()
    );

    if (!matchedPlayer) return;

    const alreadyAdded = selectedPlayers.some(
      (player) => player.id === matchedPlayer.id
    );

    if (!alreadyAdded) {
      setSelectedPlayers((prev) => [...prev, matchedPlayer]);
    }

    setSearchValue('');
  };

  const handleRemovePlayer = (id) => {
    setSelectedPlayers((prev) => prev.filter((player) => player.id !== id));
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
    const bracketSize = getNearestBracketSize(playerIds.length);
    const playoffPlayers = selectedPlayers
      .slice(0, bracketSize)
      .map((player) => ({
        id: Number(player.id),
        fullName: player.fullName,
      }));

    if (values.format === 'single_elimination' && bracketSize < 2) {
      window.alert('Single elimination bracket needs at least 2 players.');
      return;
    }

    const tournamentPayload = {
      name: values.name,
      ageCategory: values.ageCategory,
      date: values.date,
      timeStart: values.timeStart,
      timeEnd: values.timeEnd,
      location: values.location,
      players: playerIds,
      competitionType: mapCompetitionType(values.tournamentType),
      bracketFormat: mapBracketFormat(values.format),
      matchFormat: mapMatchFormat(values.gamesToWin),
      pointsPerGame: Number(values.pointsPerGame) || 11,
      maxParticipants: Number(values.playersLimit) || playerIds.length,
      currentParticipants: playerIds.length,
      status: 'Upcoming',
      matches: [],
    };

    const createdTournament = await createTournament(tournamentPayload).unwrap();

    if (values.format === 'single_elimination') {
      const playoffBracket = buildPlayoffBracket(playoffPlayers);
      const playoffMatches = flattenPlayoffBracket(playoffBracket).map((match) => ({
        ...match,
        tournamentId: Number(createdTournament.id),
      }));

      await Promise.all(
        playoffMatches.map((playoffMatch) =>
          createPlayoffMatch(playoffMatch).unwrap()
        )
      );
    }

    navigate('/tournaments');
  };

  const renderForm = ({ values }) => {
    return (
      <Form>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="title">{t('name')}</label>
            <Field
              type="text"
              name="name"
              id="title"
              placeholder={t('name')}
            />
          </Box>

          <Box className={styles['field-container']}>
            <label htmlFor="ageCategory">{t('ageCategory')}</label>
            <Field name="ageCategory" id="ageCategory" as="select">
              {ageCategories.map((age) => (
                <option key={age.value} value={age.value}>
                  {age.label}
                </option>
              ))}
            </Field>
          </Box>
        </Box>

        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="date">{t('date')}</label>
            <Field type="date" name="date" id="date" />
          </Box>

          <Box className={styles['field-container']}>
            <label htmlFor="location">{t('location')}</label>
            <Field
              type="text"
              name="location"
              id="location"
              placeholder={t('location')}
            />
          </Box>
        </Box>

        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="timeStart">{t('timeStart')}</label>
            <Field type="time" name="timeStart" id="timeStart" />
          </Box>

          <Box className={styles['field-container']}>
            <label htmlFor="timeEnd">{t('timeEnd')}</label>
            <Field type="time" name="timeEnd" id="timeEnd" />
          </Box>
        </Box>

        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="type">{t('competitionType')}</label>
            <Field name="tournamentType" id="type" as="select">
              {competitionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Field>
          </Box>

          <Box className={styles['field-container']}>
            <label htmlFor="format">{t('format')}</label>
            <Field name="format" id="format" as="select">
              {tournamentFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </Field>
          </Box>
        </Box>

        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="playersLimit">{t('playersLimit')}</label>
            <Field type="number" name="playersLimit" id="playersLimit" />
          </Box>

          <Box className={styles['field-container']}>
            <label htmlFor="gamesToWin">{t('gamesToWin')}</label>
            <Field name="gamesToWin" id="gamesToWin" as="select">
              {gamesFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </Field>
          </Box>
        </Box>

        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="pointsPerGame">{t('pointsPerGame')}</label>
            <Field type="number" name="pointsPerGame" id="pointsPerGame" />
          </Box>
        </Box>

        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label>{t('typeTournament')}</label>
            <Box role="group" className={styles.radios}>
              <label>
                <Field type="radio" name="isRated" value="false" />
                {t('regular')}
              </label>
              <label>
                <Field type="radio" name="isRated" value="true" />
                {t('rating')}
              </label>
            </Box>
          </Box>

          {values.isRated === 'true' && (
            <Box className={styles['field-container']}>
              <label htmlFor="ratingCoefficient">
                {t('ratingCoefficient')}
              </label>
              <Field
                type="number"
                name="ratingCoefficient"
                id="ratingCoefficient"
                step="0.1"
              />
            </Box>
          )}
        </Box>

        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label>{t('players')}</label>

            <Autocomplete
              freeSolo
              options={players}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.fullName
              }
              inputValue={searchValue}
              onInputChange={(event, newInputValue) => {
                setSearchValue(newInputValue);
              }}
              onChange={(event, newValue) => {
                handleAddPlayer(newValue);
              }}
              loading={isPlayersLoading}
              sx={{ width: '100%', marginBottom: '1rem' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('playerSearch')}
                />
              )}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedPlayers.map((player) => (
                <Chip
                  key={player.id}
                  label={player.fullName}
                  onDelete={() => handleRemovePlayer(player.id)}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={6}>
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

          <Button
            type="reset"
            color="error"
            variant="contained"
            size="large"
            startIcon={<CancelIcon />}
          >
            {t('reset')}
          </Button>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            disabled={
              isTournamentCreating || isPlayoffCreating || selectedPlayers.length === 0
            }
          >
            {t('save')}
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
          minWidth: '100px',
          maxWidth: '550px',
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