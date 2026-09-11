import { useParams } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import { Box, TextField, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { FieldArray, Form, Formik } from 'formik';

import {
  EMPTY_PLAYER,
  useGetPlayerByIdQuery,
  useUpdatePlayerMutation,
} from '@/entities/player';
import { playerFormSchema } from '../model/validationSchemas';

import { PlayerDataField } from '@/widgets/PlayerDataField';

import styles from '../styles/playerForm.module.css';

function PlayerForm() {
  const { id } = useParams();
  const {
    data: fetchedPlayer,
    isLoading,
    isError,
  } = useGetPlayerByIdQuery(id ?? skipToken);

  const player = fetchedPlayer ?? EMPTY_PLAYER;

  const isAdmin = true; ////////////////////////////////////////////////

  const textVariant = 'h5';

  const [updatePlayer] = useUpdatePlayerMutation();

  if (id && isLoading) return 'Loading...';
  if (id && isError) return 'Loading error!';

  const initialValues = {
    ...player,
    notes: player.notes.length > 0 ? [...player.notes, ''] : [''],
  };

  const renderForm = ({ values, handleChange }) => (
    <Form>
      <Box sx={{ padding: '1em' }}>
        <label htmlFor="photoInput" className={styles['photo-input-label']}>
          <input
            type="file"
            accept="image/*"
            className={styles['photo-input']}
            id="photoInput"
          />
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'secondary.main',
              borderRadius: '3em',
              width: '20em',
              height: '30em',
              transition: '0.2s',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              '&:hover': { backgroundColor: '#dddddd' },
            }}
          >
            {player.photo ? (
              <img
                src="#"
                alt="player photo"
                className={styles['player-photo']}
              />
            ) : (
              <PersonIcon
                sx={{
                  width: '5em',
                  height: '5em',
                  margin: 'auto',
                }}
              />
            )}
          </Box>
        </label>
        <Box>
          <PlayerDataField
            textVariant={textVariant}
            labelText="Full name"
            inputId="fullName"
          />
          <PlayerDataField
            textVariant={textVariant}
            labelText="Age"
            inputId="age"
          />
          <PlayerDataField
            textVariant={textVariant}
            labelText="City"
            inputId="city"
          />
          <PlayerDataField
            textVariant={textVariant}
            labelText="Satus"
            inputId="status"
          />
          <PlayerDataField
            textVariant={textVariant}
            labelText="Club"
            inputId="club"
          />
          <PlayerDataField
            textVariant={textVariant}
            labelText="Ukrainian rate"
            inputId="ukrRate"
          />
          <PlayerDataField
            textVariant={textVariant}
            labelText="World rate"
            inputId="worldRate"
          />
          <Typography variant={textVariant}>Notes:</Typography>
          <FieldArray name="notes">
            {({ push, remove }) => (
              <ul className={styles['notes-list']}>
                {values.notes.map((note, index) => {
                  const isLastField = index === values.notes.length - 1;

                  return (
                    <li key={index}>
                      <TextField
                        name={`notes.${index}`}
                        value={note}
                        variant="standard"
                        onChange={(e) => {
                          const value = e.target.value;
                          handleChange(e);
                          if (isLastField && value.trim().length > 0) {
                            push('');
                          }
                          if (!isLastField && value.trim().length === 0) {
                            remove(values.notes.length - 1);
                          }
                        }}
                        sx={{
                          minWidth: '20em',
                          '& .MuiInputBase-input': {
                            fontSize: '1.3em',
                          },
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </FieldArray>
        </Box>
      </Box>
    </Form>
  );

  if (isAdmin)
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await updatePlayer(values).unwrap();
        }}
        validationSchema={playerFormSchema}
        enableReinitialize
      >
        {renderForm}
      </Formik>
    );

  return (
    <Box sx={{ padding: '1em' }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'secondary.main',
          borderRadius: '3em',
          width: 'fit-content',
        }}
      >
        <PersonIcon
          sx={{
            width: '5em',
            height: '5em',
            margin: '7.5em 5em',
          }}
        />
      </Box>
      <Typography variant={textVariant}>
        Full name: {player.fullName}
      </Typography>
      <Typography variant={textVariant}>Age: {player.age}</Typography>
      <Typography variant={textVariant}>City: {player.city}</Typography>
      <Typography variant={textVariant}>Status: {player.status}</Typography>
      <Typography variant={textVariant}>Club: {player.club}</Typography>
      <Typography variant={textVariant}>
        Ukrainian rate: {player.ukrRate}
      </Typography>
      <Typography variant={textVariant}>
        World rate: {player.worldRate}
      </Typography>
      <Typography variant={textVariant}>Notes:</Typography>
      <ul className={styles['notes-list']}>
        {player.notes.length !== 0 ? (
          player.notes.map((note) => (
            <li>
              <Typography variant={textVariant}>{note}</Typography>
            </li>
          ))
        ) : (
          <Typography variant={textVariant}>No data</Typography>
        )}
      </ul>
    </Box>
  );
}

export default PlayerForm;
