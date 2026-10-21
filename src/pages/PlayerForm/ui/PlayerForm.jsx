// import { useParams } from 'react-router';
import {
  Box,
  // Button,
  MenuItem,
  Select,
  Stack,
  // TextField,
  Typography,
} from '@mui/material';
// import { skipToken } from '@reduxjs/toolkit/query';
import {
  // FieldArray,
  Form,
  Formik,
} from 'formik';

import { EMPTY_PLAYER, useCreatePlayerMutation } from '@/entities/player';
import { playerFormSchema } from '../model/validationSchemas';

import BaseButton from '@/shared/ui/BaseButton/BaseButton';
import { PlayerDataField } from '@/widgets/PlayerDataField';

import styles from '../styles/playerForm.module.css';

function PlayerForm() {
  const [createPlayer] = useCreatePlayerMutation();

  const onSubmitForm = async (values) => {
    const player = {
      ...values,
      notes: values.notes.filter((value) => value),
    };
    await createPlayer(player).unwrap();
  };

  const renderForm = ({ values, handleChanges }) => (
    <Box sx={{ margin: '1em auto' }}>
      <BaseButton text="Back to players" address="/players/" />
      <Form>
        <Box
          sx={{
            margin: '1em auto',
            width: 'fit-content',
            border: '3px solid',
            borderRadius: '2em',
            padding: '1em 3em',
          }}
        >
          <fieldset className={styles['data-fieldset']}>
            <legend>Biography</legend>
            <PlayerDataField labelText="Full name" inputId="fullName" />
            <PlayerDataField labelText="Age" inputId="age" inputType="number" />
            <Stack direction="row" sx={{ alignItems: 'center', gap: '0.5em' }}>
              <label htmlFor="playerSexInp">
                <Typography variant="h5">Sex:</Typography>
              </label>
              <Select
                id="sex"
                sx={{ maxHeight: '1.5em', width: '7em', textAlign: 'center' }}
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="gemale">gemale</MenuItem>
                <MenuItem value="else">else</MenuItem>
              </Select>
            </Stack>
            <PlayerDataField labelText="City" inputId="city" />
            <Stack direction="row" sx={{ alignItems: 'center', gap: '0.5em' }}>
              <label htmlFor="playerPhotoInp">
                <Typography variant="h5">Photo:</Typography>
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="playerPhotoInp"
              />
            </Stack>
          </fieldset>
          <fieldset className={styles['data-fieldset']}>
            <legend>Game data</legend>
            <PlayerDataField labelText="Status" inputId="status" />
            <PlayerDataField
              labelText="Rating"
              inputId="ukrRate"
              inputType="number"
            />
            <PlayerDataField labelText="Club" inputId="club" />
          </fieldset>
          <Stack direction='row' sx={{margin: '1em auto 0'}}>
            <BaseButton type="reset" text='Reset' color='error'></BaseButton>
            <BaseButton type="submit" text='Submit' color='success'></BaseButton>
          </Stack>
        </Box>
      </Form>
    </Box>
  );

  // const {
  //   data: fetchedPlayer,
  //   isLoading,
  //   isError,
  // } = useGetPlayerByIdQuery(id ?? skipToken);

  // const player = fetchedPlayer ?? EMPTY_PLAYER;

  // if (id && isLoading) return 'Loading...';
  // if (id && isError) return 'Loading error!';

  // const initialValues = {
  //   ...player,
  //   notes: player.notes.length > 0 ? [...player.notes, ''] : [''],
  // };

  // const renderForm = ({ values, handleChange }) => (
  //   <Form>
  //     <Box sx={{ padding: '1em' }}>
  //       <label htmlFor="photoInput" className={styles['photo-input-label']}>
  //         <input
  //           type="file"
  //           accept="image/*"
  //           className={styles['photo-input']}
  //           id="photoInput"
  //         />
  //         <Box
  //           sx={{
  //             border: '1px solid',
  //             borderColor: 'secondary.main',
  //             borderRadius: '3em',
  //             width: '20em',
  //             height: '30em',
  //             transition: '0.2s',
  //             cursor: 'pointer',
  //             overflow: 'hidden',
  //             display: 'flex',
  //             '&:hover': { backgroundColor: '#dddddd' },
  //           }}
  //         >
  //           {player.photo ? (
  //             <img
  //               src="#"
  //               alt="player photo"
  //               className={styles['player-photo']}
  //             />
  //           ) : (
  //             <PersonIcon
  //               sx={{
  //                 width: '5em',
  //                 height: '5em',
  //                 margin: 'auto',
  //               }}
  //             />
  //           )}
  //         </Box>
  //       </label>
  //       <Box>
  //         <PlayerDataField labelText="Full name" inputId="fullName" />
  //         <PlayerDataField labelText="Age" inputId="age" />
  //         <PlayerDataField labelText="City" inputId="city" />
  //         <PlayerDataField labelText="Satus" inputId="status" />
  //         <PlayerDataField labelText="Club" inputId="club" />
  //         <PlayerDataField labelText="Ukrainian rate" inputId="ukrRate" />
  //         <PlayerDataField labelText="World rate" inputId="worldRate" />
  //         <Typography variant="h5">Notes:</Typography>
  //         <FieldArray name="notes">
  //           {({ push, remove }) => (
  //             <ul className={styles['notes-list']}>
  //               {values.notes.map((note, index) => {
  //                 return (
  //                   <li key={index}>
  //                     <TextField
  //                       name={`notes.${index}`}
  //                       value={note}
  //                       variant="standard"
  //                       onChange={(e) => {
  //                         handleChange(e);

  //                         const nextNotes = [...values.notes];
  //                         nextNotes[index] = e.target.value;

  //                         if (!nextNotes.includes('')) {
  //                           push('');
  //                         } else {
  //                           nextNotes.forEach((note, index) => {
  //                             if (!note && index !== nextNotes.length - 1) {
  //                               remove(index);
  //                             }
  //                           });
  //                         }
  //                       }}
  //                       sx={{
  //                         minWidth: '20em',
  //                         '& .MuiInputBase-input': {
  //                           fontSize: '1.3em',
  //                         },
  //                       }}
  //                     />
  //                   </li>
  //                 );
  //               })}
  //             </ul>
  //           )}
  //         </FieldArray>
  //       </Box>
  //       <Stack
  //         direction="row"
  //         gap={10}
  //         sx={{ margin: '1em 0', justifyContent: 'center' }}
  //       >
  //         <Button
  //           variant="contained"
  //           type="submit"
  //           sx={{ fontSize: '1.1em', borderRadius: '0.5em' }}
  //         >
  //           Save
  //         </Button>
  //         <Button
  //           variant="contained"
  //           type="reset"
  //           sx={{ fontSize: '1.1em', borderRadius: '0.5em' }}
  //         >
  //           Reset
  //         </Button>
  //       </Stack>
  //     </Box>
  //   </Form>
  // );

  return (
    <Formik
      initialValues={EMPTY_PLAYER}
      onSubmit={onSubmitForm}
      validationSchema={playerFormSchema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default PlayerForm;
