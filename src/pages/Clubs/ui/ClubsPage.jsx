import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import {
  Autocomplete,
  Box,
  Button,
  Pagination,
  TextField,
} from '@mui/material';

import { useGetClubsQuery } from '@/entities/club';
import { usePagination } from '@/shared/lib/usePagination';

import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { ClubCard } from '@/widgets/ClubCard';

function ClubsPage() {
  const { t } = useTranslation('clubs');
  const { data, isLoading, error } = useGetClubsQuery();
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const filteredClubs = useMemo(() => {
    const term = inputValue.trim().toLowerCase();

    if (!term) {
      return data ?? [];
    }

    return (data ?? []).filter(({ title }) =>
      title?.toLowerCase().includes(term),
    );
  }, [data, inputValue]);

  const {
    currentData: clubs,
    page,
    pageCount,
    handlePageChange,
  } = usePagination(filteredClubs, 8);

  if (isLoading) return <Spinner />;
  if (error || !data) {
    return <Box sx={{ p: 4 }}>{error || 'No clubs available'}</Box>;
  }

  return (
    <Box sx={{ p: '40px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
          flexWrap: 'wrap',
        }}
      >
        <Autocomplete
          freeSolo
          openOnFocus={false}
          open={open && inputValue.trim().length > 0}
          onOpen={() => {
            if (inputValue.trim().length > 0) {
              setOpen(true);
            }
          }}
          onClose={() => setOpen(false)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            setOpen(newInputValue.trim().length > 0);
          }}
          onChange={(_, value) => {
            const nextValue = typeof value === 'string' ? value : (value ?? '');
            setInputValue(nextValue);
            setOpen(false);
          }}
          options={Array.from(
            new Set((data ?? []).map(({ title }) => title).filter(Boolean)),
          )}
          sx={{
            width: '100%',
            maxWidth: '50%',
            margin: '1em 0',
          }}
          renderInput={(params) => (
            <TextField {...params} label={t('searchClub')} />
          )}
        />
        <NavLink to="/club/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              px: 3,
              py: 1.2,
              borderRadius: 2,
            }}
          >
            {t('addClub')}
          </Button>
        </NavLink>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            sm: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(2, minmax(200px, 1fr))',
            lg: 'repeat(3, minmax(200px, 1fr))',
            xl: 'repeat(4, minmax(200px, 1fr))',
          },
          gap: { xs: 2, sm: 3, md: 4, xl: 5 },
        }}
      >
        {clubs.map((club) => {
          return <ClubCard key={club.id} {...club} />;
        })}
      </Box>
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40px' }}>
          <Pagination
            size="large"
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#35ad55',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#133958',
                color: '#35ad55',
              },
              '& .MuiPaginationItem-root.Mui-selected:hover': {
                backgroundColor: '#133958',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default ClubsPage;
