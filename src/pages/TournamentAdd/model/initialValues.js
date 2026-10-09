import dayjs from 'dayjs';

export const initialValues = {
  name: '',
  date: dayjs().format('YYYY-MM-DD'),
  timeStart: dayjs().format('HH:mm'),
  location: '',
  clubId: '',
  tablesCount: 4,
  maxParticipants: 16,
  tournamentType: 'single',
  format: 'single_elimination',
  bestOf: 3,
  isRated: false,
  ratingCoefficient: 0,
  status: 'Upcoming',
  ageCategory: '',
  ratingLimit: 0,
  gender: 'all',
};
