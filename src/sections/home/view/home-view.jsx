import { Stack } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { HomeTabs } from './home-tabs';
import { HomeDestinations } from '../home-destinations';

export function HomeView({ destinations }) {
  return (
    <DashboardContent>
      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        <HomeTabs destinations={destinations} />
      </Stack>

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        <HomeDestinations destinations={destinations} />
      </Stack>
    </DashboardContent>
  );
}
