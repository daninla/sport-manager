import dayjs from 'dayjs';

export const defaultValues = {
  name: '',
  date: dayjs().format('YYYY-MM-DD'),
  timeStart: dayjs().format('HH:mm'),
  location: '',
  tablesCount: 4,
  maxParticipants: 16,
  competitionType: 'single',
  bracketFormat: 'single_elimination',
  bestOf: 3,
  isRated: false,
  ratingCoefficient: 0.00,
  status: 'Upcoming',
  ageCategory: '',
  ratingLimit: 0,
  gender: 'all',
};
