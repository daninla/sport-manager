export const getColums = (t) => [
  { id: 'fullName', label: t('columns.fullName'), minWidth: 200 },
  {
    id: 'age',
    label: t('columns.age'),
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'city', label: t('columns.city'), minWidth: 200 },
  { id: 'status', label: t('columns.status'), minWidth: 200 },
  {
    id: 'rate',
    label: t('columns.rate'),
    minWidth: 150,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'club', label: t('columns.club'), minWidth: 200 },
  { id: 'notes', label: t('columns.notes'), minWidth: 200 },
];
