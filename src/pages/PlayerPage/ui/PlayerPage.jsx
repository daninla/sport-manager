import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import { useGetPlayerByIdQuery } from '@/entities/player';

import BaseButton from '@/shared/ui/BaseButton/BaseButton.jsx';

import styles from '../styles/playerPage.module.css';

function PlayerPage() {
  const { id } = useParams();

  const { data: player, isLoading, error } = useGetPlayerByIdQuery(id);

  if (isLoading) return <Typography>Loading</Typography>;
  if (error) return <Typography>error</Typography>;

  return (
    <Stack sx={{ p: 4 }} gap={1}>
      <BaseButton text={'Back to Players'} address="/players" />
      <Typography variant="h4">{player.fullName}</Typography>
      <img
        src="https://img.magnific.com/premium-photo/create-silhouette-person-with-question-mark-center-their-chest-face-silhou_939033-147153.jpg?semt=ais_hybrid&w=740&q=80"
        alt="playerPhoto"
        class={styles['user-photo']}
      />
      <Typography variant="h5">Age: {player.age}</Typography>
      <Typography variant="h5">Sex: {player.sex}</Typography>
      <Typography variant="h5">City: {player.city}</Typography>
      <Typography variant="h5">Status: {player.status}</Typography>
      <Typography variant="h5">Rating: {player.ukrRate}</Typography>
      <Typography variant="h5">Club: {player.club}</Typography>
      <Typography variant="h5">Notes:</Typography>
      <ul>
        {player.notes.map((note) => (
          <li>
            <Typography variant="h5" sx={{ ml: '1em' }}>
              {note}
            </Typography>
          </li>
        ))}
      </ul>
    </Stack>
  );
}

export default PlayerPage;
