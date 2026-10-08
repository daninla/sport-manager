export const getPlayerColumns = (t) => [
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
    id: 'ukrRate',
    label: t('columns.ukrRate'),
    minWidth: 150,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'club', label: t('columns.club'), minWidth: 200 },
  { id: 'notes', label: t('columns.notes'), minWidth: 200 },
  { id: 'add', label: t('columns.add'), minWidth: 200 },
];