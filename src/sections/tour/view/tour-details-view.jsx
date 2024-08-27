import { Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { TourDetailsToolbar } from '../tour-details-toolbar';
import { TourDetailsContent } from '../tour-details-content';

const TOUR_DETAILS_TABS = [{ label: 'Description', value: 'content' }];

export function TourDetailsView({ tour, tourLoading }) {
  const tabs = useTabs('content');

  const renderTabs = (
    <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
      {TOUR_DETAILS_TABS.map((tab) => (
        <Tab key={tab.value} iconPosition="end" value={tab.value} label={tab.label} />
      ))}
    </Tabs>
  );

  return (
    <DashboardContent>
      <TourDetailsToolbar backLink={paths.dashboard.tours.root} />
      {renderTabs}

      {tabs.value === 'content' && <TourDetailsContent tour={tour} tourLoading={tourLoading} />}
    </DashboardContent>
  );
}
