import dayjs from 'dayjs';

export const defaultValues = {
  name: '',
  date: dayjs().format('YYYY-MM-DD'),
  timeStart: dayjs().format('HH:mm'),
  location: '',
  clubId: '',
  tablesCount: 4,
  playersLimit: 16,
  tournamentType: 'single',
  format: 'single_elimination',
  gamesToWin: 3,
  isRated: false,
  ratingCoefficient: 0,
  status: 'Upcoming',
  ageCategory: '',
  ratingLimit: '',
  gender: 'all',
  players: [],
};
