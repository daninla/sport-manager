import { useTranslation } from 'react-i18next';
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

function TournamentForm() {
  const navigate = useNavigate();
  const { t } = useTranslation('tournamentForm');
  const ageCategories = t('ageCategories', { returnObjects: true });
  const competitionTypes = t('competitionTypes', { returnObjects: true });
  const tournamentFormats = t('tournamentFormats', { returnObjects: true });
  const gamesFormats = t('gamesFormats', { returnObjects: true });

  const renderForm = ({ values }) => {
    return (
      <Form>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="title">{t('title')}</label>
            <Field
              type="text"
              name="title"
              id="title"
              placeholder={t('title')}
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
            <label htmlFor="time">{t('time')}</label>
            <Field type="time" name="time" id="time" />
          </Box>
        </Box>
        <Box className={styles['group-container']}>
          <Box className={styles['field-container']}>
            <label htmlFor="location">{t('location')}</label>
            <Field
              type="text"
              name="location"
              id="location"
              placeholder={t('location')}
            />
          </Box>
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
        </Box>
        <Box className={styles['group-container']}>
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
          <Box className={styles['field-container']}>
            <label htmlFor="playersLimit">{t('playersLimit')}</label>
            <Field type="number" name="playersLimit" id="playersLimit" />
          </Box>
        </Box>
        <Box className={styles['group-container']}>
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
        <Formik initialValues={initialValues} enableReinitialize>
          {renderForm}
        </Formik>
      </Box>
    </Box>
  );
}

export default TournamentForm;
