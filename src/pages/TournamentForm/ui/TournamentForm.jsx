import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import styles from './TournamentForm.module.css';

const initialValues = {
  title: '',
  players: [],
  playersLimit: 16,
  ageCategory: '',
  date: '',
  time: '',
  location: '',
  tournamentType: 'single',
  format: 'single_elimination',
  gamesToWin: 3,
  pointsPerGame: 11,
  isRated: 'false',
  ratingCoefficient: 1,
  status: 'draft',
};

const ageCategories = [
  { value: 'U12', label: 'Up to 12 years old' },
  { value: 'U14', label: 'Up to 14 years old' },
  { value: 'U16', label: 'Up to 16 years old' },
  { value: 'U18', label: 'Up to 18 years old' },
  { value: 'U21', label: 'Up to 21 years old' },
  { value: 'adult', label: 'Adults' },
  { value: 'open', label: 'Open category' },
];

const competitionTypes = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'team', label: 'Team' },
];

const tournamentFormats = [
  { value: 'single_elimination', label: 'Single Elimination' },
  { value: 'double_elimination', label: 'Double Elimination' },
  { value: 'swiss_system', label: 'Swiss System' },
  { value: 'round_robin', label: 'Round Robin' },
  { value: 'mixed_system', label: 'Mixed System' },
];

const gamesFormats = [
  { value: 3, label: 'Up to 3 parties' },
  { value: 5, label: 'Up to 5 parties' },
  { value: 7, label: 'Up to 7 parties' },
];

function TournamentForm() {
  const navigate = useNavigate();
  const renderForm = ({ values }) => {
    return (
      <Form>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" id="title" placeholder="Title" />
          </Box>
          <Box className={styles['field-container']}>
            <label htmlFor="ageCategory">Age category</label>
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
            <label htmlFor="date">Date</label>
            <Field type="date" name="date" id="date" />
          </Box>
          <Box className={styles['field-container']}>
            <label htmlFor="time">Time</label>
            <Field type="time" name="time" id="time" />
          </Box>
        </Box>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="location">Location</label>
            <Field
              type="text"
              name="location"
              id="location"
              placeholder="Location"
            />
          </Box>
          <Box className={styles['field-container']}>
            <label htmlFor="type">Type of competition</label>
            <Field name="tournamentType" id="type" as="select">
              {competitionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Field>
          </Box>
        </Box>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="format">Format</label>
            <Field name="format" id="format" as="select">
              {tournamentFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </Field>
          </Box>
          <Box className={styles['field-container']}>
            <label htmlFor="playersLimit">Limit of players</label>
            <Field type="number" name="playersLimit" id="playersLimit" />
          </Box>
        </Box>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="gamesToWin">Number of parties</label>
            <Field name="gamesToWin" id="gamesToWin" as="select">
              {gamesFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </Field>
          </Box>
          <Box className={styles['field-container']}>
            <label htmlFor="pointsPerGame">Points for the game</label>
            <Field type="number" name="pointsPerGame" id="pointsPerGame" />
          </Box>
        </Box>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label>Type tournament</label>
            <Box role="group" className={styles.radios}>
              <label>
                <Field type="radio" name="isRated" value="false" />
                Regular
              </label>
              <label>
                <Field type="radio" name="isRated" value="true" />
                Rating
              </label>
            </Box>
          </Box>
          {values.isRated === 'true' && (
            <Box className={styles['field-container']}>
              <label htmlFor="ratingCoefficient">Rating coefficient</label>
              <Field
                type="number"
                name="ratingCoefficient"
                id="ratingCoefficient"
                step="0.1"
              />
            </Box>
          )}
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
            Return
          </Button>
          <Button
            type="reset"
            color="error"
            variant="contained"
            size="large"
            startIcon={<CancelIcon />}
          >
            Reset
          </Button>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save
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
          Add New Tournament
        </Typography>
        <Formik initialValues={initialValues} enableReinitialize>
          {renderForm}
        </Formik>
      </Box>
    </Box>
  );
}

export default TournamentForm;
