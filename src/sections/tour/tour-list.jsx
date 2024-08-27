import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { TourItem } from './tour-item';

// ----------------------------------------------------------------------

export function TourList({ tours }) {
  const router = useRouter();

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.tours.details(id));
    },
    [router]
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {/* {tours.map((tour) => (
          <TourItem key={tour.id} tour={tour} onView={() => handleView(tour.id)} />
        ))} */}
      </Box>

      {tours.length >= 6 && (
        <Pagination
          count={6}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
